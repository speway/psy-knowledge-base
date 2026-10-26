import React from 'react';
import { Sparkles, Compass, BookOpen, Layers, ArrowRight, Lightbulb } from 'lucide-react';

interface ResearchJourneyBannerProps {
  onOpenBazarovCard: () => void;
  onOpenAllCards: () => void;
  onOpenResearchGuide: () => void;
}

export const ResearchJourneyBanner: React.FC<ResearchJourneyBannerProps> = ({
  onOpenBazarovCard,
  onOpenAllCards,
  onOpenResearchGuide
}) => {
  return (
    <div 
      className="paper-card animate-fade-in"
      style={{
        padding: '24px 26px',
        marginBottom: '24px',
        background: 'linear-gradient(135deg, #2b173e 0%, #431f63 50%, #2f1847 100%)',
        color: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid rgba(245, 158, 11, 0.3)',
        boxShadow: '0 12px 32px rgba(43, 23, 62, 0.25)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Decorative Crest / Watermark */}
      <div style={{
        position: 'absolute',
        right: '-18px',
        bottom: '-28px',
        fontSize: '140px',
        fontFamily: 'var(--font-serif)',
        color: 'rgba(255, 255, 255, 0.04)',
        userSelect: 'none',
        pointerEvents: 'none'
      }}>
        Ψ
      </div>

      {/* Top Badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            background: 'rgba(245, 158, 11, 0.25)',
            color: '#fef3c7',
            border: '1px solid rgba(245, 158, 11, 0.45)',
            padding: '3px 10px',
            borderRadius: 'var(--radius-full)',
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.04em',
            fontFamily: 'var(--mono)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            <Sparkles size={12} color="#f59e0b" />
            ПЕДАГОГИЧЕСКИЙ ПРИНЦИП КАФЕДРЫ
          </span>
          <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.75)' }}>
            Филиал МГУ в г. Ташкенте · Направление «Психология»
          </span>
        </div>

        <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'var(--mono)' }}>
          КАРТОЧКА ПОНИМАНИЯ
        </span>
      </div>

      {/* Quote */}
      <blockquote style={{
        margin: '0 0 14px 0',
        padding: '0 0 0 16px',
        borderLeft: '3px solid #f59e0b',
        fontSize: '17px',
        lineHeight: 1.45,
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        color: '#fdfbfe'
      }}>
        «Главное — превратить знакомство с текстами в увлекательное путешествие с выходом на собственные исследования»
      </blockquote>

      {/* Attribution */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px', flexWrap: 'wrap' }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          fontWeight: 800
        }}>
          ТЮ
        </div>
        <div>
          <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#ffffff' }}>
            Тахир Юсупович Базаров
          </div>
          <div style={{ fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.75)' }}>
            Доктор психологических наук, профессор, заведующий кафедрой психологии филиала МГУ в г. Ташкенте
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        flexWrap: 'wrap',
        paddingTop: '14px',
        borderTop: '1px solid rgba(255, 255, 255, 0.12)'
      }}>
        <button
          onClick={onOpenBazarovCard}
          style={{
            background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            padding: '9px 16px',
            fontSize: '12.5px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 14px rgba(217, 119, 6, 0.35)',
            transition: 'all 0.18s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
        >
          <Sparkles size={14} />
          <span>Методика «СОКОЛ» (Карточка понимания)</span>
        </button>

        <button
          onClick={onOpenAllCards}
          style={{
            background: 'rgba(255, 255, 255, 0.14)',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            borderRadius: 'var(--radius-sm)',
            padding: '9px 14px',
            fontSize: '12.5px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.18s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.22)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.14)'}
        >
          <Layers size={14} />
          <span>Каталог карточек понимания (7)</span>
        </button>

        <button
          onClick={onOpenResearchGuide}
          style={{
            background: 'transparent',
            color: '#fef3c7',
            border: '1px dashed rgba(245, 158, 11, 0.5)',
            borderRadius: 'var(--radius-sm)',
            padding: '9px 14px',
            fontSize: '12.5px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.18s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(245, 158, 11, 0.15)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <Compass size={14} />
          <span>Гайд: от чтения к исследованию</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
};
