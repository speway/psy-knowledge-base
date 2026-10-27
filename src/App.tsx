import React, { useState, useEffect } from 'react';
import { Header, SectionTab } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { CoursesView } from './components/CoursesView';
import { LibraryView } from './components/LibraryView';
import { GlossarySection } from './components/GlossarySection';
import { FacultyView } from './components/FacultyView';
import { ArchiveView } from './components/ArchiveView';
import { ReaderModal } from './components/ReaderModal';
import { QuickSearchModal } from './components/QuickSearchModal';
import { UnderstandingCardModal } from './components/UnderstandingCardModal';
import { ContextualGuideModal } from './components/ContextualGuideModal';
import { ResearchDraftModal, ResearchDraftInitialData } from './components/ResearchDraftModal';
import { READER_SOURCES, ReaderSource } from './data/reader-sources';
import { UnderstandingCard, UNDERSTANDING_CARDS, findUnderstandingCard } from './data/understanding-cards';
import { ContextualGuide, CONTEXTUAL_GUIDES, findContextualGuide } from './data/contextual-guides';
import { bringModalToTop } from './utils/modal-stack';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SectionTab>('home');
  const [readerSource, setReaderSource] = useState<ReaderSource | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [glossarySearchQuery, setGlossarySearchQuery] = useState('');
  const [selectedFacultyId, setSelectedFacultyId] = useState<string>('tuniyants-a-a');
  
  // Understanding Card & Contextual Guide Modal States
  const [activeUnderstandingCard, setActiveUnderstandingCard] = useState<UnderstandingCard | null>(null);
  const [activeContextualGuide, setActiveContextualGuide] = useState<ContextualGuide | null>(null);
  const [activeResearchDraft, setActiveResearchDraft] = useState<ResearchDraftInitialData | null>(null);

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

  const handleOpenReader = (source: ReaderSource, triggerElement?: HTMLElement | null) => {
    const trigger = triggerElement !== undefined 
      ? triggerElement 
      : (typeof document !== 'undefined' ? (document.activeElement as HTMLElement) : null);
    setReaderSource(source);
    bringModalToTop('reader-modal', trigger);
  };

  const handleOpenReaderBySourceId = (sourceId: string, triggerElement?: HTMLElement | null) => {
    const cleanId = (sourceId || '').trim();
    const normalized = cleanId.toLowerCase().replace(/[-_]/g, '');
    const src = READER_SOURCES.find(s => s.id === cleanId) ||
                READER_SOURCES.find(s => s.id.toLowerCase().replace(/[-_]/g, '') === normalized) ||
                READER_SOURCES.find(s => s.id.toLowerCase().includes(normalized) || normalized.includes(s.id.toLowerCase().replace(/[-_]/g, ''))) ||
                READER_SOURCES.find(s => s.title.toLowerCase().includes(cleanId.toLowerCase())) ||
                READER_SOURCES[0];
    handleOpenReader(src, triggerElement);
  };

  const handleOpenUnderstandingCard = (cardOrQuery?: string | UnderstandingCard) => {
    const trigger = typeof document !== 'undefined' ? (document.activeElement as HTMLElement) : null;
    if (typeof cardOrQuery === 'object' && cardOrQuery !== null) {
      setActiveUnderstandingCard(cardOrQuery);
    } else if (typeof cardOrQuery === 'string') {
      const found = findUnderstandingCard(cardOrQuery);
      if (found) setActiveUnderstandingCard(found);
      else setActiveUnderstandingCard(UNDERSTANDING_CARDS[0]);
    } else {
      setActiveUnderstandingCard(UNDERSTANDING_CARDS[0]);
    }
    bringModalToTop('understanding-card-modal', trigger);
  };

  const handleOpenContextualGuide = (guideOrQuery?: string | ContextualGuide) => {
    const trigger = typeof document !== 'undefined' ? (document.activeElement as HTMLElement) : null;
    if (typeof guideOrQuery === 'object' && guideOrQuery !== null) {
      setActiveContextualGuide(guideOrQuery);
    } else if (typeof guideOrQuery === 'string') {
      const found = findContextualGuide(guideOrQuery);
      if (found) setActiveContextualGuide(found);
      else setActiveContextualGuide(CONTEXTUAL_GUIDES[0]);
    } else {
      setActiveContextualGuide(CONTEXTUAL_GUIDES[0]);
    }
    bringModalToTop('contextual-guide-modal', trigger);
  };

  const handleOpenResearchDraft = (data?: ResearchDraftInitialData, triggerElement?: HTMLElement | null) => {
    const trigger = triggerElement !== undefined 
      ? triggerElement 
      : (typeof document !== 'undefined' ? (document.activeElement as HTMLElement) : null);
    setActiveResearchDraft(data || {
      sourceId: 'bazarov_sokol_2026',
      sourceTitle: 'Разработка методики «Способ оценки качества отзывчивости личности (СОКОЛ)»',
      sourceAuthor: 'Базаров Т.Ю., Гасимов А.Ф.',
      citation: 'Базаров Т.Ю., Гасимов А.Ф. Разработка методики «Способ оценки качества отзывчивости личности (СОКОЛ)» // Социальная психология и общество. 2026. Т. 17. № 2. С. 202–220',
      topic: 'Исследование студента: отзывчивость и групповая динамика'
    });
    bringModalToTop('research-draft-modal', trigger);
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
          {activeTab === 'home' && (
            <HomeView
              onSelectTab={setActiveTab}
              onOpenReaderBySourceId={handleOpenReaderBySourceId}
              onOpenUnderstandingCard={handleOpenUnderstandingCard}
              onOpenResearchDraft={() => handleOpenResearchDraft()}
              onOpenSearch={() => setIsSearchOpen(true)}
              onSelectFacultyMember={handleNavigateToFaculty}
            />
          )}

          {activeTab === 'disciplines' && (
            <CoursesView
              onOpenReaderBySourceId={handleOpenReaderBySourceId}
              onNavigateToFaculty={handleNavigateToFaculty}
              onNavigateToTerm={handleNavigateToTerm}
              onOpenUnderstandingCard={handleOpenUnderstandingCard}
              onOpenContextualGuide={handleOpenContextualGuide}
              onOpenResearchDraft={handleOpenResearchDraft}
            />
          )}

          {activeTab === 'reader' && (
            <LibraryView
              onOpenReader={handleOpenReader}
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
              onOpenResearchDraft={handleOpenResearchDraft}
            />
          )}
        </div>
      </main>

      {/* Site Footer */}
      <footer style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--line)',
        padding: '24px 0 95px',
        marginTop: 'auto'
      }}>
        <div className="app-container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            textAlign: 'center',
            fontSize: '13px',
            color: 'var(--muted)'
          }}>
            <span>Научный сектор</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <a 
              href="https://t.me/speway" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: 'var(--primary)',
                textDecoration: 'none',
                fontWeight: 600
              }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
            >
              by spw
            </a>
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
        onOpenResearchDraft={handleOpenResearchDraft}
      />

      {/* Understanding Card Modal (Pedagogical framework of Prof. T.Y. Bazarov) */}
      <UnderstandingCardModal
        card={activeUnderstandingCard}
        onClose={() => setActiveUnderstandingCard(null)}
        onSelectCard={setActiveUnderstandingCard}
        onOpenReaderBySourceId={handleOpenReaderBySourceId}
        onOpenResearchDraft={handleOpenResearchDraft}
      />

      {/* Contextual Study & Research Guide Modal */}
      <ContextualGuideModal
        guide={activeContextualGuide}
        onClose={() => setActiveContextualGuide(null)}
        onSelectGuide={setActiveContextualGuide}
      />

      {/* Student Research Draft Modal (Local Save & Export) */}
      <ResearchDraftModal
        isOpen={Boolean(activeResearchDraft)}
        onClose={() => setActiveResearchDraft(null)}
        initialData={activeResearchDraft}
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
        onOpenReader={handleOpenReader}
        onSelectCourse={(_id) => setActiveTab('disciplines')}
        onSelectTerm={(term) => {
          setGlossarySearchQuery(term);
          setActiveTab('glossary');
        }}
      />
    </div>
  );
};
