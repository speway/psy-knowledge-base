import React from 'react';
import { GraduationCap, CheckCircle2, BookOpen, ArrowUpRight, FileText, UserCheck, BookmarkCheck, Sparkles, Compass, Layers, FileEdit } from 'lucide-react';
import { STUDENT_GUIDELINES } from '../data/student-guide';
import { FACULTY_MEMBERS } from '../data/faculty';
import { UNDERSTANDING_CARDS } from '../data/understanding-cards';
import { CONTEXTUAL_GUIDES } from '../data/contextual-guides';
import { ResearchDraftInitialData } from './ResearchDraftModal';

interface ArchiveViewProps {
  onNavigateToFaculty: (facultyId: string) => void;
  onOpenReaderBySourceId?: (sourceId: string) => void;
  onOpenUnderstandingCard?: (cardId: string) => void;
  onOpenContextualGuide?: (guideId: string) => void;
  onOpenResearchDraft?: (data: ResearchDraftInitialData) => void;
}

export const ArchiveView: React.FC<ArchiveViewProps> = ({ 
  onNavigateToFaculty,
  onOpenReaderBySourceId,
  onOpenUnderstandingCard,
  onOpenContextualGuide,
  onOpenResearchDraft
}) => {
  const tuniyants = FACULTY_MEMBERS[0];

  const methodologyBooks = [
    {
      id: 'anufriev',
      title: 'Научное исследование. Курсовые, дипломные и диссертационные работы',
      author: 'Ануфриев А.Ф.',
      description: 'Фундаментальное пособие по планированию научного психологического исследования, гипотетико-дедуктивному методу и защите работ.'
    },
    {
      id: 'krysanova',
      title: 'Методология психолого-педагогических исследований',
      author: 'Крысанова О.А.',
      description: 'Построение категориального аппарата, обоснование объекта и предмета, логика формулировки научных гипотез.'
    },
    {
      id: 'but',
      title: 'Исследование: шестнадцать уроков для начинающих авторов',
      author: 'Бут У.К., Коломб Г.Дж., Уильямс Дж.М.',
      description: 'Классическое руководство по академическому письму, аргументации тезисов и работе с научными первоисточниками.'
    },
    {
      id: 'radoutsky',
      title: 'Основы научных исследований',
      author: 'Радоуцкий В.Ю.',
      description: 'Стандарты оформления рукописей, требования к иллюстрациям, таблицам и статистической обработке данных.'
    }
  ];

  return (
    <div style={{ paddingBottom: '90px' }}>
      
      {/* Title */}
      <div style={{ marginBottom: '22px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }} className="pill pill-ochre">
          <GraduationCap size={12} />
          <span>Студенческий учебно-методический кабинет НИРС</span>
        </div>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 700,
          color: 'var(--ink)',
          fontFamily: 'var(--font-serif)',
          lineHeight: 1.25,
          marginBottom: '6px'
        }}>
          Методические рекомендации по подготовке курсовых и ВКР
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '14px', maxWidth: '820px' }}>
          Учебно-методические рекомендации по научно-исследовательской работе студентов (НИРС):
          структура научного аппарата введения, ориентировочный реестр тем исследований и стандарты академического оформления рукописей.
        </p>
      </div>

      {/* PEDAGOGICAL RESEARCH JOURNEY: PROF. T.Y. BAZAROV MODEL */}
      <div 
        className="paper-card"
        style={{
          padding: '24px',
          marginBottom: '28px',
          background: 'linear-gradient(135deg, #2b173e 0%, #431f63 100%)',
          color: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          boxShadow: '0 12px 32px rgba(43, 23, 62, 0.2)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
          <span style={{
            background: 'rgba(245, 158, 11, 0.25)',
            color: '#fef3c7',
            border: '1px solid rgba(245, 158, 11, 0.45)',
            padding: '3px 10px',
            borderRadius: 'var(--radius-full)',
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.04em',
            fontFamily: 'var(--mono)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            <Sparkles size={12} color="#f59e0b" />
            ПЕДАГОГИЧЕСКИЙ ПРИНЦИП КАФЕДРЫ ПСИХОЛОГИИ
          </span>
          <span style={{ fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.7)' }}>
            Концепция проф. Т.Ю. Базарова
          </span>
        </div>

        <blockquote style={{
          margin: '0 0 16px 0',
          padding: '0 0 0 16px',
          borderLeft: '3px solid #f59e0b',
          fontSize: '16.5px',
          lineHeight: 1.45,
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          color: '#fdfbfe'
        }}>
          «Главное — превратить знакомство с текстами в увлекательное путешествие с выходом на собственные исследования»
        </blockquote>

        {/* 7 UNDERSTANDING CARDS GRID */}
        <div style={{ marginBottom: '18px' }}>
          <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#fef3c7', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Layers size={14} color="#f59e0b" />
            Карточки понимания первоисточников (6 блоков + тема курсовой и гипотеза):
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '8px' }}>
            {UNDERSTANDING_CARDS.map((card) => (
              <button
                key={card.id}
                onClick={() => onOpenUnderstandingCard && onOpenUnderstandingCard(card.id)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px 14px',
                  textAlign: 'left',
                  color: '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '11px', color: '#fef3c7', fontWeight: 700, fontFamily: 'var(--mono)' }}>
                    {card.author} {card.year ? `(${card.year})` : ''}
                  </span>
                  <Sparkles size={11} color="#f59e0b" />
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, lineHeight: 1.3 }}>
                  {card.title}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 6 CONTEXTUAL RESEARCH GUIDES ROW */}
        <div>
          <div style={{ fontSize: '12px', fontWeight: 800, color: 'rgba(255, 255, 255, 0.85)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Compass size={14} color="#60a5fa" />
            Гайды понимания тем и семинарских вопросов:
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {CONTEXTUAL_GUIDES.map((g) => (
              <button
                key={g.id}
                onClick={() => onOpenContextualGuide && onOpenContextualGuide(g.id)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: 'var(--radius-full)',
                  padding: '5px 12px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#ffffff',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
              >
                <Compass size={11} color="#93c5fd" />
                <span>{g.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* STUDENT RESEARCH NOTEBOOK CALLOUT */}
      {onOpenResearchDraft && (
        <div 
          className="paper-card animate-fade-in"
          style={{
            padding: '20px 24px',
            marginBottom: '28px',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
            border: '1px solid #a7f3d0',
            borderLeft: '5px solid #059669',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-xs)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div style={{ flex: 1, minWidth: '260px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="pill" style={{ background: '#d1fae5', color: '#065f46', fontWeight: 800, fontSize: '11px', padding: '2px 8px' }}>
                ИНСТРУМЕНТ СТУДЕНТА
              </span>
              <span style={{ fontSize: '12px', color: '#047857', fontWeight: 600 }}>
                Локальное сохранение · Экспорт в файл
              </span>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#064e3b', margin: '0 0 4px 0' }}>
              Интерактивный черновик исследования (ВКР / курсовая)
            </h3>
            <p style={{ fontSize: '13px', color: '#065f46', margin: 0, lineHeight: 1.5 }}>
              Сформулируйте проблему своими словами, зафиксируйте рабочую гипотезу как научное предположение, опишите методы проверки и выгрузите готовый текстовый черновик с библиографией.
            </p>
          </div>

          <button
            onClick={() => onOpenResearchDraft({
              sourceTitle: 'Методология психологического исследования (ГОСТ и стандарты кафедры)',
              sourceAuthor: 'Кафедра психологии ТФ МГУ',
              citation: 'Ануфриев А.Ф. Научное исследование. Курсовые, дипломные и диссертационные работы. М.: Ось-89. // Методические рекомендации СНС психологии ТФ МГУ',
              topic: 'Планирование курсовой работы / выпускной квалификационной работы (ВКР)'
            })}
            style={{
              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 18px',
              fontSize: '13px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 14px rgba(5, 150, 105, 0.28)',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
          >
            <FileEdit size={15} />
            <span>Открыть Черновик исследования</span>
          </button>
        </div>
      )}

      {/* Methodology Library in Reader */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)', fontFamily: 'var(--font-serif)' }}>
            Методологические первоисточники для подготовки исследований
          </h2>
          <span style={{ fontSize: '11.5px', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
            Оцифрованные учебные пособия доступны в ридере
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          {methodologyBooks.map((book) => (
            <div
              key={book.id}
              className="paper-card"
              style={{
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '10px',
                background: 'var(--surface)'
              }}
            >
              <div>
                <span className="pill pill-neutral" style={{ fontSize: '10.5px', marginBottom: '6px', display: 'inline-block' }}>
                  {book.author}
                </span>
                <h4 style={{ fontSize: '14.5px', fontWeight: 800, color: 'var(--ink)', lineHeight: 1.35, marginBottom: '4px' }}>
                  «{book.title}»
                </h4>
                <p style={{ fontSize: '12.5px', color: 'var(--muted)', lineHeight: 1.45 }}>
                  {book.description}
                </p>
              </div>

              {onOpenReaderBySourceId && (
                <div style={{ paddingTop: '8px', borderTop: '1px solid var(--line-soft)' }}>
                  <button
                    onClick={() => onOpenReaderBySourceId(book.id)}
                    className="btn-ghost"
                    style={{ fontSize: '12px', padding: '5px 10px', width: '100%', justifyContent: 'center' }}
                  >
                    <BookOpen size={12} color="var(--ochre)" />
                    <span>Читать пособие в ридере</span>
                    <ArrowUpRight size={12} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Approved Topics by Anna Aleksandrovna */}
      <div className="paper-card" style={{ padding: '24px', marginBottom: '28px', background: 'var(--surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookmarkCheck size={18} color="var(--ochre)" />
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--ink)', fontFamily: 'var(--font-serif)' }}>
              Реестр тем курсовых и ВКР (научный руководитель: А.А. Туниянц)
            </h3>
          </div>
          <button
            onClick={() => onNavigateToFaculty('tuniyants-a-a')}
            className="btn-ghost"
            style={{ fontSize: '12px', padding: '4px 10px' }}
          >
            Научный профиль руководителя →
          </button>
        </div>

        <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '14px', lineHeight: 1.5 }}>
          Темы сформированы в соответствии с приоритетными направлениями кафедры (позитивная психология, субъективное благополучие, саморегуляция, временная перспектива личности):
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {tuniyants.thesisTopics.map((topic, i) => (
            <div
              key={i}
              style={{
                background: 'var(--surface-soft)',
                border: '1px solid var(--line-soft)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}
            >
              <span style={{
                color: 'var(--ochre)',
                fontWeight: 800,
                fontSize: '12px',
                fontFamily: 'var(--mono)',
                marginTop: '1px'
              }}>
                {i + 1}.
              </span>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '13.5px', color: 'var(--ink)', fontWeight: 600, lineHeight: 1.45, display: 'block' }}>
                  {topic}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px', display: 'inline-block' }}>
                  Статус: утверждено кафедрой для бакалавриата
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Methodological Standards */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)', fontFamily: 'var(--font-serif)', marginBottom: '12px' }}>
          Канонические требования к структуре и оформлению
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {STUDENT_GUIDELINES.map((guide) => (
            <div key={guide.id} className="paper-card" style={{ padding: '22px' }}>
              <h3 style={{ fontSize: '16.5px', fontWeight: 700, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontFamily: 'var(--font-serif)' }}>
                <CheckCircle2 size={16} color="var(--ochre)" />
                {guide.title}
              </h3>
              <p style={{ fontSize: '13.5px', color: 'var(--muted)', marginBottom: '12px' }}>
                {guide.summary}
              </p>

              <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {guide.points.map((pt, i) => (
                  <li key={i} style={{ fontSize: '13px', color: 'var(--ink)', lineHeight: 1.5 }}>
                    {pt}
                  </li>
                ))}
              </ul>

              {guide.example && (
                <div style={{
                  background: 'var(--surface-soft)',
                  border: '1px solid var(--line)',
                  borderLeft: '3px solid var(--ochre)',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12.5px',
                  color: 'var(--ink)',
                  marginTop: '12px',
                  fontStyle: 'italic'
                }}>
                  {guide.example}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
