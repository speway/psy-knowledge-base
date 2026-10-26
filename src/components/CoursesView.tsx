import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Clock, User, CheckCircle2, Lightbulb, Tag, ExternalLink } from 'lucide-react';
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
      
      {/* Course Hero Banner (Zarina's style) */}
      <div className="card-clean" style={{
        padding: '24px',
        marginBottom: '24px',
        background: 'linear-gradient(135deg, #ffffff 0%, #f4f8fa 100%)',
        borderLeft: '4px solid var(--turq)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="badge-tag badge-turq">1 курс бакалавриата</span>
            <span className="badge-tag badge-blue">2 семестр</span>
            <span className="badge-tag badge-lilac">34 академических часа</span>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>
            Форма контроля: Экзамен
          </span>
        </div>

        <h1 style={{
          fontSize: '25px',
          fontWeight: 800,
          color: 'var(--blue-deep)',
          fontFamily: 'var(--font-serif)',
          lineHeight: 1.25,
          marginBottom: '6px'
        }}>
          {course.title}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Ведущий преподаватель дисциплины:
          </span>
          <button
            onClick={() => onNavigateToFaculty('tuniyants-a-a')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--blue-mid)',
              fontWeight: 700,
              fontSize: '13.5px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              textDecoration: 'underline'
            }}
          >
            <User size={14} />
            {course.instructorName}
          </button>
        </div>

        <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5, maxWidth: '840px' }}>
          {course.description}
        </p>

        {/* Global Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px', paddingTop: '14px', borderTop: '1px solid var(--border-light)' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--blue-deep)' }}>
            Семинарский план: 9 занятий (34 часа)
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleExpandAll}
              style={{
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--blue-deep)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Развернуть все
            </button>
            <button
              onClick={handleCollapseAll}
              style={{
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Свернуть все
            </button>
          </div>
        </div>
      </div>

      {/* Seminars List (Zarina's exact accordion structure & logic) */}
      <div>
        {course.seminars.map((sem) => {
          const isOpen = !!openSeminars[sem.num];
          return (
            <div key={sem.num} className={`seminar-card ${isOpen ? 'is-open' : ''}`}>
              
              {/* Accordion Header */}
              <div 
                className="seminar-header"
                onClick={() => toggleSeminar(sem.num)}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                    <span className="badge-tag badge-turq" style={{ fontSize: '11px', padding: '1px 8px' }}>
                      Семинар {sem.num}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>
                      <Clock size={12} style={{ display: 'inline', marginRight: '3px' }} />
                      {sem.hours} акад. ч.
                    </span>
                  </div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: 'var(--blue-deep)',
                    lineHeight: 1.3
                  }}>
                    {sem.title}
                  </h3>
                </div>

                <div className="seminar-toggle-btn">
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </div>

              {/* Accordion Body */}
              {isOpen && (
                <div className="seminar-body">
                  
                  {/* Section name */}
                  <div style={{
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    fontWeight: 700,
                    color: 'var(--blue-mid)',
                    marginBottom: '8px'
                  }}>
                    {sem.section}
                  </div>

                  {/* Questions block */}
                  <div style={{ marginBottom: '18px' }}>
                    <strong style={{ fontSize: '13.5px', color: 'var(--blue-deep)', display: 'block', marginBottom: '6px' }}>
                      Вопросы к семинарскому занятию:
                    </strong>
                    <ol className="questions-list">
                      {sem.questions.map((q, idx) => (
                        <li key={idx}>
                          <span>{q}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Literature block with click-to-read (Zarina's exact logic) */}
                  <div style={{ marginBottom: '18px' }}>
                    <strong style={{ fontSize: '13.5px', color: 'var(--blue-deep)', display: 'block', marginBottom: '8px' }}>
                      📚 Рекомендуемая литература — клик открывает полные страницы в читалке:
                    </strong>
                    <div>
                      {sem.literature.map((lit, idx) => (
                        <div
                          key={idx}
                          className="lit-click-item"
                          onClick={() => onOpenReaderBySourceId(lit.sourceId)}
                        >
                          <div style={{ flex: 1, minWidth: '220px' }}>
                            <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '13.5px' }}>
                              {lit.author}
                            </span>{' '}
                            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                              {lit.title}. — {lit.publisher}
                            </span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span className="badge-tag badge-turq">
                              {lit.pages}
                            </span>
                            <span className="badge-tag badge-lilac">
                              {lit.questionRef}
                            </span>
                            <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--blue-mid)', marginLeft: '4px' }}>
                              Читать ↗
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Methodological Tip from Teacher */}
                  {sem.tips && (
                    <div style={{
                      background: 'var(--lilac-soft)',
                      borderLeft: '3px solid var(--lilac)',
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-sm)',
                      marginBottom: '14px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px'
                    }}>
                      <Lightbulb size={18} color="var(--lilac)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <span style={{ fontWeight: 700, fontSize: '12.5px', color: 'var(--lilac)' }}>
                          Совет преподавателя (А.А. Туниянц):
                        </span>
                        <p style={{ fontSize: '12.5px', color: 'var(--text)', marginTop: '2px', lineHeight: 1.45 }}>
                          {sem.tips}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Key Terms tags (click jumps to dictionary) */}
                  {sem.terms && sem.terms.length > 0 && (
                    <div>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                        Ключевые понятия темы (нажмите для поиска в словаре):
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {sem.terms.map((t, idx) => (
                          <button
                            key={idx}
                            onClick={() => onNavigateToTerm(t)}
                            className="badge-tag badge-blue"
                            style={{ cursor: 'pointer', background: '#ffffff', borderColor: 'var(--border)' }}
                          >
                            <Tag size={11} />
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
