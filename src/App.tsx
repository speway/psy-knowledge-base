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
import { UnderstandingCardModal } from './components/UnderstandingCardModal';
import { ContextualGuideModal } from './components/ContextualGuideModal';
import { READER_SOURCES, ReaderSource } from './data/reader-sources';
import { UnderstandingCard, UNDERSTANDING_CARDS, findUnderstandingCard } from './data/understanding-cards';
import { ContextualGuide, CONTEXTUAL_GUIDES, findContextualGuide } from './data/contextual-guides';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SectionTab>('disciplines');
  const [readerSource, setReaderSource] = useState<ReaderSource | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [glossarySearchQuery, setGlossarySearchQuery] = useState('');
  const [selectedFacultyId, setSelectedFacultyId] = useState<string>('tuniyants-a-a');
  
  // Understanding Card & Contextual Guide Modal States
  const [activeUnderstandingCard, setActiveUnderstandingCard] = useState<UnderstandingCard | null>(null);
  const [activeContextualGuide, setActiveContextualGuide] = useState<ContextualGuide | null>(null);

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

  const handleOpenUnderstandingCard = (cardOrQuery?: string | UnderstandingCard) => {
    if (typeof cardOrQuery === 'object' && cardOrQuery !== null) {
      setActiveUnderstandingCard(cardOrQuery);
    } else if (typeof cardOrQuery === 'string') {
      const found = findUnderstandingCard(cardOrQuery);
      if (found) setActiveUnderstandingCard(found);
      else setActiveUnderstandingCard(UNDERSTANDING_CARDS[0]);
    } else {
      setActiveUnderstandingCard(UNDERSTANDING_CARDS[0]);
    }
  };

  const handleOpenContextualGuide = (guideOrQuery?: string | ContextualGuide) => {
    if (typeof guideOrQuery === 'object' && guideOrQuery !== null) {
      setActiveContextualGuide(guideOrQuery);
    } else if (typeof guideOrQuery === 'string') {
      const found = findContextualGuide(guideOrQuery);
      if (found) setActiveContextualGuide(found);
      else setActiveContextualGuide(CONTEXTUAL_GUIDES[0]);
    } else {
      setActiveContextualGuide(CONTEXTUAL_GUIDES[0]);
    }
  };

  const handleNavigateToFaculty = (facultyId?: string) => {
    if (facultyId) {
      setSelectedFacultyId(facultyId);
    }
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
              onOpenUnderstandingCard={handleOpenUnderstandingCard}
              onOpenContextualGuide={handleOpenContextualGuide}
            />
          )}

          {activeTab === 'reader' && (
            <LibraryView
              onOpenReader={(src) => setReaderSource(src)}
              onOpenUnderstandingCard={handleOpenUnderstandingCard}
            />
          )}

          {activeTab === 'glossary' && (
            <GlossarySection
              initialSearchTerm={glossarySearchQuery}
            />
          )}

          {activeTab === 'teachers' && (
            <FacultyView
              selectedFacultyId={selectedFacultyId}
              onSelectFaculty={setSelectedFacultyId}
              onNavigateToCourse={handleNavigateToCourse}
              onOpenReaderBySourceId={handleOpenReaderBySourceId}
            />
          )}

          {activeTab === 'archive' && (
            <ArchiveView
              onNavigateToFaculty={handleNavigateToFaculty}
              onOpenReaderBySourceId={handleOpenReaderBySourceId}
              onOpenUnderstandingCard={handleOpenUnderstandingCard}
              onOpenContextualGuide={handleOpenContextualGuide}
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
              Неофициальный учебно-методический портал · База знаний направления «Психология»<br />
              Инициатива Студенческого научного сектора психологии ТФ МГУ при согласовании с кафедрой.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', fontSize: '12px', color: 'var(--muted-light)', paddingTop: '10px', borderTop: '1px solid var(--line)' }}>
              <span>Научный сектор психологии</span>
              <span>•</span>
              <span>Оцифрованная библиотека первоисточников</span>
              <span>•</span>
              <span>Профили преподавателей и семинары</span>
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
        onOpenUnderstandingCard={handleOpenUnderstandingCard}
        onOpenContextualGuide={handleOpenContextualGuide}
      />

      {/* Understanding Card Modal (Pedagogical framework of Prof. T.Y. Bazarov) */}
      <UnderstandingCardModal
        card={activeUnderstandingCard}
        onClose={() => setActiveUnderstandingCard(null)}
        onSelectCard={setActiveUnderstandingCard}
        onOpenReaderBySourceId={handleOpenReaderBySourceId}
      />

      {/* Contextual Study & Research Guide Modal */}
      <ContextualGuideModal
        guide={activeContextualGuide}
        onClose={() => setActiveContextualGuide(null)}
        onSelectGuide={setActiveContextualGuide}
      />

      {/* Quick Search Modal */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTab={(tab) => {
          if (tab === 'courses') setActiveTab('disciplines');
          else if (tab === 'library') setActiveTab('reader');
          else if (tab === 'teachers') setActiveTab('teachers');
          else if (tab === 'student-guide') setActiveTab('archive');
          else setActiveTab('glossary');
        }}
        onSelectFaculty={(facultyId) => {
          setSelectedFacultyId(facultyId);
          setActiveTab('teachers');
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
