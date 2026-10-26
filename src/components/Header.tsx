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
    <header className="site-header">
      <div className="app-container" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        
        {/* Brand mark (styled after psy-case-trainer) */}
        <div 
          className="brand"
          onClick={() => onSelectTab('disciplines')}
        >
          <span className="brand-mark">Ψ</span>
          <span>
            <b>ПСИ-КАМПУС · ТФ МГУ</b>
            <small>УЧЕБНЫЙ ПОРТАЛ КАФЕДРЫ ПСИХОЛОГИИ</small>
          </span>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="header-nav">
          <button
            onClick={() => onSelectTab('disciplines')}
            className={`header-nav-btn ${activeTab === 'disciplines' ? 'active' : ''}`}
          >
            <BookOpen size={15} />
            Семинары и курсы
          </button>

          <button
            onClick={() => onSelectTab('reader')}
            className={`header-nav-btn ${activeTab === 'reader' ? 'active' : ''}`}
          >
            <Library size={15} />
            Читальный зал
          </button>

          <button
            onClick={() => onSelectTab('glossary')}
            className={`header-nav-btn ${activeTab === 'glossary' ? 'active' : ''}`}
          >
            <Bookmark size={15} />
            Словарь понятий
          </button>

          <button
            onClick={() => onSelectTab('teachers')}
            className={`header-nav-btn ${activeTab === 'teachers' ? 'active' : ''}`}
          >
            <Users size={15} />
            Преподаватели
          </button>

          <button
            onClick={() => onSelectTab('archive')}
            className={`header-nav-btn ${activeTab === 'archive' ? 'active' : ''}`}
          >
            <GraduationCap size={15} />
            Архив и ВКР
          </button>
        </nav>

        {/* Search trigger button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={onOpenSearch}
            className="btn-ghost"
            style={{ borderRadius: 'var(--radius-full)', padding: '7px 14px', fontSize: '12px' }}
            title="Поиск по порталу"
          >
            <Search size={14} color="var(--ochre)" />
            <span style={{ display: 'none' }} className="search-text-desktop">Поиск</span>
            <style>{`
              @media (min-width: 640px) {
                .search-text-desktop { display: inline !important; }
              }
            `}</style>
          </button>
        </div>

      </div>
    </header>
  );
};
