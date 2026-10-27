import React, { useState } from 'react';
import { 
  Clock, 
  User, 
  BookOpen, 
  Tag, 
  ArrowUpRight, 
  Layers, 
  FileText,
  Bookmark,
  Sparkles,
  HelpCircle,
  Compass,
  FileEdit,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { COURSES, Course, SeminarItem } from '../data/courses';
import { ResearchJourneyBanner } from './ResearchJourneyBanner';
import { findUnderstandingCard } from '../data/understanding-cards';
import { ResearchDraftInitialData } from './ResearchDraftModal';

interface CoursesViewProps {
  onOpenReaderBySourceId: (sourceId: string) => void;
  onNavigateToFaculty: (facultyId: string) => void;
  onNavigateToTerm: (term: string) => void;
  onOpenUnderstandingCard?: (cardId: string) => void;
  onOpenContextualGuide?: (guideId: string) => void;
  onOpenResearchDraft?: (data: ResearchDraftInitialData) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  onOpenReaderBySourceId,
  onNavigateToFaculty,
  onNavigateToTerm,
  onOpenUnderstandingCard,
  onOpenContextualGuide,
  onOpenResearchDraft
}) => {
  const course: Course = COURSES[0];
  
  // Single active seminar selection (defaults to Seminar 1)
  const [selectedSeminarNum, setSelectedSeminarNum] = useState<number>(1);

  // Active seminar item
  const currentSeminar: SeminarItem = 
    course.seminars.find(s => s.num === selectedSeminarNum) || course.seminars[0];

  const handleSelectSeminar = (num: number) => {
    setSelectedSeminarNum(num);
    const targetEl = document.getElementById('active-seminar-view');
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePrevSeminar = () => {
    if (selectedSeminarNum > 1) {
      handleSelectSeminar(selectedSeminarNum - 1);
    }
  };

  const handleNextSeminar = () => {
    if (selectedSeminarNum < course.seminars.length) {
      handleSelectSeminar(selectedSeminarNum + 1);
    }
  };

  return (
    <div style={{ paddingBottom: '90px' }}>
      
      {/* Pedagogical Principle Banner (Prof. T.Y. Bazarov) */}
      <ResearchJourneyBanner
        onOpenBazarovCard={() => onOpenUnderstandingCard && onOpenUnderstandingCard('card-bazarov-sokol-2026')}
        onOpenAllCards={() => onOpenUnderstandingCard && onOpenUnderstandingCard('card-bazarov-sokol-2026')}
        onOpenResearchGuide={() => onOpenContextualGuide && onOpenContextualGuide('guide-how-to-do-research')}
        onOpenResearchDraft={() => onOpenResearchDraft && onOpenResearchDraft({
          sourceId: 'bazarov_sokol_2026',
          sourceTitle: 'Разработка методики «Способ оценки качества отзывчивости личности (СОКОЛ)»',
          sourceAuthor: 'Базаров Т.Ю., Гасимов А.Ф.',
          citation: 'Базаров Т.Ю., Гасимов А.Ф. Разработка методики «Способ оценки качества отзывчивости личности (СОКОЛ)» // Социальная психология и общество. 2026. Т. 17. № 2. С. 202–220. DOI: 10.17759/sps.2026170212',
          topic: 'Влияние отзывчивости лидера на групповую динамику и решение задач в условиях неопределенности',
          starterHypothesis: 'Предполагается, что высокая чувствительность лидера к межличностным отношениям в группе опосредует психологическую безопасность и продуктивность совместной деятельности.'
        })}
      />

      {/* Course Hero Card */}
      <div className="paper-card" style={{
        padding: '24px 24px',
        marginBottom: '20px',
        background: 'var(--surface)',
        borderLeft: '5px solid var(--primary)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span className="pill pill-primary">
              <Layers size={12} />
              1 курс бакалавриата
            </span>
            <span className="pill pill-teal">2 семестр (весенний)</span>
            <span className="pill pill-neutral">34 акад. часа · 9 семинаров</span>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 800, fontFamily: 'var(--mono)' }}>
            ФОРМА КОНТРОЛЯ: ЭКЗАМЕН
          </span>
        </div>

        <h1 style={{
          fontSize: '26px',
          fontWeight: 800,
          color: 'var(--ink)',
          fontFamily: 'var(--font-serif)',
          lineHeight: 1.25,
          marginBottom: '6px'
        }}>
          {course.title}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
          <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
            Преподаватель:
          </span>
          <button
            onClick={() => onNavigateToFaculty('tuniyants-a-a')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary)',
              fontWeight: 800,
              fontSize: '13.5px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              textDecoration: 'underline',
              textUnderlineOffset: '3px'
            }}
          >
            <User size={14} color="var(--primary)" />
            {course.instructorName}
          </button>
        </div>

        <p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: 1.55, maxWidth: '860px', margin: 0 }}>
          {course.description}
        </p>
      </div>

      {/* SEMINAR SELECTOR: Clean button-based navigation */}
      <div 
        id="active-seminar-view"
        className="paper-card" 
        style={{
          padding: '16px 20px',
          marginBottom: '18px',
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          borderRadius: 'var(--radius-md)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Bookmark size={14} color="var(--primary)" />
            <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Выбор семинарского занятия:
            </span>
          </div>
          <span style={{ fontSize: '11.5px', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
            Семинар {currentSeminar.num < 10 ? `0${currentSeminar.num}` : currentSeminar.num} из 09
          </span>
        </div>

        {/* Seminar Buttons Grid: Two Modules */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '12px' }}>
          
          {/* Module 1: Motivation */}
          <div style={{
            background: 'var(--paper-soft)',
            padding: '10px 12px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--line-soft)'
          }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Часть I: Мотивация (Сем. 1–5)
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {course.seminars.filter(s => s.num <= 5).map(s => {
                const isSelected = s.num === selectedSeminarNum;
                return (
                  <button
                    key={s.num}
                    onClick={() => handleSelectSeminar(s.num)}
                    style={{
                      flex: '1 0 40px',
                      height: '36px',
                      background: isSelected ? 'var(--primary)' : 'var(--surface)',
                      color: isSelected ? '#ffffff' : 'var(--ink)',
                      border: isSelected ? '1px solid var(--primary)' : '1px solid var(--line)',
                      borderRadius: 'var(--radius-sm)',
                      fontWeight: 800,
                      fontSize: '13px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: isSelected ? '0 2px 8px rgba(75, 50, 104, 0.28)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                    title={`Семинар ${s.num}: ${s.title}`}
                  >
                    Сем. {s.num}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Module 2: Emotion */}
          <div style={{
            background: 'var(--paper-soft)',
            padding: '10px 12px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--line-soft)'
          }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--teal)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Часть II: Эмоции (Сем. 6–9)
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {course.seminars.filter(s => s.num >= 6).map(s => {
                const isSelected = s.num === selectedSeminarNum;
                return (
                  <button
                    key={s.num}
                    onClick={() => handleSelectSeminar(s.num)}
                    style={{
                      flex: '1 0 40px',
                      height: '36px',
                      background: isSelected ? 'var(--teal)' : 'var(--surface)',
                      color: isSelected ? '#ffffff' : 'var(--ink)',
                      border: isSelected ? '1px solid var(--teal)' : '1px solid var(--line)',
                      borderRadius: 'var(--radius-sm)',
                      fontWeight: 800,
                      fontSize: '13px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: isSelected ? '0 2px 8px rgba(47, 107, 100, 0.28)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                    title={`Семинар ${s.num}: ${s.title}`}
                  >
                    Сем. {s.num}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* SINGLE ACTIVE SEMINAR VIEW */}
      <div 
        style={{
          background: 'var(--surface)',
          border: '1.5px solid var(--primary-border)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-md)',
          transition: 'all 0.2s ease'
        }}
      >
        {/* Seminar Header */}
        <div style={{
          padding: '20px 22px',
          background: 'var(--paper-soft)',
          borderBottom: '1px solid var(--line)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{
                background: currentSeminar.num <= 5 ? 'var(--primary)' : 'var(--teal)',
                color: '#ffffff',
                fontSize: '11px',
                fontWeight: 800,
                fontFamily: 'var(--mono)',
                padding: '3px 10px',
                borderRadius: 'var(--radius-full)',
                letterSpacing: '0.04em'
              }}>
                СЕМИНАР {currentSeminar.num < 10 ? `0${currentSeminar.num}` : currentSeminar.num}
              </span>

              <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 700, fontFamily: 'var(--mono)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <Clock size={12} color="var(--primary)" />
                {currentSeminar.hours} акад. ч.
              </span>

              <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 600 }}>
                · {currentSeminar.questions.length} вопросов
              </span>

              <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 600 }}>
                · {currentSeminar.literature.length} первоисточника в ридере
              </span>
            </div>

            {/* Seminar Actions: Clean toolbar at seminar level instead of duplicating on every question */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              {/* Contextual Seminar Guide Action */}
              {onOpenContextualGuide && (
                <button
                  onClick={() => {
                    if (currentSeminar.num <= 2) onOpenContextualGuide('guide-self-determination');
                    else if (currentSeminar.num === 3) onOpenContextualGuide('guide-functional-autonomy');
                    else if (currentSeminar.num <= 5) onOpenContextualGuide('guide-achievement-motivation');
                    else if (currentSeminar.num <= 8) onOpenContextualGuide('guide-emotions-representation');
                    else onOpenContextualGuide('guide-bazarov-sokol-framework');
                  }}
                  className="btn-ghost"
                  style={{
                    padding: '4px 10px',
                    fontSize: '11.5px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                  title="Открыть методический гайд кафедры по данной теме"
                >
                  <Compass size={12} color="var(--primary)" />
                  <span>Гайд темы</span>
                </button>
              )}

              {/* Research Draft Button for the current seminar */}
              {onOpenResearchDraft && (
                <button
                  onClick={() => onOpenResearchDraft({
                    sourceId: currentSeminar.questions[0]?.sourceId || 'leontiev_da_general',
                    sourceTitle: currentSeminar.questions[0]?.sourceTitle || currentSeminar.title,
                    sourceAuthor: currentSeminar.questions[0]?.sourceAuthor || 'Кафедра психологии',
                    citation: `Семинар №${currentSeminar.num}: ${currentSeminar.title} // Программа курса «Психология мотивации и эмоций», 2026`,
                    topic: `Исследовательский черновик: Семинар №${currentSeminar.num} (${currentSeminar.title})`,
                    seminarNum: currentSeminar.num
                  })}
                  className="btn-ghost"
                  style={{
                    padding: '4px 10px',
                    fontSize: '11.5px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                  title="Открыть Черновик исследования по материалам этого семинара"
                >
                  <FileEdit size={12} color="var(--primary)" />
                  <span>Черновик</span>
                </button>
              )}
            </div>
          </div>

          <h2 style={{
            fontSize: '21px',
            fontWeight: 800,
            color: 'var(--ink)',
            lineHeight: 1.3,
            fontFamily: 'var(--font-serif)',
            margin: '0 0 6px 0'
          }}>
            {currentSeminar.title}
          </h2>

          <div style={{
            fontSize: '12px',
            color: 'var(--muted)',
            fontWeight: 600
          }}>
            {currentSeminar.section}
          </div>
        </div>

        {/* Seminar Content Body */}
        <div style={{ padding: '22px 22px', background: 'var(--surface)' }}>
          
          {/* BLOCK 1: Questions to discuss */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '6px' }}>
              <strong style={{ fontSize: '13.5px', color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.03em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <HelpCircle size={15} color="var(--primary)" />
                Вопросы к обсуждению на семинаре:
              </strong>
              <span style={{ fontSize: '11.5px', color: 'var(--muted)' }}>
                Клик по вопросу открывает первоисточник в ридере
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {currentSeminar.questions.map((q, idx) => {
                const matchedCard = findUnderstandingCard(q.sourceId);
                return (
                  <div
                    key={q.id || idx}
                    onClick={() => onOpenReaderBySourceId(q.sourceId)}
                    style={{
                      background: 'var(--surface-soft)',
                      border: '1px solid var(--line)',
                      borderLeft: '4px solid var(--primary)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '14px 16px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--primary)';
                      e.currentTarget.style.background = '#ffffff';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 4px 14px rgba(75, 50, 104, 0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--line)';
                      e.currentTarget.style.background = 'var(--surface-soft)';
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {/* Question Statement */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span style={{
                        fontWeight: 800,
                        fontSize: '11.5px',
                        color: 'var(--primary)',
                        fontFamily: 'var(--mono)',
                        background: 'var(--primary-light)',
                        width: '26px',
                        height: '26px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '1px'
                      }}>
                        №{idx + 1}
                      </span>
                      <span style={{ fontSize: '14px', color: 'var(--ink)', lineHeight: 1.45, flex: 1, fontWeight: 600 }}>
                        {q.text}
                      </span>
                    </div>

                    {/* Bibliographic Reference Ticket & Discreet Secondary Actions */}
                    <div 
                      className="ticket-footer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '8px',
                        paddingTop: '8px',
                        borderTop: '1px dashed var(--line)'
                      }}
                    >
                      {/* Left: Source metadata */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--muted)', flexWrap: 'wrap' }}>
                        <BookOpen size={12} color="var(--primary)" />
                        <strong style={{ color: 'var(--ink)' }}>{q.sourceAuthor}</strong>
                        <span>— {q.sourceTitle}</span>
                        <span style={{
                          background: 'var(--paper-soft)',
                          color: 'var(--ink-soft)',
                          padding: '1px 6px',
                          borderRadius: '4px',
                          fontSize: '10.5px',
                          fontWeight: 600,
                          fontFamily: 'var(--mono)'
                        }}>
                          {q.sourcePages}
                        </span>
                      </div>

                      {/* Right: Clean, elegant primary reader action */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          fontSize: '12px',
                          fontWeight: 700,
                          color: 'var(--primary)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px'
                        }}>
                          <span>Открыть в ридере</span>
                          <ArrowUpRight size={13} />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* BLOCK 2: Digitized literature mapped to the seminar */}
          <div style={{ marginBottom: '22px' }}>
            <strong style={{ fontSize: '13px', color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.03em', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <FileText size={14} color="var(--primary)" />
              Оцифрованные первоисточники темы:
            </strong>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {currentSeminar.literature.map((lit, idx) => (
                <div
                  key={idx}
                  className="literature-entry"
                  onClick={() => onOpenReaderBySourceId(lit.sourceId)}
                  style={{ padding: '10px 14px' }}
                >
                  <div style={{ flex: 1, minWidth: '220px' }}>
                    <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '13.5px' }}>
                      {lit.author}
                    </span>{' '}
                    <span style={{ color: 'var(--muted)', fontSize: '13px' }}>
                      {lit.title}. — {lit.publisher}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="pill pill-neutral" style={{ fontSize: '10.5px', fontFamily: 'var(--mono)' }}>
                      {lit.pages}
                    </span>
                    <span className="pill pill-primary" style={{ fontSize: '10.5px' }}>
                      {lit.questionRef}
                    </span>
                    <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '2px', marginLeft: '2px' }}>
                      Читать <ArrowUpRight size={11} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>



          {/* BLOCK 4: Key terms */}
          {currentSeminar.terms && currentSeminar.terms.length > 0 && (
            <div style={{ paddingTop: '12px', borderTop: '1px solid var(--line)', marginBottom: '20px' }}>
              <span style={{ fontSize: '11.5px', color: 'var(--muted)', display: 'block', marginBottom: '6px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                Понятийный тезаурус темы (клик открывает словарную статью):
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {currentSeminar.terms.map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => onNavigateToTerm(t)}
                    className="pill pill-neutral"
                    style={{
                      cursor: 'pointer',
                      background: 'var(--surface)',
                      fontSize: '12px',
                      padding: '4px 10px',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--primary)';
                      e.currentTarget.style.color = 'var(--primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--line)';
                      e.currentTarget.style.color = 'var(--ink-soft)';
                    }}
                  >
                    <Tag size={11} color="var(--primary)" />
                    <span>{t}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* SEMINAR STEPPER (Prev / Next) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px',
            paddingTop: '16px',
            borderTop: '1px solid var(--line)'
          }}>
            {selectedSeminarNum > 1 ? (
              <button
                onClick={handlePrevSeminar}
                className="btn-ghost"
                style={{ fontSize: '12.5px', padding: '7px 14px' }}
              >
                <ChevronLeft size={14} />
                <span>Предыдущий: Сем. {selectedSeminarNum - 1}</span>
              </button>
            ) : <div />}

            <span style={{ fontSize: '12px', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
              Семинар {selectedSeminarNum} из {course.seminars.length}
            </span>

            {selectedSeminarNum < course.seminars.length ? (
              <button
                onClick={handleNextSeminar}
                className="btn-ink"
                style={{ fontSize: '12.5px', padding: '7px 14px' }}
              >
                <span>Следующий: Сем. {selectedSeminarNum + 1}</span>
                <ChevronRight size={14} />
              </button>
            ) : <div />}
          </div>

        </div>
      </div>

    </div>
  );
};
