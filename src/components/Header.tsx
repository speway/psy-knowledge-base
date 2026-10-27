import React from 'react';
import { Home, BookOpen, Library, Bookmark, Users, GraduationCap, Search } from 'lucide-react';

export type SectionTab = 'home' | 'disciplines' | 'reader' | 'glossary' | 'teachers' | 'archive';

interface HeaderProps {
  activeTab: SectionTab;
  onSelectTab: (tab: SectionTab) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onSelectTab, onOpenSearch }) => {
  return (
    <header className="site-header">
      <div className="app-container" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        
        {/* Academic Brand Identity */}
        <div 
          className="brand"
          onClick={() => onSelectTab('home')}
          title="На главную страницу портала"
          style={{ cursor: 'pointer' }}
        >
          <div className="brand-mark">Ψ</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="brand-title">ПСИХОЛОГИЯ · ТФ МГУ</span>
            <span className="brand-dept">Академический портал кафедры психологии</span>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav style={{ display: 'none' }} className="desktop-nav-container">
          <div className="nav-tab-list">
            <button
              onClick={() => onSelectTab('home')}
              className={`nav-tab-button ${activeTab === 'home' ? 'active' : ''}`}
            >
              <Home size={14} />
              <span>Главная</span>
            </button>

            <button
              onClick={() => onSelectTab('disciplines')}
              className={`nav-tab-button ${activeTab === 'disciplines' ? 'active' : ''}`}
            >
              <BookOpen size={14} />
              <span>Семинары</span>
            </button>

            <button
              onClick={() => onSelectTab('reader')}
              className={`nav-tab-button ${activeTab === 'reader' ? 'active' : ''}`}
            >
              <Library size={14} />
              <span>Библиотека</span>
            </button>

            <button
              onClick={() => onSelectTab('teachers')}
              className={`nav-tab-button ${activeTab === 'teachers' ? 'active' : ''}`}
            >
              <Users size={14} />
              <span>Кафедра</span>
            </button>

            <button
              onClick={() => onSelectTab('glossary')}
              className={`nav-tab-button ${activeTab === 'glossary' ? 'active' : ''}`}
            >
              <Bookmark size={14} />
              <span>Словарь</span>
            </button>

            <button
              onClick={() => onSelectTab('archive')}
              className={`nav-tab-button ${activeTab === 'archive' ? 'active' : ''}`}
            >
              <GraduationCap size={14} />
              <span>Стандарты НИР</span>
            </button>
          </div>
        </nav>

        {/* Search Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={onOpenSearch}
            className="btn-ghost"
            style={{ borderRadius: 'var(--radius-full)', padding: '7px 14px', fontSize: '12px' }}
            title="Поиск по порталу (Ctrl+K)"
          >
            <Search size={14} color="var(--primary)" />
            <span style={{ display: 'none' }} className="search-text-desktop">Поиск</span>
            <kbd style={{
              display: 'none',
              marginLeft: '4px',
              padding: '2px 5px',
              fontSize: '10px',
              fontFamily: 'var(--mono)',
              background: 'var(--paper-soft)',
              borderRadius: '4px',
              border: '1px solid var(--line)'
            }} className="search-kbd-desktop">
              ⌘K
            </kbd>
          </button>
        </div>

        <style>{`
          @media (min-width: 860px) {
            .desktop-nav-container { display: flex !important; }
            .search-text-desktop { display: inline !important; }
            .search-kbd-desktop { display: inline !important; }
          }
        `}</style>

      </div>
    </header>
  );
};
