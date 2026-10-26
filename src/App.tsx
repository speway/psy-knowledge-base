import React, { useState, useEffect } from 'react';
import { Header, SectionTab } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { CoursesView } from './components/CoursesView';
import { LibraryView } from './components/LibraryView';
import { GlossarySection } from './components/GlossarySection';
import { FacultyView } from './components/FacultyView';
import { ArchiveView } from './components/ArchiveView';
import { ReaderModal } from './components/ReaderModal';
import { QuickSearchModal } from './components/QuickSearchModal';
import { READER_SOURCES, ReaderSource } from './data/reader-sources';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SectionTab>('disciplines');
  const [readerSource, setReaderSource] = useState<ReaderSource | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [glossarySearchQuery, setGlossarySearchQuery] = useState('');

  // Global keyboard shortcut for search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenReaderBySourceId = (sourceId: string) => {
    const cleanId = (sourceId || '').trim();
    const normalized = cleanId.toLowerCase().replace(/[-_]/g, '');
    const src = READER_SOURCES.find(s => s.id === cleanId) ||
                READER_SOURCES.find(s => s.id.toLowerCase().replace(/[-_]/g, '') === normalized) ||
                READER_SOURCES.find(s => s.id.toLowerCase().includes(normalized) || normalized.includes(s.id.toLowerCase().replace(/[-_]/g, ''))) ||
                READER_SOURCES.find(s => s.title.toLowerCase().includes(cleanId.toLowerCase())) ||
                READER_SOURCES[0];
    setReaderSource(src);
  };

  const handleNavigateToFaculty = (_facultyId: string) => {
    setActiveTab('teachers');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToCourse = (_courseId: string) => {
    setActiveTab('disciplines');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToTerm = (term: string) => {
    setGlossarySearchQuery(term);
    setActiveTab('glossary');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* Site Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content */}
      <main style={{ flex: 1, paddingTop: '28px' }}>
        <div className="app-container">
          {activeTab === 'disciplines' && (
            <CoursesView
              onOpenReaderBySourceId={handleOpenReaderBySourceId}
              onNavigateToFaculty={handleNavigateToFaculty}
              onNavigateToTerm={handleNavigateToTerm}
            />
          )}

          {activeTab === 'reader' && (
            <LibraryView
              onOpenReader={(src) => setReaderSource(src)}
            />
          )}

          {activeTab === 'glossary' && (
            <GlossarySection
              initialSearchTerm={glossarySearchQuery}
            />
          )}

          {activeTab === 'teachers' && (
            <FacultyView
              onNavigateToCourse={handleNavigateToCourse}
              onOpenReaderBySourceId={handleOpenReaderBySourceId}
            />
          )}

          {activeTab === 'archive' && (
            <ArchiveView
              onNavigateToFaculty={handleNavigateToFaculty}
              onOpenReaderBySourceId={handleOpenReaderBySourceId}
            />
          )}
        </div>
      </main>

      {/* Academic Editorial Footer */}
      <footer style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--line)',
        padding: '40px 0 95px',
        marginTop: 'auto'
      }}>
        <div className="app-container">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '720px',
            margin: '0 auto'
          }}>
            <div className="brand-mark" style={{ width: '42px', height: '42px', fontSize: '24px' }}>
              Ψ
            </div>

            <p style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ink)', letterSpacing: '0.01em' }}>
              Филиал Московского государственного университета имени М.В. Ломоносова в городе Ташкенте
            </p>

            <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.55 }}>
              Кафедра психологии · Учебно-методический портал «Психология · ТФ МГУ»<br />
              Единая база знаний: оцифрованные семинары, читальный зал первоисточников и научные профили преподавателей.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', fontSize: '12px', color: 'var(--muted-light)', paddingTop: '10px', borderTop: '1px solid var(--line)' }}>
              <span>Система ИСТИНА МГУ</span>
              <span>•</span>
              <span>ГОСТ 7.0.5–2008</span>
              <span>•</span>
              <span>Учебный год 2025/2026</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Navigation */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Reader Modal */}
      <ReaderModal
        source={readerSource}
        onClose={() => setReaderSource(null)}
      />

      {/* Quick Search Modal */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTab={(tab) => {
          if (tab === 'courses') setActiveTab('disciplines');
          else if (tab === 'library') setActiveTab('reader');
          else if (tab === 'faculty') setActiveTab('teachers');
          else if (tab === 'student-guide') setActiveTab('archive');
          else setActiveTab('glossary');
        }}
        onOpenReader={(src) => setReaderSource(src)}
        onSelectCourse={(_id) => setActiveTab('disciplines')}
        onSelectTerm={(term) => {
          setGlossarySearchQuery(term);
          setActiveTab('glossary');
        }}
      />
    </div>
  );
};
