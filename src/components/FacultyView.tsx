import React, { useState } from 'react';
import { 
  ExternalLink, 
  BookOpen, 
  Users, 
  User, 
  ArrowUpRight, 
  Compass, 
  GraduationCap, 
  Briefcase, 
  Calendar, 
  Mail, 
  MapPin, 
  Clock, 
  Award, 
  FileText, 
  Sparkles,
  Layers
} from 'lucide-react';
import { FACULTY_MEMBERS } from '../data/faculty';

interface FacultyViewProps {
  onNavigateToCourse: (courseId: string) => void;
  onOpenReaderBySourceId: (sourceId: string) => void;
}

export const FacultyView: React.FC<FacultyViewProps> = ({ 
  onNavigateToCourse,
  onOpenReaderBySourceId 
}) => {
  const [activeProfileTab, setActiveProfileTab] = useState<'research' | 'projects' | 'publications' | 'courses' | 'theses' | 'collaborations'>('research');

  const faculty = FACULTY_MEMBERS[0];

  return (
    <div style={{ paddingBottom: '90px' }}>
      
      {/* Page Title */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }} className="pill pill-primary">
          <Users size={12} />
          <span>Кафедра психологии · Ташкентский филиал МГУ</span>
        </div>
        <h1 style={{
          fontSize: '30px',
          fontWeight: 700,
          color: 'var(--ink)',
          fontFamily: 'var(--font-serif)',
          lineHeight: 1.25,
          marginBottom: '6px'
        }}>
          Академический профиль преподавателя
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '14px', maxWidth: '840px' }}>
          Официальная карточка научно-педагогической деятельности сотрудника кафедры: исследовательские сферы, 
          научные гранты и проекты, публикации в системе ИСТИНА МГУ, преподаваемые дисциплины и руководство НИР.
        </p>
      </div>

      {/* Flagship Profile Master Card */}
      <div className="paper-card" style={{
        padding: '32px 28px',
        marginBottom: '28px',
        background: 'var(--surface)',
        borderLeft: '5px solid var(--primary)'
      }}>
        
        {/* Profile Hero: Photo + Biographical Block */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '28px',
          alignItems: 'flex-start',
          paddingBottom: '24px',
          borderBottom: '1px solid var(--line)'
        }}>
          
          {/* Framed Academic Portrait */}
          <div style={{
            position: 'relative',
            flexShrink: 0,
            margin: '0 auto'
          }}>
            {/* Outer Decorative Architectural Frame */}
            <div style={{
              padding: '6px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(75, 50, 104, 0.25), rgba(184, 59, 28, 0.2))',
              boxShadow: '0 8px 24px rgba(45, 31, 63, 0.12)'
            }}>
              <div style={{
                position: 'relative',
                width: '190px',
                height: '255px',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: 'var(--paper-soft)',
                border: '1px solid var(--line)'
              }}>
                {faculty.photoUrl ? (
                  <img
                    src={faculty.photoUrl}
                    alt={faculty.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                    onError={(e) => {
                      // Fallback if image path differs
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : null}

                {/* Status Overlay Badge */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(45, 31, 63, 0.92) 0%, rgba(45, 31, 63, 0) 100%)',
                  padding: '24px 8px 8px',
                  textAlign: 'center'
                }}>
                  <span style={{
                    fontSize: '10.5px',
                    fontWeight: 700,
                    color: '#ffffff',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--mono)'
                  }}>
                    ТФ МГУ · с 2011 г.
                  </span>
                </div>
              </div>
            </div>

            {/* Verification Stamp */}
            <div style={{
              marginTop: '10px',
              textAlign: 'center'
            }}>
              <span className="pill pill-primary" style={{ fontSize: '11px', padding: '3px 10px' }}>
                <Award size={12} />
                Верифицирован кафедрой
              </span>
            </div>
          </div>

          {/* Details & Info Block */}
          <div style={{ flex: 1, minWidth: '280px' }}>
            
            {/* Badges Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
              <span className="pill pill-ochre" style={{ fontWeight: 700 }}>
                {faculty.badge}
              </span>
              <span className="pill pill-neutral">
                {faculty.experience}
              </span>
            </div>

            {/* Name */}
            <h2 style={{
              fontSize: '28px',
              fontWeight: 800,
              color: 'var(--ink)',
              fontFamily: 'var(--font-serif)',
              lineHeight: 1.2,
              marginBottom: '6px'
            }}>
              {faculty.name}
            </h2>

            {/* Title & Department */}
            <p style={{ fontSize: '14.5px', color: 'var(--primary)', fontWeight: 600, marginBottom: '14px' }}>
              {faculty.role} · {faculty.department}
            </p>

            {/* Academic Coordinates Card */}
            <div style={{
              background: 'var(--paper-soft)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 16px',
              marginBottom: '14px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '10px',
              fontSize: '12.5px'
            }}>
              {faculty.office && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--ink)' }}>
                  <MapPin size={13} color="var(--primary)" style={{ flexShrink: 0 }} />
                  <span>{faculty.office}</span>
                </div>
              )}
              {faculty.consultationHours && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--ink)' }}>
                  <Clock size={13} color="var(--primary)" style={{ flexShrink: 0 }} />
                  <span>Приём: {faculty.consultationHours}</span>
                </div>
              )}
              {faculty.email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--ink)' }}>
                  <Mail size={13} color="var(--primary)" style={{ flexShrink: 0 }} />
                  <span>{faculty.email}</span>
                </div>
              )}
            </div>

            {/* External Links Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
              <a
                href={faculty.istinaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ink"
                style={{
                  padding: '7px 14px',
                  fontSize: '12.5px',
                  textDecoration: 'none'
                }}
              >
                <span>Профиль в ИСТИНА МГУ (ID: {faculty.istinaId})</span>
                <ExternalLink size={13} />
              </a>

              <button
                onClick={() => onNavigateToCourse('motivation-emotion')}
                className="btn-ghost"
                style={{ padding: '7px 14px', fontSize: '12.5px' }}
              >
                <BookOpen size={13} color="var(--primary)" />
                <span>Курс «Мотивация и эмоции»</span>
              </button>
            </div>

            {/* Bio summary */}
            <p style={{
              fontSize: '13.5px',
              color: 'var(--ink)',
              lineHeight: 1.6,
              background: 'var(--surface-soft)',
              padding: '14px 16px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--line)'
            }}>
              {faculty.summary}
            </p>

          </div>

        </div>

        {/* Profile Internal Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '2px solid var(--line)',
          margin: '22px 0 20px',
          gap: '4px',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch'
        }}>
          {[
            { id: 'research', label: `11 научных сфер (${faculty.interestsList.length})` },
            { id: 'projects', label: `Научные гранты и проекты (${faculty.projects.length})` },
            { id: 'publications', label: `Публикации ИСТИНА (${faculty.publications.length})` },
            { id: 'courses', label: `Учебные дисциплины (${faculty.coursesTaught.length})` },
            { id: 'theses', label: `Темы ВКР и НИР (${faculty.thesisTopics.length})` },
            { id: 'collaborations', label: `Научные связи (${faculty.collaborations.length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveProfileTab(tab.id as any)}
              style={{
                padding: '10px 16px',
                border: 'none',
                background: 'none',
                borderBottom: activeProfileTab === tab.id ? '3px solid var(--primary)' : '3px solid transparent',
                color: activeProfileTab === tab.id ? 'var(--primary)' : 'var(--muted)',
                fontWeight: activeProfileTab === tab.id ? 800 : 600,
                fontSize: '13.5px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: 11 Research Spheres (From official profile docx) */}
        {activeProfileTab === 'research' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Исследовательские интересы ст. преп. А.А. Туниянц:
              </span>
              <span style={{ fontSize: '11.5px', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                11 ключевых направлений
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '12px' }}>
              {faculty.interestsList.map((interest, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--surface-soft)',
                    border: '1px solid var(--line)',
                    borderLeft: '3px solid var(--primary)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    transition: 'all 0.16s ease'
                  }}
                >
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
                    marginTop: '1px'
                  }}>
                    {idx + 1}
                  </span>
                  <span style={{ fontSize: '13.5px', color: 'var(--ink)', fontWeight: 600, lineHeight: 1.45 }}>
                    {interest}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Research Projects & Grants (Special Highlighted Section) */}
        {activeProfileTab === 'projects' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ marginBottom: '4px' }}>
              <p style={{ fontSize: '13.5px', color: 'var(--muted)' }}>
                Государственные научно-исследовательские проекты, прикладные гранты и целевые программы, 
                зарегистрированные в системе ИСТИНА МГУ:
              </p>
            </div>

            {faculty.projects.map((proj) => (
              <div
                key={proj.id}
                style={{
                  background: 'linear-gradient(180deg, #fffdfa 0%, #faf6f0 100%)',
                  border: '1px solid #e2cbaf',
                  borderLeft: '5px solid var(--ochre)',
                  borderRadius: 'var(--radius-md)',
                  padding: '24px',
                  boxShadow: '0 4px 16px rgba(184, 59, 28, 0.06)'
                }}
              >
                {/* Project Header Bar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span className="pill pill-ochre" style={{ fontWeight: 800, fontSize: '11px' }}>
                      {proj.badge}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 700, fontFamily: 'var(--mono)' }}>
                      <Calendar size={12} style={{ display: 'inline', marginRight: '4px' }} />
                      {proj.period}
                    </span>
                  </div>

                  <a
                    href={proj.istinaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ink"
                    style={{
                      background: 'var(--ochre)',
                      borderColor: 'var(--ochre)',
                      fontSize: '11.5px',
                      padding: '5px 12px',
                      textDecoration: 'none'
                    }}
                  >
                    <span>Страница проекта в ИСТИНЕ</span>
                    <ExternalLink size={12} />
                  </a>
                </div>

                {/* Project Title */}
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 800,
                  color: 'var(--ink)',
                  fontFamily: 'var(--font-serif)',
                  lineHeight: 1.35,
                  marginBottom: '10px'
                }}>
                  «{proj.title}»
                </h3>

                {/* Customer / Organization */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.85)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px 14px',
                  marginBottom: '12px',
                  fontSize: '13px'
                }}>
                  <strong style={{ color: 'var(--ochre)', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.04em', display: 'block', marginBottom: '2px' }}>
                    Заказчик и партнёр проекта:
                  </strong>
                  <span style={{ color: 'var(--ink)', fontWeight: 600 }}>
                    {proj.customer}
                  </span>
                </div>

                {/* Description */}
                <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)', lineHeight: 1.55, marginBottom: '16px' }}>
                  {proj.description}
                </p>

                {/* Research Team Apparatus */}
                <div style={{
                  paddingTop: '14px',
                  borderTop: '1px dashed var(--line)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  <div style={{ fontSize: '13px' }}>
                    <strong style={{ color: 'var(--ink)' }}>Научный руководитель проекта: </strong>
                    <a
                      href={proj.head.istinaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--ochre)', fontWeight: 700, textDecoration: 'underline' }}
                    >
                      {proj.head.name}
                    </a>
                  </div>

                  <div style={{ fontSize: '12.5px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px' }}>
                    <strong style={{ color: 'var(--ink)', marginRight: '4px' }}>Ответственные исполнители:</strong>
                    {proj.team.map((member, idx) => (
                      <a
                        key={idx}
                        href={member.istinaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pill pill-neutral"
                        style={{
                          fontSize: '11.5px',
                          textDecoration: 'none',
                          fontWeight: member.name.includes('Туниянц') ? 800 : 500,
                          background: member.name.includes('Туниянц') ? 'var(--primary-light)' : 'var(--surface)',
                          borderColor: member.name.includes('Туниянц') ? 'var(--primary)' : 'var(--line)',
                          color: member.name.includes('Туниянц') ? 'var(--primary)' : 'var(--ink)'
                        }}
                      >
                        {member.name}
                        <ExternalLink size={10} />
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* TAB 3: Publications */}
        {activeProfileTab === 'publications' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '2px' }}>
              Научные труды ст. преп. А.А. Туниянц, опубликованные в журналах из перечня ВАК и ядра РИНЦ:
            </p>

            {faculty.publications.map((pub, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--surface-soft)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '20px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="pill pill-primary" style={{ fontSize: '11px' }}>
                      {pub.year} год
                    </span>
                    {pub.indexedIn && (
                      <span className="pill pill-neutral" style={{ fontSize: '11px' }}>
                        {pub.indexedIn}
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    {pub.doi && (
                      <a
                        href={pub.doi}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost"
                        style={{ fontSize: '12px', padding: '4px 10px', textDecoration: 'none' }}
                      >
                        В ИСТИНЕ МГУ <ExternalLink size={11} />
                      </a>
                    )}
                    {pub.sourceId && (
                      <button
                        onClick={() => onOpenReaderBySourceId(pub.sourceId!)}
                        className="btn-ink"
                        style={{ fontSize: '12px', padding: '4px 12px' }}
                      >
                        <BookOpen size={12} /> Читать статью в ридере →
                      </button>
                    )}
                  </div>
                </div>

                <h4 style={{ fontSize: '16.5px', fontWeight: 800, color: 'var(--ink)', marginBottom: '4px', lineHeight: 1.35 }}>
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

        {/* TAB 4: Courses Taught */}
        {activeProfileTab === 'courses' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {faculty.coursesTaught.map((c, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--surface-soft)',
                  border: '1px solid var(--line)',
                  borderLeft: i === 0 ? '5px solid var(--primary)' : '5px solid var(--teal)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '18px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
                  <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '16.5px' }}>
                    {c.title}
                  </span>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <span className="pill pill-primary">{c.level}</span>
                    <span className="pill pill-neutral">{c.hours}</span>
                    <span className="pill pill-neutral">{c.examType}</span>
                  </div>
                </div>

                <p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: 1.5 }}>
                  {c.description}
                </p>

                {c.courseId && (
                  <div>
                    <button
                      onClick={() => onNavigateToCourse(c.courseId!)}
                      className="btn-ink"
                      style={{ marginTop: '4px', fontSize: '12.5px', padding: '6px 14px' }}
                    >
                      <BookOpen size={13} />
                      Открыть 9 семинаров дисциплины →
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: Theses & Research Topics */}
        {activeProfileTab === 'theses' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <p style={{ fontSize: '13.5px', color: 'var(--muted)', marginBottom: '4px' }}>
              Темы выпускных квалификационных работ (ВКР) и курсовых исследований бакалавров под научным руководством ст. преп. А.А. Туниянц:
            </p>
            {faculty.thesisTopics.map((topic, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  background: 'var(--surface-soft)',
                  padding: '14px 18px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--line-soft)'
                }}
              >
                <span style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '13px', fontFamily: 'var(--mono)', marginTop: '1px' }}>
                  {i + 1}.
                </span>
                <span style={{ fontSize: '14px', color: 'var(--ink)', fontWeight: 600, lineHeight: 1.45 }}>
                  {topic}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* TAB 6: Collaborations */}
        {activeProfileTab === 'collaborations' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '14px' }}>
            {faculty.collaborations.map((collab, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--surface-soft)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '10px'
                }}
              >
                <div>
                  <span className="pill pill-primary" style={{ fontSize: '11px', marginBottom: '6px', display: 'inline-block' }}>
                    {collab.role}
                  </span>
                  <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--ink)', marginBottom: '2px' }}>
                    {collab.name}
                  </h4>
                  <p style={{ fontSize: '12.5px', color: 'var(--primary)', fontWeight: 600, marginBottom: '6px' }}>
                    {collab.degree}
                  </p>
                  <p style={{ fontSize: '12.5px', color: 'var(--muted-light)', marginBottom: '8px' }}>
                    {collab.institution}
                  </p>
                  <p style={{ fontSize: '13px', color: 'var(--ink)', lineHeight: 1.5 }}>
                    {collab.description}
                  </p>
                </div>

                {collab.istinaUrl && (
                  <div style={{ paddingTop: '8px', borderTop: '1px solid var(--line)' }}>
                    <a
                      href={collab.istinaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost"
                      style={{ fontSize: '11.5px', padding: '4px 10px', textDecoration: 'none' }}
                    >
                      Профиль в ИСТИНЕ МГУ <ExternalLink size={11} />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Standard Profile Architecture Reference Note */}
      <div className="paper-card" style={{ padding: '20px 24px', background: 'var(--paper-soft)', border: '1px dashed var(--line)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <Sparkles size={16} color="var(--primary)" />
          <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Эталонный академический стандарт профиля кафедры
          </h4>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.5 }}>
          Данный профиль является каноническим шаблоном оцифровки преподавательского состава кафедры психологии Филиала МГУ в г. Ташкенте:
          содержит подтверждённую привязку к системе ИСТИНА МГУ, фиксацию внешних государственных грантов, библиографию публикаций,
          научные направления и оцифрованные силлабусы читаемых курсов.
        </p>
      </div>

    </div>
  );
};
