import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Copy, Check, Type } from 'lucide-react';
import { ReaderSource } from '../data/reader-sources';

interface ReaderModalProps {
  source: ReaderSource | null;
  onClose: () => void;
}

export const ReaderModal: React.FC<ReaderModalProps> = ({ source, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [useSerif, setUseSerif] = useState(true);
  const [copied, setCopied] = useState(false);

  if (!source) return null;

  const totalPages = source.pages.length;
  const currentPageObj = source.pages[currentPage];
  const pageNum = typeof currentPageObj === 'object' && currentPageObj !== null ? (currentPageObj as any).num : currentPage + 1;
  const pageText = typeof currentPageObj === 'object' && currentPageObj !== null ? (currentPageObj as any).text : String(currentPageObj || '');

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(source.citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getFontSizeStyle = () => {
    if (fontSize === 'sm') return { fontSize: '14px', lineHeight: 1.65 };
    if (fontSize === 'lg') return { fontSize: '18px', lineHeight: 1.75 };
    return { fontSize: '16px', lineHeight: 1.7 };
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(16, 32, 28, 0.72)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 200,
      padding: '12px'
    }}>
      <div 
        className="paper-card"
        style={{
          width: '100%',
          maxWidth: '860px',
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
        <div style={{
          padding: '14px 20px',
          background: 'var(--ink)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          <div style={{ overflow: 'hidden' }}>
            <span style={{ fontSize: '11px', color: 'var(--ochre)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, fontFamily: 'var(--mono)' }}>
              {source.author} ({source.year})
            </span>
            <h3 style={{ 
              fontSize: '15px', 
              fontWeight: 700, 
              whiteSpace: 'nowrap', 
              overflow: 'hidden', 
              textOverflow: 'ellipsis',
              maxWidth: '380px'
            }}>
              {source.title}
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {/* Font Size Toggle */}
            <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.12)', borderRadius: '6px', padding: '2px' }}>
              <button
                onClick={() => setFontSize(f => f === 'lg' ? 'md' : 'sm')}
                style={{ background: 'none', border: 'none', color: '#ffffff', padding: '4px 8px', fontSize: '11px', cursor: 'pointer', fontWeight: fontSize === 'sm' ? 800 : 400 }}
              >
                A-
              </button>
              <button
                onClick={() => setFontSize(f => f === 'sm' ? 'md' : 'lg')}
                style={{ background: 'none', border: 'none', color: '#ffffff', padding: '4px 8px', fontSize: '13px', cursor: 'pointer', fontWeight: fontSize === 'lg' ? 800 : 400 }}
              >
                A+
              </button>
            </div>

            {/* Serif Toggle */}
            <button
              onClick={() => setUseSerif(s => !s)}
              style={{
                background: useSerif ? 'rgba(199, 75, 53, 0.35)' : 'rgba(255, 255, 255, 0.12)',
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
              title="Переключить шрифт"
            >
              <Type size={13} />
            </button>

            {/* Copy Citation */}
            <button
              onClick={handleCopyCitation}
              style={{
                background: copied ? '#2f6250' : 'rgba(255, 255, 255, 0.12)',
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
              title="Скопировать ссылку по ГОСТ"
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              <span style={{ display: 'none' }} className="gost-label">{copied ? 'Скопировано' : 'ГОСТ'}</span>
              <style>{`
                @media (min-width: 640px) {
                  .gost-label { display: inline !important; }
                }
              `}</style>
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.18)',
                border: 'none',
                color: '#ffffff',
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Reading Canvas */}
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
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            
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
              <strong style={{ color: 'var(--ink)' }}>Библиографическое описание (ГОСТ 7.0.5–2008):</strong>
              <p style={{ marginTop: '3px' }}>{source.citation}</p>
            </div>

            {/* Page content */}
            <div style={{ whiteSpace: 'pre-line' }}>
              {pageText}
            </div>

          </div>
        </div>

        {/* Footer Pagination */}
        <div style={{
          padding: '12px 20px',
          background: 'var(--surface)',
          borderTop: '1px solid var(--line-soft)',
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

      </div>
    </div>
  );
};
