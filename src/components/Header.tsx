import React from 'react';
import { BookOpen, Library, Bookmark, Users, GraduationCap, Search } from 'lucide-react';

export type SectionTab = 'disciplines' | 'reader' | 'glossary' | 'teachers' | 'archive';

interface HeaderProps {
  activeTab: SectionTab;
  onSelectTab: (tab: SectionTab) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onSelectTab, onOpenSearch }) => {
  return (
    <header className="app-header-bar">
      <div className="container-app">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          
          {/* Brand mark */}
          <div 
            className="brand-wrapper"
            onClick={() => onSelectTab('disciplines')}
          >
            <div className="brand-psi-badge">
              Ψ
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ 
                  color: '#ffffff', 
                  fontWeight: 800, 
                  fontSize: '17px', 
                  letterSpacing: '0.04em',
                  fontFamily: 'var(--font-serif)'
                }}>
                  ПСИ-КАМПУС · ТФ МГУ
                </span>
                <span style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '2px 7px',
                  borderRadius: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Кафедра
                </span>
              </div>
              <p style={{ color: 'rgba(255, 255, 255, 0.78)', fontSize: '11px', letterSpacing: '0.02em' }}>
                Учебный портал кафедры психологии Филиала МГУ в г. Ташкенте
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav style={{ display: 'none' }} className="desktop-nav-tabs">
            <style>{`
              @media (min-width: 860px) {
                .desktop-nav-tabs {
                  display: flex !important;
                  align-items: center;
                  gap: 6px;
                }
              }
            `}</style>

            <button
              onClick={() => onSelectTab('disciplines')}
              className={`nav-tab-button ${activeTab === 'disciplines' ? 'active' : ''}`}
            >
              <BookOpen size={16} />
              Семинары и курсы
            </button>

            <button
              onClick={() => onSelectTab('reader')}
              className={`nav-tab-button ${activeTab === 'reader' ? 'active' : ''}`}
            >
              <Library size={16} />
              Читальный зал
            </button>

            <button
              onClick={() => onSelectTab('glossary')}
              className={`nav-tab-button ${activeTab === 'glossary' ? 'active' : ''}`}
            >
              <Bookmark size={16} />
              Словарь понятий
            </button>

            <button
              onClick={() => onSelectTab('teachers')}
              className={`nav-tab-button ${activeTab === 'teachers' ? 'active' : ''}`}
            >
              <Users size={16} />
              Преподаватели
            </button>

            <button
              onClick={() => onSelectTab('archive')}
              className={`nav-tab-button ${activeTab === 'archive' ? 'active' : ''}`}
            >
              <GraduationCap size={16} />
              Архив и ВКР
            </button>
          </nav>

          {/* Search trigger button */}
          <div>
            <button
              onClick={onOpenSearch}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#ffffff',
                padding: '7px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              title="Поиск по семинарам, книгам и терминам"
            >
              <Search size={15} />
              <span style={{ display: 'none' }} className="search-label">Поиск</span>
              <style>{`
                @media (min-width: 640px) {
                  .search-label { display: inline !important; }
                }
              `}</style>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
