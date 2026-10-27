// Модуль управления стеком модальных окон, блокировкой скролла и фокусом клавиатуры
// Реализует:
// 1. Иммутабельный snapshot стека для надежного срабатывания useSyncExternalStore в React (Object.is)
// 2. Динамический расчет z-index для любого порядка открытия (Карточка -> Ридер и Ридер -> Карточка)
// 3. Изолированный перехват Escape только для самого верхнего окна
// 4. Стабильную регистрацию без сброса стека при нестабильном onClose
// 5. Удержание фокуса внутри активного диалога (Focus Trap) и начальный фокус
// 6. Перевод фокуса в поднимаемое окно при bringModalToTop и возврат фокуса в актуальное нижнее окно
// 7. Захват триггера до переноса фокуса и корректная работа с горячими клавишами (Ctrl+K)
// 8. Устранение гонок фокуса: отмена устаревших таймеров, перепроверка верхнего окна и текущего положения фокуса

import { useEffect, useRef, useSyncExternalStore } from 'react';

export interface ModalStackItem {
  id: string;
  onClose: () => void;
  triggerElement: HTMLElement | null;
  dialogElement: HTMLElement | null;
}

const EMPTY_STACK: ModalStackItem[] = [];
let modalStack: ModalStackItem[] = EMPTY_STACK;
let originalOverflow: string | null = null;
let initialPageTrigger: HTMLElement | null = null;
let isGlobalListenerAttached = false;
const listeners = new Set<() => void>();

// Централизованное управление глобальным таймером фокуса
let activeFocusTimeout: ReturnType<typeof setTimeout> | null = null;
let currentFocusTargetId: string | null = null;

export const cancelPendingModalFocus = () => {
  if (activeFocusTimeout) {
    clearTimeout(activeFocusTimeout);
    activeFocusTimeout = null;
    currentFocusTargetId = null;
  }
};

/**
 * Планирует установку фокуса с проверкой актуальности целевого модального окна в момент срабатывания
 */
export const scheduleModalFocus = (
  targetModalId: string | null,
  focusAction: () => void,
  delayMs: number = 20
) => {
  cancelPendingModalFocus();
  currentFocusTargetId = targetModalId;

  activeFocusTimeout = setTimeout(() => {
    activeFocusTimeout = null;
    // 1. Перепроверяем, что целевое окно всё ещё является актуальным верхним в стеке
    if (targetModalId !== null) {
      if (modalStack.length === 0 || modalStack[modalStack.length - 1].id !== targetModalId) {
        return; // окно перестало быть верхним или закрылось — отменяем устаревшее действие
      }
    } else {
      if (modalStack.length > 0) {
        return; // ожидалось закрытие всех окон, но открылось новое
      }
    }
    focusAction();
  }, delayMs);
};

// Селекторы фокусируемых элементов для Focus Trap
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(', ');

export const focusDialogContent = (dialog: HTMLElement, preferredElement?: HTMLElement | null) => {
  try {
    if (preferredElement && typeof preferredElement.focus === 'function') {
      preferredElement.focus();
      return;
    }
    const firstFocusable = dialog.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    if (firstFocusable && typeof firstFocusable.focus === 'function') {
      firstFocusable.focus();
      return;
    }
    dialog.focus?.();
  } catch (_) {}
};

const notifySubscribers = () => {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch (_) {}
  });
};

const handleGlobalKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && modalStack.length > 0) {
    // Перехватываем на фазе capture
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    const topModal = modalStack[modalStack.length - 1];
    if (topModal && typeof topModal.onClose === 'function') {
      topModal.onClose();
    }
  }
};

const attachGlobalListenerIfNeeded = () => {
  if (!isGlobalListenerAttached && typeof window !== 'undefined') {
    // Capture = true гарантирует перехват до локальных обработчиков
    window.addEventListener('keydown', handleGlobalKeyDown, true);
    isGlobalListenerAttached = true;
  }
};

// Подписка для React (useSyncExternalStore)
export const subscribeModalStack = (callback: () => void) => {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
};

