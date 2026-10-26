import React, { useState } from 'react';
import { ExternalLink, BookOpen, Users, User, ArrowUpRight, Award, Compass, GraduationCap, CheckCircle } from 'lucide-react';
import { FACULTY_MEMBERS } from '../data/faculty';

interface FacultyViewProps {
  onNavigateToCourse: (courseId: string) => void;
  onOpenReaderBySourceId: (sourceId: string) => void;
}

export const FacultyView: React.FC<FacultyViewProps> = ({ 
  onNavigateToCourse,
  onOpenReaderBySourceId 
}) => {
  const [activeProfileTab, setActiveProfileTab] = useState<'research' | 'courses' | 'publications' | 'theses'>('research');

  const tuniyants = FACULTY_MEMBERS[0];

  return (
    <div style={{ paddingBottom: '90px' }}>
      
      {/* Title */}
      <div style={{ marginBottom: '22px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }} className="pill pill-ochre">
          <Users size={12} />
          <span>Кафедра психологии Филиала МГУ в г. Ташкенте</span>
        </div>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 700,
          color: 'var(--ink)',
          fontFamily: 'var(--font-serif)',
          lineHeight: 1.25,
          marginBottom: '6px'
        }}>
          Научно-педагогический профиль кафедры
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '14px', maxWidth: '820px' }}>
          Официальная академическая база кафедры: научные интересы, публикации в системе ИСТИНА МГУ,
          оцифрованные дисциплины и направления научно-исследовательской работы студентов.
        </p>
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
            <div className="brand-mark" style={{ width: '56px', height: '56px', fontSize: '26px' }}>
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
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

                  <span style={{ fontSize: '11.5px', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                    Верифицированный профиль сотрудника МГУ
                  </span>
                </div>
              )}
            </div>

          </div>

          <p style={{ fontSize: '13.5px', color: 'var(--ink)', lineHeight: 1.6, background: 'var(--surface-soft)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--line-soft)' }}>
            {tuniyants.summary}
          </p>
        </div>

        {/* Profile Internal Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--line-soft)',
          margin: '16px 0 20px',
          gap: '4px',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch'
        }}>
          {[
            { id: 'research', label: `11 научных сфер (${tuniyants.interestsList.length})` },
            { id: 'courses', label: `Учебные дисциплины (${tuniyants.coursesTaught.length})` },
            { id: 'publications', label: `Публикации в ИСТИНЕ (${tuniyants.publications.length})` },
            { id: 'theses', label: `Темы ВКР и НИР (${tuniyants.thesisTopics.length})` }
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

        {/* 1. Research Spheres Tab (Exact 11 from docx) */}
        {activeProfileTab === 'research' && (
          <div>
            <div style={{ marginBottom: '14px' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--ochre)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Научные сферы и исследовательские интересы (по официальному профилю А.А. Туниянц):
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
              {tuniyants.interestsList.map((interest, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--surface-soft)',
                    border: '1px solid var(--line-soft)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span style={{
                    fontWeight: 800,
                    fontSize: '11px',
                    color: 'var(--ochre)',
                    fontFamily: 'var(--mono)',
                    background: 'var(--ochre-light)',
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '1px'
                  }}>
                    {idx + 1}
                  </span>
                  <span style={{ fontSize: '13px', color: 'var(--ink)', fontWeight: 600, lineHeight: 1.45 }}>
                    {interest}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Courses Tab */}
        {activeProfileTab === 'courses' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Primary Course */}
            <div style={{
              background: 'var(--surface-soft)',
              border: '1px solid var(--line)',
              borderLeft: '4px solid var(--ochre)',
              borderRadius: 'var(--radius-sm)',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
                <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '16px' }}>
                  Психология мотивации и эмоций
                </span>
                <span className="pill pill-ochre">1 курс бакалавриата · 34 акад. часа · Экзамен</span>
              </div>
              <p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: 1.5 }}>
                Базовый теоретико-методологический курс кафедры психологии. Включает 9 оцифрованных семинарских занятий с постраничной привязкой к хрестоматиям и монографиям, доступным для чтения в интерактивном ридере портала.
              </p>
              <div>
                <button
                  onClick={() => onNavigateToCourse('motivation-emotion')}
                  className="btn-ink"
                  style={{ marginTop: '4px', fontSize: '12.5px', padding: '6px 14px' }}
                >
                  <BookOpen size={13} />
                  Открыть силлабус 9 семинаров дисциплины →
                </button>
              </div>
            </div>

            {/* Special Course with Bazarov T.Yu. */}
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderLeft: '4px solid var(--teal)',
              borderRadius: 'var(--radius-sm)',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
                <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '16px' }}>
                  Профессиональная социализация психолога
                </span>
                <span className="pill pill-teal">Авторский спецкурс · Совместно с проф. Т.Ю. Базаровым</span>
              </div>
              <p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: 1.5 }}>
                Уникальный курс социально-психологической подготовки и профессиональной идентификации студентов-психологов на базе Ташкентского филиала МГУ. Научно-методический опыт курса опубликован в «Вестнике Московского университета» (Серия 14, Психология).
              </p>
              <div>
                <button
                  onClick={() => onOpenReaderBySourceId('bazarov-tuniyants-2013')}
                  className="btn-ghost"
                  style={{ marginTop: '4px', fontSize: '12px', padding: '5px 12px' }}
                >
                  <BookOpen size={12} color="var(--teal)" />
                  Читать научную публикацию курса в ридере (12 стр.) →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. Publications Tab (Real Papers with T.Yu. Bazarov & A.M. Rikel) */}
        {activeProfileTab === 'publications' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '2px' }}>
              Научные публикации А.А. Туниянц в ведущих академических журналах, зарегистрированные в системе ИСТИНА МГУ:
            </p>

            {tuniyants.publications.map((pub, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--surface-soft)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '18px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="pill pill-ochre" style={{ fontSize: '11px' }}>
                      {pub.year} год
                    </span>
                    <span className="pill pill-neutral" style={{ fontSize: '11px' }}>
                      ВАК / РИНЦ / ядро РИНЦ
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    {pub.doi && (
                      <a
                        href={pub.doi}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost"
                        style={{ fontSize: '11.5px', padding: '3px 8px', textDecoration: 'none' }}
                      >
                        В ИСТИНЕ МГУ <ExternalLink size={11} />
                      </a>
                    )}
                    <button
                      onClick={() => onOpenReaderBySourceId(i === 0 ? 'bazarov-tuniyants-2013' : 'zotova-rikel-tuniyants-2019')}
                      className="btn-ink"
                      style={{ fontSize: '11.5px', padding: '3px 10px' }}
                    >
                      <BookOpen size={11} /> Читать статью в ридере →
                    </button>
                  </div>
                </div>

                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--ink)', marginBottom: '4px', lineHeight: 1.35 }}>
                  «{pub.title}»
                </h4>

                <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '2px' }}>
                  Авторы: <strong style={{ color: 'var(--ink)' }}>{pub.authors}</strong>
                </p>

                <p style={{ fontSize: '12.5px', color: 'var(--muted-light)', marginBottom: '10px', fontStyle: 'italic' }}>
                  {pub.journal}
                </p>

                <div style={{
                  fontSize: '13px',
                  color: 'var(--ink)',
                  background: 'var(--surface)',
                  padding: '12px 14px',
                  borderRadius: '4px',
                  border: '1px solid var(--line-soft)',
                  lineHeight: 1.55
                }}>
                  <strong style={{ fontSize: '11.5px', textTransform: 'uppercase', color: 'var(--muted)', letterSpacing: '0.04em', display: 'block', marginBottom: '4px' }}>
                    Аннотация статьи:
                  </strong>
                  {pub.abstract}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. Theses Topics Tab */}
        {activeProfileTab === 'theses' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '4px' }}>
              Темы выпускных квалификационных работ (ВКР) и курсовых исследований бакалавров под научным руководством А.А. Туниянц:
            </p>
            {tuniyants.thesisTopics.map((topic, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  background: 'var(--surface-soft)',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--line-soft)'
                }}
              >
                <span style={{ color: 'var(--ochre)', fontWeight: 800, fontSize: '12.5px', fontFamily: 'var(--mono)', marginTop: '2px' }}>
                  {i + 1}.
                </span>
                <span style={{ fontSize: '14px', color: 'var(--ink)', fontWeight: 600, lineHeight: 1.45 }}>
                  {topic}
                </span>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Verified Academic Collaboration Section */}
      <div className="paper-card" style={{ padding: '24px', background: 'var(--surface-soft)', border: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <Compass size={18} color="var(--ochre)" />
          <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--ink)', fontFamily: 'var(--font-serif)' }}>
            Научно-исследовательское сотрудничество кафедры
          </h3>
        </div>

        <p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: 1.6, maxWidth: '820px', marginBottom: '14px' }}>
          Преподавательская и научная деятельность кафедры психологии Филиала МГУ в г. Ташкенте строится в тесном сотрудничестве 
          с головным факультетом психологии Московского государственного университета имени М.В. Ломоносова:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          <div style={{ background: 'var(--surface)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--line-soft)' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 800, color: 'var(--ochre)' }}>
              Научный куратор и соавтор
            </span>
            <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ink)', marginTop: '4px' }}>
              Базаров Тахир Юсупович
            </h4>
            <p style={{ fontSize: '12.5px', color: 'var(--muted)', marginTop: '2px', lineHeight: 1.45 }}>
              Доктор психологических наук, профессор, заведующий кафедрой социальной психологии факультета психологии МГУ имени М.В. Ломоносова.
            </p>
          </div>

          <div style={{ background: 'var(--surface)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--line-soft)' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 800, color: 'var(--teal)' }}>
              Соавтор исследований благополучия
            </span>
            <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ink)', marginTop: '4px' }}>
              Рикель Артем Маркович
            </h4>
            <p style={{ fontSize: '12.5px', color: 'var(--muted)', marginTop: '2px', lineHeight: 1.45 }}>
              Кандидат психологических наук, доцент кафедры социальной психологии факультета психологии МГУ имени М.В. Ломоносова.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
