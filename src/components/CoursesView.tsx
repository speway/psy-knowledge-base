import React, { useState } from 'react';
import { BookOpen, User, Clock, ChevronRight, HelpCircle, BookMarked, Lightbulb, Tag } from 'lucide-react';
import { COURSES, Course, SeminarItem } from '../data/courses';

interface CoursesViewProps {
  onOpenReaderBySourceId: (sourceId: string) => void;
  onNavigateToFaculty: (facultyId: string) => void;
  onNavigateToTerm: (term: string) => void;
  initialCourseId?: string;
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  onOpenReaderBySourceId,
  onNavigateToFaculty,
  onNavigateToTerm,
  initialCourseId = 'motivation-emotion'
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(initialCourseId);
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [activeSeminarNum, setActiveSeminarNum] = useState<number>(1);

  const filteredCourses = selectedYear === 'all' 
    ? COURSES 
    : COURSES.filter(c => c.year === selectedYear);

  const activeCourse = COURSES.find(c => c.id === selectedCourseId) || COURSES[0];
  const activeSeminar: SeminarItem | undefined = activeCourse.seminars.find(s => s.num === activeSeminarNum) || activeCourse.seminars[0];

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '80px' }}>
      
      {/* Page Title */}
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: 800, 
          color: 'var(--msu-blue-deep)', 
          fontFamily: 'var(--font-brand)',
          marginBottom: '6px'
        }}>
          Учебные дисциплины и программы семинаров
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          Оцифрованные учебные планы, силлабусы, списки первоисточников и методические рекомендации к семинарским занятиям.
        </p>
      </div>

      {/* Year Filter Pills */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: '4px' }}>
        {[
          { label: 'Все курсы', val: 'all' },
          { label: '1 курс бакалавриата', val: 1 },
          { label: '2 курс', val: 2 },
          { label: '3 курс', val: 3 }
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => setSelectedYear(item.val as number | 'all')}
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              fontSize: '12.5px',
              fontWeight: selectedYear === item.val ? 600 : 500,
              background: selectedYear === item.val ? 'var(--msu-blue-deep)' : '#ffffff',
              color: selectedYear === item.val ? '#ffffff' : 'var(--text-secondary)',
              border: '1px solid ' + (selectedYear === item.val ? 'var(--msu-blue-deep)' : 'var(--border-light)'),
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Course Selection Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px', marginBottom: '28px' }}>
        {filteredCourses.map((c) => {
          const isSelected = c.id === selectedCourseId;
          return (
            <div
              key={c.id}
              onClick={() => {
                setSelectedCourseId(c.id);
                setActiveSeminarNum(1);
              }}
              className="card-academic"
              style={{
                padding: '16px',
                cursor: 'pointer',
                borderColor: isSelected ? 'var(--msu-gold)' : 'var(--border-light)',
                background: isSelected ? '#fffefc' : '#ffffff',
                boxShadow: isSelected ? '0 0 0 1.5px var(--msu-gold), var(--shadow-sm)' : 'var(--shadow-sm)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span className="badge-blue" style={{ fontSize: '11px' }}>
                  {c.code} · {c.year} курс
                </span>
                <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                  {c.hours} ч. · {c.examType}
                </span>
              </div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--msu-blue-deep)', marginBottom: '4px' }}>
                {c.title}
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                Преподаватель: {c.instructorName}
              </p>
              {c.seminars.length > 0 ? (
                <span className="badge-gold" style={{ fontSize: '11px' }}>
                  Оцифровано 9 семинаров
                </span>
              ) : (
                <span className="badge-neutral" style={{ fontSize: '11px' }}>
                  В процессе оцифровки
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Course Detail */}
      <div className="card-academic" style={{ padding: '20px', marginBottom: '24px', borderTop: '3px solid var(--msu-blue-deep)' }}>
        
        {/* Course Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '16px', borderBottom: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <span className="badge-gold">
              Флагманский курс кафедры
            </span>
            <div style={{ display: 'flex', gap: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
              <span><Clock size={12} style={{ display: 'inline', marginRight: '3px' }} />{activeCourse.hours} акад. часа</span>
              <span>•</span>
              <span>{activeCourse.semester}</span>
            </div>
          </div>

          <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--msu-blue-deep)' }}>
            {activeCourse.title}
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Лектор и ведущий преподаватель:
            </span>
            <button
              onClick={() => onNavigateToFaculty(activeCourse.instructorId)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: '#f1f5f9',
                border: '1px solid #cbd5e1',
                padding: '3px 8px',
                borderRadius: '6px',
                fontSize: '12.5px',
                fontWeight: 600,
                color: 'var(--msu-blue-primary)',
                cursor: 'pointer'
              }}
            >
              <User size={12} />
              {activeCourse.instructorName}
              <ChevronRight size={12} />
            </button>
          </div>

          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.5 }}>
            {activeCourse.description}
          </p>
        </div>

        {/* Seminar Section */}
        {activeCourse.seminars.length > 0 ? (
          <div style={{ marginTop: '20px' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--msu-blue-deep)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <BookOpen size={16} color="var(--msu-gold)" />
                План семинарских занятий (9 семинаров)
              </h3>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Выберите семинар:
              </span>
            </div>

            {/* Seminar Stepper Pills (Optimized for Mobile Touch) */}
            <div style={{ 
              display: 'flex', 
              gap: '6px', 
              overflowX: 'auto', 
              paddingBottom: '8px', 
              marginBottom: '16px',
              WebkitOverflowScrolling: 'touch' 
            }}>
              {activeCourse.seminars.map((s) => {
                const isActive = s.num === activeSeminarNum;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveSeminarNum(s.num)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: '56px',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      background: isActive ? 'var(--msu-blue-deep)' : '#f8fafc',
                      color: isActive ? '#ffffff' : 'var(--text-main)',
                      border: '1px solid ' + (isActive ? 'var(--msu-blue-deep)' : 'var(--border-light)'),
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      flexShrink: 0
                    }}
                  >
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', opacity: isActive ? 0.9 : 0.6 }}>Сем.</span>
                    <span style={{ fontSize: '16px', fontWeight: 700 }}>{s.num}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Seminar Details Card */}
            {activeSeminar && (
              <div className="animate-fade-in" style={{
                background: '#f8fafc',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                
                {/* Seminar Title & Topic */}
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span className="badge-gold">
                      Семинар {activeSeminar.num} из 9
                    </span>
                  </div>
                  <h4 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--msu-blue-deep)' }}>
                    {activeSeminar.title}
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {activeSeminar.topic}
                  </p>
                </div>

                {/* Block 1: Questions */}
                <div style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '14px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px', color: 'var(--msu-blue-primary)', fontWeight: 700, fontSize: '13.5px' }}>
                    <HelpCircle size={16} />
                    <span>Вопросы для подготовки к семинару</span>
                  </div>
                  <ol style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {activeSeminar.questions.map((q, idx) => (
                      <li key={idx} style={{ fontSize: '13px', color: 'var(--text-main)', lineHeight: 1.45 }}>
                        {q}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Block 2: Literature with Reader Trigger */}
                <div style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '14px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px', color: 'var(--msu-blue-primary)', fontWeight: 700, fontSize: '13.5px' }}>
                    <BookMarked size={16} />
                    <span>Рекомендуемые первоисточники к занятию</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {activeSeminar.literature.map((lit, idx) => {
                      const matchedSourceId = activeSeminar.sourceIds && activeSeminar.sourceIds[idx];
                      return (
                        <div 
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '8px',
                            padding: '8px 10px',
                            background: '#f8fafc',
                            borderRadius: '6px',
                            border: '1px solid #edf2f7'
                          }}
                        >
                          <span style={{ fontSize: '12.5px', color: 'var(--text-main)', flex: 1, minWidth: '220px' }}>
                            📖 {lit}
                          </span>
                          {matchedSourceId && (
                            <button
                              onClick={() => onOpenReaderBySourceId(matchedSourceId)}
                              className="btn-outline"
                              style={{ padding: '4px 10px', fontSize: '11.5px', fontWeight: 600, color: 'var(--msu-blue-primary)' }}
                            >
                              Читать в ридере ↗
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Block 3: Study Tips */}
                {activeSeminar.tips && (
                  <div style={{
                    background: 'var(--msu-gold-light)',
                    border: '1px solid rgba(201, 151, 54, 0.3)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px'
                  }}>
                    <Lightbulb size={18} color="var(--msu-gold-hover)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <span style={{ fontWeight: 700, fontSize: '12.5px', color: 'var(--msu-blue-deep)' }}>
                        Методический совет студентам:
                      </span>
                      <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.45 }}>
                        {activeSeminar.tips}
                      </p>
                    </div>
                  </div>
                )}

                {/* Block 4: Key Terms */}
                {activeSeminar.terms && activeSeminar.terms.length > 0 && (
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                      Ключевые понятия темы (нажмите для перехода в словарь):
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {activeSeminar.terms.map((t, idx) => (
                        <button
                          key={idx}
                          onClick={() => onNavigateToTerm(t)}
                          className="badge-neutral"
                          style={{ cursor: 'pointer', background: '#ffffff', borderColor: '#cbd5e1', fontSize: '11.5px' }}
                        >
                          <Tag size={11} style={{ marginRight: '3px' }} />
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>
        ) : (
          <div style={{ padding: '30px 16px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <p>Учебная программа данного курса находится в процессе структурирования и оцифровки кафедрой.</p>
          </div>
        )}

      </div>

    </div>
  );
};