export const getModalStackSnapshot = (): ModalStackItem[] => modalStack;
export const getServerSnapshot = (): ModalStackItem[] => EMPTY_STACK;

export const focusModalElement = (item: ModalStackItem) => {
  scheduleModalFocus(item.id, () => {
    const dialog = item.dialogElement ||
      (typeof document !== 'undefined' ? document.querySelector<HTMLElement>(`[role="dialog"]`) : null);
    if (!dialog) return;

    // Перепроверяем: если фокус УЖЕ внутри этого диалога, НЕ СБИВАЕМ его!
    if (typeof document !== 'undefined' && dialog.contains(document.activeElement)) {
      return;
    }

    focusDialogContent(dialog);
  }, 20);
};

export const pushModalToStack = (
  id: string,
  onClose: () => void,
  triggerElement?: HTMLElement | null,
  dialogElement?: HTMLElement | null
) => {
  cancelPendingModalFocus();
  attachGlobalListenerIfNeeded();

  // Блокируем скролл body только при открытии первой модалки и сохраняем исходный триггер страницы
  if (modalStack.length === 0 && typeof document !== 'undefined') {
    originalOverflow = document.body.style.overflow || '';
    document.body.style.overflow = 'hidden';
    const activeEl = document.activeElement as HTMLElement | null;
    initialPageTrigger = triggerElement || activeEl;
  }

  const existingIndex = modalStack.findIndex((item) => item.id === id);
  if (existingIndex !== -1) {
    // Иммутабельное обновление: создаем новый массив с обновленным элементом
    const updated = [...modalStack];
    updated[existingIndex] = {
      ...updated[existingIndex],
      onClose,
      dialogElement: dialogElement || updated[existingIndex].dialogElement
    };
    modalStack = updated;
  } else {
    // Новая модалка добавляется на вершину стека через иммутабельный push
    const activeEl = typeof document !== 'undefined' ? (document.activeElement as HTMLElement) : null;
    modalStack = [
      ...modalStack,
      {
        id,
        onClose,
        triggerElement: triggerElement || activeEl,
        dialogElement: dialogElement || null
      }
    ];
  }

  notifySubscribers();
};

export const updateModalCallback = (id: string, onClose: () => void) => {
  const index = modalStack.findIndex((item) => item.id === id);
  if (index !== -1 && modalStack[index].onClose !== onClose) {
    const updated = [...modalStack];
    updated[index] = { ...updated[index], onClose };
    modalStack = updated;
    notifySubscribers();
  }
};

export const bringModalToTop = (id: string, newTriggerElement?: HTMLElement | null) => {
  cancelPendingModalFocus();
  const index = modalStack.findIndex((item) => item.id === id);
  if (index !== -1) {
    const activeEl = typeof document !== 'undefined' ? (document.activeElement as HTMLElement) : null;
    const trigger = newTriggerElement !== undefined ? newTriggerElement : (activeEl || modalStack[index].triggerElement);

    const item: ModalStackItem = {
      ...modalStack[index],
      triggerElement: trigger
    };

    if (index !== modalStack.length - 1) {
      modalStack = [...modalStack.slice(0, index), ...modalStack.slice(index + 1), item];
    } else {
      modalStack = [...modalStack.slice(0, index), item];
    }
    notifySubscribers();

    // Программно переносим фокус в поднятое окно
    focusModalElement(item);
  }
};

