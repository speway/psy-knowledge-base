import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Header, SectionTab } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import type { ReaderSource } from './data/reader-sources';
import type { UnderstandingCard } from './data/understanding-cards';
import type { ContextualGuide } from './data/contextual-guides';
import { bringModalToTop } from './utils/modal-stack';
import type { ResearchDraftInitialData } from './components/ResearchDraftModal';

// Code-split heavy views and modals for optimal load speed and mobile responsiveness
const CoursesView = lazy(() => import('./components/CoursesView').then(m => ({ default: m.CoursesView })));
const LibraryView = lazy(() => import('./components/LibraryView').then(m => ({ default: m.LibraryView })));
const GlossarySection = lazy(() => import('./components/GlossarySection').then(m => ({ default: m.GlossarySection })));
const FacultyView = lazy(() => import('./components/FacultyView').then(m => ({ default: m.FacultyView })));
const ArchiveView = lazy(() => import('./components/ArchiveView').then(m => ({ default: m.ArchiveView })));

const ReaderModal = lazy(() => import('./components/ReaderModal').then(m => ({ default: m.ReaderModal })));
const QuickSearchModal = lazy(() => import('./components/QuickSearchModal').then(m => ({ default: m.QuickSearchModal })));
const UnderstandingCardModal = lazy(() => import('./components/UnderstandingCardModal').then(m => ({ default: m.UnderstandingCardModal })));
const ContextualGuideModal = lazy(() => import('./components/ContextualGuideModal').then(m => ({ default: m.ContextualGuideModal })));
const ResearchDraftModal = lazy(() => import('./components/ResearchDraftModal').then(m => ({ default: m.ResearchDraftModal })));

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

  const handleOpenReaderBySourceId = async (sourceId: string, triggerElement?: HTMLElement | null) => {
    const { READER_SOURCES } = await import('./data/reader-sources');
    const cleanId = (sourceId || '').trim();
    const normalized = cleanId.toLowerCase().replace(/[-_]/g, '');
    const src = READER_SOURCES.find(s => s.id === cleanId) ||
                READER_SOURCES.find(s => s.id.toLowerCase().replace(/[-_]/g, '') === normalized) ||
                READER_SOURCES.find(s => s.id.toLowerCase().includes(normalized) || normalized.includes(s.id.toLowerCase().replace(/[-_]/g, ''))) ||
                READER_SOURCES.find(s => s.title.toLowerCase().includes(cleanId.toLowerCase())) ||
                READER_SOURCES[0];
    handleOpenReader(src, triggerElement);
  };

  const handleOpenUnderstandingCard = async (cardOrQuery?: string | UnderstandingCard) => {
    const trigger = typeof document !== 'undefined' ? (document.activeElement as HTMLElement) : null;
    if (typeof cardOrQuery === 'object' && cardOrQuery !== null) {
      setActiveUnderstandingCard(cardOrQuery);
    } else {
      const { UNDERSTANDING_CARDS, findUnderstandingCard } = await import('./data/understanding-cards');
      if (typeof cardOrQuery === 'string') {
        const found = findUnderstandingCard(cardOrQuery);
        setActiveUnderstandingCard(found || UNDERSTANDING_CARDS[0]);
      } else {
        setActiveUnderstandingCard(UNDERSTANDING_CARDS[0]);
      }
    }
    bringModalToTop('understanding-card-modal', trigger);
  };

  const handleOpenContextualGuide = async (guideOrQuery?: string | ContextualGuide) => {
    const trigger = typeof document !== 'undefined' ? (document.activeElement as HTMLElement) : null;
    if (typeof guideOrQuery === 'object' && guideOrQuery !== null) {
      setActiveContextualGuide(guideOrQuery);
    } else {
      const { CONTEXTUAL_GUIDES, findContextualGuide } = await import('./data/contextual-guides');
      if (typeof guideOrQuery === 'string') {
        const found = findContextualGuide(guideOrQuery);
        setActiveContextualGuide(found || CONTEXTUAL_GUIDES[0]);
      } else {
        setActiveContextualGuide(CONTEXTUAL_GUIDES[0]);
      }
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

  const viewLoadingFallback = (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '340px',
      color: 'var(--muted)',
      fontSize: '13.5px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '28px',
          height: '28px',
          border: '3px solid var(--line)',
          borderTopColor: 'var(--primary)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
        <span>Загрузка материалов...</span>
      </div>
    </div>
  );

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

          <Suspense fallback={viewLoadingFallback}>
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
          </Suspense>
        </div>
      </main>

      {/* Site Footer */}
      <footer style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--line)',
        padding: '28px 0 95px',
        marginTop: 'auto'
      }}>
        <div className="app-container">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '12px'
          }}>
            {/* Top row: Scientific sector portal + by spw */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              flexWrap: 'wrap',
              fontSize: '13.5px'
            }}>
              <a
                href="https://psy-msutf.vercel.app/ru"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--ink)',
                  textDecoration: 'none',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>Научный сектор ТФ МГУ</span>
                <span style={{ fontSize: '11px', color: 'var(--primary)', background: 'var(--primary-light)', padding: '1px 6px', borderRadius: '4px' }}>
                  2026
                </span>
              </a>

              <span style={{ color: 'var(--line-strong)', userSelect: 'none' }}>·</span>

              <a 
                href="https://t.me/speway" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  color: 'var(--primary)',
                  textDecoration: 'none',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                by spw
              </a>
            </div>

            {/* Middle row: All projects of the scientific sector */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              flexWrap: 'wrap',
              fontSize: '12.5px',
              color: 'var(--muted)',
              paddingTop: '8px',
              borderTop: '1px solid var(--line-soft)'
            }}>
              <span style={{ fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--muted)', fontWeight: 600 }}>
                Проекты сектора:
              </span>

              <a
                href="https://psy-msutf.vercel.app/ru"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--ink)', textDecoration: 'none' }}
              >
                Портал сектора
              </a>

              <span style={{ opacity: 0.4 }}>•</span>

              <a
                href="https://psy-case-trainer.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--ink)', textDecoration: 'none' }}
              >
                Тренажёр кейсов
              </a>

              <span style={{ opacity: 0.4 }}>•</span>

              <a
                href="https://psy-stat-lab.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--ink)', textDecoration: 'none' }}
              >
                СтатЛаб
              </a>

              <span style={{ opacity: 0.4 }}>•</span>

              <a
                href="https://psy-knowledge-base.vercel.app"
                style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}
              >
                База знаний
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Navigation */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Lazy Modals with Suspense */}
      <Suspense fallback={null}>
        {/* Reader Modal */}
        {readerSource && (
          <ReaderModal
            source={readerSource}
            onClose={() => setReaderSource(null)}
            onOpenUnderstandingCard={handleOpenUnderstandingCard}
            onOpenContextualGuide={handleOpenContextualGuide}
            onOpenResearchDraft={handleOpenResearchDraft}
          />
        )}

        {/* Understanding Card Modal (Pedagogical framework of Prof. T.Y. Bazarov) */}
        {activeUnderstandingCard && (
          <UnderstandingCardModal
            card={activeUnderstandingCard}
            onClose={() => setActiveUnderstandingCard(null)}
            onSelectCard={setActiveUnderstandingCard}
            onOpenReaderBySourceId={handleOpenReaderBySourceId}
            onOpenResearchDraft={handleOpenResearchDraft}
          />
        )}

        {/* Contextual Study & Research Guide Modal */}
        {activeContextualGuide && (
          <ContextualGuideModal
            guide={activeContextualGuide}
            onClose={() => setActiveContextualGuide(null)}
            onSelectGuide={setActiveContextualGuide}
          />
        )}

        {/* Student Research Draft Modal (Local Save & Export) */}
        {activeResearchDraft && (
          <ResearchDraftModal
            isOpen={Boolean(activeResearchDraft)}
            onClose={() => setActiveResearchDraft(null)}
            initialData={activeResearchDraft}
          />
        )}

        {/* Quick Search Modal */}
        {isSearchOpen && (
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
        )}
      </Suspense>
    </div>
  );
};
