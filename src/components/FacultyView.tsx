import React, { useState } from 'react';
import { ExternalLink, BookOpen, Users, User, ArrowUpRight } from 'lucide-react';
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
      <div style={{ marginBottom: '22px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }} className="pill pill-ochre">
          <Users size={12} />
          <span>Кафедра психологии</span>
        </div>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 700,
          color: 'var(--ink)',
          fontFamily: 'var(--font-serif)',
          lineHeight: 1.25,
          marginBottom: '6px'
        }}>
          Научные профили преподавателей
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '14px', maxWidth: '820px' }}>
          Академические профили кафедры психологии Филиала МГУ в г. Ташкенте: научные интересы, 
          публикации в системе ИСТИНА МГУ, читаемые дисциплины и темы курсовых и дипломных работ.
        </p>
      </div>

      {/* Specialization Filter Pills */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '20px', WebkitOverflowScrolling: 'touch' }}>
        {allSpecializations.map((spec) => (
          <button
            key={spec}
            onClick={() => setSelectedSpecialization(spec)}
            className={`pill ${selectedSpecialization === spec ? 'pill-ochre' : 'pill-neutral'}`}
            style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Flagship Profile: Туниянц Анна Александровна */}
      <div className="paper-card" style={{
        padding: '28px',
        marginBottom: '28px',
        background: 'var(--surface)'
      }}>
        
        {/* Profile Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '18px', borderBottom: '1px solid var(--line-soft)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
            
            {/* Monogram Avatar */}
            <div className="brand-mark" style={{ width: '56px', height: '56px', fontSize: '28px' }}>
              {tuniyants.avatarText}
            </div>

            <div style={{ flex: 1, minWidth: '260px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                <span className="pill pill-ochre">
                  {tuniyants.badge}
                </span>
                <span className="pill pill-neutral">
                  {tuniyants.experience}
                </span>
              </div>

              <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--ink)', fontFamily: 'var(--font-serif)', marginBottom: '3px' }}>
                {tuniyants.name}
              </h2>

              <p style={{ fontSize: '13.5px', color: 'var(--muted)', marginBottom: '10px' }}>
                {tuniyants.role} · {tuniyants.department}
              </p>

              {/* Istina MSU Link */}
              {tuniyants.istinaUrl && (
                <a
                  href={tuniyants.istinaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  style={{
                    padding: '4px 10px',
                    fontSize: '12px',
                    fontWeight: 700,
                    textDecoration: 'none'
                  }}
                >
                  <span style={{ color: 'var(--ochre)' }}>ИСТИНА МГУ</span>
                  <span>(ID: {tuniyants.istinaId})</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>

          </div>

          {/* Specialization Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {tuniyants.specializations.map((spec, i) => (
              <span key={i} className="pill pill-neutral" style={{ fontSize: '11px' }}>
                #{spec}
              </span>
            ))}
          </div>
        </div>

        {/* Profile Internal Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--line-soft)',
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
                borderBottom: activeProfileTab === tab.id ? '2px solid var(--ink)' : '2px solid transparent',
                color: activeProfileTab === tab.id ? 'var(--ink)' : 'var(--muted)',
                fontWeight: activeProfileTab === tab.id ? 800 : 600,
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
              background: 'var(--surface-soft)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-sm)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
                <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '15px' }}>
                  Психология мотивации и эмоций
                </span>
                <span className="pill pill-ochre">1 курс · 34 часа · Экзамен</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--muted)' }}>
                Фундаментальный академический курс весеннего семестра для 1 курса бакалавриата. Включает 9 оцифрованных семинаров.
              </p>
              <div>
                <button
                  onClick={() => onNavigateToCourse('motivation-emotion')}
                  className="btn-ink"
                  style={{ marginTop: '6px', fontSize: '12.5px', padding: '6px 14px' }}
                >
                  <BookOpen size={13} />
                  Открыть программу семинаров →
                </button>
              </div>
            </div>

            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-sm)',
              padding: '14px'
            }}>
              <span style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '14px' }}>
                Организационное консультирование и поведение
              </span>
              <p style={{ fontSize: '12.5px', color: 'var(--muted)', marginTop: '2px' }}>
                Спецкурс для 3 курса бакалавриата (ассессмент, групповая динамика, диагностика культуры).
              </p>
            </div>
          </div>
        )}

        {/* Theses Topics Tab */}
        {activeProfileTab === 'theses' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '4px' }}>
              Темы выпускных квалификационных работ (ВКР) и курсовых исследований под научным руководством А.А. Туниянц:
            </p>
            {tuniyants.thesisTopics.map((topic, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  background: 'var(--surface-soft)',
                  padding: '11px 15px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--line-soft)'
                }}
              >
                <span style={{ color: 'var(--ochre)', fontWeight: 800, fontSize: '12px', fontFamily: 'var(--mono)', marginTop: '2px' }}>
                  {i + 1}.
                </span>
                <span style={{ fontSize: '13.5px', color: 'var(--ink)' }}>
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
                  background: 'var(--surface-soft)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '16px'
                }}
              >
                <h4 style={{ fontSize: '14.5px', fontWeight: 800, color: 'var(--ink)', marginBottom: '4px' }}>
                  {f.title}
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.5 }}>
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
                  background: 'var(--surface-soft)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '16px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
                  <span className="pill pill-neutral" style={{ fontSize: '10.5px' }}>
                    {pub.year} год
                  </span>
                  {pub.doi && (
                    <a
                      href={pub.doi}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '12px', color: 'var(--ochre)', display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none', fontWeight: 700 }}
                    >
                      Истина МГУ <ExternalLink size={12} />
                    </a>
                  )}
                </div>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ink)', marginBottom: '2px' }}>
                  «{pub.title}»
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--muted)' }}>
                  Авторы: <strong>{pub.authors}</strong>
                </p>
                <p style={{ fontSize: '12px', color: 'var(--muted-light)', marginBottom: '8px' }}>
                  {pub.journal}
                </p>
                <p style={{ fontSize: '13px', color: 'var(--ink)', fontStyle: 'italic', background: 'var(--surface)', padding: '10px', borderRadius: '4px', border: '1px solid var(--line-soft)' }}>
                  {pub.abstract}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Overview of other department sections */}
      <div>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)', marginBottom: '12px', fontFamily: 'var(--font-serif)' }}>
          Общекафедральные направления
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {filteredFaculty.filter(f => f.id !== 'tuniyants-a-a').map(m => (
            <div key={m.id} className="paper-card" style={{ padding: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div className="brand-mark" style={{ width: '40px', height: '40px', fontSize: '20px' }}>
                  {m.avatarText}
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ink)' }}>
                    {m.name}
                  </h4>
                  <p style={{ fontSize: '12px', color: 'var(--muted)' }}>
                    {m.role}
                  </p>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.5 }}>
                {m.summary}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
