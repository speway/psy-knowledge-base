import React from 'react';
import { Home, BookOpen, Library, Bookmark, Users, GraduationCap } from 'lucide-react';
import { SectionTab } from './Header';

interface BottomNavProps {
  activeTab: SectionTab;
  onSelectTab: (tab: SectionTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  return (
    <nav className="mobile-bottom-nav">
      <button 
        className={`mobile-nav-item ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => onSelectTab('home')}
      >
        <Home size={17} />
        <span>Главная</span>
      </button>

      <button 
        className={`mobile-nav-item ${activeTab === 'disciplines' ? 'active' : ''}`}
        onClick={() => onSelectTab('disciplines')}
      >
        <BookOpen size={17} />
        <span>Семинары</span>
      </button>

      <button 
        className={`mobile-nav-item ${activeTab === 'reader' ? 'active' : ''}`}
        onClick={() => onSelectTab('reader')}
      >
        <Library size={17} />
        <span>Книги</span>
      </button>

      <button 
        className={`mobile-nav-item ${activeTab === 'teachers' ? 'active' : ''}`}
        onClick={() => onSelectTab('teachers')}
      >
        <Users size={17} />
        <span>Кафедра</span>
      </button>

      <button 
        className={`mobile-nav-item ${activeTab === 'glossary' ? 'active' : ''}`}
        onClick={() => onSelectTab('glossary')}
      >
        <Bookmark size={17} />
        <span>Словарь</span>
      </button>

      <button 
        className={`mobile-nav-item ${activeTab === 'archive' ? 'active' : ''}`}
        onClick={() => onSelectTab('archive')}
      >
        <GraduationCap size={17} />
        <span>НИР</span>
      </button>
    </nav>
  );
};
