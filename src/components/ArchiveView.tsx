import React from 'react';
import { GraduationCap, CheckCircle2 } from 'lucide-react';
import { STUDENT_GUIDELINES } from '../data/student-guide';

interface ArchiveViewProps {
  onNavigateToFaculty: (facultyId: string) => void;
}

export const ArchiveView: React.FC<ArchiveViewProps> = ({ onNavigateToFaculty }) => {
  const sampleTheses = [
    {
      id: 'thesis-1',
      title: 'Взаимосвязь академической мотивации и эмоционального выгорания у студентов филиала вуза',
      author: 'Студент 4 курса бакалавриата',
      supervisor: 'ст. преп. Туниянц А.А.',
      year: '2024',
      grade: 'Отлично (95 баллов)',
      category: 'Выпускная квалификационная работа (ВКР)'
    },
    {
      id: 'thesis-2',
      title: 'Копинг-стратегии и субъективное благополучие первокурсников в период экзаменационной сессии',
      author: 'Студент 3 курса',
      supervisor: 'ст. преп. Туниянц А.А.',
      year: '2023',
      grade: 'Отлично (92 балла)',
      category: 'Курсовая работа'
    },
    {
      id: 'thesis-3',
      title: 'Семантическое пространство представлений о профессиональном успехе у бакалавров психологии',
      author: 'Студент 4 курса',
      supervisor: 'ст. преп. Туниянц А.А.',
      year: '2022',
      grade: 'Отлично (96 баллов)',
      category: 'Выпускная квалификационная работа (ВКР)'
    }
  ];

  return (
    <div style={{ paddingBottom: '90px' }}>
      
      {/* Title */}
      <div style={{ marginBottom: '22px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }} className="pill pill-ochre">
          <GraduationCap size={12} />
          <span>Студенческий научный сектор</span>
        </div>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 700,
          color: 'var(--ink)',
          fontFamily: 'var(--font-serif)',
          lineHeight: 1.25,
          marginBottom: '6px'
        }}>
          Архив студенческих работ и стандарты ВКР
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '14px', maxWidth: '820px' }}>
          Официальные требования кафедры психологии Филиала МГУ в г. Ташкенте: репозиторий защищённых работ, 
          канонический научный аппарат введения и стандарты оформления по ГОСТ 7.0.5–2008.
        </p>
      </div>

      {/* Archive Samples */}
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)', fontFamily: 'var(--font-serif)', marginBottom: '12px' }}>
          Репозиторий защищённых студенческих исследований
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '14px' }}>
          {sampleTheses.map((item) => (
            <div key={item.id} className="paper-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', marginBottom: '8px' }}>
                  <span className="pill pill-neutral" style={{ fontSize: '10.5px' }}>
                    {item.category}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                    {item.year} г.
                  </span>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px', lineHeight: 1.35, fontFamily: 'var(--font-serif)' }}>
                  «{item.title}»
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--muted)' }}>
                  Автор: <strong>{item.author}</strong>
                </p>
                <p style={{ fontSize: '12.5px', color: 'var(--teal)', fontWeight: 600, marginTop: '2px' }}>
                  Научный руководитель: {item.supervisor}
                </p>
              </div>

              <div style={{ paddingTop: '10px', borderTop: '1px solid var(--line-soft)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="pill pill-ochre" style={{ fontSize: '11px' }}>
                  {item.grade}
                </span>
                <span style={{ fontSize: '11.5px', color: 'var(--muted)', fontWeight: 600 }}>
                  Депонировано на кафедре
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guidelines Accordion */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)', fontFamily: 'var(--font-serif)', marginBottom: '12px' }}>
          Методические требования к оформлению курсовых и дипломов
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {STUDENT_GUIDELINES.map((guide) => (
            <div key={guide.id} className="paper-card" style={{ padding: '22px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontFamily: 'var(--font-serif)' }}>
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
                  <strong>Образец:</strong> {guide.example}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
