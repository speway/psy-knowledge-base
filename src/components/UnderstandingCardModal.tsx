import React, { useState, useEffect } from 'react';
import { 
  X, 
  HelpCircle, 
  GitBranch, 
  CheckCircle2, 
  AlertTriangle, 
  Briefcase, 
  Sparkles, 
  Copy, 
  Check, 
  Image, 
  Layers, 
  ArrowRight,
  BookOpen,
  Share2,
  ExternalLink,
  FileEdit
} from 'lucide-react';
import { UnderstandingCard, UNDERSTANDING_CARDS } from '../data/understanding-cards';
import { useModalLayer } from '../utils/modal-stack';
import { ResearchDraftInitialData } from './ResearchDraftModal';

interface UnderstandingCardModalProps {
  card: UnderstandingCard | null;
  onClose: () => void;
  onSelectCard?: (card: UnderstandingCard) => void;
  onOpenReaderBySourceId?: (sourceId: string) => void;
  onOpenResearchDraft?: (data: ResearchDraftInitialData) => void;
}

export const UnderstandingCardModal: React.FC<UnderstandingCardModalProps> = ({
  card,
  onClose,
  onSelectCard,
  onOpenReaderBySourceId,
  onOpenResearchDraft
}) => {
  const [activeTab, setActiveTab] = useState<'interactive' | 'infographic'>('interactive');
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedCitation, setCopiedCitation] = useState(false);

  const dialogRef = React.useRef<HTMLDivElement>(null);
  const initialFocusRef = React.useRef<HTMLButtonElement>(null);

  // Dynamic modal layer: handles Escape isolation, focus trap, and layer ordering
  const { zIndex } = useModalLayer({
    id: 'understanding-card-modal',
    isOpen: Boolean(card),
    onClose,
    dialogRef,
    initialFocusRef
  });

  // Reset tab when card changes
  useEffect(() => {
    setActiveTab('interactive');
    setCopiedPrompt(false);
    setCopiedCitation(false);
  }, [card?.id]);

  if (!card) return null;

  const handleCopyResearchSetup = () => {
    const textToCopy = `ТЕМА ИССЛЕДОВАНИЯ (по материалам кафедры психологии ТФ МГУ):
«${card.researchPerspective.suggestedThesisTopic || card.title}»

ОСНОВАНИЕ (Первоисточник):
${card.citation}

РАБОЧАЯ ГИПОТЕЗА:
${card.researchPerspective.hypothesisPrompt || ''}

ВЕКТОРЫ РАЗРАБОТКИ:
${card.researchPerspective.points.map((p, idx) => `${idx + 1}. ${p}`).join('\n')}
`;
    navigator.clipboard?.writeText(textToCopy);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2400);
  };

  const handleCopyCitation = () => {
    navigator.clipboard?.writeText(card.citation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
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
        aria-labelledby="card-dialog-title"
        tabIndex={-1}
        className="paper-card animate-fade-in modal-dialog-responsive"
        style={{
          width: '100%',
          maxWidth: '920px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--surface)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 24px 64px rgba(35, 20, 50, 0.28)',
          border: '1px solid var(--line)',
          overflow: 'hidden'
        }}
      >
        {/* Top Header Bar */}
        <div 
          className="modal-header-responsive"
          style={{
            padding: '18px 24px',
            background: 'linear-gradient(135deg, #301f46 0%, #4a286e 100%)',
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
              <span style={{
                background: 'rgba(217, 119, 6, 0.3)',
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
                gap: '4px'
              }}>
                <Sparkles size={11} />
                КАРТОЧКА ПОНИМАНИЯ · Т.Ю. БАЗАРОВ
              </span>
              <span style={{ fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.75)' }}>
                {card.category}
              </span>
            </div>

            <h2 
              id="card-dialog-title"
              style={{
                fontSize: '18px',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.3,
                fontFamily: 'var(--font-serif)',
                margin: 0
              }}
            >
              {card.title}
            </h2>
            <p style={{ margin: '2px 0 0', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.85)' }}>
              {card.author} {card.year ? `(${card.year})` : ''}
            </p>
          </div>

          {/* Switcher & Close Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {card.imageInfographicUrl && (
              <div style={{
                display: 'flex',
                background: 'rgba(255, 255, 255, 0.14)',
                borderRadius: 'var(--radius-full)',
                padding: '3px',
                gap: '2px'
              }}>
                <button
                  onClick={() => setActiveTab('interactive')}
                  style={{
                    background: activeTab === 'interactive' ? '#ffffff' : 'transparent',
                    color: activeTab === 'interactive' ? '#301f46' : '#ffffff',
                    border: 'none',
                    borderRadius: 'var(--radius-full)',
                    padding: '5px 12px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Layers size={13} />
                  <span>Структура (6 шагов)</span>
                </button>
                <button
                  onClick={() => setActiveTab('infographic')}
                  style={{
                    background: activeTab === 'infographic' ? 'var(--ochre)' : 'transparent',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 'var(--radius-full)',
                    padding: '5px 12px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Image size={13} />
                  <span>Инфографика Т.Ю. Базарова</span>
                </button>
              </div>
            )}

            <button
              ref={initialFocusRef}
              onClick={onClose}
              aria-label="Закрыть карточку понимания"
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
        </div>

        {/* Horizontal Card Switcher Pill-bar (Jump to any of 7 cards) */}
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
            Все карточки:
          </span>
          {UNDERSTANDING_CARDS.map((c) => {
            const isCurrent = c.id === card.id;
            return (
              <button
                key={c.id}
                onClick={() => onSelectCard && onSelectCard(c)}
                style={{
                  background: isCurrent ? 'var(--primary)' : 'var(--surface)',
                  color: isCurrent ? '#ffffff' : 'var(--ink-soft)',
                  border: `1px solid ${isCurrent ? 'var(--primary)' : 'var(--line)'}`,
                  borderRadius: 'var(--radius-full)',
                  padding: '4px 10px',
                  fontSize: '11.5px',
                  fontWeight: isCurrent ? 800 : 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                {c.author.split(' ')[0]} {c.year ? `(${c.year})` : ''}
              </button>
            );
          })}
        </div>

        {/* Scrollable Content Body */}
        <div 
          className="modal-body-responsive"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px',
            background: 'var(--paper-soft)'
          }}
        >

          {/* Slogan & Academic Citation Banner */}
          <div style={{
            background: 'var(--surface)',
            borderLeft: '4px solid var(--primary)',
            padding: '14px 18px',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary)', fontStyle: 'italic', marginBottom: '4px' }}>
                «{card.slogan}»
              </div>
              <div style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.5 }}>
                {card.citation}
              </div>
              {card.originalUrl && (
                <div style={{ marginTop: '6px' }}>
                  <a
                    href={card.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '11.5px',
                      color: 'var(--primary)',
                      fontWeight: 700,
                      textDecoration: 'none'
                    }}
                  >
                    <ExternalLink size={12} />
                    <span>Оригинальная публикация на PsyJournals (DOI: {card.doi || '10.17759/sps.2026170212'})</span>
                  </a>
                </div>
              )}
              {card.isEducationalSummary && (
                <div style={{ marginTop: '4px', fontSize: '11px', color: '#b45309' }}>
                  Учебный аналитический конспект статьи; полный аутентичный текст опубликован в журнале «Социальная психология и общество».
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={handleCopyCitation}
                style={{
                  background: 'var(--surface-soft)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '6px 12px',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  color: 'var(--ink)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                {copiedCitation ? <Check size={13} color="green" /> : <Copy size={13} />}
                <span>{copiedCitation ? 'Скопировано!' : 'Копировать ссылку'}</span>
              </button>

              {onOpenReaderBySourceId && (
                <button
                  onClick={() => {
                    onOpenReaderBySourceId(card.sourceId);
                  }}
                  style={{
                    background: 'var(--primary)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    padding: '6px 12px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <BookOpen size={13} />
                  <span>Открыть текст в ридере</span>
                </button>
              )}
            </div>
          </div>

          {/* VIEW MODE 1: ORIGINAL INFOGRAPHIC (AI-GENERATED BY BAZAROV) */}
          {activeTab === 'infographic' && card.imageInfographicUrl && (
            <div style={{ textAlign: 'center', background: '#ffffff', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--line)' }}>
              <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ fontSize: '12.5px', color: 'var(--ink)', fontWeight: 700 }}>
                  Оригинальная инфографика «Карточка понимания» (Т.Ю. Базаров)
                </span>
                <span style={{ fontSize: '11.5px', color: 'var(--muted)' }}>
                  Для увеличения откройте изображение на весь экран
                </span>
              </div>
              <img 
                src={card.imageInfographicUrl} 
                alt={card.title}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: 'var(--radius-sm)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  border: '1px solid var(--line)'
                }}
              />
            </div>
          )}

          {/* VIEW MODE 2: INTERACTIVE 6-STEP BAZAROV STRUCTURE */}
          {activeTab === 'interactive' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Grid for Steps 1 & 2 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                
                {/* 1. В чём проблема? */}
                <div style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-md)',
                  padding: '20px',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: '#fee2e2',
                      color: '#b91c1c',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '13px',
                      fontFamily: 'var(--mono)'
                    }}>
                      1
                    </div>
                    <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ink)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <HelpCircle size={16} color="#b91c1c" />
                      {card.problem.title}
                    </h3>
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>
                    {card.problem.description}
                  </p>
                </div>

                {/* 2. Как устроено исследование / концепция? */}
                <div style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-md)',
                  padding: '20px',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: '#e0e7ff',
                      color: '#3730a3',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '13px',
                      fontFamily: 'var(--mono)'
                    }}>
                      2
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', flexWrap: 'wrap', flex: 1 }}>
                      <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ink)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <GitBranch size={16} color="#3730a3" />
                        {card.design.title}
                      </h3>
                      <span style={{ fontSize: '10.5px', background: '#e0e7ff', color: '#3730a3', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, fontFamily: 'var(--mono)' }}>
                        ДИЗАЙН И МЕТОД
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {card.design.steps.map((st, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: 'var(--ink-soft)', lineHeight: 1.5 }}>
                        <span style={{ color: 'var(--primary)', fontWeight: 800, fontFamily: 'var(--mono)', marginTop: '1px' }}>
                          •
                        </span>
                        <span>{st}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Grid for Steps 3, 4, 5 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                
                {/* 3. Главные результаты */}
                <div style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-md)',
                  padding: '20px',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: '#dcfce7',
                      color: '#15803d',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '13px',
                      fontFamily: 'var(--mono)'
                    }}>
                      3
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', flexWrap: 'wrap', flex: 1 }}>
                      <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ink)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <CheckCircle2 size={16} color="#15803d" />
                        {card.results.title}
                      </h3>
                      <span style={{ fontSize: '10.5px', background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '4px', fontWeight: 800, fontFamily: 'var(--mono)' }}>
                        ДАННЫЕ ПУБЛИКАЦИИ (EFA / CFA)
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {card.results.points.map((pt, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: 'var(--ink-soft)', lineHeight: 1.5 }}>
                        <Check size={14} color="#15803d" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Ограничения */}
                <div style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-md)',
                  padding: '20px',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: '#fef3c7',
                      color: '#b45309',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '13px',
                      fontFamily: 'var(--mono)'
                    }}>
                      4
                    </div>
                    <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ink)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <AlertTriangle size={16} color="#b45309" />
                      {card.limitations.title}
                    </h3>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--ink-soft)', lineHeight: 1.55, margin: 0 }}>
                    {card.limitations.description}
                  </p>
                </div>

                {/* 5. Что это даёт практике */}
                <div style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-md)',
                  padding: '20px',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: '#ede9fe',
                      color: '#6d28d9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '13px',
                      fontFamily: 'var(--mono)'
                    }}>
                      5
                    </div>
                    <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ink)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Briefcase size={16} color="#6d28d9" />
                      {card.practice.title}
                    </h3>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--ink-soft)', lineHeight: 1.55, margin: 0 }}>
                    {card.practice.description}
                  </p>
                </div>

              </div>

              {/* 6. ГЛАВНЫЙ БЛОК: ПЕРСПЕКТИВА ДЛЯ СОБСТВЕННЫХ ИССЛЕДОВАНИЙ (МОСТ В СТУДЕНЧЕСКУЮ НАУКУ) */}
              <div style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #faf7fd 100%)',
                border: '2px solid var(--primary)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                boxShadow: '0 8px 24px rgba(75, 50, 104, 0.1)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'var(--primary)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '14px',
                      fontFamily: 'var(--mono)'
                    }}>
                      6
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Sparkles size={18} color="var(--ochre)" />
                          {card.researchPerspective.title}
                        </h3>
                        <span style={{ fontSize: '10.5px', background: '#fef3c7', color: '#b45309', border: '1px solid #f59e0b', padding: '2px 8px', borderRadius: '4px', fontWeight: 800, fontFamily: 'var(--mono)' }}>
                          УЧЕБНЫЕ ГИПОТЕЗЫ (ТРЕБУЮТ ПРОВЕРКИ)
                        </span>
                      </div>
                      <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                        Выход на курсовые работы, ВКР и студенческую науку (НИРС)
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <button
                      onClick={handleCopyResearchSetup}
                      style={{
                        background: copiedPrompt ? 'var(--secondary)' : 'var(--surface)',
                        color: copiedPrompt ? '#ffffff' : 'var(--primary)',
                        border: '1px solid var(--primary)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '8px 14px',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {copiedPrompt ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copiedPrompt ? 'Скопировано!' : 'Копировать идею'}</span>
                    </button>

                    {onOpenResearchDraft && (
                      <button
                        onClick={() => onOpenResearchDraft({
                          sourceId: card.sourceId,
                          sourceTitle: card.title,
                          sourceAuthor: card.author,
                          citation: card.citation,
                          topic: card.researchPerspective.suggestedThesisTopic || card.title,
                          starterHypothesis: card.researchPerspective.hypothesisPrompt || ''
                        })}
                        style={{
                          background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: 'var(--radius-sm)',
                          padding: '8px 16px',
                          fontSize: '12.5px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          boxShadow: '0 4px 12px rgba(217, 119, 6, 0.3)',
                          transition: 'all 0.15s ease'
                        }}
                        title="Открыть Черновик исследования и сформулировать рабочую гипотезу"
                      >
                        <FileEdit size={14} color="#fef3c7" />
                        <span>Развить в Черновике исследования</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Status Notice: Demarcation between validated facts and student hypotheses */}
                <div style={{
                  background: '#fffbeb',
                  border: '1px solid #fde68a',
                  borderLeft: '4px solid #f59e0b',
                  borderRadius: 'var(--radius-xs)',
                  padding: '10px 14px',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  fontSize: '12.5px',
                  color: '#92400e',
                  lineHeight: 1.5
                }}>
                  <AlertTriangle size={15} color="#b45309" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Научный статус раздела:</strong> Представленные ниже темы и рабочие гипотезы сформулированы студенческим сектором как учебные направления поиска для курсовых и выпускных работ. В отличие от подтверждённых результатов первоисточника (Блок 3), данные гипотезы носят предположительный характер и подлежат самостоятельной экспериментальной проверке.
                  </div>
                </div>

                {/* Vectors of research */}
                <div style={{ marginBottom: '16px' }}>
                  <strong style={{ fontSize: '13px', color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.03em', display: 'block', marginBottom: '8px' }}>
                    Векторы развития идеи в студенческих работах:
                  </strong>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {card.researchPerspective.points.map((pt, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--ink)', lineHeight: 1.5 }}>
                        <ArrowRight size={14} color="var(--primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suggested Thesis Topic and Hypothesis */}
                {(card.researchPerspective.suggestedThesisTopic || card.researchPerspective.hypothesisPrompt) && (
                  <div style={{
                    background: 'var(--surface)',
                    border: '1px dashed var(--primary)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    {card.researchPerspective.suggestedThesisTopic && (
                      <div>
                        <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          Рекомендуемая тема курсовой / диплома:
                        </span>
                        <div style={{ fontSize: '14.5px', fontWeight: 800, color: 'var(--primary)', marginTop: '2px' }}>
                          «{card.researchPerspective.suggestedThesisTopic}»
                        </div>
                      </div>
                    )}

                    {card.researchPerspective.hypothesisPrompt && (
                      <div>
                        <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          Пример рабочей гипотезы для защиты:
                        </span>
                        <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)', fontStyle: 'italic', margin: '2px 0 0', lineHeight: 1.5 }}>
                          «{card.researchPerspective.hypothesisPrompt}»
                        </p>
                      </div>
                    )}
                  </div>
                )}

              </div>

            </div>
          )}

        </div>

        {/* Footer info bar */}
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
            Концепция проф. Т.Ю. Базарова · Кафедра психологии Филиала МГУ в г. Ташкенте
          </div>
          <div>
            Нажмите <strong>Esc</strong> для возврата к чтению
          </div>
        </div>

      </div>
    </div>
  );
};
