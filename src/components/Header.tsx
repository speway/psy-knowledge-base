import React from 'react';
import { Search, GraduationCap, BookOpen, Users, Bookmark, FileText } from 'lucide-react';

export type NavTab = 'faculty' | 'courses' | 'library' | 'glossary' | 'student-guide';

interface HeaderProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onSelectTab, onOpenSearch }) => {
  return (
    <header className="app-header">
      <div className="container-custom">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px', gap: '16px' }}>
          
          {/* Logo & Brand */}
          <div 
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', textDecoration: 'none' }}
            onClick={() => onSelectTab('faculty')}
          >
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #c99736 0%, #9a6b18 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '22px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
              fontFamily: 'var(--font-brand)',
              flexShrink: 0
            }}>
              Ψ
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ 
                  fontFamily: 'var(--font-brand)', 
                  fontWeight: 700, 
                  fontSize: '17px', 
                  letterSpacing: '0.04em',
                  color: '#ffffff'
                }}>
                  МГУ · ТАШКЕНТ
                </span>
                <span style={{ 
                  background: 'rgba(201, 151, 54, 0.25)', 
                  color: '#dfb15b', 
                  fontSize: '10px', 
                  fontWeight: 700, 
                  padding: '2px 6px', 
                  borderRadius: '4px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  База знаний
                </span>
              </div>
              <p style={{ 
                fontSize: '11px', 
                color: '#94a3b8', 
                whiteSpace: 'nowrap', 
                overflow: 'hidden', 
                textOverflow: 'ellipsis',
                maxWidth: '240px'
              }}>
                Кафедра психологии филиала
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav style={{ display: 'none' }} className="desktop-nav">
            <style>{`
              @media (min-width: 860px) {
                .desktop-nav {
                  display: flex !important;
                  align-items: center;
                  gap: 4px;
                }
              }
            `}</style>
            
            <button
              onClick={() => onSelectTab('faculty')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                background: activeTab === 'faculty' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                color: activeTab === 'faculty' ? '#ffffff' : '#cbd5e1',
                border: 'none',
                fontWeight: activeTab === 'faculty' ? 600 : 500,
                fontSize: '13.5px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <Users size={16} color={activeTab === 'faculty' ? '#dfb15b' : 'currentColor'} />
              Преподаватели
            </button>

            <button
              onClick={() => onSelectTab('courses')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                background: activeTab === 'courses' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                color: activeTab === 'courses' ? '#ffffff' : '#cbd5e1',
                border: 'none',
                fontWeight: activeTab === 'courses' ? 600 : 500,
                fontSize: '13.5px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <BookOpen size={16} color={activeTab === 'courses' ? '#dfb15b' : 'currentColor'} />
              Дисциплины
            </button>

            <button
              onClick={() => onSelectTab('library')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                background: activeTab === 'library' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                color: activeTab === 'library' ? '#ffffff' : '#cbd5e1',
                border: 'none',
                fontWeight: activeTab === 'library' ? 600 : 500,
                fontSize: '13.5px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <GraduationCap size={16} color={activeTab === 'library' ? '#dfb15b' : 'currentColor'} />
              Библиотека
            </button>

            <button
              onClick={() => onSelectTab('glossary')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                background: activeTab === 'glossary' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                color: activeTab === 'glossary' ? '#ffffff' : '#cbd5e1',
                border: 'none',
                fontWeight: activeTab === 'glossary' ? 600 : 500,
                fontSize: '13.5px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <Bookmark size={16} color={activeTab === 'glossary' ? '#dfb15b' : 'currentColor'} />
              Лексикон
            </button>

            <button
              onClick={() => onSelectTab('student-guide')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                background: activeTab === 'student-guide' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                color: activeTab === 'student-guide' ? '#ffffff' : '#cbd5e1',
                border: 'none',
                fontWeight: activeTab === 'student-guide' ? 600 : 500,
                fontSize: '13.5px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <FileText size={16} color={activeTab === 'student-guide' ? '#dfb15b' : 'currentColor'} />
              Студентам
            </button>
          </nav>

          {/* Quick Search Action */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={onOpenSearch}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#e2e8f0',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              title="Поиск по базе знаний"
            >
              <Search size={16} color="#dfb15b" />
              <span style={{ display: 'none' }} className="search-text">Поиск...</span>
              <style>{`
                @media (min-width: 640px) {
                  .search-text { display: inline !important; }
                }
              `}</style>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
