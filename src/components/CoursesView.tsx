import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, User, BookOpen, Lightbulb, Tag, ArrowUpRight } from 'lucide-react';
import { COURSES, Course, SeminarItem, SeminarLiterature } from '../data/courses';

interface CoursesViewProps {
  onOpenReaderBySourceId: (sourceId: string) => void;
  onNavigateToFaculty: (facultyId: string) => void;
  onNavigateToTerm: (term: string) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  onOpenReaderBySourceId,
  onNavigateToFaculty,
  onNavigateToTerm
}) => {
  const course = COURSES[0]; // «Психология мотивации и эмоций»
  
  // State for which seminars are open (first 2 open by default)
  const [openSeminars, setOpenSeminars] = useState<Record<number, boolean>>({
    1: true,
    2: true
  });

  const toggleSeminar = (num: number) => {
    setOpenSeminars(prev => ({
      ...prev,
      [num]: !prev[num]
    }));
  };

  const handleExpandAll = () => {
    const allOpen: Record<number, boolean> = {};
    course.seminars.forEach(s => { allOpen[s.num] = true; });
    setOpenSeminars(allOpen);
  };

  const handleCollapseAll = () => {
    setOpenSeminars({});
  };

  return (
    <div style={{ paddingBottom: '90px' }}>
      
      {/* Course Overview Banner */}
      <div className="paper-card" style={{
        padding: '28px',
        marginBottom: '24px',
        background: 'var(--surface)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span className="pill pill-ochre">1 курс бакалавриата</span>
            <span className="pill pill-teal">2 семестр</span>
            <span className="pill pill-neutral">34 акад. часа</span>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 700, fontFamily: 'var(--mono)' }}>
            ФОРМА КОНТРОЛЯ: ЭКЗАМЕН
          </span>
        </div>

        <h1 style={{
          fontSize: '28px',
          fontWeight: 700,
          color: 'var(--ink)',
          fontFamily: 'var(--font-serif)',
          lineHeight: 1.25,
          marginBottom: '8px'
        }}>
          {course.title}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
          <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
            Ведущий преподаватель дисциплины:
          </span>
          <button
            onClick={() => onNavigateToFaculty('tuniyants-a-a')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--ink)',
              fontWeight: 700,
              fontSize: '13.5px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              textDecoration: 'underline',
              textUnderlineOffset: '3px'
            }}
          >
            <User size={14} color="var(--ochre)" />
            {course.instructorName}
          </button>
        </div>

        <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6, maxWidth: '860px' }}>
          {course.description}
        </p>

        {/* Global Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--line-soft)' }}>
          <span style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            СИЛЛАБУС: 9 СЕМИНАРСКИХ ЗАНЯТИЙ (34 ЧАСА)
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleExpandAll}
              className="btn-ghost"
              style={{ padding: '5px 10px', fontSize: '11.5px' }}
            >
              Развернуть все
            </button>
            <button
              onClick={handleCollapseAll}
              className="btn-ghost"
              style={{ padding: '5px 10px', fontSize: '11.5px' }}
            >
              Свернуть все
            </button>
          </div>
        </div>
      </div>

      {/* Seminar Numeric Jumper */}
      <div className="paper-card" style={{
        padding: '12px 18px',
        marginBottom: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        background: 'var(--surface)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Семинар:
          </span>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {course.seminars.map(s => {
              const isOpen = !!openSeminars[s.num];
              return (
                <button
                  key={s.num}
                  onClick={() => {
                    setOpenSeminars({ [s.num]: true });
                    const el = document.getElementById(`seminar-card-${s.num}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`pill ${isOpen ? 'pill-ochre' : 'pill-neutral'}`}
                  style={{
                    cursor: 'pointer',
                    minWidth: '32px',
                    height: '32px',
                    padding: '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '13px'
                  }}
                  title={`Семинар ${s.num}: ${s.title}`}
                >
                  {s.num}
                </button>
              );
            })}
          </div>
        </div>

        <span style={{ fontSize: '11.5px', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
          Клик по номеру открывает тему
        </span>
      </div>

      {/* Seminars List (Accordion) */}
      <div>
        {course.seminars.map((sem) => {
          const isOpen = !!openSeminars[sem.num];
          return (
            <div 
              key={sem.num} 
              id={`seminar-card-${sem.num}`}
              className={`seminar-item ${isOpen ? 'open' : ''}`}
            >
              
              {/* Header */}
              <div 
                className="seminar-title-bar"
                onClick={() => toggleSeminar(sem.num)}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span className="pill pill-neutral" style={{ fontSize: '10.5px', padding: '1px 8px' }}>
                      Семинар {sem.num}
                    </span>
                    <span style={{ fontSize: '11.5px', color: 'var(--muted)', fontWeight: 600, fontFamily: 'var(--mono)' }}>
                      <Clock size={11} style={{ display: 'inline', marginRight: '3px' }} />
                      {sem.hours} ч.
                    </span>
                  </div>
                  <h3 style={{
                    fontSize: '17px',
                    fontWeight: 700,
                    color: 'var(--ink)',
                    lineHeight: 1.3
                  }}>
                    {sem.title}
                  </h3>
                </div>

                <div className="toggle-indicator">
                  {isOpen ? '−' : '+'}
                </div>
              </div>

              {/* Body */}
              {isOpen && (
                <div className="seminar-content-area">
                  
                  {/* Section Label */}
                  <div style={{
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontWeight: 800,
                    color: 'var(--muted)',
                    marginBottom: '10px',
                    fontFamily: 'var(--mono)'
                  }}>
                    {sem.section}
                  </div>

                  {/* Interactive Questions with Direct Reader Linking */}
                  <div style={{ marginBottom: '22px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '6px' }}>
                      <strong style={{ fontSize: '13px', color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                        Вопросы к семинарскому занятию:
                      </strong>
                      <span style={{ fontSize: '11.5px', color: 'var(--ochre)', fontWeight: 600 }}>
                        Кликните на вопрос для открытия текста в ридере ↓
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {sem.questions.map((q, idx) => (
                        <div
                          key={q.id || idx}
                          onClick={() => onOpenReaderBySourceId(q.sourceId)}
                          style={{
                            background: 'var(--surface-soft)',
                            border: '1px solid var(--line-soft)',
                            borderRadius: 'var(--radius-sm)',
                            padding: '12px 14px',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '6px'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--ochre)';
                            e.currentTarget.style.background = 'var(--surface)';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--line-soft)';
                            e.currentTarget.style.background = 'var(--surface-soft)';
                            e.currentTarget.style.transform = 'none';
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                            <span style={{
                              fontWeight: 800,
                              fontSize: '12px',
                              color: 'var(--ochre)',
                              fontFamily: 'var(--mono)',
                              background: 'var(--ochre-light)',
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              marginTop: '2px'
                            }}>
                              {idx + 1}
                            </span>
                            <span style={{ fontSize: '13.5px', color: 'var(--ink)', lineHeight: 1.5, flex: 1, fontWeight: 500 }}>
                              {q.text}
                            </span>
                          </div>

                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '6px',
                            paddingLeft: '34px',
                            paddingTop: '6px',
                            borderTop: '1px dashed var(--line-soft)',
                            marginTop: '2px'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--muted)', flexWrap: 'wrap' }}>
                              <BookOpen size={12} color="var(--ochre)" />
                              <span style={{ fontWeight: 700, color: 'var(--ink)' }}>{q.sourceAuthor}</span>
                              <span>— {q.sourceTitle}</span>
                              <span className="pill pill-neutral" style={{ fontSize: '10.5px', padding: '1px 6px' }}>{q.sourcePages}</span>
                            </div>

                            <span style={{
                              fontSize: '11.5px',
                              fontWeight: 700,
                              color: 'var(--ochre)',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '2px'
                            }}>
                              Читать в ридере <ArrowUpRight size={12} />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Literature mapped to questions */}
                  <div style={{ marginBottom: '20px' }}>
                    <strong style={{ fontSize: '13px', color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.03em', display: 'block', marginBottom: '10px' }}>
                      Рекомендуемые первоисточники (клик открывает текст в ридере):
                    </strong>
                    <div>
                      {sem.literature.map((lit, idx) => (
                        <div
                          key={idx}
                          className="literature-entry"
                          onClick={() => onOpenReaderBySourceId(lit.sourceId)}
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
                            <span className="pill pill-neutral" style={{ fontSize: '10.5px' }}>
                              {lit.pages}
                            </span>
                            <span className="pill pill-ochre" style={{ fontSize: '10.5px' }}>
                              {lit.questionRef}
                            </span>
                            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ochre)', display: 'inline-flex', alignItems: 'center', gap: '2px', marginLeft: '4px' }}>
                              Читать <ArrowUpRight size={12} />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Methodological Tip */}
                  {sem.tips && (
                    <div style={{
                      background: 'var(--surface-soft)',
                      border: '1px solid var(--line)',
                      borderLeft: '3px solid var(--teal)',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-sm)',
                      marginBottom: '16px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px'
                    }}>
                      <Lightbulb size={16} color="var(--teal)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <span style={{ fontWeight: 800, fontSize: '12px', color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                          Совет преподавателя (А.А. Туниянц):
                        </span>
                        <p style={{ fontSize: '13px', color: 'var(--ink)', marginTop: '3px', lineHeight: 1.5 }}>
                          {sem.tips}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Key Terms */}
                  {sem.terms && sem.terms.length > 0 && (
                    <div style={{ paddingTop: '10px', borderTop: '1px solid var(--line-soft)' }}>
                      <span style={{ fontSize: '11.5px', color: 'var(--muted)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                        Ключевые понятия темы (клик ищет в словаре):
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {sem.terms.map((t, idx) => (
                          <button
                            key={idx}
                            onClick={() => onNavigateToTerm(t)}
                            className="pill pill-neutral"
                            style={{ cursor: 'pointer', background: 'var(--surface)' }}
                          >
                            <Tag size={10} color="var(--ochre)" />
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};
