import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Copy, Check, Type, BookOpen } from 'lucide-react';
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

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(source.citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getFontSizeStyle = () => {
    if (fontSize === 'sm') return { fontSize: '14px', lineHeight: 1.6 };
    if (fontSize === 'lg') return { fontSize: '18px', lineHeight: 1.7 };
    return { fontSize: '16px', lineHeight: 1.65 };
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(25, 39, 52, 0.72)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 200,
      padding: '12px'
    }}>
      <div 
        className="card-clean"
        style={{
          width: '100%',
          maxWidth: '860px',
          height: '92vh',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          background: '#fffdf9',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          border: '1px solid var(--border)'
        }}
      >
        
        {/* Top Header */}
        <div style={{
          padding: '12px 18px',
          background: 'linear-gradient(115deg, #245266 0%, #358682 60%, #5d487d 100%)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          <div style={{ overflow: 'hidden' }}>
            <span style={{ fontSize: '11px', color: '#c4e8e5', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
              {source.author} ({source.year})
            </span>
            <h3 style={{ 
              fontSize: '14.5px', 
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
            <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '6px', padding: '2px' }}>
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
                background: useSerif ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.15)',
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
                background: copied ? '#10b981' : 'rgba(255, 255, 255, 0.15)',
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
              title="Скопировать ГОСТ ссылку"
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              <span style={{ display: 'none' }} className="gost-label">{copied ? 'Скопировано' : 'ГОСТ'}</span>
              <style>{`
                @media (min-width: 640px) {
                  .gost-label { display: inline !important; }
                }
              `}</style>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: '#ffffff',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
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
          color: '#1a202c',
          background: '#fffdfa',
          WebkitOverflowScrolling: 'touch',
          ...getFontSizeStyle()
        }}>
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            
            {/* Citation Banner */}
            <div style={{
              background: '#f4f8fa',
              borderLeft: '3px solid var(--turq)',
              padding: '10px 14px',
              borderRadius: '4px',
              marginBottom: '24px',
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              color: 'var(--text-secondary)'
            }}>
              <strong>Библиографическое описание (ГОСТ 7.0.5–2008):</strong>
              <p style={{ marginTop: '2px' }}>{source.citation}</p>
            </div>

            {/* Page content */}
            <div style={{ whiteSpace: 'pre-line' }}>
              {source.pages[currentPage]}
            </div>

          </div>
        </div>

        {/* Footer Pagination */}
        <div style={{
          padding: '12px 18px',
          background: '#ffffff',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          <button
            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--blue-deep)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
              opacity: currentPage === 0 ? 0.35 : 1,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <ChevronLeft size={16} />
            Назад
          </button>

          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--blue-deep)' }}>
            Фрагмент {currentPage + 1} из {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage === totalPages - 1}
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--blue-deep)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: currentPage === totalPages - 1 ? 'not-allowed' : 'pointer',
              opacity: currentPage === totalPages - 1 ? 0.35 : 1,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
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
