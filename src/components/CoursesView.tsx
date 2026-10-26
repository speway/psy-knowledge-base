import React, { useState } from 'react';
import { Clock, User, BookOpen, Lightbulb, Tag, ArrowUpRight, CheckCircle2, ChevronDown, ChevronUp, Layers, Filter } from 'lucide-react';
import { COURSES, Course, SeminarItem } from '../data/courses';

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
  const course: Course = COURSES[0];
  
  // Section filter: 'all' | 'motivation' | 'emotion'
  const [sectionFilter, setSectionFilter] = useState<'all' | 'motivation' | 'emotion'>('all');

  // State for which seminars are expanded (first 2 open by default)
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

  const handleJumpToSeminar = (num: number) => {
    setOpenSeminars(prev => ({ ...prev, [num]: true }));
    setTimeout(() => {
      const el = document.getElementById(`seminar-card-${num}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const filteredSeminars = course.seminars.filter(s => {
    if (sectionFilter === 'motivation') return s.num <= 5;
    if (sectionFilter === 'emotion') return s.num >= 6;
    return true;
  });

  return (
    <div style={{ paddingBottom: '90px' }}>
      
      {/* Course Hero Banner */}
      <div className="paper-card" style={{
        padding: '28px 24px',
        marginBottom: '24px',
        background: 'var(--surface)',
        borderLeft: '5px solid var(--primary)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span className="pill pill-primary">
              <Layers size={12} />
              1 курс бакалавриата
            </span>
            <span className="pill pill-teal">2 семестр (весенний)</span>
            <span className="pill pill-neutral">34 акад. часа</span>
          </div>
          <span style={{ fontSize: '11.5px', color: 'var(--muted)', fontWeight: 800, fontFamily: 'var(--mono)' }}>
            ФОРМА КОНТРОЛЯ: ЭКЗАМЕН
          </span>
        </div>

        <h1 style={{
          fontSize: '30px',
          fontWeight: 700,
          color: 'var(--ink)',
          fontFamily: 'var(--font-serif)',
          lineHeight: 1.25,
          marginBottom: '8px'
        }}>
          {course.title}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
          <span style={{ fontSize: '13.5px', color: 'var(--muted)' }}>
            Ведущий преподаватель дисциплины:
          </span>
          <button
            onClick={() => onNavigateToFaculty('tuniyants-a-a')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary)',
              fontWeight: 800,
              fontSize: '14px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              textDecoration: 'underline',
              textUnderlineOffset: '3px'
            }}
          >
            <User size={15} color="var(--primary)" />
            {course.instructorName}
          </button>
        </div>

        <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6, maxWidth: '860px', marginBottom: '18px' }}>
          {course.description}
        </p>

        {/* Section Filter Pills */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          paddingTop: '16px',
          borderTop: '1px solid var(--line)'
        }}>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setSectionFilter('all')}
              className={`pill ${sectionFilter === 'all' ? 'pill-primary' : 'pill-neutral'}`}
              style={{ cursor: 'pointer', padding: '6px 14px' }}
            >
              Все 9 семинаров (34 ч.)
            </button>
            <button
              onClick={() => setSectionFilter('motivation')}
              className={`pill ${sectionFilter === 'motivation' ? 'pill-primary' : 'pill-neutral'}`}
              style={{ cursor: 'pointer', padding: '6px 14px' }}
            >
              Часть I: Мотивация (Сем. 1–5 · 18 ч.)
            </button>
            <button
              onClick={() => setSectionFilter('emotion')}
              className={`pill ${sectionFilter === 'emotion' ? 'pill-primary' : 'pill-neutral'}`}
              style={{ cursor: 'pointer', padding: '6px 14px' }}
            >
              Часть II: Эмоции (Сем. 6–9 · 16 ч.)
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleExpandAll}
              className="btn-ghost"
              style={{ padding: '5px 12px', fontSize: '12px' }}
            >
              Развернуть все
            </button>
            <button
              onClick={handleCollapseAll}
              className="btn-ghost"
              style={{ padding: '5px 12px', fontSize: '12px' }}
            >
              Свернуть все
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Quick-Jump Stepper Bar */}
      <div className="paper-card" style={{
        padding: '14px 20px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        background: 'var(--surface)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Перейти к теме:
          </span>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {course.seminars.map(s => {
              const isOpen = !!openSeminars[s.num];
              return (
                <button
                  key={s.num}
                  onClick={() => handleJumpToSeminar(s.num)}
                  className={`pill ${isOpen ? 'pill-primary' : 'pill-neutral'}`}
                  style={{
                    cursor: 'pointer',
                    minWidth: '34px',
                    height: '34px',
                    padding: '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '13px',
                    boxShadow: isOpen ? '0 2px 6px rgba(75, 50, 104, 0.25)' : 'none'
                  }}
                  title={`Семинар ${s.num}: ${s.title}`}
                >
                  {s.num}
                </button>
              );
            })}
          </div>
        </div>

        <span style={{ fontSize: '12px', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
          Клик по номеру открывает семинар и скроллит к нему
        </span>
      </div>

      {/* Seminars List */}
      <div>
        {filteredSeminars.map((sem) => {
          const isOpen = !!openSeminars[sem.num];
          return (
            <div 
              key={sem.num} 
              id={`seminar-card-${sem.num}`}
              className={`seminar-item ${isOpen ? 'open' : ''}`}
            >
              
              {/* Seminar Title Bar */}
              <div 
                className="seminar-title-bar"
                onClick={() => toggleSeminar(sem.num)}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                    <span className="pill pill-primary" style={{ fontSize: '11px', padding: '2px 8px' }}>
                      Семинар {sem.num}
                    </span>
                    <span style={{ fontSize: '11.5px', color: 'var(--muted)', fontWeight: 600, fontFamily: 'var(--mono)' }}>
                      <Clock size={11} style={{ display: 'inline', marginRight: '3px' }} />
                      {sem.hours} акад. ч.
                    </span>
                    <span style={{ fontSize: '11.5px', color: 'var(--muted)', fontWeight: 600 }}>
                      · {sem.questions.length} вопр.
                    </span>
                  </div>

                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: 'var(--ink)',
                    lineHeight: 1.3
                  }}>
                    {sem.title}
                  </h3>
                </div>

                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: isOpen ? 'var(--primary-light)' : 'var(--paper-soft)',
                  color: isOpen ? 'var(--primary)' : 'var(--muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '16px',
                  flexShrink: 0,
                  marginLeft: '12px'
                }}>
                  {isOpen ? '−' : '+'}
                </div>
              </div>

              {/* Seminar Body */}
              {isOpen && (
                <div className="seminar-content-area">
                  
                  {/* Topic Section Header */}
                  <div style={{
                    fontSize: '11.5px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontWeight: 800,
                    color: 'var(--muted)',
                    marginBottom: '16px',
                    fontFamily: 'var(--mono)',
                    paddingBottom: '8px',
                    borderBottom: '1px solid var(--line-soft)'
                  }}>
                    {sem.section}
                  </div>

                  {/* Block 1: Questions with Direct Literature Linking */}
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '6px' }}>
                      <strong style={{ fontSize: '13.5px', color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                        Вопросы к обсуждению на семинаре:
                      </strong>
                      <span style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 700 }}>
                        Кликните на вопрос для открытия текста в ридере ↓
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {sem.questions.map((q, idx) => (
                        <div
                          key={q.id || idx}
                          onClick={() => onOpenReaderBySourceId(q.sourceId)}
                          className="question-card"
                        >
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                            <span style={{
                              fontWeight: 800,
                              fontSize: '12px',
                              color: 'var(--primary)',
                              fontFamily: 'var(--mono)',
                              background: 'var(--primary-light)',
                              width: '26px',
                              height: '26px',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              marginTop: '2px'
                            }}>
                              {idx + 1}
                            </span>
                            <span style={{ fontSize: '14px', color: 'var(--ink)', lineHeight: 1.5, flex: 1, fontWeight: 600 }}>
                              {q.text}
                            </span>
                          </div>

                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '6px',
                            paddingLeft: '38px',
                            paddingTop: '8px',
                            borderTop: '1px dashed var(--line)',
                            marginTop: '4px'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: 'var(--muted)', flexWrap: 'wrap' }}>
                              <BookOpen size={13} color="var(--primary)" />
                              <strong style={{ color: 'var(--ink)' }}>{q.sourceAuthor}</strong>
                              <span>— {q.sourceTitle}</span>
                              <span className="pill pill-neutral" style={{ fontSize: '11px', padding: '1px 7px' }}>
                                {q.sourcePages}
                              </span>
                            </div>

                            <span style={{
                              fontSize: '12px',
                              fontWeight: 800,
                              color: 'var(--primary)',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '3px'
                            }}>
                              Читать в ридере <ArrowUpRight size={13} />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Block 2: Literature Mapped to Seminar */}
                  <div style={{ marginBottom: '22px' }}>
                    <strong style={{ fontSize: '13.5px', color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.03em', display: 'block', marginBottom: '10px' }}>
                      Рекомендуемые первоисточники семинара:
                    </strong>
                    <div>
                      {sem.literature.map((lit, idx) => (
                        <div
                          key={idx}
                          className="literature-entry"
                          onClick={() => onOpenReaderBySourceId(lit.sourceId)}
                        >
                          <div style={{ flex: 1, minWidth: '240px' }}>
                            <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '14px' }}>
                              {lit.author}
                            </span>{' '}
                            <span style={{ color: 'var(--muted)', fontSize: '13.5px' }}>
                              {lit.title}. — {lit.publisher}
                            </span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span className="pill pill-neutral" style={{ fontSize: '11px' }}>
                              {lit.pages}
                            </span>
                            <span className="pill pill-primary" style={{ fontSize: '11px' }}>
                              {lit.questionRef}
                            </span>
                            <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '2px', marginLeft: '4px' }}>
                              Читать <ArrowUpRight size={12} />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Block 3: Methodological Tip */}
                  {sem.tips && (
                    <div style={{
                      background: 'var(--paper-soft)',
                      border: '1px solid var(--line)',
                      borderLeft: '4px solid var(--teal)',
                      padding: '14px 18px',
                      borderRadius: 'var(--radius-sm)',
                      marginBottom: '18px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px'
                    }}>
                      <Lightbulb size={18} color="var(--teal)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <span style={{ fontWeight: 800, fontSize: '12px', color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                          Совет преподавателя (А.А. Туниянц):
                        </span>
                        <p style={{ fontSize: '13.5px', color: 'var(--ink)', marginTop: '3px', lineHeight: 1.55 }}>
                          {sem.tips}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Block 4: Key Terms */}
                  {sem.terms && sem.terms.length > 0 && (
                    <div style={{ paddingTop: '12px', borderTop: '1px solid var(--line)' }}>
                      <span style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                        Ключевые понятия темы (клик открывает статью в словаре):
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {sem.terms.map((t, idx) => (
                          <button
                            key={idx}
                            onClick={() => onNavigateToTerm(t)}
                            className="pill pill-neutral"
                            style={{ cursor: 'pointer', background: 'var(--surface)', fontSize: '12px' }}
                          >
                            <Tag size={11} color="var(--primary)" />
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
