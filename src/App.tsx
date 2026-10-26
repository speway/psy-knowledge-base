import React, { useState } from 'react';
import { Header, NavTab } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { FacultyView } from './components/FacultyView';
import { CoursesView } from './components/CoursesView';
import { LibraryView } from './components/LibraryView';
import { GlossarySection } from './components/GlossarySection';
import { StudentGuideView } from './components/StudentGuideView';
import { ReaderModal } from './components/ReaderModal';
import { QuickSearchModal } from './components/QuickSearchModal';
import { READER_SOURCES, ReaderSource } from './data/reader-sources';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('courses');
  const [activeCourseId, setActiveCourseId] = useState<string>('motivation-emotion');
  const [readerSource, setReaderSource] = useState<ReaderSource | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [glossaryInitialQuery, setGlossaryInitialQuery] = useState('');

  const handleOpenReaderBySourceId = (sourceId: string) => {
    const src = READER_SOURCES.find(s => s.id === sourceId);
    if (src) {
      setReaderSource(src);
    } else {
      // Fallback: match by title or open first source
      const fallback = READER_SOURCES.find(s => s.id.includes(sourceId) || s.title.toLowerCase().includes(sourceId.toLowerCase())) || READER_SOURCES[0];
      setReaderSource(fallback);
    }
  };

  const handleNavigateToFaculty = (_facultyId: string) => {
    setActiveTab('faculty');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToCourse = (courseId: string) => {
    setActiveCourseId(courseId);
    setActiveTab('courses');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToTerm = (term: string) => {
    setGlossaryInitialQuery(term);
    setActiveTab('glossary');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1, paddingTop: '24px' }}>
        <div className="container-custom">
          {activeTab === 'faculty' && (
            <FacultyView
              onNavigateToCourse={handleNavigateToCourse}
              onOpenReaderBySourceId={handleOpenReaderBySourceId}
            />
          )}

          {activeTab === 'courses' && (
            <CoursesView
              initialCourseId={activeCourseId}
              onOpenReaderBySourceId={handleOpenReaderBySourceId}
              onNavigateToFaculty={handleNavigateToFaculty}
              onNavigateToTerm={handleNavigateToTerm}
            />
          )}

          {activeTab === 'library' && (
            <LibraryView
              onOpenReader={(src) => setReaderSource(src)}
            />
          )}

          {activeTab === 'glossary' && (
            <GlossarySection
              initialSearchTerm={glossaryInitialQuery}
            />
          )}

          {activeTab === 'student-guide' && (
            <StudentGuideView
              onNavigateToFaculty={handleNavigateToFaculty}
            />
          )}
        </div>
      </main>

      {/* Modern Academic Footer */}
      <footer style={{
        background: 'var(--msu-blue-deep)',
        color: '#ffffff',
        borderTop: '2px solid var(--msu-gold)',
        padding: '32px 0 90px',
        marginTop: 'auto'
      }}>
        <div className="container-custom">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '720px',
            margin: '0 auto'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #c99736 0%, #9a6b18 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '18px',
              fontFamily: 'var(--font-brand)'
            }}>
              Ψ
            </div>

            <p style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.02em', color: '#ffffff' }}>
              Филиал Московского государственного университета имени М.В. Ломоносова в городе Ташкенте
            </p>

            <p style={{ fontSize: '12.5px', color: '#94a3b8', lineHeight: 1.5 }}>
              Факультет психологии · Академическая база знаний кафедры психологии<br />
              Официальная платформа оцифровки учебных дисциплин, хрестоматий и научных профилей преподавателей.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', fontSize: '12px', color: '#cbd5e1', paddingTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <span>Система ИСТИНА МГУ</span>
              <span>•</span>
              <span>ГОСТ 7.0.5–2008</span>
              <span>•</span>
              <span>Ташкент, 2026</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Full-featured Reading Modal */}
      <ReaderModal
        source={readerSource}
        onClose={() => setReaderSource(null)}
      />

      {/* Global Quick Search Modal */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTab={setActiveTab}
        onOpenReader={(src) => setReaderSource(src)}
        onSelectCourse={(id) => {
          setActiveCourseId(id);
          setActiveTab('courses');
        }}
        onSelectTerm={(term) => {
          setGlossaryInitialQuery(term);
          setActiveTab('glossary');
        }}
      />

    </div>
  );
};
