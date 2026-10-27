import React, { useState } from 'react';
import { 
  ExternalLink, 
  BookOpen, 
  Users, 
  Calendar, 
  Mail, 
  MapPin, 
  Clock, 
  Award, 
  Search, 
  Check, 
  Copy, 
  Info,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { FACULTY_MEMBERS, FacultyMember } from '../data/faculty';

interface FacultyViewProps {
  selectedFacultyId?: string;
  onSelectFaculty?: (id: string) => void;
  onNavigateToCourse: (courseId: string) => void;
  onOpenReaderBySourceId: (sourceId: string) => void;
}

export const FacultyView: React.FC<FacultyViewProps> = ({ 
  selectedFacultyId = 'tuniyants-a-a',
  onSelectFaculty,
  onNavigateToCourse,
  onOpenReaderBySourceId 
}) => {
  const [internalSelectedId, setInternalSelectedId] = useState<string>(selectedFacultyId);
  const [activeProfileTab, setActiveProfileTab] = useState<'research' | 'projects' | 'publications' | 'courses' | 'theses' | 'collaborations'>('research');
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'leaders' | 'phd' | 'alumni'>('all');
  const [copiedContact, setCopiedContact] = useState(false);

  // Sync prop changes
  const activeId = selectedFacultyId || internalSelectedId;
  const faculty: FacultyMember = FACULTY_MEMBERS.find(f => f.id === activeId) || FACULTY_MEMBERS[0];

  const handleSelectFaculty = (id: string) => {
    setInternalSelectedId(id);
    if (onSelectFaculty) {
      onSelectFaculty(id);
    }
    setActiveProfileTab('research');
  };

  const handleCopyContacts = () => {
    const text = `${faculty.name}\n${faculty.role} · ${faculty.department}\n${faculty.office || 'Кафедра психологии, Ташкентский филиал МГУ'}${faculty.sourceBookPage ? `\nИсточник: Юбилейное издание кафедры «20 лет профессиональной традиции», стр. ${faculty.sourceBookPage}` : ''}`;
    navigator.clipboard?.writeText(text);
    setCopiedContact(true);
    setTimeout(() => setCopiedContact(false), 2200);
  };

  // Filter faculty directory
  const filteredFaculty = FACULTY_MEMBERS.filter(f => {
    const q = searchFilter.trim().toLowerCase();
    const matchesSearch = !q || 
      f.name.toLowerCase().includes(q) || 
      f.role.toLowerCase().includes(q) ||
      f.interestsList.some(i => i.toLowerCase().includes(q)) ||
      f.coursesTaught.some(c => c.title.toLowerCase().includes(q));

    if (!matchesSearch) return false;

    if (categoryFilter === 'leaders') {
      return ['bazarov-t-yu', 'ruzibaev-d-b', 'usmanova-e-z', 'sultanova-l-z', 'pronin-r-o', 'ryabova-m-s'].includes(f.id);
    }
    if (categoryFilter === 'phd') {
      return Boolean(f.defenseInfo || f.badge?.includes('д.пс.н') || f.badge?.includes('Кандидат') || f.badge?.includes('PhD') || f.badge?.includes('Доктор'));
    }
    if (categoryFilter === 'alumni') {
      return f.experience.includes('Выпуск') || Boolean(f.badge?.includes('Выпуск')) || ['tuniyants-a-a', 'pronin-r-o', 'ryabova-m-s', 'rodnina-k-a', 'karieva-n-t', 'karimova-n-a', 'tsoy-s-v', 'khabiev-t-r', 'aziz-karieva-m-t', 'tashkhodjaeva-o-o', 'akhmedova-m-i', 'faizullina-r-s', 'makhmudova-kh-a', 'kerimova-d-k', 'muminova-s-a'].includes(f.id);
    }
    return true;
  });

  return (
    <div style={{ paddingBottom: '90px' }}>
      
      {/* Page Title & Department Context */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }} className="pill pill-primary">
          <Users size={12} />
          <span>Кафедра психологии · Филиал МГУ в г. Ташкенте</span>
        </div>
        <h1 style={{
          fontSize: '30px',
          fontWeight: 700,
          color: 'var(--ink)',
          fontFamily: 'var(--font-serif)',
          lineHeight: 1.25,
          marginBottom: '6px'
        }}>
          Преподаватели кафедры психологии
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '14px', maxWidth: '840px', lineHeight: 1.55 }}>
          Академические профили преподавательского состава филиала: научные направления, 
          исследовательские проекты, публикации, читаемые дисциплины и темы студенческих исследований.
        </p>
      </div>

      {/* FACULTY DIRECTORY & SELECTOR BAR */}
      <div className="paper-card" style={{
        padding: '20px 22px',
        marginBottom: '26px',
        background: 'var(--surface)',
        borderLeft: '4px solid var(--primary)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Каталог кафедры ({FACULTY_MEMBERS.length}):
            </span>
          </div>

          {/* Quick Filter Categories */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setCategoryFilter('all')}
              className={`pill ${categoryFilter === 'all' ? 'pill-primary' : 'pill-neutral'}`}
              style={{ cursor: 'pointer', padding: '4px 10px', fontSize: '12px' }}
            >
              Все преподаватели ({FACULTY_MEMBERS.length})
            </button>
            <button
              onClick={() => setCategoryFilter('leaders')}
              className={`pill ${categoryFilter === 'leaders' ? 'pill-primary' : 'pill-neutral'}`}
              style={{ cursor: 'pointer', padding: '4px 10px', fontSize: '12px' }}
            >
              Руководство кафедры
            </button>
            <button
              onClick={() => setCategoryFilter('phd')}
              className={`pill ${categoryFilter === 'phd' ? 'pill-primary' : 'pill-neutral'}`}
              style={{ cursor: 'pointer', padding: '4px 10px', fontSize: '12px' }}
            >
              Доктора наук и PhD
            </button>
            <button
              onClick={() => setCategoryFilter('alumni')}
              className={`pill ${categoryFilter === 'alumni' ? 'pill-primary' : 'pill-neutral'}`}
              style={{ cursor: 'pointer', padding: '4px 10px', fontSize: '12px' }}
            >
              Выпускники-преподаватели
            </button>
          </div>
        </div>

        {/* Search Bar within Directory */}
        <div style={{
          position: 'relative',
          marginBottom: '16px'
        }}>
          <Search size={16} color="var(--muted)" style={{ position: 'absolute', left: '12px', top: '11px' }} />
          <input
            type="text"
            placeholder="Поиск преподавателя по фамилии, предмету или научной сфере..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 12px 9px 36px',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '13px',
              fontFamily: 'inherit',
              background: 'var(--paper-soft)',
              color: 'var(--ink)'
            }}
          />
        </div>

        {/* Interactive Faculty Chips Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(235px, 1fr))',
          gap: '10px'
        }}>
          {filteredFaculty.map(item => {
            const isSelected = item.id === faculty.id;
            return (
              <div
                key={item.id}
                onClick={() => handleSelectFaculty(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  border: isSelected ? '1.5px solid var(--primary)' : '1px solid var(--line)',
                  background: isSelected ? 'var(--primary-light)' : 'var(--surface-soft)',
                  boxShadow: isSelected ? '0 4px 12px rgba(75, 50, 104, 0.12)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {/* Micro Thumbnail / Monogram */}
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isSelected ? 'var(--primary)' : 'var(--paper-soft)',
                  color: isSelected ? '#ffffff' : 'var(--primary)',
                  fontWeight: 800,
                  fontSize: '13px',
                  fontFamily: 'var(--mono)',
                  border: '1px solid var(--line)'
                }}>
                  {item.photoUrl ? (
                    <img
                      src={item.photoUrl}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { (e.currentTarget as HTMLElement).style.display = 'none'; }}
                    />
                  ) : (
                    <span>{item.avatarText}</span>
                  )}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 800,
                    color: isSelected ? 'var(--primary)' : 'var(--ink)',
                    lineHeight: 1.25,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {item.name}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: item.isUnderDevelopment ? 'var(--ochre)' : 'var(--muted)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    marginTop: '2px'
                  }}>
                    {item.isUnderDevelopment ? 'В разработке' : (item.badge || item.role)}
                  </div>
                </div>

                {isSelected && (
                  <Check size={16} color="var(--primary)" style={{ flexShrink: 0 }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* SELECTED FACULTY PROFILE MASTER CARD */}
      <div className="paper-card" style={{
        padding: '32px 28px',
        marginBottom: '28px',
        background: 'var(--surface)',
        borderLeft: '5px solid var(--primary)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        
        {/* Banner if Profile is in Development */}
        {faculty.isUnderDevelopment && (
          <div style={{
            background: 'var(--ochre-light)',
            border: '1px solid var(--ochre-border)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px 16px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '13px',
            color: 'var(--ink)'
          }}>
            <AlertCircle size={18} color="var(--ochre)" style={{ flexShrink: 0 }} />
            <div>
              <strong>Профиль в процессе оцифровки:</strong> Полные программы семинаров, публикации и материалы преподавателя подготавливаются Научным сектором кафедры.
            </div>
          </div>
        )}

        {/* Profile Hero: Photo + Biographical Coordinates */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '28px',
          alignItems: 'flex-start',
          paddingBottom: '24px',
          borderBottom: '1px solid var(--line)'
        }}>
          
          {/* Framed Academic Portrait or Stylized Monogram */}
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
                border: '1px solid var(--line)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
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
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    color: 'var(--primary)',
                    padding: '16px',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: 'var(--primary-light)',
                      border: '2px solid var(--primary-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '32px',
                      fontFamily: 'var(--mono)',
                      fontWeight: 800
                    }}>
                      {faculty.avatarText}
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase' }}>
                      Кафедра психологии
                    </span>
                  </div>
                )}

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
                    ТФ МГУ
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
                Кафедра психологии
              </span>
            </div>
          </div>

          {/* Details & Info Block */}
          <div style={{ flex: 1, minWidth: '280px' }}>
            
            {/* Badges Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
              {faculty.badge && (
                <span className="pill pill-ochre" style={{ fontWeight: 700 }}>
                  {faculty.badge}
                </span>
              )}
              <span className="pill pill-neutral">
                {faculty.experience}
              </span>
            </div>

            {/* Professor Name */}
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
              {faculty.sourceBookPage && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--ink)' }}>
                  <BookOpen size={13} color="var(--primary)" style={{ flexShrink: 0 }} />
                  <span>Книга «20 лет кафедры»: <strong>стр. {faculty.sourceBookPage}</strong></span>
                </div>
              )}
              {faculty.email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--ink)' }}>
                  <Mail size={13} color="var(--primary)" style={{ flexShrink: 0 }} />
                  <a href={`mailto:${faculty.email}`} style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
                    {faculty.email}
                  </a>
                </div>
              )}
              {faculty.istinaId && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--ink)' }}>
                  <Award size={13} color="var(--primary)" style={{ flexShrink: 0 }} />
                  <span>ИСТИНА ID: <strong style={{ fontFamily: 'var(--mono)' }}>{faculty.istinaId}</strong></span>
                </div>
              )}
            </div>

            {/* PhD Defense Special Card if available */}
            {faculty.defenseInfo && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(75, 50, 104, 0.06) 0%, rgba(184, 59, 28, 0.05) 100%)',
                border: '1px solid var(--primary-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 16px',
                marginBottom: '14px',
                fontSize: '12.5px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: 'var(--primary)', marginBottom: '4px' }}>
                  <Award size={14} color="var(--ochre)" />
                  <span>Учёная степень: {faculty.defenseInfo.degree} ({faculty.defenseInfo.year} г.)</span>
                </div>
                <div style={{ color: 'var(--ink)', marginBottom: '3px' }}>
                  <strong>Тема исследования:</strong> «{faculty.defenseInfo.topic}»
                </div>
                {faculty.defenseInfo.advisor && (
                  <div style={{ color: 'var(--muted)', fontSize: '12px' }}>
                    <strong>Научный руководитель:</strong> {faculty.defenseInfo.advisor}
                  </div>
                )}
                {faculty.defenseInfo.date && (
                  <div style={{ color: 'var(--muted)', fontSize: '11.5px', marginTop: '3px' }}>
                    Защита состоялась {faculty.defenseInfo.date} в совете при {faculty.defenseInfo.institution || 'НУУз им. Мирзо Улугбека'}
                  </div>
                )}
              </div>
            )}

            {/* Quick Action Links */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {faculty.istinaUrl && (
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
                  <span>Профиль в ИСТИНА МГУ</span>
                  <ExternalLink size={13} />
                </a>
              )}

              {faculty.coursesTaught.length > 0 && faculty.coursesTaught[0].courseId && (
                <button
                  onClick={() => onNavigateToCourse(faculty.coursesTaught[0].courseId!)}
                  className="btn-ghost"
                  style={{ padding: '7px 14px', fontSize: '12.5px' }}
                >
                  <BookOpen size={13} color="var(--primary)" />
                  <span>Курс «{faculty.coursesTaught[0].title}»</span>
                </button>
              )}

              <button
                onClick={handleCopyContacts}
                className="btn-ghost"
                style={{ padding: '7px 14px', fontSize: '12.5px' }}
              >
                {copiedContact ? <Check size={13} color="var(--teal)" /> : <Copy size={13} />}
                <span>{copiedContact ? 'Контакты скопированы!' : 'Скопировать контакты'}</span>
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
            { id: 'research', label: `Сферы исследований (${faculty.interestsList.length})` },
            { id: 'projects', label: `Проекты и гранты (${faculty.projects.length})` },
            { id: 'publications', label: `Публикации (${faculty.publications.length})` },
            { id: 'courses', label: `Читаемые курсы (${faculty.coursesTaught.length})` },
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

        {/* TAB 1: Research Spheres */}
        {activeProfileTab === 'research' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Научные направления: {faculty.name}
              </span>
              <span style={{ fontSize: '11.5px', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                {faculty.interestsList.length} направлений
              </span>
            </div>

            {faculty.interestsList.length > 0 ? (
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
            ) : (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--muted)', background: 'var(--surface-soft)', borderRadius: 'var(--radius-sm)' }}>
                Сферы научных интересов подготавливаются к публикации.
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Research Projects & Grants */}
        {activeProfileTab === 'projects' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faculty.projects.length > 0 ? (
              faculty.projects.map((proj) => (
                <div
                  key={proj.id}
                  style={{
                    background: proj.isExternal ? 'linear-gradient(180deg, #fffdfa 0%, #faf6f0 100%)' : 'var(--surface-soft)',
                    border: proj.isExternal ? '1px solid #e2cbaf' : '1px solid var(--line)',
                    borderLeft: proj.isExternal ? '5px solid var(--ochre)' : '5px solid var(--primary)',
                    borderRadius: 'var(--radius-md)',
                    padding: '24px',
                    boxShadow: proj.isExternal ? '0 4px 16px rgba(184, 59, 28, 0.06)' : 'none'
                  }}
                >
                  {/* Project Header Bar */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span className={`pill ${proj.isExternal ? 'pill-ochre' : 'pill-primary'}`} style={{ fontWeight: 800, fontSize: '11px' }}>
                        {proj.badge}
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 700, fontFamily: 'var(--mono)' }}>
                        <Calendar size={12} style={{ display: 'inline', marginRight: '4px' }} />
                        {proj.period}
                      </span>
                    </div>

                    {proj.istinaUrl && (
                      <a
                        href={proj.istinaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ink"
                        style={{
                          background: proj.isExternal ? 'var(--ochre)' : 'var(--primary)',
                          borderColor: proj.isExternal ? 'var(--ochre)' : 'var(--primary)',
                          fontSize: '11.5px',
                          padding: '5px 12px',
                          textDecoration: 'none'
                        }}
                      >
                        <span>Страница проекта в ИСТИНЕ</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
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
                    <strong style={{ color: proj.isExternal ? 'var(--ochre)' : 'var(--primary)', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.04em', display: 'block', marginBottom: '2px' }}>
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
                        style={{ color: proj.isExternal ? 'var(--ochre)' : 'var(--primary)', fontWeight: 700, textDecoration: 'underline' }}
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
                            fontWeight: member.name.includes(faculty.name.split(' ')[0]) ? 800 : 500,
                            background: member.name.includes(faculty.name.split(' ')[0]) ? 'var(--primary-light)' : 'var(--surface)',
                            borderColor: member.name.includes(faculty.name.split(' ')[0]) ? 'var(--primary)' : 'var(--line)',
                            color: member.name.includes(faculty.name.split(' ')[0]) ? 'var(--primary)' : 'var(--ink)'
                          }}
                        >
                          {member.name}
                          <ExternalLink size={10} />
                        </a>
                      ))}
                    </div>
                  </div>

                </div>
              ))
            ) : (
              <div style={{
                background: 'var(--surface-soft)',
                border: '1px dashed var(--line)',
                borderRadius: 'var(--radius-sm)',
                padding: '24px',
                textAlign: 'center',
                color: 'var(--muted)',
                fontSize: '13.5px'
              }}>
                <Info size={20} color="var(--primary)" style={{ margin: '0 auto 8px', display: 'block' }} />
                Данные по научно-исследовательским грантам и проектам преподавателя подготавливаются к публикации.
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Publications */}
        {activeProfileTab === 'publications' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {faculty.publications.length > 0 ? (
              faculty.publications.map((pub, i) => (
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
                      Аннотация:
                    </strong>
                    {pub.abstract}
                  </div>
                </div>
              ))
            ) : (
              <div style={{
                background: 'var(--surface-soft)',
                border: '1px dashed var(--line)',
                borderRadius: 'var(--radius-sm)',
                padding: '24px',
                textAlign: 'center',
                color: 'var(--muted)',
                fontSize: '13.5px'
              }}>
                <Info size={20} color="var(--primary)" style={{ margin: '0 auto 8px', display: 'block' }} />
                Библиографический список публикаций преподавателя оцифровывается Научным сектором.
              </div>
            )}
          </div>
        )}

        {/* TAB 4: Courses Taught */}
        {activeProfileTab === 'courses' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {faculty.coursesTaught.length > 0 ? (
              faculty.coursesTaught.map((c, i) => (
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
              ))
            ) : (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--muted)', background: 'var(--surface-soft)', borderRadius: 'var(--radius-sm)' }}>
                Список читаемых дисциплин согласуется с кафедрой.
              </div>
            )}
          </div>
        )}

        {/* TAB 5: Theses & Research Topics */}
        {activeProfileTab === 'theses' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <p style={{ fontSize: '13.5px', color: 'var(--muted)', marginBottom: '4px' }}>
              Темы выпускных квалификационных работ (ВКР) и курсовых исследований под научным руководством {faculty.name}:
            </p>
            {faculty.thesisTopics.length > 0 ? (
              faculty.thesisTopics.map((topic, i) => (
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
              ))
            ) : (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--muted)', background: 'var(--surface-soft)', borderRadius: 'var(--radius-sm)' }}>
                Темы курсовых и дипломных исследований утверждаются на заседании кафедры.
              </div>
            )}
          </div>
        )}

        {/* TAB 6: Collaborations */}
        {activeProfileTab === 'collaborations' && (
          <div>
            {faculty.collaborations.length > 0 ? (
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
            ) : (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--muted)', background: 'var(--surface-soft)', borderRadius: 'var(--radius-sm)' }}>
                Межвузовские и кафедральные научные связи преподавателя оформляются Научным сектором.
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
};
