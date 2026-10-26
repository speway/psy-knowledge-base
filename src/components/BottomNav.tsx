import React from 'react';
import { BookOpen, Library, Bookmark, Users, GraduationCap } from 'lucide-react';
import { SectionTab } from './Header';

interface BottomNavProps {
  activeTab: SectionTab;
  onSelectTab: (tab: SectionTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  return (
    <nav className="mobile-nav-bar">
      <button 
        className={`mobile-nav-item ${activeTab === 'disciplines' ? 'active' : ''}`}
        onClick={() => onSelectTab('disciplines')}
      >
        <div className="icon-box">
          <BookOpen size={18} />
        </div>
        <span>Семинары</span>
      </button>

      <button 
        className={`mobile-nav-item ${activeTab === 'reader' ? 'active' : ''}`}
        onClick={() => onSelectTab('reader')}
      >
        <div className="icon-box">
          <Library size={18} />
        </div>
        <span>Читалка</span>
      </button>

      <button 
        className={`mobile-nav-item ${activeTab === 'glossary' ? 'active' : ''}`}
        onClick={() => onSelectTab('glossary')}
      >
        <div className="icon-box">
          <Bookmark size={18} />
        </div>
        <span>Словарь</span>
      </button>

      <button 
        className={`mobile-nav-item ${activeTab === 'teachers' ? 'active' : ''}`}
        onClick={() => onSelectTab('teachers')}
      >
        <div className="icon-box">
          <Users size={18} />
        </div>
        <span>Профили</span>
      </button>

      <button 
        className={`mobile-nav-item ${activeTab === 'archive' ? 'active' : ''}`}
        onClick={() => onSelectTab('archive')}
      >
        <div className="icon-box">
          <GraduationCap size={18} />
        </div>
        <span>ВКР</span>
      </button>
    </nav>
  );
};
