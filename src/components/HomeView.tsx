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
  CheckCircle2
} from 'lucide-react';
import { SectionTab } from './Header';
import { FACULTY_MEMBERS } from '../data/faculty';
import { READER_SOURCES } from '../data/reader-sources';
import { GLOSSARY_TERMS } from '../data/glossary';

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

      {/* ACADEMIC HERO HEADER */}
      <div 
        className="paper-card"
        style={{
          padding: '36px 32px',
          marginBottom: '26px',
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
          right: '20px',
          bottom: '-30px',
          fontSize: '150px',
          fontFamily: 'var(--font-serif)',
          color: 'rgba(75, 50, 104, 0.05)',
          userSelect: 'none',
          pointerEvents: 'none',
          lineHeight: 1
        }}>
          Ψ
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '820px' }}>
          {/* Institutional Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }} className="pill pill-primary">
            <Award size={13} />
            <span>Филиал МГУ имени М.В. Ломоносова в г. Ташкенте · Кафедра психологии</span>
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
            профили преподавателей, терминологический словарь и стандарты научно-исследовательской работы.
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
              <span>Библиотека ({READER_SOURCES.length} источников)</span>
            </button>

            <button
              onClick={onOpenSearch}
              className="btn-ghost"
              style={{ padding: '9px 16px', fontSize: '13.5px' }}
            >
              <Search size={15} color="var(--primary)" />
              <span>Поиск по порталу (Ctrl+K)</span>
            </button>
          </div>
        </div>
      </div>

      {/* PROFESSOR T.YU. BAZAROV MISSION BANNER */}
      <div 
        className="paper-card"
        style={{
          padding: '24px 28px',
          marginBottom: '28px',
          background: 'linear-gradient(135deg, #2b173e 0%, #3e1c5c 100%)',
          color: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(245, 158, 11, 0.28)',
          boxShadow: '0 8px 24px rgba(43, 23, 62, 0.18)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
          <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.82)', fontWeight: 600 }}>
            Научная традиция кафедры · Кафедра психологии Филиала МГУ в г. Ташкенте
          </span>
          <span className="pill" style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.35)', fontSize: '11px', padding: '2px 8px' }}>
            20 лет кафедре (2006–2026)
          </span>
        </div>

        <blockquote style={{
          margin: '0 0 14px 0',
          padding: '0 0 0 16px',
          borderLeft: '3px solid #f59e0b',
          fontSize: '17px',
          lineHeight: 1.5,
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          color: '#fdfbfe'
        }}>
          «Главное — превратить знакомство с текстами в увлекательное путешествие с выходом на собственные исследования»
        </blockquote>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.12)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.14)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12.5px',
              fontWeight: 800,
              color: '#ffffff'
            }}>
              ТЮ
            </div>
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#ffffff' }}>
                Тахир Юсупович Базаров
              </div>
              <div style={{ fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.75)' }}>
                доктор психологических наук, заслуженный профессор Московского университета, заведующий кафедрой психологии филиала МГУ
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onOpenUnderstandingCard('card-bazarov-sokol-2026')}
              style={{
                background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                padding: '7px 13px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 8px rgba(217, 119, 6, 0.3)',
                transition: 'background-color 0.2s ease, transform 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
            >
              <Sparkles size={13} />
              <span>Методика «СОКОЛ» (Карточка понимания)</span>
            </button>

            <button
              onClick={() => onOpenReaderBySourceId('kniga_psihologiya_20_let_2026')}
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.22)',
                borderRadius: 'var(--radius-sm)',
                padding: '7px 13px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'}
            >
              <BookMarked size={13} />
              <span>Книга «20 лет кафедры» (PDF)</span>
            </button>

            <button
              onClick={onOpenResearchDraft}
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.22)',
                borderRadius: 'var(--radius-sm)',
                padding: '7px 13px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'}
            >
              <FileEdit size={13} />
              <span>Черновик исследования</span>
            </button>
          </div>
        </div>
      </div>

      {/* CORE PORTAL SECTIONS (CARDS NAVIGATION) */}
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
        <p style={{ fontSize: '13.5px', color: 'var(--muted)', marginBottom: '18px' }}>
          Выберите раздел для учебной работы, подготовки к семинарским занятиям или проведения научного исследования.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '18px',
        marginBottom: '28px'
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
              Программа базового курса <strong>«Психология мотивации и эмоций»</strong>: 
              9 семинарских занятий (36 академических часов), тематические блоки вопросов, 
              пошаговые подсказки и прямые ссылки на оцифрованные первоисточники в PDF.
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
                {READER_SOURCES.length} источников · PDF
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
                {FACULTY_MEMBERS.length} преподавателя
              </span>
            </div>

            <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--ink)', marginBottom: '8px', lineHeight: 1.3 }}>
              Преподаватели кафедры
            </h3>

            <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.55, marginBottom: '14px' }}>
              Подробные академические профили преподавателей и руководства направления: 
              докторские и кандидатские диссертации (PhD), научные школы, исследовательские интересы, 
              публикации, читаемые дисциплины и темы студенческих исследований.
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
                {GLOSSARY_TERMS.length} терминов
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
                <span>Поиск по алфавиту:</span>
              </div>
              <div>Быстрая фильтрация по буквам алфавита и контекстный поиск по понятиям</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--line)' }}>
            <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#6366f1' }}>
              Открыть академический словарь
            </span>
            <ArrowRight size={15} color="#6366f1" />
          </div>
        </div>

        {/* CARD 5: Стандарты НИР и ВКР */}
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

      {/* FOOTER ACADEMIC CREDENTIALS */}
      <div style={{
        textAlign: 'center',
        padding: '24px 16px',
        borderTop: '1px solid var(--line)',
        color: 'var(--muted)',
        fontSize: '12.5px'
      }}>
        <p style={{ marginBottom: '6px', fontWeight: 600, color: 'var(--ink-soft)' }}>
          Кафедра психологии Филиала Московского государственного университета имени М.В. Ломоносова в г. Ташкенте
        </p>
        <p style={{ margin: 0 }}>
          Официальные материалы монографии «20 лет профессиональной традиции» (2006–2026) · Программы семинарских курсов и НИРС
        </p>
      </div>

    </div>
  );
};
