import React, { useState } from 'react';
import { 
  Clock, 
  User, 
  BookOpen, 
  Lightbulb, 
  Tag, 
  ArrowUpRight, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  FileText,
  Bookmark,
  Sparkles,
  HelpCircle
} from 'lucide-react';
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

  const handleJumpToSeminar = (num: number) => {
    setOpenSeminars(prev => ({ ...prev, [num]: true }));
    setTimeout(() => {
      const el = document.getElementById(`seminar-card-${num}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
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
        padding: '30px 26px',
        marginBottom: '24px',
        background: 'var(--surface)',
        borderLeft: '5px solid var(--primary)',
        boxShadow: 'var(--shadow-sm)'
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
          fontWeight: 800,
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
              style={{ cursor: 'pointer', padding: '6px 14px', fontWeight: sectionFilter === 'all' ? 800 : 600 }}
            >
              Все 9 семинаров (34 ч.)
            </button>
            <button
              onClick={() => setSectionFilter('motivation')}
              className={`pill ${sectionFilter === 'motivation' ? 'pill-primary' : 'pill-neutral'}`}
              style={{ cursor: 'pointer', padding: '6px 14px', fontWeight: sectionFilter === 'motivation' ? 800 : 600 }}
            >
              Часть I: Мотивация (Сем. 1–5 · 18 ч.)
            </button>
            <button
              onClick={() => setSectionFilter('emotion')}
              className={`pill ${sectionFilter === 'emotion' ? 'pill-primary' : 'pill-neutral'}`}
              style={{ cursor: 'pointer', padding: '6px 14px', fontWeight: sectionFilter === 'emotion' ? 800 : 600 }}
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
        marginBottom: '22px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        background: 'var(--surface)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Навигатор семинаров:
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
                    minWidth: '36px',
                    height: '36px',
                    padding: '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '13.5px',
                    boxShadow: isOpen ? '0 2px 8px rgba(75, 50, 104, 0.28)' : 'none',
                    transition: 'all 0.15s ease'
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
          Клик по номеру открывает тему и фокусирует занятие
        </span>
      </div>

      {/* Textured Seminars List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredSeminars.map((sem) => {
          const isOpen = !!openSeminars[sem.num];
          return (
            <div 
              key={sem.num} 
              id={`seminar-card-${sem.num}`}
              style={{
                background: 'var(--surface)',
                border: isOpen ? '1.5px solid var(--primary-border)' : '1px solid var(--line)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                boxShadow: isOpen ? '0 6px 24px rgba(45, 31, 63, 0.07)' : 'var(--shadow-sm)',
                transition: 'all 0.2s ease'
              }}
            >
              
              {/* Seminar Header Bar */}
              <div 
                onClick={() => toggleSeminar(sem.num)}
                style={{
                  padding: '18px 22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  background: isOpen ? 'var(--paper-soft)' : 'var(--surface)',
                  borderBottom: isOpen ? '1px solid var(--line)' : 'none',
                  userSelect: 'none',
                  transition: 'background 0.15s ease'
                }}
              >
                <div style={{ flex: 1, paddingRight: '12px' }}>
                  
                  {/* Top Badges Matrix */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <span style={{
                      background: 'var(--primary)',
                      color: '#ffffff',
                      fontSize: '11px',
                      fontWeight: 800,
                      fontFamily: 'var(--mono)',
                      padding: '3px 10px',
                      borderRadius: 'var(--radius-full)',
                      letterSpacing: '0.04em'
                    }}>
                      СЕМИНАР {sem.num < 10 ? `0${sem.num}` : sem.num}
                    </span>

                    <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 700, fontFamily: 'var(--mono)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                      <Clock size={12} color="var(--primary)" />
                      {sem.hours} акад. ч.
                    </span>

                    <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 600 }}>
                      · {sem.questions.length} вопросов
                    </span>

                    <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 600 }}>
                      · {sem.literature.length} первоисточника в ридере
                    </span>
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: '19px',
                    fontWeight: 800,
                    color: 'var(--ink)',
                    lineHeight: 1.3,
                    fontFamily: 'var(--font-serif)'
                  }}>
                    {sem.title}
                  </h3>
                </div>

                {/* Toggle Pill Indicator */}
                <div style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  background: isOpen ? 'var(--primary)' : 'var(--paper-soft)',
                  color: isOpen ? '#ffffff' : 'var(--ink)',
                  fontSize: '12px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  flexShrink: 0,
                  transition: 'all 0.18s ease'
                }}>
                  <span>{isOpen ? 'Свернуть' : 'Открыть'}</span>
                  {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </div>
              </div>

              {/* Seminar Expanded Body */}
              {isOpen && (
                <div style={{ padding: '24px 22px', background: 'var(--surface)' }}>
                  
                  {/* Topic Section Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontWeight: 800,
                    color: 'var(--primary)',
                    marginBottom: '18px',
                    fontFamily: 'var(--mono)',
                    paddingBottom: '8px',
                    borderBottom: '1px solid var(--line-soft)'
                  }}>
                    <Bookmark size={13} />
                    <span>{sem.section}</span>
                  </div>

                  {/* BLOCK 1: Questions with Bibliographic Ticket & Reader Launch */}
                  <div style={{ marginBottom: '26px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '6px' }}>
                      <strong style={{ fontSize: '14px', color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.03em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <HelpCircle size={15} color="var(--primary)" />
                        Вопросы к обсуждению на семинарском занятии:
                      </strong>
                      <span style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 700 }}>
                        Клик по вопросу открывает первоисточник в ридере ↓
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {sem.questions.map((q, idx) => (
                        <div
                          key={q.id || idx}
                          onClick={() => onOpenReaderBySourceId(q.sourceId)}
                          style={{
                            background: 'var(--surface-soft)',
                            border: '1px solid var(--line)',
                            borderLeft: '4px solid var(--primary)',
                            borderRadius: 'var(--radius-sm)',
                            padding: '16px 18px',
                            cursor: 'pointer',
                            transition: 'all 0.18s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--primary)';
                            e.currentTarget.style.background = '#ffffff';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 18px rgba(75, 50, 104, 0.08)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--line)';
                            e.currentTarget.style.background = 'var(--surface-soft)';
                            e.currentTarget.style.transform = 'none';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          {/* Question Statement */}
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                            <span style={{
                              fontWeight: 800,
                              fontSize: '12px',
                              color: 'var(--primary)',
                              fontFamily: 'var(--mono)',
                              background: 'var(--primary-light)',
                              width: '28px',
                              height: '28px',
                              borderRadius: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              marginTop: '1px'
                            }}>
                              №{idx + 1}
                            </span>
                            <span style={{ fontSize: '14.5px', color: 'var(--ink)', lineHeight: 1.5, flex: 1, fontWeight: 600 }}>
                              {q.text}
                            </span>
                          </div>

                          {/* Bibliographic Reference Ticket */}
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '8px',
                            paddingLeft: '40px',
                            paddingTop: '8px',
                            borderTop: '1px dashed var(--line)'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: 'var(--muted)', flexWrap: 'wrap' }}>
                              <BookOpen size={13} color="var(--primary)" />
                              <strong style={{ color: 'var(--ink)' }}>{q.sourceAuthor}</strong>
                              <span>— {q.sourceTitle}</span>
                              <span style={{
                                background: 'var(--paper-soft)',
                                color: 'var(--ink-soft)',
                                padding: '2px 8px',
                                borderRadius: '4px',
                                fontSize: '11px',
                                fontWeight: 600,
                                fontFamily: 'var(--mono)'
                              }}>
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

                  {/* BLOCK 2: Literature Mapped to Seminar */}
                  <div style={{ marginBottom: '24px' }}>
                    <strong style={{ fontSize: '13.5px', color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.03em', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                      <FileText size={15} color="var(--primary)" />
                      Оцифрованные первоисточники темы:
                    </strong>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {sem.literature.map((lit, idx) => (
                        <div
                          key={idx}
                          className="literature-entry"
                          onClick={() => onOpenReaderBySourceId(lit.sourceId)}
                          style={{ padding: '12px 16px' }}
                        >
                          <div style={{ flex: 1, minWidth: '240px' }}>
                            <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '14px' }}>
                              {lit.author}
                            </span>{' '}
                            <span style={{ color: 'var(--muted)', fontSize: '13.5px' }}>
                              {lit.title}. — {lit.publisher}
                            </span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span className="pill pill-neutral" style={{ fontSize: '11px', fontFamily: 'var(--mono)' }}>
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

                  {/* BLOCK 3: Methodological Tip */}
                  {sem.tips && (
                    <div style={{
                      background: 'var(--paper-soft)',
                      border: '1px solid var(--line)',
                      borderLeft: '4px solid var(--teal)',
                      padding: '16px 20px',
                      borderRadius: 'var(--radius-sm)',
                      marginBottom: '20px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px'
                    }}>
                      <Lightbulb size={20} color="var(--teal)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <span style={{ fontWeight: 800, fontSize: '12px', color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          Методический акцент преподавателя (А.А. Туниянц):
                        </span>
                        <p style={{ fontSize: '13.5px', color: 'var(--ink)', marginTop: '4px', lineHeight: 1.6 }}>
                          {sem.tips}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* BLOCK 4: Key Terms */}
                  {sem.terms && sem.terms.length > 0 && (
                    <div style={{ paddingTop: '14px', borderTop: '1px solid var(--line)' }}>
                      <span style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '8px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                        Понятийный тезаурус темы (клик открывает словарную статью):
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {sem.terms.map((t, idx) => (
                          <button
                            key={idx}
                            onClick={() => onNavigateToTerm(t)}
                            className="pill pill-neutral"
                            style={{
                              cursor: 'pointer',
                              background: 'var(--surface)',
                              fontSize: '12.5px',
                              padding: '5px 12px',
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
                            <Tag size={12} color="var(--primary)" />
                            <span>{t}</span>
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
