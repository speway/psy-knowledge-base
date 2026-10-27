import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lightbulb, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Compass, 
  Copy, 
  Check, 
  ArrowRight,
  BookOpen,
  Award
} from 'lucide-react';
import { ContextualGuide, CONTEXTUAL_GUIDES } from '../data/contextual-guides';
import { useModalLayer } from '../utils/modal-stack';

interface ContextualGuideModalProps {
  guide: ContextualGuide | null;
  onClose: () => void;
  onSelectGuide?: (guide: ContextualGuide) => void;
}

export const ContextualGuideModal: React.FC<ContextualGuideModalProps> = ({
  guide,
  onClose,
  onSelectGuide
}) => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const dialogRef = React.useRef<HTMLDivElement>(null);
  const initialFocusRef = React.useRef<HTMLButtonElement>(null);

  // Dynamic modal layer: handles Escape isolation, focus trap, and layer ordering
  const { zIndex } = useModalLayer({
    id: 'contextual-guide-modal',
    isOpen: Boolean(guide),
    onClose,
    dialogRef,
    initialFocusRef
  });

  useEffect(() => {
    setCopiedPrompt(false);
  }, [guide?.id]);

  if (!guide) return null;

  const handleCopyResearchIdea = () => {
    const textToCopy = `ИССЛЕДОВАТЕЛЬСКАЯ ЗАДАЧА (по гайду кафедры психологии ТФ МГУ):
«${guide.title}»

ПРОБЛЕМА:
${guide.researchBridge.problemStatement}

ИССЛЕДОВАТЕЛЬСКИЙ ВОПРОС:
${guide.researchBridge.studentQuestion}

РАБОЧАЯ ГИПОТЕЗА (H1):
${guide.researchBridge.hypothesisDraft}

РЕКОМЕНДУЕМЫЙ МЕТОДИЧЕСКИЙ ИНСТРУМЕНТАРИЙ:
${guide.researchBridge.suggestedMethods.join(', ')}
`;
    navigator.clipboard?.writeText(textToCopy);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2400);
  };

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(23, 18, 30, 0.72)',
        backdropFilter: 'blur(6px)',
        zIndex,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
    >
      <div 
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="guide-dialog-title"
        tabIndex={-1}
        className="paper-card animate-fade-in modal-dialog-responsive"
        style={{
          width: '100%',
          maxWidth: '860px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--surface)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 24px 64px rgba(35, 20, 50, 0.28)',
          border: '1px solid var(--line)',
          overflow: 'hidden'
        }}
      >
        {/* Modal Top Header */}
        <div 
          className="modal-header-responsive"
          style={{
            padding: '18px 24px',
            background: 'linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%)',
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
                background: 'rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.04em',
                fontFamily: 'var(--mono)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Compass size={11} />
                {guide.badge}
              </span>
              <span style={{ fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.75)' }}>
                Гайд понимания темы
              </span>
            </div>

            <h2 
              id="guide-dialog-title"
              style={{
                fontSize: '18px',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.3,
                fontFamily: 'var(--font-serif)',
                margin: 0
              }}
            >
              {guide.title}
            </h2>
            <p style={{ margin: '2px 0 0', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.85)' }}>
              {guide.subtitle}
            </p>
          </div>

          <button
            ref={initialFocusRef}
            onClick={onClose}
            aria-label="Закрыть окно гайда"
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
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.28)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
          >
            <X size={18} />
          </button>
        </div>

        {/* Guides Switcher Horizontal Bar */}
        <div style={{
          padding: '8px 18px',
          background: 'var(--surface-soft)',
          borderBottom: '1px solid var(--line)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          overflowX: 'auto'
        }}>
          <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
            Все гайды:
          </span>
          {CONTEXTUAL_GUIDES.map((g) => {
            const isCurrent = g.id === guide.id;
            return (
              <button
                key={g.id}
                onClick={() => onSelectGuide && onSelectGuide(g)}
                style={{
                  background: isCurrent ? 'var(--secondary)' : 'var(--surface)',
                  color: isCurrent ? '#ffffff' : 'var(--ink-soft)',
                  border: `1px solid ${isCurrent ? 'var(--secondary)' : 'var(--line)'}`,
                  borderRadius: 'var(--radius-full)',
                  padding: '4px 10px',
                  fontSize: '11px',
                  fontWeight: isCurrent ? 800 : 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                {g.title.split(':')[0]}
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div 
          className="modal-body-responsive"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px',
            background: 'var(--paper-soft)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >

          {/* Core Insight Callout */}
          <div style={{
            background: 'var(--surface)',
            borderLeft: '4px solid var(--secondary)',
            padding: '16px 20px',
            borderRadius: 'var(--radius-sm)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Lightbulb size={18} color="var(--secondary)" />
              <strong style={{ fontSize: '13.5px', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                Суть концепции в 2 предложениях:
              </strong>
            </div>
            <p style={{ fontSize: '14.5px', color: 'var(--ink)', lineHeight: 1.6, margin: 0 }}>
              {guide.summary}
            </p>
          </div>

          {/* Section 1: Key Concepts */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
              <BookOpen size={16} color="var(--primary)" />
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ink)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                Ключевые понятия и различения
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {guide.keyConcepts.map((item, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--line)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '14px 16px'
                  }}
                >
                  <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary)', marginBottom: '4px' }}>
                    {item.term}
                  </div>
                  <div style={{ fontSize: '13.5px', color: 'var(--ink)', lineHeight: 1.5, marginBottom: '6px' }}>
                    <strong>Определение:</strong> {item.definition}
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: 'var(--ink-soft)',
                    background: 'var(--surface-soft)',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-xs)',
                    borderLeft: '3px solid var(--ochre)',
                    lineHeight: 1.5
                  }}>
                    💡 <strong>На понятном примере:</strong> {item.clarification}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Pitfalls to Avoid */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid #fed7aa',
            borderRadius: 'var(--radius-md)',
            padding: '18px 20px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <AlertTriangle size={18} color="#c2410c" />
              <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: '#9a3412', margin: 0, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                Типичные ошибки студентов при ответе на семинаре
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {guide.pitfallsToAvoid.map((pitfall, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--ink)', lineHeight: 1.5 }}>
                  <span style={{ color: '#c2410c', fontWeight: 800, marginTop: '1px' }}>✕</span>
                  <span>{pitfall}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Seminar Answer Blueprint */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-md)',
            padding: '18px 20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Award size={18} color="var(--primary)" />
              <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: 'var(--primary)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                Формула отличного ответа на семинаре:
              </h3>
            </div>
            <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>
              «{guide.seminarAnswerBlueprint}»
            </p>
          </div>

          {/* Section 4: Research Bridge (Bazarov's principle) */}
          <div style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f7f9fd 100%)',
            border: '2px solid var(--secondary)',
            borderRadius: 'var(--radius-md)',
            padding: '20px',
            boxShadow: '0 6px 18px rgba(44, 82, 130, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} color="var(--secondary)" />
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--secondary)', margin: 0 }}>
                  Выход на собственное исследование (НИРС / Курсовая)
                </h3>
              </div>

              <button
                onClick={handleCopyResearchIdea}
                style={{
                  background: copiedPrompt ? 'green' : 'var(--secondary)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  padding: '7px 14px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  transition: 'all 0.15s ease'
                }}
              >
                {copiedPrompt ? <Check size={13} /> : <Copy size={13} />}
                <span>{copiedPrompt ? 'Скопировано!' : 'Скопировать рамку исследования'}</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Проблема и исследовательский вопрос:
                </span>
                <p style={{ fontSize: '13.5px', color: 'var(--ink)', margin: '2px 0 0', fontWeight: 600 }}>
                  {guide.researchBridge.studentQuestion}
                </p>
                <p style={{ fontSize: '12.5px', color: 'var(--muted)', margin: '2px 0 0' }}>
                  {guide.researchBridge.problemStatement}
                </p>
              </div>

              <div style={{
                background: 'var(--surface)',
                border: '1px dashed var(--secondary)',
                borderRadius: 'var(--radius-xs)',
                padding: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', flexWrap: 'wrap', marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--secondary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Черновик рабочей гипотезы (H1):
                  </span>
                  <span style={{ fontSize: '10px', background: '#fef3c7', color: '#b45309', padding: '1px 6px', borderRadius: '3px', fontWeight: 800, fontFamily: 'var(--mono)' }}>
                    ТРЕБУЕТ ПРОВЕРКИ
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--ink)', margin: '2px 0 0', fontStyle: 'italic' }}>
                  «{guide.researchBridge.hypothesisDraft}»
                </p>
              </div>

              <div>
                <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '6px' }}>
                  Рекомендуемый методический инструментарий:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {guide.researchBridge.suggestedMethods.map((m, idx) => (
                    <span 
                      key={idx}
                      style={{
                        background: 'var(--surface)',
                        border: '1px solid var(--line)',
                        borderRadius: 'var(--radius-full)',
                        padding: '3px 10px',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        color: 'var(--ink-soft)'
                      }}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Bottom Footer */}
        <div style={{
          padding: '12px 24px',
          background: 'var(--surface)',
          borderTop: '1px solid var(--line)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
          fontSize: '12px',
          color: 'var(--muted)'
        }}>
          <div>
            Кафедра психологии Филиала МГУ в г. Ташкенте · Гайды для подготовки к семинарам
          </div>
          <div>
            Нажмите <strong>Esc</strong> для закрытия
          </div>
        </div>

      </div>
    </div>
  );
};
