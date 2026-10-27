import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  FileEdit,
  ArrowRight
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
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  const dialogRef = useRef<HTMLDivElement>(null);
  const initialFocusRef = useRef<HTMLButtonElement>(null);

  // Track viewport width for responsive PDF fallback
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dynamic modal layer: handles Escape isolation, focus trap, and layer ordering
  const { zIndex } = useModalLayer({
    id: 'reader-modal',
    isOpen: Boolean(source),
    onClose,
    dialogRef,
    initialFocusRef
  });

  // Reset page and mode when source changes
  useEffect(() => {
    setCurrentPage(0);
    // On desktop, default to file view if fileUrl is available; on mobile, default to file view only if pages are sparse
    setViewMode(source?.fileUrl ? 'file' : 'text');
  }, [source?.id, source?.fileUrl]);

  if (!source) return null;

  // Resolve file URL for offline file:/// vs web https://
  const resolvedFileUrl = (() => {
    if (!source.fileUrl) return '';
    if (typeof window !== 'undefined' && window.location.protocol === 'file:' && source.fileName) {
      return source.fileName;
    }
    return source.fileUrl;
  })();

  const safeFileUrl = (() => {
    if (!resolvedFileUrl) return '';
    try {
      return encodeURI(resolvedFileUrl);
    } catch (_) {
      return resolvedFileUrl;
    }
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

  const matchedCard = findUnderstandingCard(source.understandingCardId || source.id);

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="modal-overlay-responsive"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(35, 22, 50, 0.78)',
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
          maxWidth: '940px',
          height: '92vh',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          background: '#fffdfa',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 24px 64px rgba(25, 12, 38, 0.4)',
          overflow: 'hidden'
        }}
      >
        
        {/* Top Header: 2-Tier Responsive Layout */}
        <div 
          className="modal-header-responsive"
          style={{
            padding: '12px 18px',
            background: 'var(--ink)',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            flexShrink: 0
          }}
        >
          {/* Tier 1: Title, Author, Badges & Close Button */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '12px',
            width: '100%'
          }}>
            <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px', flexWrap: 'wrap' }}>
                <span style={{ 
                  fontSize: '11px', 
                  color: 'var(--ochre-border)', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em', 
                  fontWeight: 700, 
                  fontFamily: 'var(--mono)',
                  whiteSpace: 'nowrap'
                }}>
                  {source.author} {source.year ? `(${source.year})` : ''}
                </span>

                {source.fileSize && (
                  <span style={{
                    fontSize: '10px',
                    background: 'rgba(255, 255, 255, 0.16)',
                    color: '#ffffff',
                    padding: '1px 6px',
                    borderRadius: '4px',
                    fontFamily: 'var(--mono)',
                    whiteSpace: 'nowrap'
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
                  color: '#ffffff',
                  margin: 0,
                  lineHeight: 1.3,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}
                title={source.title}
              >
                {source.title}
              </h3>
            </div>

            {/* Always-accessible Close [X] button */}
            <button
              ref={initialFocusRef}
              onClick={onClose}
              aria-label="Закрыть окно ридера"
              style={{
                background: 'rgba(255, 255, 255, 0.18)',
                border: 'none',
                color: '#ffffff',
                width: '34px',
                height: '34px',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'background-color 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.28)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)'}
              title="Закрыть (ESC)"
            >
              <X size={18} />
            </button>
          </div>

          {/* Tier 2: Action Toolbar (Wrap-enabled for mobile) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            flexWrap: 'wrap',
            width: '100%',
            paddingTop: '6px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            {/* View Mode Toggle: Conspectus vs Full File */}
            <div style={{
              display: 'inline-flex',
              background: 'rgba(255, 255, 255, 0.12)',
              borderRadius: 'var(--radius-full)',
              padding: '2px',
              gap: '2px'
            }}>
              <button
                onClick={() => setViewMode('text')}
                style={{
                  background: viewMode === 'text' ? 'var(--primary)' : 'transparent',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  padding: '4px 10px',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'background-color 0.15s ease'
                }}
              >
                <BookOpen size={12} />
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
                    padding: '4px 10px',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'background-color 0.15s ease'
                  }}
                >
                  <FileText size={12} />
                  <span>Полный файл</span>
                </button>
              )}
            </div>

            {/* Understanding Card button */}
            {matchedCard && onOpenUnderstandingCard && (
              <button
                onClick={() => onOpenUnderstandingCard(matchedCard.id)}
                style={{
                  background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  padding: '4px 10px',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 2px 6px rgba(217, 119, 6, 0.4)',
                  transition: 'all 0.15s ease'
                }}
                title="Открыть Карточку понимания"
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
              >
                <Sparkles size={11} color="#fef3c7" />
                <span>Карточка</span>
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
                  padding: '4px 10px',
                  fontSize: '11px',
                  fontWeight: 700,
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
                <FileEdit size={11} color="#ffffff" />
                <span>Черновик</span>
              </button>
            )}

            {/* Contextual Guide button */}
            {onOpenContextualGuide && (
              <button
                onClick={() => onOpenContextualGuide('guide-how-to-do-research')}
                style={{
                  background: 'rgba(255, 255, 255, 0.14)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  padding: '4px 9px',
                  fontSize: '11px',
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
                <Compass size={11} />
                <span>Гайд ВКР</span>
              </button>
            )}

            {/* Quick Text Formatting Actions (Visible in text mode) */}
            {viewMode === 'text' && (
              <>
                {/* Font Size Toggle */}
                <div style={{ display: 'inline-flex', background: 'rgba(255, 255, 255, 0.12)', borderRadius: '6px', padding: '1px', gap: '1px' }}>
                  <button
                    onClick={() => setFontSize(f => f === 'lg' ? 'md' : 'sm')}
                    style={{
                      background: fontSize === 'sm' ? 'rgba(255, 255, 255, 0.25)' : 'none',
                      border: 'none',
                      color: '#ffffff',
                      padding: '3px 6px',
                      fontSize: '10.5px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      borderRadius: '4px'
                    }}
                    title="Уменьшить шрифт"
                  >
                    A-
                  </button>
                  <button
                    onClick={() => setFontSize(f => f === 'sm' ? 'md' : 'lg')}
                    style={{
                      background: fontSize === 'lg' ? 'rgba(255, 255, 255, 0.25)' : 'none',
                      border: 'none',
                      color: '#ffffff',
                      padding: '3px 6px',
                      fontSize: '11px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      borderRadius: '4px'
                    }}
                    title="Увеличить шрифт"
                  >
                    A+
                  </button>
                </div>

                {/* Serif Toggle */}
                <button
                  onClick={() => setUseSerif(s => !s)}
                  style={{
                    background: useSerif ? 'rgba(184, 59, 28, 0.45)' : 'rgba(255, 255, 255, 0.12)',
                    border: 'none',
                    color: '#ffffff',
                    padding: '4px 7px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  title="Переключить шрифт (с засечками / без)"
                >
                  <Type size={12} />
                </button>

                {/* Continuous Scroll Toggle */}
                {totalPages > 1 && (
                  <button
                    onClick={() => setContinuousScroll(c => !c)}
                    style={{
                      background: continuousScroll ? 'rgba(75, 50, 104, 0.85)' : 'rgba(255, 255, 255, 0.12)',
                      border: 'none',
                      color: '#ffffff',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    title={continuousScroll ? "Постраничный режим" : "Сплошной свиток"}
                  >
                    <ListFilter size={12} />
                    <span>{continuousScroll ? 'Постранично' : 'Весь текст'}</span>
                  </button>
                )}
              </>
            )}

            {/* Direct File Action on Desktop / Mobile */}
            {source.fileUrl && (
              <>
                <button
                  onClick={() => window.open(safeFileUrl, '_blank')}
                  style={{
                    background: 'rgba(255, 255, 255, 0.14)',
                    border: 'none',
                    color: '#ffffff',
                    padding: '4px 9px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  title="Открыть полный PDF во весь экран"
                >
                  <ExternalLink size={12} />
                  <span>Вкладка</span>
                </button>

                <a
                  href={safeFileUrl}
                  download={source.fileName || true}
                  style={{
                    background: 'rgba(255, 255, 255, 0.14)',
                    border: 'none',
                    color: '#ffffff',
                    padding: '4px 9px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    textDecoration: 'none'
                  }}
                  title="Скачать файл первоисточника на устройство"
                >
                  <Download size={12} />
                  <span>Скачать</span>
                </a>
              </>
            )}

            {/* Copy Citation */}
            <button
              onClick={handleCopyCitation}
              style={{
                background: copied ? 'var(--teal)' : 'rgba(255, 255, 255, 0.12)',
                border: 'none',
                color: '#ffffff',
                padding: '4px 9px',
                borderRadius: '6px',
                fontSize: '11px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.15s ease',
                marginLeft: 'auto'
              }}
              title="Скопировать ГОСТ-ссылку"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              <span>{copied ? 'Скопировано' : 'ГОСТ'}</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        {viewMode === 'file' && source.fileUrl ? (
          isMobile ? (
            /* Dedicated Mobile Document Screen (Bypasses broken mobile Chrome iframe plugin) */
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px 14px',
              background: 'var(--paper-soft)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxSizing: 'border-box'
            }}>
              <div style={{
                background: '#ffffff',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px 18px',
                maxWidth: '420px',
                width: '100%',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                boxSizing: 'border-box',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '16px',
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FileText size={28} />
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {source.category || 'Первоисточник'}
                    </span>
                    {source.fileSize && (
                      <span style={{ fontSize: '10.5px', background: 'var(--paper)', border: '1px solid var(--line)', color: 'var(--muted)', padding: '1px 6px', borderRadius: '4px' }}>
                        {source.fileSize}
                      </span>
                    )}
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 6px', lineHeight: 1.35 }}>
                    {source.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0, fontWeight: 600 }}>
                    {source.author} {source.year ? `(${source.year})` : ''}
                  </p>
                </div>

                {/* Mobile Document Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
                  <button
                    onClick={() => window.open(safeFileUrl, '_blank')}
                    style={{
                      width: '100%',
                      background: 'var(--primary)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: 'var(--radius-md)',
                      padding: '12px 16px',
                      fontSize: '14px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 12px rgba(75, 50, 104, 0.25)',
                      transition: 'background-color 0.15s ease'
                    }}
                  >
                    <ExternalLink size={16} />
                    <span>Читать полный PDF</span>
                  </button>

                  <a
                    href={safeFileUrl}
                    download={source.fileName || true}
                    style={{
                      width: '100%',
                      background: 'var(--surface)',
                      color: 'var(--ink)',
                      border: '1px solid var(--line-strong)',
                      borderRadius: 'var(--radius-md)',
                      padding: '11px 16px',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      textDecoration: 'none',
                      boxSizing: 'border-box'
                    }}
                  >
                    <Download size={15} />
                    <span>Скачать файл ({source.fileSize || 'PDF'})</span>
                  </a>

                  <button
                    onClick={() => setViewMode('text')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--muted)',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      padding: '6px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <BookOpen size={14} />
                    <span>Перейти к текстовому конспекту</span>
                  </button>
                </div>

                <div style={{
                  fontSize: '11.5px',
                  color: 'var(--muted)',
                  lineHeight: 1.45,
                  background: 'var(--paper)',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px dashed var(--line)'
                }}>
                  💡 Полный PDF открывается в нативном просмотрщике браузера телефона с поддержкой масштабирования, поиска и быстрого перехода.
                </div>
              </div>
            </div>
          ) : (
            /* Desktop Embedded Frame View */
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, overflow: 'hidden' }}>
                  <FileText size={15} color="var(--primary)" style={{ flexShrink: 0 }} />
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <strong>Файл первоисточника:</strong> {source.fileName}
                  </span>
                  {source.fileSize && <span className="pill pill-neutral" style={{ flexShrink: 0 }}>{source.fileSize}</span>}
                </div>

                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  <a
                    href={safeFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                    style={{ padding: '4px 10px', fontSize: '11.5px', textDecoration: 'none' }}
                  >
                    <ExternalLink size={12} />
                    Открыть в новой вкладке
                  </a>
                  <a
                    href={safeFileUrl}
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
                  src={`${safeFileUrl}#toolbar=1&navpanes=0`}
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
          )
        ) : (
          /* TEXT VIEW CANVAS */
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px 20px',
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
                <p style={{ margin: '0 0 6px' }}>{source.citation}</p>
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
                      <span>Открыть полный файл первоисточника ({source.fileName || 'PDF'})</span>
                      <ArrowRight size={12} />
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
            padding: '10px 16px',
            background: 'var(--surface)',
            borderTop: '1px solid var(--line)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexShrink: 0
          }}>
            <button
              onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="btn-ghost"
              style={{
                padding: '6px 12px',
                fontSize: '12px',
                cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
                opacity: currentPage === 0 ? 0.35 : 1
              }}
            >
              <ChevronLeft size={15} />
              Назад
            </button>

            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink)', fontFamily: 'var(--mono)' }}>
              Стр. {pageNum} · {currentPage + 1}/{totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage === totalPages - 1}
              className="btn-ghost"
              style={{
                padding: '6px 12px',
                fontSize: '12px',
                cursor: currentPage === totalPages - 1 ? 'not-allowed' : 'pointer',
                opacity: currentPage === totalPages - 1 ? 0.35 : 1
              }}
            >
              Вперёд
              <ChevronRight size={15} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
