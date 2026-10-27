import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  Save, 
  Lightbulb, 
  AlertTriangle, 
  FileEdit, 
  BookOpen, 
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';
import { useModalLayer } from '../utils/modal-stack';

export interface ResearchDraftInitialData {
  sourceId?: string;
  sourceTitle: string;
  sourceAuthor: string;
  citation: string;
  topic?: string;
  starterHypothesis?: string;
  seminarNum?: number;
  questionNum?: number;
}

export interface ResearchDraftModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: ResearchDraftInitialData | null;
}

interface SavedDraft {
  researchQuestion: string;
  hypothesis: string;
  verificationMethod: string;
  unknowns: string;
  savedAt: string;
}

const STORAGE_PREFIX = 'psy_kb_research_draft_';

const isLocalStorageAvailable = (): boolean => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return false;
    const testKey = '__psy_test_storage__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    return true;
  } catch (_) {
    return false;
  }
};

export const ResearchDraftModal: React.FC<ResearchDraftModalProps> = ({
  isOpen,
  onClose,
  initialData
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const initialFocusRef = useRef<HTMLTextAreaElement>(null);

  const { zIndex, isTopModal } = useModalLayer({
    id: 'research-draft-modal',
    isOpen,
    onClose,
    dialogRef,
    initialFocusRef: initialFocusRef as React.RefObject<HTMLElement | null>,
    baseZIndex: 1100
  });

  // Draft form fields
  const [researchQuestion, setResearchQuestion] = useState('');
  const [hypothesis, setHypothesis] = useState('');
  const [verificationMethod, setVerificationMethod] = useState('');
  const [unknowns, setUnknowns] = useState('');

  // Storage and UI states
  const [storageAvailable, setStorageAvailable] = useState(true);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [isRestored, setIsRestored] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Storage key derived from initial data
  const storageKey = initialData?.sourceId 
    ? `${STORAGE_PREFIX}${initialData.sourceId}` 
    : (initialData?.topic ? `${STORAGE_PREFIX}${encodeURIComponent(initialData.topic.slice(0, 30))}` : `${STORAGE_PREFIX}general`);

  // Initialize and restore saved data when opening
  useEffect(() => {
    if (!isOpen || !initialData) return;

    const available = isLocalStorageAvailable();
    setStorageAvailable(available);

    let restored = false;
    if (available) {
      try {
        const raw = window.localStorage.getItem(storageKey);
        if (raw) {
          const parsed: SavedDraft = JSON.parse(raw);
          setResearchQuestion(parsed.researchQuestion || '');
          setHypothesis(parsed.hypothesis || (initialData.starterHypothesis || ''));
          setVerificationMethod(parsed.verificationMethod || '');
          setUnknowns(parsed.unknowns || '');
          setLastSavedTime(parsed.savedAt || null);
          restored = Boolean(parsed.researchQuestion || parsed.hypothesis || parsed.verificationMethod || parsed.unknowns);
        } else {
          // Initialize empty or with starter hypothesis
          setResearchQuestion('');
          setHypothesis(initialData.starterHypothesis || '');
          setVerificationMethod('');
          setUnknowns('');
          setLastSavedTime(null);
        }
      } catch (_) {
        setResearchQuestion('');
        setHypothesis(initialData.starterHypothesis || '');
        setVerificationMethod('');
        setUnknowns('');
      }
    } else {
      setResearchQuestion('');
      setHypothesis(initialData.starterHypothesis || '');
      setVerificationMethod('');
      setUnknowns('');
    }

    setIsRestored(restored);
  }, [isOpen, initialData, storageKey]);

  // Handle Save to LocalStorage
  const handleSaveDraft = (silent = false) => {
    if (!isLocalStorageAvailable()) {
      setStorageAvailable(false);
      return false;
    }

    try {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const draftData: SavedDraft = {
        researchQuestion,
        hypothesis,
        verificationMethod,
        unknowns,
        savedAt: `${now.toLocaleDateString()} в ${timeStr}`
      };
      window.localStorage.setItem(storageKey, JSON.stringify(draftData));
      setLastSavedTime(draftData.savedAt);
      setStorageAvailable(true);
      return true;
    } catch (_) {
      setStorageAvailable(false);
      return false;
    }
  };

  // Debounced auto-save when auto-save is enabled
  useEffect(() => {
    if (!isOpen || !autoSaveEnabled || !storageAvailable) return;
    const timer = setTimeout(() => {
      handleSaveDraft(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, [researchQuestion, hypothesis, verificationMethod, unknowns, autoSaveEnabled, isOpen, storageAvailable]);

  // Handle Reset / Start Over
  const handleResetDraft = () => {
    if (window.confirm('Очистить черновик и начать заново? Данные в полях будут сброшены.')) {
      setResearchQuestion('');
      setHypothesis(initialData?.starterHypothesis || '');
      setVerificationMethod('');
      setUnknowns('');
      if (isLocalStorageAvailable()) {
        try {
          window.localStorage.removeItem(storageKey);
          setLastSavedTime(null);
          setIsRestored(false);
        } catch (_) {}
      }
    }
  };

  // Build formatted text for export
  const buildExportText = () => {
    const topicTitle = initialData?.topic || initialData?.sourceTitle || 'Исследовательская тема';
    const now = new Date().toLocaleString('ru-RU');

    return `================================================================================
ЧЕРНОВИК ИССЛЕДОВАТЕЛЬСКОЙ РАБОТЫ (СТУДЕНЧЕСКИЙ ПРОЕКТ)
Филиал Московского государственного университета имени М.В. Ломоносова в г. Ташкенте
Факультет / Направление: «Психология»
Дата формирования: ${now}
================================================================================

[1. БИБЛИОГРАФИЧЕСКИЙ ПЕРВОИСТОЧНИК И АКАДЕМИЧЕСКОЕ ОСНОВАНИЕ]
Тема / Вопрос: ${topicTitle}
Автор источника: ${initialData?.sourceAuthor || '—'}
Название труда: ${initialData?.sourceTitle || '—'}
Библиографическая ссылка:
${initialData?.citation || 'Ссылка не указана'}

--------------------------------------------------------------------------------
[2. СОБСТВЕННЫЙ ИССЛЕДОВАТЕЛЬСКИЙ ВОПРОС СТУДЕНТА]
${researchQuestion.trim() || '(Вопрос ещё не сформулирован)'}

--------------------------------------------------------------------------------
[3. РАБОЧАЯ ГИПОТЕЗА]
* Внимание: Научный статус гипотезы — эвристическое предположение, подлежащее проверке *
${hypothesis.trim() || '(Гипотеза ещё не сформулирована)'}

--------------------------------------------------------------------------------
[4. ПЛАНИРУЕМЫЙ СПОСОБ ПРОВЕРКИ И МЕТОДЫ]
${verificationMethod.trim() || '(Метод проверки ещё не описан)'}

--------------------------------------------------------------------------------
[5. ЧТО ПОКА НЕИЗВЕСТНО / «БЕЛЫЕ ПЯТНА» И ВОПРОСЫ К НАУЧНОМУ РУКОВОДИТЕЛЮ]
${unknowns.trim() || '(Нет открытых вопросов)'}

================================================================================
Сформировано в учебном модуле «Черновик исследования»
Научный сектор · База знаний психологии ТФ МГУ
================================================================================
`;
  };

  // Export to .txt file
  const handleExportTxt = () => {
    const text = buildExportText();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const cleanId = (initialData?.sourceId || 'draft').replace(/[^a-zA-Z0-9_-]/g, '_');
    link.download = `chernovik_${cleanId}_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  // Copy to clipboard
  const handleCopyClipboard = () => {
    const text = buildExportText();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    }
  };

  if (!isOpen || !initialData) return null;

  return (
    <div 
      className="modal-backdrop-responsive"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex,
        background: 'rgba(20, 10, 30, 0.72)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Черновик исследования"
        className="paper-card animate-fade-in modal-dialog-responsive"
        style={{
          width: '100%',
          maxWidth: '860px',
          maxHeight: '94vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--surface)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 24px 64px rgba(35, 20, 50, 0.35)',
          border: '1px solid var(--line)',
          overflow: 'hidden'
        }}
      >
        {/* Modal Header */}
        <div
          className="modal-header-responsive"
          style={{
            padding: '18px 22px',
            background: 'linear-gradient(135deg, #2b173e 0%, #431f63 100%)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
          }}
        >
          <div style={{ flex: 1, minWidth: '240px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{
                background: 'rgba(245, 158, 11, 0.25)',
                color: '#fef3c7',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.04em',
                fontFamily: 'var(--mono)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <FileEdit size={12} />
                СТУДЕНЧЕСКИЙ ЧЕРНОВИК ИССЛЕДОВАНИЯ
              </span>
              {isRestored && (
                <span style={{ fontSize: '11px', color: '#a7f3d0', background: 'rgba(16, 185, 129, 0.2)', padding: '2px 8px', borderRadius: '4px' }}>
                  ✓ Восстановлено из памяти
                </span>
              )}
            </div>
            <h2 style={{
              fontSize: '18px',
              fontWeight: 800,
              color: '#ffffff',
              margin: 0,
              fontFamily: 'var(--font-serif)',
              lineHeight: 1.3
            }}>
              {initialData.topic || initialData.sourceTitle}
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={onClose}
              aria-label="Закрыть черновик исследования"
              title="Закрыть (Esc)"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: 'none',
                color: '#ffffff',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.15s ease'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div
          className="modal-body-responsive"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '22px',
            background: 'var(--paper-soft)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          {/* Storage notice if unavailable */}
          {!storageAvailable && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderLeft: '4px solid #ef4444',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              fontSize: '13px',
              color: '#991b1b',
              lineHeight: 1.5
            }}>
              <AlertTriangle size={18} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Локальное хранилище браузера недоступно:</strong> Ваши записи доступны в текущей вкладке, но не сохранятся при закрытии страницы (возможно, включён приватный режим браузера или отключены cookies). Рекомендуем воспользоваться кнопкой <strong>«Экспорт в текстовый файл»</strong> для сохранения на компьютере/телефоне.
              </div>
            </div>
          )}

          {/* Block 1: Academic Reference & Source Citation */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderLeft: '4px solid var(--primary)',
            borderRadius: 'var(--radius-sm)',
            padding: '14px 18px',
            boxShadow: 'var(--shadow-xs)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px', flexWrap: 'wrap', gap: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <BookOpen size={13} />
                Первоисточник и библиографическое основание (ГОСТ)
              </span>
              <span style={{ fontSize: '11.5px', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                {initialData.sourceAuthor}
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--ink)', margin: 0, lineHeight: 1.55 }}>
              {initialData.citation}
            </p>
          </div>

          {/* Block 2: Student's Own Research Question */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-sm)',
            padding: '16px 18px',
            boxShadow: 'var(--shadow-xs)'
          }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{
                  background: 'var(--primary)',
                  color: '#ffffff',
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontFamily: 'var(--mono)'
                }}>1</span>
                Собственный исследовательский вопрос:
              </span>
              <span style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginTop: '3px', lineHeight: 1.4 }}>
                Сформулируйте проблему своими словами. Что именно вы хотите прояснить или узнать глубже на материале первоисточника?
              </span>
            </label>
            <textarea
              ref={initialFocusRef}
              rows={3}
              value={researchQuestion}
              onChange={(e) => setResearchQuestion(e.target.value)}
              placeholder="Например: Как в условиях неопределённости динамика лидерской отзывчивости связана с эмоциональным выгоранием сотрудников?"
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--line)',
                background: 'var(--paper-soft)',
                fontSize: '13.5px',
                color: 'var(--ink)',
                fontFamily: 'inherit',
                resize: 'vertical',
                lineHeight: 1.5,
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Block 3: Working Hypothesis (EXPLICITLY MARKED AS SCIENTIFIC ASSUMPTION) */}
          <div style={{
            background: 'var(--surface)',
            border: '2px solid #f59e0b',
            borderRadius: 'var(--radius-sm)',
            padding: '18px',
            boxShadow: '0 4px 16px rgba(245, 158, 11, 0.12)'
          }}>
            {/* Academic Notice on Hypothesis Status */}
            <div style={{
              background: '#fffbeb',
              border: '1px solid #fde68a',
              borderRadius: 'var(--radius-xs)',
              padding: '10px 14px',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              fontSize: '12px',
              color: '#92400e',
              lineHeight: 1.5
            }}>
              <Lightbulb size={17} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ display: 'block', fontSize: '12.5px', marginBottom: '2px' }}>
                  Академический статус: Рабочая гипотеза — это научное предположение
                </strong>
                Рабочая гипотеза не является доказанным фактом или догмой. Это эвристическая догадка и вероятностное предположение студента, выдвигаемое для объяснения психологических явлений и подлежащее самостоятельной эмпирической или теоретической проверке в исследовании.
                Рекомендуемые обороты: <em>«Предполагается, что...», «Мы исходим из предположения о связи...», «Возможно, определяющим фактором выступает...».</em>
              </div>
            </div>

            <label style={{ display: 'block', marginBottom: '8px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{
                  background: '#d97706',
                  color: '#ffffff',
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontFamily: 'var(--mono)'
                }}>2</span>
                Формулировка рабочей гипотезы (предположение):
              </span>
            </label>
            <textarea
              rows={4}
              value={hypothesis}
              onChange={(e) => setHypothesis(e.target.value)}
              placeholder="Предполагается, что при высоком уровне отзывчивости лидера к межличностным отношениям снижается уровень групповой напряженности..."
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid #f59e0b',
                background: '#fffdf7',
                fontSize: '13.5px',
                color: 'var(--ink)',
                fontFamily: 'inherit',
                resize: 'vertical',
                lineHeight: 1.5,
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Block 4: Method of Verification / Empirical Design */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-sm)',
            padding: '16px 18px',
            boxShadow: 'var(--shadow-xs)'
          }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{
                  background: 'var(--primary)',
                  color: '#ffffff',
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontFamily: 'var(--mono)'
                }}>3</span>
                Способ проверки и методы исследования:
              </span>
              <span style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginTop: '3px', lineHeight: 1.4 }}>
                Как вы планируете проверять гипотезу? (Опрос, диагностическая методика, квазиэксперимент, выборка респондентов, статистические критерии).
              </span>
            </label>
            <textarea
              rows={3}
              value={verificationMethod}
              onChange={(e) => setVerificationMethod(e.target.value)}
              placeholder="Например: Методика СОКОЛ (Т.Ю. Базаров) + опросник психологической безопасности Эми Эдмондсон; выборка 80 сотрудников IT-сектора; корреляционный анализ Спирмена."
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--line)',
                background: 'var(--paper-soft)',
                fontSize: '13.5px',
                color: 'var(--ink)',
                fontFamily: 'inherit',
                resize: 'vertical',
                lineHeight: 1.5,
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Block 5: Unknowns / White Spots & Questions for Advisor */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-sm)',
            padding: '16px 18px',
            boxShadow: 'var(--shadow-xs)'
          }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{
                  background: 'var(--muted)',
                  color: '#ffffff',
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontFamily: 'var(--mono)'
                }}>4</span>
                Что пока неизвестно / белые пятна (вопросы к преподавателю):
              </span>
              <span style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginTop: '3px', lineHeight: 1.4 }}>
                Какие переменные ещё не учтены? Какие методологические сомнения вы хотите обсудить на семинаре или консультации?
              </span>
            </label>
            <textarea
              rows={3}
              value={unknowns}
              onChange={(e) => setUnknowns(e.target.value)}
              placeholder="Например: Как контролировать стаж работы в команде? Требуется ли адаптация шкалы методики на русскоязычной выборке студентов?"
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--line)',
                background: 'var(--paper-soft)',
                fontSize: '13.5px',
                color: 'var(--ink)',
                fontFamily: 'inherit',
                resize: 'vertical',
                lineHeight: 1.5,
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div style={{
          padding: '14px 22px',
          background: 'var(--surface)',
          borderTop: '1px solid var(--line)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          {/* Left: Auto-save status and clear */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--ink-soft)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={autoSaveEnabled}
                onChange={(e) => setAutoSaveEnabled(e.target.checked)}
                disabled={!storageAvailable}
              />
              <span>Автосохранение на устройстве</span>
            </label>

            {lastSavedTime && (
              <span style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                Сохранено: {lastSavedTime}
              </span>
            )}

            <button
              onClick={handleResetDraft}
              className="btn-ghost"
              style={{
                padding: '5px 8px',
                fontSize: '11px',
                color: 'var(--muted)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
              title="Сбросить все поля черновика"
            >
              <RotateCcw size={12} />
              <span>Очистить</span>
            </button>
          </div>

          {/* Right: Actions (Manual Save, Copy, Export) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => handleSaveDraft(false)}
              className="btn-ghost"
              style={{
                padding: '8px 14px',
                fontSize: '12.5px',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
              title="Сохранить черновик в локальную память браузера"
            >
              <Save size={14} color="var(--primary)" />
              <span>Сохранить</span>
            </button>

            <button
              onClick={handleCopyClipboard}
              className="btn-ghost"
              style={{
                padding: '8px 14px',
                fontSize: '12.5px',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
              title="Скопировать весь черновик со ссылкой в буфер обмена"
            >
              {copiedText ? <Check size={14} color="green" /> : <Copy size={14} />}
              <span>{copiedText ? 'Скопировано!' : 'Копировать'}</span>
            </button>

            <button
              onClick={handleExportTxt}
              style={{
                background: 'linear-gradient(135deg, #301f46 0%, #4a286e 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                padding: '8px 16px',
                fontSize: '12.5px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 12px rgba(48, 31, 70, 0.25)',
                transition: 'all 0.15s ease'
              }}
              title="Скачать черновик со ссылкой на первоисточник в формате .txt"
            >
              {downloadSuccess ? <Check size={14} /> : <Download size={14} />}
              <span>{downloadSuccess ? 'Файл скачан!' : 'Экспорт в .txt'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