export const popModalFromStack = (id: string) => {
  cancelPendingModalFocus();
  const index = modalStack.findIndex((item) => item.id === id);
  if (index !== -1) {
    const item = modalStack[index];
    // Иммутабельное удаление элемента из стека
    modalStack = modalStack.filter((_, i) => i !== index);

    if (modalStack.length > 0) {
      // Есть оставшееся открытое модальное окно на вершине стека
      const remainingTop = modalStack[modalStack.length - 1];
      const trigger = item.triggerElement;
      const isTriggerInLowerModal = Boolean(
        trigger &&
        typeof trigger.focus === 'function' &&
        remainingTop.dialogElement &&
        remainingTop.dialogElement.contains(trigger)
      );

      if (isTriggerInLowerModal && trigger) {
        scheduleModalFocus(remainingTop.id, () => {
          try {
            trigger.focus();
            if (remainingTop.dialogElement && !remainingTop.dialogElement.contains(document.activeElement)) {
              focusDialogContent(remainingTop.dialogElement);
            }
          } catch (_) {
            if (remainingTop.dialogElement) {
              focusDialogContent(remainingTop.dialogElement);
            }
          }
        }, 20);
      } else {
        // Гарантированно переводим фокус в актуальное нижнее окно
        if (remainingTop.dialogElement) {
          scheduleModalFocus(remainingTop.id, () => {
            if (remainingTop.dialogElement) {
              focusDialogContent(remainingTop.dialogElement);
            }
          }, 20);
        } else {
          focusModalElement(remainingTop);
        }
      }
    } else {
      // Все модальные окна закрыты — возвращаем фокус на элемент-триггер страницы
      const trigger = item.triggerElement;
      const isConnected = (el: HTMLElement | null): boolean => {
        if (!el || typeof el.focus !== 'function') return false;
        if (typeof el.isConnected === 'boolean') return el.isConnected;
        if (typeof document !== 'undefined' && document.body && typeof document.body.contains === 'function') {
          return document.body.contains(el);
        }
        return true;
      };

      const finalTrigger = isConnected(trigger) ? trigger : (isConnected(initialPageTrigger) ? initialPageTrigger : null);
      if (finalTrigger) {
        scheduleModalFocus(null, () => {
          try {
            finalTrigger.focus();
          } catch (_) {}
          initialPageTrigger = null;
        }, 20);
      } else {
        initialPageTrigger = null;
      }
    }
  }

  // Разблокируем скролл body только когда закрыты ВСЕ окна
  if (modalStack.length === 0 && typeof document !== 'undefined') {
    document.body.style.overflow = originalOverflow !== null ? originalOverflow : '';
    originalOverflow = null;
  }

  notifySubscribers();
};

export const isTopModalInStack = (id: string): boolean => {
  if (modalStack.length === 0) return false;
  return modalStack[modalStack.length - 1].id === id;
};

export const getModalZIndex = (id: string, baseZIndex: number = 1000): number => {
  const index = modalStack.findIndex((item) => item.id === id);
  if (index === -1) return baseZIndex;
  return baseZIndex + index * 50;
};

export interface UseModalLayerOptions {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  dialogRef?: React.RefObject<HTMLElement | null>;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  baseZIndex?: number;
}

/**
 * Хук для модального окна:
 * - Управляет жизненным циклом в стеке модалок
 * - Использует иммутабельный snapshot для useSyncExternalStore, гарантируя ре-рендер
 * - Не перемонтирует стек при нестабильном onClose
 * - Динамически рассчитывает z-index в зависимости от очередности открытия
 * - Задает начальный фокус программно ПОСЛЕ сохранения триггера (без раннего перехвата через autoFocus)
 * - Удерживает фокус (Focus Trap), пока окно является верхним
 * - Восстанавливает фокус при переходе окна в статус верхнего (bringModalToTop или закрытие окна сверху)
 * - Защищен от гонок фокуса: отменяет устаревшие таймеры и не перетирает корректно возвращенный фокус
 */
