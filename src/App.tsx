import React, { useState } from 'react';
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

  const handleOpenReaderBySourceId = (sourceId: string) => {
    const src = READER_SOURCES.find(s => s.id === sourceId) ||
                READER_SOURCES.find(s => s.id.includes(sourceId) || s.title.toLowerCase().includes(sourceId.toLowerCase())) ||
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
      
      {/* Ambient background orbs */}
      <div className="ambient-fx ambient-fx-1" />
      <div className="ambient-fx ambient-fx-2" />
      <div className="ambient-fx ambient-fx-3" />

      {/* Main Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1, paddingTop: '28px' }}>
        <div className="container-app">
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
            />
          )}
        </div>
      </main>

      {/* Refined Academic Footer */}
      <footer style={{
        background: '#ffffff',
        borderTop: '1px solid var(--border)',
        padding: '32px 0 90px',
        marginTop: 'auto',
        position: 'relative',
        zIndex: 10
      }}>
        <div className="container-app">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '680px',
            margin: '0 auto'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #245266 0%, #358682 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '20px',
              fontFamily: 'var(--font-serif)'
            }}>
              Ψ
            </div>

            <p style={{ fontSize: '14px', fontWeight: 800, color: 'var(--blue-deep)', letterSpacing: '0.02em', fontFamily: 'var(--font-serif)' }}>
              Филиал МГУ имени М.В. Ломоносова в городе Ташкенте
            </p>

            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Кафедра психологии · Учебно-методический портал «ПСИ-КАМПУС»<br />
              Официальные программы семинаров, цифровая библиотека первоисточников и научные профили.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', fontSize: '11.5px', color: 'var(--text-muted)', paddingTop: '6px' }}>
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

      {/* Search Modal */}
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
