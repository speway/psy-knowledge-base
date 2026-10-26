import React from 'react';
import { BookOpen, Library, Bookmark, Users, GraduationCap } from 'lucide-react';
import { SectionTab } from './Header';

interface BottomNavProps {
  activeTab: SectionTab;
  onSelectTab: (tab: SectionTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  return (
    <nav className="mobile-bottom-bar">
      <button 
        className={`mobile-nav-btn ${activeTab === 'disciplines' ? 'active' : ''}`}
        onClick={() => onSelectTab('disciplines')}
      >
        <div className="icon-container">
          <BookOpen size={17} />
        </div>
        <span>Семинары</span>
      </button>

      <button 
        className={`mobile-nav-btn ${activeTab === 'reader' ? 'active' : ''}`}
        onClick={() => onSelectTab('reader')}
      >
        <div className="icon-container">
          <Library size={17} />
        </div>
        <span>Читалка</span>
      </button>

      <button 
        className={`mobile-nav-btn ${activeTab === 'glossary' ? 'active' : ''}`}
        onClick={() => onSelectTab('glossary')}
      >
        <div className="icon-container">
          <Bookmark size={17} />
        </div>
        <span>Словарь</span>
      </button>

      <button 
        className={`mobile-nav-btn ${activeTab === 'teachers' ? 'active' : ''}`}
        onClick={() => onSelectTab('teachers')}
      >
        <div className="icon-container">
          <Users size={17} />
        </div>
        <span>Кафедра</span>
      </button>

      <button 
        className={`mobile-nav-btn ${activeTab === 'archive' ? 'active' : ''}`}
        onClick={() => onSelectTab('archive')}
      >
        <div className="icon-container">
          <GraduationCap size={17} />
        </div>
        <span>ВКР</span>
      </button>
    </nav>
  );
};
