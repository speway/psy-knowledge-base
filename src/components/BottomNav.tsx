import React from 'react';
import { Users, BookOpen, GraduationCap, Bookmark, FileText } from 'lucide-react';
import { NavTab } from './Header';

interface BottomNavProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  return (
    <nav className="mobile-bottom-nav">
      <button 
        className={`mobile-nav-btn ${activeTab === 'faculty' ? 'active' : ''}`}
        onClick={() => onSelectTab('faculty')}
      >
        <div className="nav-icon-wrapper">
          <Users size={20} />
        </div>
        <span>Кафедра</span>
      </button>

      <button 
        className={`mobile-nav-btn ${activeTab === 'courses' ? 'active' : ''}`}
        onClick={() => onSelectTab('courses')}
      >
        <div className="nav-icon-wrapper">
          <BookOpen size={20} />
        </div>
        <span>Курсы</span>
      </button>

      <button 
        className={`mobile-nav-btn ${activeTab === 'library' ? 'active' : ''}`}
        onClick={() => onSelectTab('library')}
      >
        <div className="nav-icon-wrapper">
          <GraduationCap size={20} />
        </div>
        <span>Читалка</span>
      </button>

      <button 
        className={`mobile-nav-btn ${activeTab === 'glossary' ? 'active' : ''}`}
        onClick={() => onSelectTab('glossary')}
      >
        <div className="nav-icon-wrapper">
          <Bookmark size={20} />
        </div>
        <span>Словарь</span>
      </button>

      <button 
        className={`mobile-nav-btn ${activeTab === 'student-guide' ? 'active' : ''}`}
        onClick={() => onSelectTab('student-guide')}
      >
        <div className="nav-icon-wrapper">
          <FileText size={20} />
        </div>
        <span>ВКР</span>
      </button>
    </nav>
  );
};
