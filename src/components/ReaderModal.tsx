import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Copy, 
  Check, 
  Type, 
  FileText, 
  Download, 
  ExternalLink,
  BookOpen,
  ListFilter,
  Sparkles,
  Compass,
  FileEdit
} from 'lucide-react';
import { ReaderSource } from '../data/reader-sources';
import { findUnderstandingCard } from '../data/understanding-cards';
import { useModalLayer } from '../utils/modal-stack';
import { ResearchDraftInitialData } from './ResearchDraftModal';

interface ReaderModalProps {
  source: ReaderSource | null;
  onClose: () => void;
  onOpenUnderstandingCard?: (cardId: string) => void;
  onOpenContextualGuide?: (guideId: string) => void;
  onOpenResearchDraft?: (data: ResearchDraftInitialData) => void;
}

export const ReaderModal: React.FC<ReaderModalProps> = ({ 
  source, 
  onClose,
  onOpenUnderstandingCard,
  onOpenContextualGuide,
  onOpenResearchDraft
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [useSerif, setUseSerif] = useState(true);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'text' | 'file'>('text');
  const [continuousScroll, setContinuousScroll] = useState(false);

  const dialogRef = React.useRef<HTMLDivElement>(null);
  const initialFocusRef = React.useRef<HTMLButtonElement>(null);

  // Dynamic modal layer: handles Escape isolation, focus trap, and layer ordering
  const { zIndex } = useModalLayer({
    id: 'reader-modal',
    isOpen: Boolean(source),
    onClose,
    dialogRef,
    initialFocusRef
  });

  // Reset page when source changes
  useEffect(() => {
    setCurrentPage(0);
    setViewMode('text');
  }, [source?.id]);

  if (!source) return null;

  // Resolve file URL for offline file:/// vs web https://
  const resolvedFileUrl = (() => {
    if (!source.fileUrl) return '';
    if (typeof window !== 'undefined' && window.location.protocol === 'file:' && source.fileName) {
      return source.fileName;
    }
    return source.fileUrl;
  })();

  const totalPages = source.pages.length;
  const currentPageObj = source.pages[currentPage];
  const pageNum = typeof currentPageObj === 'object' && currentPageObj !== null ? (currentPageObj as any).num : currentPage + 1;
  const pageText = typeof currentPageObj === 'object' && currentPageObj !== null ? (currentPageObj as any).text : String(currentPageObj || '');

  const handleCopyCitation = () => {
    navigator.clipboard?.writeText(source.citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getFontSizeStyle = () => {
    if (fontSize === 'sm') return { fontSize: '14px', lineHeight: 1.65 };
    if (fontSize === 'lg') return { fontSize: '18px', lineHeight: 1.75 };
    return { fontSize: '16px', lineHeight: 1.7 };
  };

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(45, 31, 63, 0.72)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex,
        padding: '12px'
      }}
    >
      <div 
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reader-dialog-title"
        tabIndex={-1}
        className="paper-card modal-dialog-responsive"
        style={{
          width: '100%',
          maxWidth: '920px',
          height: '92vh',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          background: '#fffdfa',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden'
        }}
      >
        
        {/* Top Header */}
        <div 
          className="modal-header-responsive"
          style={{
            padding: '12px 18px',
            background: 'var(--ink)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ overflow: 'hidden', flex: 1, minWidth: '220px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span style={{ fontSize: '11px', color: 'var(--ochre-border)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, fontFamily: 'var(--mono)' }}>
                {source.author} {source.year ? `(${source.year})` : ''}
              </span>
              {source.fileSize && (
                <span style={{
                  fontSize: '10px',
                  background: 'rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontFamily: 'var(--mono)'
                }}>
                  {source.fileSize}
                </span>
              )}
            </div>
            <h3 
              id="reader-dialog-title"
              style={{ 
                fontSize: '15px', 
                fontWeight: 700, 
                whiteSpace: 'nowrap', 
                overflow: 'hidden', 
                textOverflow: 'ellipsis',
                maxWidth: '460px',
                color: '#ffffff'
              }}
            >
              {source.title}
            </h3>
          </div>

          {/* Mode Switcher Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{
              display: 'flex',
              background: 'rgba(255, 255, 255, 0.12)',
              borderRadius: 'var(--radius-full)',
              padding: '3px',
              gap: '2px'
            }}>
              <button
                onClick={() => setViewMode('text')}
                style={{
                  background: viewMode === 'text' ? 'var(--primary)' : 'transparent',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  padding: '5px 12px',
                  fontSize: '11.5px',
                  fontWeight: viewMode === 'text' ? 800 : 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all 0.15s ease'
                }}
              >
                <BookOpen size={13} />
                <span>Конспект</span>
              </button>

              {source.fileUrl && (
                <button
                  onClick={() => setViewMode('file')}
                  style={{
                    background: viewMode === 'file' ? 'var(--ochre)' : 'transparent',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 'var(--radius-full)',
                    padding: '5px 12px',
                    fontSize: '11.5px',
                    fontWeight: viewMode === 'file' ? 800 : 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <FileText size={13} />
                  <span>Полный файл</span>
                </button>
              )}
            </div>

            {/* Understanding Card button if available */}
            {(() => {
              const matchedCard = findUnderstandingCard(source.understandingCardId || source.id);
              if (matchedCard && onOpenUnderstandingCard) {
                return (
                  <button
                    onClick={() => onOpenUnderstandingCard(matchedCard.id)}
                    style={{
                      background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: 'var(--radius-full)',
                      padding: '5px 12px',
                      fontSize: '11.5px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: '0 2px 8px rgba(217, 119, 6, 0.4)',
                      transition: 'all 0.15s ease'
                    }}
                    title="Открыть Карточку понимания по модели проф. Т.Ю. Базарова"
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
                  >
                    <Sparkles size={12} color="#fef3c7" />
                    <span>Карточка понимания</span>
                  </button>
                );
              }
              return null;
            })()}

            {/* Contextual Guide button */}
            {onOpenContextualGuide && (
              <button
                onClick={() => onOpenContextualGuide('guide-how-to-do-research')}
                style={{
                  background: 'rgba(255, 255, 255, 0.14)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  padding: '5px 10px',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all 0.15s ease'
                }}
                title="Гайд исследователя: выход на ВКР"
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.22)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.14)'}
              >
                <Compass size={12} />
                <span>Гайд ВКР</span>
              </button>
            )}

            {/* Research Draft Button */}
            {onOpenResearchDraft && (
              <button
                onClick={() => onOpenResearchDraft({
                  sourceId: source.id,
                  sourceTitle: source.title,
                  sourceAuthor: source.author,
                  citation: source.citation || `${source.author}. ${source.title}. ${source.year || ''}`,
                  topic: `Конспект первоисточника: ${source.title}`
                })}
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  padding: '5px 11px',
                  fontSize: '11.5px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 2px 6px rgba(16, 185, 129, 0.35)',
                  transition: 'all 0.15s ease'
                }}
                title="Открыть Черновик исследования по данному первоисточнику"
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
              >
                <FileEdit size={12} color="#ffffff" />
                <span>Черновик</span>
              </button>
            )}

            {/* Quick Actions */}
            {viewMode === 'text' && (
              <>
                {/* Font Size Toggle */}
                <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.12)', borderRadius: '6px', padding: '2px' }}>
                  <button
                    onClick={() => setFontSize(f => f === 'lg' ? 'md' : 'sm')}
                    style={{ background: 'none', border: 'none', color: '#ffffff', padding: '4px 7px', fontSize: '11px', cursor: 'pointer', fontWeight: fontSize === 'sm' ? 800 : 400 }}
                    title="Уменьшить шрифт"
                  >
                    A-
                  </button>
                  <button
                    onClick={() => setFontSize(f => f === 'sm' ? 'md' : 'lg')}
                    style={{ background: 'none', border: 'none', color: '#ffffff', padding: '4px 7px', fontSize: '12px', cursor: 'pointer', fontWeight: fontSize === 'lg' ? 800 : 400 }}
                    title="Увеличить шрифт"
                  >
                    A+
                  </button>
                </div>

                {/* Serif Toggle */}
                <button
                  onClick={() => setUseSerif(s => !s)}
                  style={{
                    background: useSerif ? 'rgba(184, 59, 28, 0.4)' : 'rgba(255, 255, 255, 0.12)',
                    border: 'none',
                    color: '#ffffff',
                    padding: '5px 8px',
                    borderRadius: '6px',
                    fontSize: '11.5px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  title="Переключить шрифт"
                >
                  <Type size={13} />
                </button>

                {/* Continuous Scroll Toggle */}
                {totalPages > 1 && (
                  <button
                    onClick={() => setContinuousScroll(c => !c)}
                    style={{
                      background: continuousScroll ? 'rgba(75, 50, 104, 0.8)' : 'rgba(255, 255, 255, 0.12)',
                      border: 'none',
                      color: '#ffffff',
                      padding: '5px 8px',
                      borderRadius: '6px',
                      fontSize: '11.5px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    title={continuousScroll ? "Постраничный режим" : "Сплошной свиток"}
                  >
                    <ListFilter size={13} />
                    <span style={{ fontSize: '11px' }}>{continuousScroll ? 'Постранично' : 'Весь текст'}</span>
                  </button>
                )}
              </>
            )}

            {/* Direct File Download / Open in tab */}
            {source.fileUrl && (
              <a
                href={resolvedFileUrl}
                download={source.fileName || true}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'rgba(255, 255, 255, 0.14)',
                  border: 'none',
                  color: '#ffffff',
                  padding: '5px 10px',
                  borderRadius: '6px',
                  fontSize: '11.5px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  textDecoration: 'none'
                }}
                title="Скачать файл первоисточника"
              >
                <Download size={13} />
                <span style={{ fontSize: '11px' }}>Скачать</span>
              </a>
            )}

            {/* Copy Citation */}
            <button
              onClick={handleCopyCitation}
              style={{
                background: copied ? 'var(--teal)' : 'rgba(255, 255, 255, 0.12)',
                border: 'none',
                color: '#ffffff',
                padding: '5px 10px',
                borderRadius: '6px',
                fontSize: '11.5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.15s ease'
              }}
              title="Скопировать библиографическую ссылку"
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              <span style={{ fontSize: '11px' }}>{copied ? 'Скопировано' : 'Ссылка'}</span>
            </button>

            {/* Close Button */}
            <button
              ref={initialFocusRef}
              onClick={onClose}
              aria-label="Закрыть окно ридера"
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: '#ffffff',
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                marginLeft: '4px'
              }}
              title="Закрыть (ESC)"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        {viewMode === 'file' && source.fileUrl ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#2d1f3f08', overflow: 'hidden' }}>
            
            {/* File Info Bar */}
            <div style={{
              padding: '10px 18px',
              background: 'var(--paper-soft)',
              borderBottom: '1px solid var(--line)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '12.5px',
              color: 'var(--ink)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={15} color="var(--primary)" />
                <span><strong>Файл первоисточника:</strong> {source.fileName}</span>
                {source.fileSize && <span className="pill pill-neutral">{source.fileSize}</span>}
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <a
                  href={resolvedFileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  style={{ padding: '4px 10px', fontSize: '11.5px', textDecoration: 'none' }}
                >
                  <ExternalLink size={12} />
                  Открыть в новой вкладке
                </a>
                <a
                  href={resolvedFileUrl}
                  download={source.fileName || true}
                  className="btn-ink"
                  style={{ padding: '4px 12px', fontSize: '11.5px', textDecoration: 'none' }}
                >
                  <Download size={12} />
                  Скачать оригинал
                </a>
              </div>
            </div>

            {/* Embedded Document Frame */}
            <div style={{ flex: 1, position: 'relative' }}>
              <iframe
                src={`${resolvedFileUrl}#toolbar=1&navpanes=0`}
                title={source.title}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  display: 'block'
                }}
              />
            </div>
          </div>
        ) : (
          /* TEXT VIEW CANVAS */
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '28px 24px',
            fontFamily: useSerif ? 'var(--font-serif)' : 'var(--font-sans)',
            color: 'var(--ink)',
            background: '#fffdfa',
            WebkitOverflowScrolling: 'touch',
            ...getFontSizeStyle()
          }}>
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>
              
              {/* Citation Banner */}
              <div style={{
                background: 'var(--paper-soft)',
                borderLeft: '3px solid var(--ochre)',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '24px',
                fontFamily: 'var(--font-sans)',
                fontSize: '12px',
                color: 'var(--muted)'
              }}>
                <strong style={{ color: 'var(--ink)', display: 'block', marginBottom: '2px' }}>Библиографическая ссылка:</strong>
                <p>{source.citation}</p>
                {source.fileUrl && (
                  <div style={{ marginTop: '8px', paddingTop: '6px', borderTop: '1px dashed var(--line)' }}>
                    <button
                      onClick={() => setViewMode('file')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--primary)',
                        fontWeight: 700,
                        fontSize: '11.5px',
                        cursor: 'pointer',
                        padding: 0,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <FileText size={12} />
                      Открыть полный файл первоисточника ({source.fileName}) →
                    </button>
                  </div>
                )}
              </div>

              {/* Continuous or Paginated Page Content */}
              {continuousScroll ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                  {source.pages.map((p, idx) => (
                    <div key={idx} style={{ position: 'relative' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '4px 0',
                        marginBottom: '10px',
                        borderBottom: '1px dashed var(--line)',
                        fontFamily: 'var(--mono)',
                        fontSize: '11px',
                        color: 'var(--muted)'
                      }}>
                        <span>Фрагмент №{idx + 1} (Стр. {typeof p === 'object' && p !== null ? (p as any).num : idx + 1})</span>
                      </div>
                      <div style={{ whiteSpace: 'pre-line' }}>
                        {typeof p === 'object' && p !== null ? (p as any).text : String(p || '')}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ whiteSpace: 'pre-line' }}>
                  {pageText}
                </div>
              )}

            </div>
          </div>
        )}

        {/* Footer Pagination (when in paginated text mode) */}
        {viewMode === 'text' && !continuousScroll && totalPages > 1 && (
          <div style={{
            padding: '12px 20px',
            background: 'var(--surface)',
            borderTop: '1px solid var(--line)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}>
            <button
              onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="btn-ghost"
              style={{
                padding: '6px 14px',
                fontSize: '12.5px',
                cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
                opacity: currentPage === 0 ? 0.35 : 1
              }}
            >
              <ChevronLeft size={16} />
              Назад
            </button>

            <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)', fontFamily: 'var(--mono)' }}>
              Стр. {pageNum} · фрагмент {currentPage + 1} из {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage === totalPages - 1}
              className="btn-ghost"
              style={{
                padding: '6px 14px',
                fontSize: '12.5px',
                cursor: currentPage === totalPages - 1 ? 'not-allowed' : 'pointer',
                opacity: currentPage === totalPages - 1 ? 0.35 : 1
              }}
            >
              Вперёд
              <ChevronRight size={16} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
