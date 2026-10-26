import React, { useState } from 'react';
import { ExternalLink, BookOpen, GraduationCap, Award, FileCheck, CheckCircle2 } from 'lucide-react';
import { FACULTY_MEMBERS, FacultyMember } from '../data/faculty';

interface FacultyViewProps {
  onNavigateToCourse: (courseId: string) => void;
  onOpenReaderBySourceId: (sourceId: string) => void;
}

export const FacultyView: React.FC<FacultyViewProps> = ({ onNavigateToCourse }) => {
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('Все');
  const [activeProfileTab, setActiveProfileTab] = useState<'courses' | 'theses' | 'research' | 'publications'>('courses');

  const allSpecializations = ['Все', 'Организационная психология', 'Профессиональная социализация', 'Субъективное благополучие', 'Общая психология'];

  const filteredFaculty = selectedSpecialization === 'Все'
    ? FACULTY_MEMBERS
    : FACULTY_MEMBERS.filter(f => f.specializations.some(s => s.toLowerCase().includes(selectedSpecialization.toLowerCase())));

  const tuniyants = FACULTY_MEMBERS.find(f => f.id === 'tuniyants-a-a') || FACULTY_MEMBERS[0];

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '80px' }}>
      
      {/* Title & Context */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }} className="badge-gold">
          <Award size={14} />
          <span>Кафедра психологии Филиала МГУ в г. Ташкенте</span>
        </div>
        <h1 style={{ 
          fontSize: '26px', 
          fontWeight: 800, 
          color: 'var(--msu-blue-deep)', 
          fontFamily: 'var(--font-brand)',
          lineHeight: 1.25,
          marginBottom: '8px'
        }}>
          Научные профили преподавателей
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', maxWidth: '780px' }}>
          Единая академическая база данных профессорско-преподавательского состава: научные интересы, 
          исследовательские взгляды, читаемые курсы, публикации и руководство студенческими исследованиями.
        </p>
      </div>

      {/* Specialization Filter Pills */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        overflowX: 'auto', 
        paddingBottom: '8px', 
        marginBottom: '24px',
        WebkitOverflowScrolling: 'touch'
      }}>
        {allSpecializations.map((spec) => (
          <button
            key={spec}
            onClick={() => setSelectedSpecialization(spec)}
            style={{
              padding: '7px 14px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: selectedSpecialization === spec ? 600 : 500,
              background: selectedSpecialization === spec ? 'var(--msu-blue-deep)' : '#ffffff',
              color: selectedSpecialization === spec ? '#ffffff' : 'var(--text-secondary)',
              border: '1px solid ' + (selectedSpecialization === spec ? 'var(--msu-blue-deep)' : 'var(--border-light)'),
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease'
            }}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Flagship Profile: Туниянц Анна Александровна */}
      <div className="card-academic" style={{ 
        padding: '24px', 
        marginBottom: '32px',
        borderLeft: '4px solid var(--msu-gold)',
        boxShadow: 'var(--shadow-md)'
      }}>
        
        {/* Header Block with Avatar & Key Info */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '16px',
          paddingBottom: '20px',
          borderBottom: '1px solid var(--border-light)'
        }}>
          <style>{`
            @media (min-width: 640px) {
              .faculty-header-row {
                flex-direction: row !important;
                align-items: flex-start !important;
              }
            }
          `}</style>
          <div className="faculty-header-row" style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
            
            {/* Avatar / Monogram */}
            <div style={{
              width: '74px',
              height: '74px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0c2340 0%, #153a6b 100%)',
              border: '3px solid var(--msu-gold)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '26px',
              fontWeight: 700,
              fontFamily: 'var(--font-brand)',
              flexShrink: 0,
              boxShadow: 'var(--shadow-md)'
            }}>
              {tuniyants.avatarText}
            </div>

            {/* Name & Credentials */}
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                <span className="badge-gold">
                  <CheckCircle2 size={12} />
                  {tuniyants.badge}
                </span>
                <span className="badge-blue">
                  {tuniyants.experience}
                </span>
              </div>

              <h2 style={{ 
                fontSize: '22px', 
                fontWeight: 700, 
                color: 'var(--msu-blue-deep)', 
                marginBottom: '4px' 
              }}>
                {tuniyants.name}
              </h2>
              
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>
                {tuniyants.role} · {tuniyants.department}
              </p>

              {/* Istina MSU Connection Button */}
              {tuniyants.istinaUrl && (
                <a
                  href={tuniyants.istinaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: '#f8fafc',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    padding: '4px 10px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'var(--msu-blue-primary)',
                    textDecoration: 'none',
                    transition: 'all 0.15s ease'
                  }}
                  title="Открыть профиль в ИСТИНА МГУ"
                >
                  <span style={{ fontWeight: 800, color: '#b91c1c' }}>ИСТИНА</span>
                  <span>МГУ (ID: {tuniyants.istinaId})</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>

          </div>

          {/* Specialization Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
            {tuniyants.specializations.map((spec, i) => (
              <span key={i} className="badge-neutral" style={{ fontSize: '11.5px' }}>
                #{spec}
              </span>
            ))}
          </div>
        </div>

        {/* Profile Internal Sub-Navigation */}
        <div style={{ 
          display: 'flex', 
          borderBottom: '1px solid var(--border-light)', 
          margin: '16px 0',
          gap: '4px',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch'
        }}>
          <button
            onClick={() => setActiveProfileTab('courses')}
            style={{
              padding: '10px 14px',
              border: 'none',
              background: 'none',
              borderBottom: activeProfileTab === 'courses' ? '2px solid var(--msu-blue-deep)' : '2px solid transparent',
              color: activeProfileTab === 'courses' ? 'var(--msu-blue-deep)' : 'var(--text-muted)',
              fontWeight: activeProfileTab === 'courses' ? 700 : 500,
              fontSize: '13.5px',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            Дисциплины курса ({tuniyants.coursesTaught.length})
          </button>

          <button
            onClick={() => setActiveProfileTab('theses')}
            style={{
              padding: '10px 14px',
              border: 'none',
              background: 'none',
              borderBottom: activeProfileTab === 'theses' ? '2px solid var(--msu-blue-deep)' : '2px solid transparent',
              color: activeProfileTab === 'theses' ? 'var(--msu-blue-deep)' : 'var(--text-muted)',
              fontWeight: activeProfileTab === 'theses' ? 700 : 500,
              fontSize: '13.5px',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            Темы курсовых и ВКР ({tuniyants.thesisTopics.length})
          </button>

          <button
            onClick={() => setActiveProfileTab('research')}
            style={{
              padding: '10px 14px',
              border: 'none',
              background: 'none',
              borderBottom: activeProfileTab === 'research' ? '2px solid var(--msu-blue-deep)' : '2px solid transparent',
              color: activeProfileTab === 'research' ? 'var(--msu-blue-deep)' : 'var(--text-muted)',
              fontWeight: activeProfileTab === 'research' ? 700 : 500,
              fontSize: '13.5px',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            Научные направления ({tuniyants.researchFields.length})
          </button>

          <button
            onClick={() => setActiveProfileTab('publications')}
            style={{
              padding: '10px 14px',
              border: 'none',
              background: 'none',
              borderBottom: activeProfileTab === 'publications' ? '2px solid var(--msu-blue-deep)' : '2px solid transparent',
              color: activeProfileTab === 'publications' ? 'var(--msu-blue-deep)' : 'var(--text-muted)',
              fontWeight: activeProfileTab === 'publications' ? 700 : 500,
              fontSize: '13.5px',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            Публикации в Вестнике МГУ ({tuniyants.publications.length})
          </button>
        </div>

        {/* Tab 1: Courses */}
        {activeProfileTab === 'courses' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{
              background: 'var(--msu-gold-light)',
              border: '1px solid rgba(201, 151, 54, 0.3)',
              borderRadius: 'var(--radius-sm)',
              padding: '14px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ fontWeight: 700, color: 'var(--msu-blue-deep)', fontSize: '15px' }}>
                  Психология мотивации и эмоций
                </span>
                <span className="badge-gold">1 курс · 34 часа · Экзамен</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Фундаментальный академический курс для бакалавров 1 курса (2 семестр). 
                Включает 9 детально оцифрованных семинаров с вопросами, первоисточниками и методическими советами.
              </p>
              <div>
                <button
                  onClick={() => onNavigateToCourse('motivation-emotion')}
                  className="btn-primary"
                  style={{ fontSize: '13px', padding: '6px 14px' }}
                >
                  <BookOpen size={14} />
                  Перейти к программе курса и семинарам →
                </button>
              </div>
            </div>

            <div style={{
              background: '#f8fafc',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 16px'
            }}>
              <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '14px' }}>
                Организационное консультирование и поведение
              </span>
              <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
                Спецкурс для студентов старших курсов: психодиагностика корпоративной культуры, ассессмент-центр и фасилитация.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Theses Topics */}
        {activeProfileTab === 'theses' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
              Темы для курсовых и выпускных квалификационных работ (ВКР), предлагаемые для научного руководства:
            </p>
            {tuniyants.thesisTopics.map((topic, i) => (
              <div 
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  background: '#f8fafc',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-light)'
                }}
              >
                <div style={{ 
                  color: 'var(--msu-gold-hover)', 
                  fontWeight: 700, 
                  fontSize: '13px',
                  marginTop: '1px'
                }}>
                  {i + 1}.
                </div>
                <span style={{ fontSize: '13.5px', color: 'var(--text-main)' }}>
                  {topic}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Research Fields */}
        {activeProfileTab === 'research' && (
          <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
            {tuniyants.researchFields.map((field) => (
              <div 
                key={field.id}
                style={{
                  background: '#f8fafc',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '14px'
                }}
              >
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--msu-blue-deep)', marginBottom: '6px' }}>
                  {field.title}
                </h4>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {field.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Publications */}
        {activeProfileTab === 'publications' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {tuniyants.publications.map((pub, i) => (
              <div 
                key={i}
                style={{
                  background: '#f8fafc',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                  <span className="badge-blue" style={{ fontSize: '11px' }}>
                    {pub.year} год
                  </span>
                  {pub.doi && (
                    <a 
                      href={pub.doi} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ fontSize: '12px', color: 'var(--msu-blue-primary)', display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
                    >
                      Истина МГУ <ExternalLink size={12} />
                    </a>
                  )}
                </div>
                <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--msu-blue-deep)' }}>
                  «{pub.title}»
                </h4>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                  Авторы: <strong>{pub.authors}</strong>
                </p>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {pub.journal}
                </p>
                <p style={{ fontSize: '12.5px', color: 'var(--text-main)', marginTop: '4px', fontStyle: 'italic', background: '#ffffff', padding: '8px', borderRadius: '4px', border: '1px solid #edf2f7' }}>
                  {pub.abstract}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Overview of other department sections (Demonstrating Scalability to Head of Department) */}
      <div>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: 700, 
          color: 'var(--msu-blue-deep)', 
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <GraduationCap size={18} color="var(--msu-gold)" />
          Общекафедральные направления и научные консультанты
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {filteredFaculty.filter(f => f.id !== 'tuniyants-a-a').map((member) => (
            <div key={member.id} className="card-academic" style={{ padding: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-light)',
                  color: 'var(--msu-blue-deep)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '16px',
                  fontFamily: 'var(--font-brand)',
                  flexShrink: 0
                }}>
                  {member.avatarText}
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--msu-blue-deep)' }}>
                    {member.name}
                  </h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {member.role}
                  </p>
                </div>
              </div>

              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '12px', lineHeight: 1.45 }}>
                {member.summary}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {member.specializations.map((spec, i) => (
                  <span key={i} className="badge-neutral" style={{ fontSize: '11px' }}>
                    {spec}
                  </span>
                ))}
              </div>

              {member.istinaUrl && (
                <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--border-light)' }}>
                  <a
                    href={member.istinaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '12px', color: 'var(--msu-blue-primary)', display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none', fontWeight: 600 }}
                  >
                    Профиль в ИСТИНА МГУ <ExternalLink size={12} />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