export function useModalLayer({
  id,
  isOpen,
  onClose,
  dialogRef,
  initialFocusRef,
  baseZIndex = 1000
}: UseModalLayerOptions) {
  // Храним актуальный onClose в Ref, чтобы изменение ссылки не триггерило перерегистрацию
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const stack = useSyncExternalStore(subscribeModalStack, getModalStackSnapshot, getServerSnapshot);

  const mountFocusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transitionFocusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTransitionTimer = () => {
    if (transitionFocusTimerRef.current) {
      clearTimeout(transitionFocusTimerRef.current);
      transitionFocusTimerRef.current = null;
    }
  };

  // Регистрация в стеке модалок только при изменении isOpen или id
  useEffect(() => {
    if (!isOpen) return;

    // Запоминаем текущий фокус СТРОГО до программного переноса фокуса
    const trigger = typeof document !== 'undefined' ? (document.activeElement as HTMLElement) : null;
    pushModalToStack(id, () => onCloseRef.current(), trigger, dialogRef?.current || null);

    // Начальный фокус устанавливается программно ПОСЛЕ регистрации триггера
    mountFocusTimerRef.current = setTimeout(() => {
      mountFocusTimerRef.current = null;
      // Перепроверяем: окно всё ещё является верхним
      if (!isTopModalInStack(id)) return;
      const dialog = dialogRef?.current;
      if (!dialog) return;

      // Если фокус уже внутри этого диалога, не сбиваем его
      if (typeof document !== 'undefined' && dialog.contains(document.activeElement)) return;

      focusDialogContent(dialog, initialFocusRef?.current);
    }, 30);

    return () => {
      if (mountFocusTimerRef.current) {
        clearTimeout(mountFocusTimerRef.current);
        mountFocusTimerRef.current = null;
      }
      clearTransitionTimer();
      popModalFromStack(id);
    };
  }, [isOpen, id]);

  // Обновляем callback в стеке, если ссылка изменилась
  useEffect(() => {
    if (isOpen) {
      updateModalCallback(id, () => onCloseRef.current());
    }
  }, [isOpen, id, onClose]);

  const stackIndex = stack.findIndex((item) => item.id === id);
  const isTopModal = stack.length > 0 && stack[stack.length - 1].id === id;
  const zIndex = stackIndex !== -1 ? baseZIndex + stackIndex * 50 : baseZIndex;

  // Отслеживаем переход в статус верхнего окна при bringModalToTop или закрытии модалки сверху
  const prevIsTopModalRef = useRef(false);
  useEffect(() => {
    clearTransitionTimer();

    if (isOpen && isTopModal && !prevIsTopModalRef.current) {
      // Окно стало верхним — планируем перевод фокуса внутрь него с защитой от гонок
      transitionFocusTimerRef.current = setTimeout(() => {
        transitionFocusTimerRef.current = null;

        // 1. Перепроверяем, что окно ВСЁ ЕЩЁ является верхним в стеке!
        if (!isTopModalInStack(id)) return;

        const dialog = dialogRef?.current;
        if (!dialog) return;

        // 2. КРИТИЧЕСКИ ВАЖНО: Если popModalFromStack или клик пользователя уже установил фокус
        // на элемент ВНУТРИ этого диалога (например, на кнопку-триггер в Карточке), МЫ НЕ ПЕРЕТИРАЕМ ЕГО!
        if (typeof document !== 'undefined' && dialog.contains(document.activeElement)) {
          return;
        }

        // 3. Фокус всё ещё вне диалога — программно переводим внутрь
        focusDialogContent(dialog, initialFocusRef?.current);
      }, 40);
    }
    prevIsTopModalRef.current = isTopModal;

    return () => {
      clearTransitionTimer();
    };
  }, [isOpen, isTopModal, id, dialogRef, initialFocusRef]);

  // Focus Trap (удерживаемый фокус): только когда окно активно и находится на вершине стека
  useEffect(() => {
    if (!isOpen || !isTopModal || !dialogRef?.current) return;

    const dialogEl = dialogRef.current;

    const handleFocusTrapKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableEls = Array.from(
        dialogEl.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((el) => el.offsetParent !== null); // только видимые элементы

      if (focusableEls.length === 0) {
        e.preventDefault();
        return;
      }

      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstEl || !dialogEl.contains(document.activeElement)) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastEl || !dialogEl.contains(document.activeElement)) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    window.addEventListener('keydown', handleFocusTrapKeyDown);
    return () => {
      window.removeEventListener('keydown', handleFocusTrapKeyDown);
    };
  }, [isOpen, isTopModal, dialogRef]);

  return {
    zIndex,
    isTopModal,
    stackIndex
  };
}
