import React, { useState } from 'react';
import { ExternalLink, BookOpen, Users, GraduationCap, CheckCircle2, Award } from 'lucide-react';
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
    <div style={{ paddingBottom: '90px' }}>
      
      {/* Title */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }} className="badge-tag badge-turq">
          <Users size={13} />
          <span>Кафедра психологии</span>
        </div>
        <h1 style={{
          fontSize: '25px',
          fontWeight: 800,
          color: 'var(--blue-deep)',
          fontFamily: 'var(--font-serif)',
          lineHeight: 1.25,
          marginBottom: '6px'
        }}>
          Научные профили преподавателей
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '820px' }}>
          Академические профили преподавательского состава Филиала МГУ в г. Ташкенте: исследовательские интересы, 
          публикационная активность в системе ИСТИНА МГУ, читаемые дисциплины и руководство ВКР.
        </p>
      </div>

      {/* Specialization Filter Pills */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '20px', WebkitOverflowScrolling: 'touch' }}>
        {allSpecializations.map((spec) => (
          <button
            key={spec}
            onClick={() => setSelectedSpecialization(spec)}
            style={{
              padding: '5px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '12.5px',
              fontWeight: selectedSpecialization === spec ? 700 : 500,
              background: selectedSpecialization === spec ? 'var(--blue-deep)' : '#ffffff',
              color: selectedSpecialization === spec ? '#ffffff' : 'var(--text-secondary)',
              border: '1px solid ' + (selectedSpecialization === spec ? 'var(--blue-deep)' : 'var(--border)'),
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Flagship Profile: Туниянц Анна Александровна */}
      <div className="card-clean" style={{
        padding: '24px',
        marginBottom: '28px',
        borderLeft: '4px solid var(--turq)'
      }}>
        
        {/* Profile Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '18px', borderBottom: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
            
            {/* Monogram Avatar */}
            <div style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #245266 0%, #358682 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 800,
              fontFamily: 'var(--font-serif)',
              flexShrink: 0,
              boxShadow: 'var(--shadow-sm)'
            }}>
              {tuniyants.avatarText}
            </div>

            <div style={{ flex: 1, minWidth: '260px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                <span className="badge-tag badge-turq">
                  {tuniyants.badge}
                </span>
                <span className="badge-tag badge-blue">
                  {tuniyants.experience}
                </span>
              </div>

              <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--blue-deep)', fontFamily: 'var(--font-serif)', marginBottom: '3px' }}>
                {tuniyants.name}
              </h2>

              <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                {tuniyants.role} · {tuniyants.department}
              </p>

              {/* Istina MSU Link */}
              {tuniyants.istinaUrl && (
                <a
                  href={tuniyants.istinaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: '#f4f8fa',
                    border: '1px solid #c2d6e2',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: 'var(--blue-deep)',
                    textDecoration: 'none'
                  }}
                >
                  <span style={{ color: '#b54632' }}>ИСТИНА МГУ</span>
                  <span>(ID: {tuniyants.istinaId})</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>

          </div>

          {/* Specialization Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {tuniyants.specializations.map((spec, i) => (
              <span key={i} className="badge-tag badge-blue" style={{ fontSize: '11px' }}>
                #{spec}
              </span>
            ))}
          </div>
        </div>

        {/* Profile Internal Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--border-light)',
          margin: '16px 0',
          gap: '4px',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch'
        }}>
          {[
            { id: 'courses', label: `Дисциплины (${tuniyants.coursesTaught.length})` },
            { id: 'theses', label: `Темы ВКР (${tuniyants.thesisTopics.length})` },
            { id: 'research', label: `Направления (${tuniyants.researchFields.length})` },
            { id: 'publications', label: `Публикации (${tuniyants.publications.length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveProfileTab(tab.id as any)}
              style={{
                padding: '9px 14px',
                border: 'none',
                background: 'none',
                borderBottom: activeProfileTab === tab.id ? '2px solid var(--blue-deep)' : '2px solid transparent',
                color: activeProfileTab === tab.id ? 'var(--blue-deep)' : 'var(--text-muted)',
                fontWeight: activeProfileTab === tab.id ? 700 : 500,
                fontSize: '13px',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Courses Tab */}
        {activeProfileTab === 'courses' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{
              background: '#f4f8fa',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-sm)',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
                <span style={{ fontWeight: 700, color: 'var(--blue-deep)', fontSize: '14.5px' }}>
                  Психология мотивации и эмоций
                </span>
                <span className="badge-tag badge-turq">1 курс · 34 часа · Экзамен</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Фундаментальный академический курс весеннего семестра для 1 курса. Включает 9 оцифрованных семинаров.
              </p>
              <div>
                <button
                  onClick={() => onNavigateToCourse('motivation-emotion')}
                  style={{
                    background: 'var(--blue-deep)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginTop: '4px'
                  }}
                >
                  <BookOpen size={14} />
                  Открыть программу семинаров →
                </button>
              </div>
            </div>

            <div style={{
              background: '#ffffff',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 14px'
            }}>
              <span style={{ fontWeight: 600, color: 'var(--text)', fontSize: '13.5px' }}>
                Организационное консультирование и поведение
              </span>
              <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                Спецкурс для 3 курса бакалавриата (ассессмент, групповая динамика, диагностика культуры).
              </p>
            </div>
          </div>
        )}

        {/* Theses Topics Tab */}
        {activeProfileTab === 'theses' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
              Темы выпускных квалификационных работ (ВКР) и курсовых исследований под руководством А.А. Туниянц:
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
                <span style={{ color: 'var(--turq)', fontWeight: 800, fontSize: '13px', marginTop: '1px' }}>
                  {i + 1}.
                </span>
                <span style={{ fontSize: '13.5px', color: 'var(--text)' }}>
                  {topic}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Research Fields Tab */}
        {activeProfileTab === 'research' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
            {tuniyants.researchFields.map(f => (
              <div
                key={f.id}
                style={{
                  background: '#f8fafc',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '14px'
                }}
              >
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--blue-deep)', marginBottom: '4px' }}>
                  {f.title}
                </h4>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Publications Tab */}
        {activeProfileTab === 'publications' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {tuniyants.publications.map((pub, i) => (
              <div
                key={i}
                style={{
                  background: '#f8fafc',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '14px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
                  <span className="badge-tag badge-blue" style={{ fontSize: '11px' }}>
                    {pub.year} год
                  </span>
                  {pub.doi && (
                    <a
                      href={pub.doi}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '12px', color: 'var(--blue-mid)', display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none', fontWeight: 600 }}
                    >
                      Истина МГУ <ExternalLink size={12} />
                    </a>
                  )}
                </div>
                <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--blue-deep)', marginBottom: '2px' }}>
                  «{pub.title}»
                </h4>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                  Авторы: <strong>{pub.authors}</strong>
                </p>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  {pub.journal}
                </p>
                <p style={{ fontSize: '12.5px', color: 'var(--text)', fontStyle: 'italic', background: '#ffffff', padding: '8px', borderRadius: '4px', border: '1px solid #edf2f7' }}>
                  {pub.abstract}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Scalable view of other department staff */}
      <div>
        <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--blue-deep)', marginBottom: '12px', fontFamily: 'var(--font-serif)' }}>
          Общекафедральные направления
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {filteredFaculty.filter(f => f.id !== 'tuniyants-a-a').map(m => (
            <div key={m.id} className="card-clean" style={{ padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'var(--bg)',
                  color: 'var(--blue-deep)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '15px',
                  fontFamily: 'var(--font-serif)',
                  flexShrink: 0
                }}>
                  {m.avatarText}
                </div>
                <div>
                  <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--blue-deep)' }}>
                    {m.name}
                  </h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {m.role}
                  </p>
                </div>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                {m.summary}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
