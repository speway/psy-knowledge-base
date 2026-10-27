import React, { useState, useEffect, Suspense, lazy } from 'react';
import { 
  ArrowUp, 
  ExternalLink, 
  FileEdit, 
  Sparkles, 
  Compass, 
  Search, 
  BookOpen, 
  Library, 
  Users, 
  Bookmark, 
  GraduationCap 
} from 'lucide-react';
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

      {/* Redesigned Modern Academic Footer */}
      <footer style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--line)',
        padding: '48px 0 100px',
        marginTop: 'auto',
        color: 'var(--ink)'
      }}>
        <div className="app-container">
          
          {/* Main Footer Grid: Brand/Ecosystem + 3 Navigation Columns */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: '36px 28px',
            marginBottom: '40px'
          }}>
            
            {/* Column 1: Brand Identity & Scientific Sector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '340px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'var(--primary)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '20px',
                  fontWeight: 800,
                  boxShadow: '0 4px 10px rgba(75, 50, 104, 0.25)',
                  flexShrink: 0
                }}>
                  Ψ
                </div>
                <div>
                  <div style={{ fontSize: '14.5px', fontWeight: 800, color: 'var(--ink)', lineHeight: 1.2 }}>
                    Научный сектор ТФ МГУ
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 600 }}>
                    База знаний направления «Психология»
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '12.5px', color: 'var(--muted)', lineHeight: 1.5, margin: 0 }}>
                Единая цифровая среда учебных курсов, первоисточников в PDF и исследовательских инструментов для студентов кафедры психологии (2026).
              </p>

              {/* Developer Badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '11.5px', color: 'var(--muted)' }}>Разработка:</span>
                <a
                  href="https://t.me/speway"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: 'var(--primary)',
                    background: 'var(--primary-light)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    textDecoration: 'none',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
                >
                  <span>by spw</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>

            {/* Column 2: Digital Ecosystem of the Scientific Sector */}
            <div>
              <div style={{ fontSize: '11.5px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--primary)', marginBottom: '14px' }}>
                Проекты сектора
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li>
                  <a
                    href="https://psy-msutf.vercel.app/ru"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--ink)', textDecoration: 'none', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}
                  >
                    <span>Портал научного сектора</span>
                    <ExternalLink size={12} color="var(--primary)" />
                  </a>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '1px' }}>Главный ресурс СНО факультета</div>
                </li>

                <li>
                  <a
                    href="https://psy-case-trainer.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--ink)', textDecoration: 'none', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}
                  >
                    <span>Тренажёр кейсов</span>
                    <ExternalLink size={12} color="var(--primary)" />
                  </a>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '1px' }}>Практикум клинических и психологических задач</div>
                </li>

                <li>
                  <a
                    href="https://psy-stat-lab.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--ink)', textDecoration: 'none', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}
                  >
                    <span>СтатЛаб</span>
                    <ExternalLink size={12} color="var(--primary)" />
                  </a>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '1px' }}>Статистический анализ для курсовых и ВКР</div>
                </li>

                <li>
                  <a
                    href="https://psy-knowledge-base.vercel.app"
                    style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}
                  >
                    <span>База знаний</span>
                    <span style={{ fontSize: '10px', background: 'var(--primary-light)', color: 'var(--primary)', padding: '1px 5px', borderRadius: '3px' }}>Текущий</span>
                  </a>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '1px' }}>Первоисточники, семинары и словарь</div>
                </li>
              </ul>
            </div>

            {/* Column 3: Portal Navigation */}
            <div>
              <div style={{ fontSize: '11.5px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink)', marginBottom: '14px' }}>
                Разделы портала
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                <li>
                  <button
                    onClick={() => { setActiveTab('disciplines'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    style={{ background: 'none', border: 'none', padding: 0, color: 'var(--muted)', fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}
                  >
                    <BookOpen size={13} />
                    <span>Учебные семинары (1–9)</span>
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => { setActiveTab('reader'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    style={{ background: 'none', border: 'none', padding: 0, color: 'var(--muted)', fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}
                  >
                    <Library size={13} />
                    <span>Библиотека первоисточников</span>
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => { setActiveTab('teachers'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    style={{ background: 'none', border: 'none', padding: 0, color: 'var(--muted)', fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}
                  >
                    <Users size={13} />
                    <span>Преподаватели кафедры</span>
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => { setActiveTab('glossary'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    style={{ background: 'none', border: 'none', padding: 0, color: 'var(--muted)', fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}
                  >
                    <Bookmark size={13} />
                    <span>Терминологический словарь</span>
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => { setActiveTab('archive'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    style={{ background: 'none', border: 'none', padding: 0, color: 'var(--muted)', fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}
                  >
                    <GraduationCap size={13} />
                    <span>Стандарты НИРС и оформления ВКР</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Student Research Tools & Quick Access */}
            <div>
              <div style={{ fontSize: '11.5px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink)', marginBottom: '14px' }}>
                Инструменты студента
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                <li>
                  <button
                    onClick={() => handleOpenResearchDraft()}
                    style={{ background: 'none', border: 'none', padding: 0, color: '#b83b1c', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <FileEdit size={13} color="#b83b1c" />
                    <span>Черновик исследования</span>
                  </button>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '1px' }}>Локальное сохранение на устройстве</div>
                </li>

                <li>
                  <button
                    onClick={() => handleOpenUnderstandingCard('card-bazarov-sokol-2026')}
                    style={{ background: 'none', border: 'none', padding: 0, color: 'var(--ochre)', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Sparkles size={13} color="var(--ochre)" />
                    <span>Методика «СОКОЛ» (Т.Ю. Базаров)</span>
                  </button>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '1px' }}>Карточка понимания в 6 шагов</div>
                </li>

                <li>
                  <button
                    onClick={() => handleOpenContextualGuide('guide-how-to-do-research')}
                    style={{ background: 'none', border: 'none', padding: 0, color: '#059669', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Compass size={13} color="#059669" />
                    <span>Гайд выхода на ВКР</span>
                  </button>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '1px' }}>Логика научного исследования</div>
                </li>

                <li>
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    style={{ background: 'none', border: 'none', padding: 0, color: 'var(--muted)', fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}
                  >
                    <Search size={13} />
                    <span>Поиск по материалам</span>
                  </button>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar: Copyright, University tribute, Scroll-To-Top button */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
            paddingTop: '22px',
            borderTop: '1px solid var(--line-soft)',
            fontSize: '12px',
            color: 'var(--muted)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span>© 2026 Студенческий научный сектор психологии ТФ МГУ</span>
              <span style={{ opacity: 0.4 }}>•</span>
              <span>Филиал МГУ имени М.В. Ломоносова в г. Ташкенте</span>
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{
                background: 'var(--paper-soft)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-full)',
                padding: '6px 14px',
                fontSize: '11.5px',
                fontWeight: 600,
                color: 'var(--ink)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--surface)';
                e.currentTarget.style.borderColor = 'var(--primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--paper-soft)';
                e.currentTarget.style.borderColor = 'var(--line)';
              }}
              title="Вернуться к началу страницы"
            >
              <span>Наверх</span>
              <ArrowUp size={12} color="var(--primary)" />
            </button>
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
