import React from 'react';
import { 
  BookOpen, 
  Library, 
  Users, 
  Bookmark, 
  GraduationCap, 
  ArrowRight, 
  Search, 
  FileEdit, 
  Sparkles, 
  BookMarked,
  Award,
  Compass,
  CheckCircle2,
  ExternalLink,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import { SectionTab } from './Header';
import { PORTAL_STATS } from '../data/portal-stats';

interface HomeViewProps {
  onSelectTab: (tab: SectionTab) => void;
  onOpenReaderBySourceId: (sourceId: string) => void;
  onOpenUnderstandingCard: (cardId?: string) => void;
  onOpenResearchDraft: () => void;
  onOpenSearch: () => void;
  onSelectFacultyMember?: (facultyId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectTab,
  onOpenReaderBySourceId,
  onOpenUnderstandingCard,
  onOpenResearchDraft,
  onOpenSearch,
  onSelectFacultyMember
}) => {
  return (
    <div style={{ paddingBottom: '90px' }} className="animate-fade-in">

      {/* Modern Widescreen Dashboard Grid: Main Area (Left) + Companion Sidebar (Right) */}
      <div className="home-layout-grid">

        {/* ======================================================== */}
        {/* LEFT / MAIN WORKSPACE COLUMN */}
        {/* ======================================================== */}
        <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: '26px' }}>

          {/* ACADEMIC HERO HEADER */}
          <div 
            className="paper-card"
            style={{
              padding: '36px 32px',
              background: 'linear-gradient(135deg, rgba(75, 50, 104, 0.08) 0%, rgba(184, 59, 28, 0.05) 100%)',
              borderLeft: '5px solid var(--primary)',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Background Stylized Monogram */}
            <div style={{
              position: 'absolute',
              right: '24px',
              bottom: '-30px',
              fontSize: '160px',
              fontFamily: 'var(--font-serif)',
              color: 'rgba(75, 50, 104, 0.05)',
              userSelect: 'none',
              pointerEvents: 'none',
              lineHeight: 1
            }}>
              Ψ
            </div>

            <div style={{ position: 'relative', zIndex: 1, maxWidth: '860px' }}>
              {/* Scientific Sector Badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }} className="pill pill-primary">
                <Sparkles size={13} />
                <span>Научный сектор психологии · База знаний</span>
              </div>

              <h1 style={{
                fontSize: '32px',
                fontWeight: 800,
                color: 'var(--ink)',
                fontFamily: 'var(--font-serif)',
                lineHeight: 1.25,
                marginBottom: '12px',
                letterSpacing: '-0.01em'
              }}>
                Учебно-исследовательский портал кафедры психологии
              </h1>

              <p style={{
                fontSize: '15.5px',
                color: 'var(--ink-soft)',
                lineHeight: 1.6,
                marginBottom: '22px'
              }}>
                Единая академическая среда для студентов факультета: учебные программы и семинары 
                с оцифрованными первоисточниками в PDF, карточки глубокого понимания научных текстов, 
                профили преподавателей, понятийный тезаурус и конструктор студенческих исследований.
              </p>

              {/* Quick Primary Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => onSelectTab('disciplines')}
                  className="btn-ink"
                  style={{ padding: '10px 18px', fontSize: '13.5px' }}
                >
                  <BookOpen size={16} />
                  <span>Перейти к дисциплинам и семинарам</span>
                  <ArrowRight size={14} />
                </button>

                <button
                  onClick={() => onSelectTab('reader')}
                  className="btn-ghost"
                  style={{ padding: '9px 16px', fontSize: '13.5px' }}
                >
                  <Library size={16} color="var(--primary)" />
                  <span>Библиотека ({PORTAL_STATS.sourcesCount} источников)</span>
                </button>

                <button
                  onClick={onOpenSearch}
                  className="btn-ghost"
                  style={{ padding: '9px 16px', fontSize: '13.5px' }}
                >
                  <Search size={15} color="var(--primary)" />
                  <span>Поиск по материалам</span>
                </button>
              </div>
            </div>
          </div>

          {/* CORE PORTAL SECTIONS HEADER */}
          <div>
            <div style={{ marginBottom: '14px' }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: 800,
                color: 'var(--ink)',
                fontFamily: 'var(--font-serif)',
                marginBottom: '4px'
              }}>
                Разделы академического портала
              </h2>
              <p style={{ fontSize: '13.5px', color: 'var(--muted)', margin: 0 }}>
                Выберите направление учебной работы, подготовки к семинарским занятиям или проведения научного исследования.
              </p>
            </div>

            {/* SECTIONS GRID (2-column on standard, 3-column on widescreen) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '18px'
            }}>

              {/* CARD 1: Учебные дисциплины и семинары */}
              <div 
                className="paper-card"
                onClick={() => onSelectTab('disciplines')}
                style={{
                  padding: '24px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderTop: '4px solid var(--primary)',
                  transition: 'border-color 0.2s ease, transform 0.18s ease, box-shadow 0.18s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'var(--primary-light)',
                      border: '1px solid var(--primary-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--primary)'
                    }}>
                      <BookOpen size={20} />
                    </div>
                    <span className="pill pill-primary" style={{ fontSize: '11px', fontWeight: 600 }}>
                      1 курс · Семинары
                    </span>
                  </div>

                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--ink)', marginBottom: '8px', lineHeight: 1.3 }}>
                    Учебные дисциплины и семинары
                  </h3>

                  <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.55, marginBottom: '14px' }}>
                    Программа базового курса «Психология мотивации и эмоций»: 9 семинарских занятий (34 академических часа), 
                    тематические блоки вопросов, понятийные тезаурусы и прямые ссылки на оцифрованные первоисточники в PDF.
                  </p>

                  <div style={{
                    background: 'var(--surface-soft)',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--line)',
                    marginBottom: '16px',
                    fontSize: '12px',
                    color: 'var(--ink)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--primary)', marginBottom: '3px' }}>
                      <CheckCircle2 size={13} color="var(--primary)" />
                      <span>Текущая активная дисциплина:</span>
                    </div>
                    <div>Психология мотивации и эмоций · Ведущий преподаватель: А.А. Туниянц</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--line)' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--primary)' }}>
                    Перейти к выбору семинара
                  </span>
                  <ArrowRight size={15} color="var(--primary)" />
                </div>
              </div>

              {/* CARD 2: Библиотека первоисточников */}
              <div 
                className="paper-card"
                onClick={() => onSelectTab('reader')}
                style={{
                  padding: '24px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderTop: '4px solid var(--ochre)',
                  transition: 'border-color 0.2s ease, transform 0.18s ease, box-shadow 0.18s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'var(--ochre-light)',
                      border: '1px solid var(--ochre-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--ochre)'
                    }}>
                      <Library size={20} />
                    </div>
                    <span className="pill pill-ochre" style={{ fontSize: '11px', fontWeight: 600 }}>
                      {PORTAL_STATS.sourcesCount} источников · PDF
                    </span>
                  </div>

                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--ink)', marginBottom: '8px', lineHeight: 1.3 }}>
                    Библиотека первоисточников
                  </h3>

                  <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.55, marginBottom: '14px' }}>
                    Оцифрованные тексты классической и современной психологии: хрестоматии Ю.Б. Гиппенрейтер и В.К. Вилюнаса, 
                    труды А.Н. Леонтьева, З. Фрейда, Х. Хекхаузена, монографии преподавателей ТФ МГУ. Встроенный PDF-ридер с поиском и цитированием.
                  </p>

                  <div style={{
                    background: 'var(--surface-soft)',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--line)',
                    marginBottom: '16px',
                    fontSize: '12px',
                    color: 'var(--ink)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--ochre)', marginBottom: '3px' }}>
                      <CheckCircle2 size={13} color="var(--ochre)" />
                      <span>Формат изучения:</span>
                    </div>
                    <div>Полный PDF-просмотр + аналитический конспект для подготовки к ответам</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--line)' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--ochre)' }}>
                    Открыть каталог литературы
                  </span>
                  <ArrowRight size={15} color="var(--ochre)" />
                </div>
              </div>

              {/* CARD 3: Преподаватели кафедры */}
              <div 
                className="paper-card"
                onClick={() => onSelectTab('teachers')}
                style={{
                  padding: '24px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderTop: '4px solid var(--teal)',
                  transition: 'border-color 0.2s ease, transform 0.18s ease, box-shadow 0.18s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'var(--teal-light)',
                      border: '1px solid var(--teal-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--teal)'
                    }}>
                      <Users size={20} />
                    </div>
                    <span className="pill pill-teal" style={{ fontSize: '11px', fontWeight: 600 }}>
                      {PORTAL_STATS.facultyCount} преподавателя
                    </span>
                  </div>

                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--ink)', marginBottom: '8px', lineHeight: 1.3 }}>
                    Преподаватели кафедры
                  </h3>

                  <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.55, marginBottom: '14px' }}>
                    Подробные академические профили преподавателей и руководства направления: 
                    докторские и кандидатские диссертации (PhD), научные школы, исследовательские интересы, 
                    публикации, активные дисциплины и темы студенческих исследований.
                  </p>

                  <div style={{
                    background: 'var(--surface-soft)',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--line)',
                    marginBottom: '16px',
                    fontSize: '12px',
                    color: 'var(--ink)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--teal)', marginBottom: '3px' }}>
                      <CheckCircle2 size={13} color="var(--teal)" />
                      <span>Научные руководители:</span>
                    </div>
                    <div>Профессора, доценты и PhD для выбора руководителя курсовых работ и ВКР</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--line)' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--teal)' }}>
                    Смотреть профили кафедры
                  </span>
                  <ArrowRight size={15} color="var(--teal)" />
                </div>
              </div>

              {/* CARD 4: Терминологический словарь */}
              <div 
                className="paper-card"
                onClick={() => onSelectTab('glossary')}
                style={{
                  padding: '24px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderTop: '4px solid #6366f1',
                  transition: 'border-color 0.2s ease, transform 0.18s ease, box-shadow 0.18s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(99, 102, 241, 0.1)',
                      border: '1px solid rgba(99, 102, 241, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#6366f1'
                    }}>
                      <Bookmark size={20} />
                    </div>
                    <span className="pill" style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1', border: '1px solid rgba(99, 102, 241, 0.25)', fontSize: '11px', fontWeight: 600 }}>
                      {PORTAL_STATS.glossaryCount} терминов
                    </span>
                  </div>

                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--ink)', marginBottom: '8px', lineHeight: 1.3 }}>
                    Терминологический словарь
                  </h3>

                  <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.55, marginBottom: '14px' }}>
                    Тезаурус фундаментальных психологических категорий: мотивация, опредмечивание, сдвиг мотива на цель, 
                    эмоциональная валентность, функциональная автономия и когнитивный диссонанс с этимологией и авторскими трактовками.
                  </p>

                  <div style={{
                    background: 'var(--surface-soft)',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--line)',
                    marginBottom: '16px',
                    fontSize: '12px',
                    color: 'var(--ink)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#6366f1', marginBottom: '3px' }}>
                      <CheckCircle2 size={13} color="#6366f1" />
                      <span>Понятийная база:</span>
                    </div>
                    <div>Формулировки терминов по классическим трудам МГУ и зарубежным источникам</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--line)' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#6366f1' }}>
                    Открыть словарь понятий
                  </span>
                  <ArrowRight size={15} color="#6366f1" />
                </div>
              </div>

              {/* CARD 5: Стандарты НИРС и оформления ВКР */}
              <div 
                className="paper-card"
                onClick={() => onSelectTab('archive')}
                style={{
                  padding: '24px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderTop: '4px solid #059669',
                  transition: 'border-color 0.2s ease, transform 0.18s ease, box-shadow 0.18s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(5, 150, 105, 0.1)',
                      border: '1px solid rgba(5, 150, 105, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#059669'
                    }}>
                      <GraduationCap size={20} />
                    </div>
                    <span className="pill" style={{ background: 'rgba(5, 150, 105, 0.1)', color: '#059669', border: '1px solid rgba(5, 150, 105, 0.25)', fontSize: '11px', fontWeight: 600 }}>
                      НИРС и ВКР
                    </span>
                  </div>

                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--ink)', marginBottom: '8px', lineHeight: 1.3 }}>
                    Стандарты НИР и оформления ВКР
                  </h3>

                  <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.55, marginBottom: '14px' }}>
                    Официальные требования кафедры психологии ТФ МГУ к структуре исследовательских работ: 
                    формулировка объекта, предмета, гипотез, психометрическая проверка методик, 
                    оформление библиографии по ГОСТ 7.0.5-2008 и регламенты предзащиты.
                  </p>

                  <div style={{
                    background: 'var(--surface-soft)',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--line)',
                    marginBottom: '16px',
                    fontSize: '12px',
                    color: 'var(--ink)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#059669', marginBottom: '3px' }}>
                      <CheckCircle2 size={13} color="#059669" />
                      <span>Методологическая поддержка:</span>
                    </div>
                    <div>Шаблоны гипотез, требования к выборке и алгоритм эмпирической валидизации</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--line)' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#059669' }}>
                    Изучить регламенты НИР
                  </span>
                  <ArrowRight size={15} color="#059669" />
                </div>
              </div>

              {/* CARD 6: Интерактивный Черновик Исследования */}
              <div 
                className="paper-card"
                onClick={onOpenResearchDraft}
                style={{
                  padding: '24px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderTop: '4px solid #b83b1c',
                  transition: 'border-color 0.2s ease, transform 0.18s ease, box-shadow 0.18s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(184, 59, 28, 0.1)',
                      border: '1px solid rgba(184, 59, 28, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#b83b1c'
                    }}>
                      <FileEdit size={20} />
                    </div>
                    <span className="pill" style={{ background: 'rgba(184, 59, 28, 0.1)', color: '#b83b1c', border: '1px solid rgba(184, 59, 28, 0.25)', fontSize: '11px', fontWeight: 600 }}>
                      Инструмент студента
                    </span>
                  </div>

                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--ink)', marginBottom: '8px', lineHeight: 1.3 }}>
                    Интерактивный черновик исследования
                  </h3>

                  <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.55, marginBottom: '14px' }}>
                    Конструктор курсовых замыслов: сформулируйте исследовательский вопрос, выделите рабочую гипотезу 
                    как научное предположение, подберите метод эмпирической проверки и экспортируйте результат в текстовый файл с библиографией.
                  </p>

                  <div style={{
                    background: 'var(--surface-soft)',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--line)',
                    marginBottom: '16px',
                    fontSize: '12px',
                    color: 'var(--ink)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#b83b1c', marginBottom: '3px' }}>
                      <CheckCircle2 size={13} color="#b83b1c" />
                      <span>Локальное сохранение:</span>
                    </div>
                    <div>Автоматическое сохранение на устройстве и экспорт в формат .txt с ГОСТ-ссылкой</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--line)' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#b83b1c' }}>
                    Открыть черновик исследования
                  </span>
                  <ArrowRight size={15} color="#b83b1c" />
                </div>
              </div>

            </div>
          </div>

          {/* QUICK FOCUS ON COURSE SEMINARS */}
          <div className="paper-card" style={{ padding: '24px 26px', background: 'var(--surface)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 4px', fontFamily: 'var(--font-serif)' }}>
                  Учебный курс: «Психология мотивации и эмоций»
                </h3>
                <span style={{ fontSize: '12.5px', color: 'var(--muted)' }}>
                  34 академических часа · 9 семинаров · Экзамен в конце 2 семестра
                </span>
              </div>

              <button
                onClick={() => onSelectTab('disciplines')}
                className="btn-ghost"
                style={{ padding: '6px 12px', fontSize: '12.5px' }}
              >
                Все семинары →
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '14px' }}>
              {/* Module 1 shortcut */}
              <div style={{
                background: 'var(--paper-soft)',
                border: '1px solid var(--line)',
                borderLeft: '4px solid var(--primary)',
                padding: '14px',
                borderRadius: 'var(--radius-sm)'
              }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
                  Модуль I: Мотивация (Сем. 1–5)
                </div>
                <p style={{ fontSize: '12.5px', color: 'var(--muted)', margin: '0 0 10px', lineHeight: 1.45 }}>
                  Понятие мотивации, деятельностный подход А.Н. Леонтьева, психоаналитические теории, функциональная автономия и мотивация достижения.
                </p>
                <button
                  onClick={() => onSelectTab('disciplines')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary)',
                    fontWeight: 700,
                    fontSize: '12px',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  Открыть семинары 1–5 <ArrowRight size={12} />
                </button>
              </div>

              {/* Module 2 shortcut */}
              <div style={{
                background: 'var(--paper-soft)',
                border: '1px solid var(--line)',
                borderLeft: '4px solid var(--teal)',
                padding: '14px',
                borderRadius: 'var(--radius-sm)'
              }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
                  Модуль II: Эмоции (Сем. 6–9)
                </div>
                <p style={{ fontSize: '12.5px', color: 'var(--muted)', margin: '0 0 10px', lineHeight: 1.45 }}>
                  Феноменология эмоций, классические теории Джемса–Ланге и Кеннона–Барда, когнитивные теории Шехтера и Лазаруса, волевая регуляция.
                </p>
                <button
                  onClick={() => onSelectTab('disciplines')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--teal)',
                    fontWeight: 700,
                    fontSize: '12px',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  Открыть семинары 6–9 <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* RIGHT / SIDEBAR COMPANION WORKSPACE (Widescreen Asset) */}
        {/* ======================================================== */}
        <div className="home-sidebar-sticky">

          {/* SIDEBAR BLOCK 1: Научный сектор ТФ МГУ */}
          <div className="paper-card" style={{
            padding: '20px',
            background: 'var(--surface)',
            borderTop: '3px solid var(--primary)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Научный сектор ТФ МГУ
              </span>
              <span style={{ fontSize: '11px', background: 'var(--primary-light)', color: 'var(--primary)', padding: '1px 7px', borderRadius: '4px', fontWeight: 700 }}>
                2026
              </span>
            </div>

            <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 6px', lineHeight: 1.3 }}>
              Цифровая экосистема сектора
            </h4>

            <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.45, margin: '0 0 14px' }}>
              Учебные платформы и исследовательские тренажёры, созданные Студенческим научным сектором:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a
                href="https://psy-msutf.vercel.app/ru"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 12px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--paper-soft)',
                  border: '1px solid var(--line)',
                  textDecoration: 'none',
                  color: 'var(--ink)',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--line)'}
              >
                <span>Портал научного сектора</span>
                <ExternalLink size={13} color="var(--primary)" />
              </a>

              <a
                href="https://psy-case-trainer.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 12px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--paper-soft)',
                  border: '1px solid var(--line)',
                  textDecoration: 'none',
                  color: 'var(--ink)',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--line)'}
              >
                <span>Тренажёр кейсов</span>
                <ExternalLink size={13} color="var(--primary)" />
              </a>

              <a
                href="https://psy-stat-lab.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 12px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--paper-soft)',
                  border: '1px solid var(--line)',
                  textDecoration: 'none',
                  color: 'var(--ink)',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--line)'}
              >
                <span>СтатЛаб (лаборатория анализа)</span>
                <ExternalLink size={13} color="var(--primary)" />
              </a>
            </div>

            <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px dashed var(--line)', fontSize: '11.5px', color: 'var(--muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Разработчик:</span>
              <a
                href="https://t.me/speway"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 700 }}
              >
                by spw (Telegram) →
              </a>
            </div>
          </div>

          {/* SIDEBAR BLOCK 2: Быстрый запуск инструментов */}
          <div className="paper-card" style={{
            padding: '20px',
            background: 'var(--surface)',
            borderTop: '3px solid #b83b1c',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#b83b1c', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
              Инструменты исследователя
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                onClick={onOpenResearchDraft}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'linear-gradient(135deg, rgba(184, 59, 28, 0.08) 0%, rgba(184, 59, 28, 0.02) 100%)',
                  border: '1px solid rgba(184, 59, 28, 0.25)',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  background: '#b83b1c',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <FileEdit size={16} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)' }}>
                    Черновик исследования
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)' }}>
                    Локальное сохранение + экспорт .txt
                  </div>
                </div>
              </button>

              <button
                onClick={() => onOpenUnderstandingCard('card-bazarov-sokol-2026')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.08) 0%, rgba(217, 119, 6, 0.02) 100%)',
                  border: '1px solid rgba(217, 119, 6, 0.25)',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  background: 'var(--ochre)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Sparkles size={16} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)' }}>
                    Карточка «СОКОЛ»
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)' }}>
                    Методология Т.Ю. Базарова (6 шагов)
                  </div>
                </div>
              </button>

              <button
                onClick={() => onSelectTab('archive')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.08) 0%, rgba(5, 150, 105, 0.02) 100%)',
                  border: '1px solid rgba(5, 150, 105, 0.25)',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  background: '#059669',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Compass size={16} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)' }}>
                    Стандарты НИРС и ВКР
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)' }}>
                    Регламенты курсовых и ГОСТ-ссылки
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* SIDEBAR BLOCK 3: Рекомендуемые первоисточники */}
          <div className="paper-card" style={{
            padding: '20px',
            background: 'var(--surface)',
            borderTop: '3px solid var(--ochre)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--ochre)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Золотой фонд кафедры
              </span>
              <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 600 }}>
                PDF в ридере
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* Source 1: 20 years monograph */}
              <div 
                onClick={() => onOpenReaderBySourceId('kniga_psihologiya_20_let_2026')}
                style={{
                  padding: '9px 11px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--paper-soft)',
                  border: '1px solid var(--line)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '8px'
                }}
              >
                <div>
                  <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.3 }}>
                    20 лет кафедры психологии
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)' }}>
                    Под ред. Т.Ю. Базарова · 258 с. (2026)
                  </div>
                </div>
                <ArrowUpRight size={14} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
              </div>

              {/* Source 2: SOKOL */}
              <div 
                onClick={() => onOpenReaderBySourceId('bazarov_sokol_2026')}
                style={{
                  padding: '9px 11px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--paper-soft)',
                  border: '1px solid var(--line)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '8px'
                }}
              >
                <div>
                  <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.3 }}>
                    Разработка методики «СОКОЛ»
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)' }}>
                    Базаров Т.Ю., Гасимов А.Ф. (2026)
                  </div>
                </div>
                <ArrowUpRight size={14} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
              </div>

              {/* Source 3: Gippenreiter reader */}
              <div 
                onClick={() => onOpenReaderBySourceId('gippenreiter_hrestomatiya')}
                style={{
                  padding: '9px 11px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--paper-soft)',
                  border: '1px solid var(--line)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '8px'
                }}
              >
                <div>
                  <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.3 }}>
                    Хрестоматия по мотивации и эмоциям
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)' }}>
                    Гиппенрейтер Ю.Б., Фаликман М.В.
                  </div>
                </div>
                <ArrowUpRight size={14} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
              </div>
            </div>
          </div>

          {/* SIDEBAR BLOCK 4: Статистика базы знаний */}
          <div className="paper-card" style={{
            padding: '18px 20px',
            background: 'var(--surface)',
            border: '1px solid var(--line)'
          }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>
              Метрики портала ТФ МГУ
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ padding: '8px', background: 'var(--paper-soft)', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--mono)' }}>
                  {PORTAL_STATS.facultyCount}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--muted)' }}>преподавателей</div>
              </div>

              <div style={{ padding: '8px', background: 'var(--paper-soft)', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ochre)', fontFamily: 'var(--mono)' }}>
                  {PORTAL_STATS.sourcesCount}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--muted)' }}>первоисточников</div>
              </div>

              <div style={{ padding: '8px', background: 'var(--paper-soft)', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#6366f1', fontFamily: 'var(--mono)' }}>
                  {PORTAL_STATS.glossaryCount}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--muted)' }}>терминов</div>
              </div>

              <div style={{ padding: '8px', background: 'var(--paper-soft)', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)' }}>
                  9
                </div>
                <div style={{ fontSize: '11px', color: 'var(--muted)' }}>семинаров курса</div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
