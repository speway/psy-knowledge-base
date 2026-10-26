import React from 'react';
import { GraduationCap, CheckCircle2, BookOpen, ArrowUpRight, FileText, UserCheck, BookmarkCheck } from 'lucide-react';
import { STUDENT_GUIDELINES } from '../data/student-guide';
import { FACULTY_MEMBERS } from '../data/faculty';

interface ArchiveViewProps {
  onNavigateToFaculty: (facultyId: string) => void;
  onOpenReaderBySourceId?: (sourceId: string) => void;
}

export const ArchiveView: React.FC<ArchiveViewProps> = ({ 
  onNavigateToFaculty,
  onOpenReaderBySourceId 
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
          <span>Учебно-методический кабинет кафедры психологии</span>
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
          Официальный регламент научно-исследовательской работы студентов (НИРС) Филиала МГУ в г. Ташкенте:
          структура научного аппарата введения, реестр утверждённых тем исследований и стандарты академического оформления рукописей.
        </p>
      </div>

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
