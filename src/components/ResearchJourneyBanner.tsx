import React from 'react';
import { Sparkles, ArrowRight, FileEdit, Layers } from 'lucide-react';

interface ResearchJourneyBannerProps {
  onOpenBazarovCard: () => void;
  onOpenAllCards: () => void;
  onOpenResearchGuide: () => void;
  onOpenResearchDraft?: () => void;
}

export const ResearchJourneyBanner: React.FC<ResearchJourneyBannerProps> = ({
  onOpenBazarovCard,
  onOpenAllCards,
  onOpenResearchDraft
}) => {
  return (
    <div 
      className="paper-card animate-fade-in"
      style={{
        padding: '22px 24px',
        marginBottom: '22px',
        background: 'linear-gradient(135deg, #2b173e 0%, #3e1c5c 100%)',
        color: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid rgba(245, 158, 11, 0.25)',
        boxShadow: '0 8px 24px rgba(43, 23, 62, 0.18)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Decorative Crest */}
      <div style={{
        position: 'absolute',
        right: '-14px',
        bottom: '-24px',
        fontSize: '120px',
        fontFamily: 'var(--font-serif)',
        color: 'rgba(255, 255, 255, 0.035)',
        userSelect: 'none',
        pointerEvents: 'none'
      }}>
        Ψ
      </div>

      {/* Top Meta Line */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            background: 'rgba(245, 158, 11, 0.2)',
            color: '#fef3c7',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            padding: '2px 9px',
            borderRadius: 'var(--radius-full)',
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.04em',
            fontFamily: 'var(--mono)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            <Sparkles size={11} color="#f59e0b" />
            ПЕДАГОГИЧЕСКИЙ ПРИНЦИП КАФЕДРЫ
          </span>
          <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.72)' }}>
            Филиал МГУ в г. Ташкенте · Направление «Психология»
          </span>
        </div>
      </div>

      {/* Quote */}
      <blockquote style={{
        margin: '0 0 12px 0',
        padding: '0 0 0 14px',
        borderLeft: '3px solid #f59e0b',
        fontSize: '16px',
        lineHeight: 1.45,
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        color: '#fdfbfe'
      }}>
        «Главное — превратить знакомство с текстами в увлекательное путешествие с выходом на собственные исследования»
      </blockquote>

      {/* Author Attribution */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.12)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: 800
        }}>
          ТЮ
        </div>
        <div>
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff' }}>
            Тахир Юсупович Базаров
          </span>
          <span style={{ fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.7)', marginLeft: '6px' }}>
            · заведующий кафедрой психологии филиала МГУ, профессор
          </span>
        </div>
      </div>

      {/* Calm 2-Action Row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px',
        paddingTop: '12px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={onOpenBazarovCard}
            style={{
              background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              padding: '7px 14px',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 10px rgba(217, 119, 6, 0.3)',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
          >
            <Sparkles size={13} />
            <span>Методика «СОКОЛ» (Карточка понимания)</span>
          </button>

          {onOpenResearchDraft && (
            <button
              onClick={onOpenResearchDraft}
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.22)',
                borderRadius: 'var(--radius-sm)',
                padding: '7px 14px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.15s ease'
              }}
              title="Открыть интерактивный Черновик исследования студента"
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'}
            >
              <FileEdit size={13} />
              <span>Черновик исследования</span>
            </button>
          )}
        </div>

        <button
          onClick={onOpenAllCards}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.85)',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            textDecoration: 'underline',
            textUnderlineOffset: '3px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)'}
        >
          <Layers size={12} />
          <span>Все карточки понимания</span>
          <ArrowRight size={11} />
        </button>
      </div>
    </div>
  );
};
