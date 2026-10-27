import React from 'react';
import { FileText, CheckCircle2, BookMarked, UserCheck, HelpCircle } from 'lucide-react';
import { STUDENT_GUIDELINES } from '../data/student-guide';

interface StudentGuideViewProps {
  onNavigateToFaculty: (facultyId: string) => void;
}

export const StudentGuideView: React.FC<StudentGuideViewProps> = ({ onNavigateToFaculty }) => {
  return (
    <div className="animate-fade-in" style={{ paddingBottom: '80px' }}>
      
      {/* Title */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }} className="badge-gold">
          <FileText size={14} />
          <span>Научно-исследовательская работа студентов</span>
        </div>
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: 800, 
          color: 'var(--msu-blue-deep)', 
          fontFamily: 'var(--font-brand)',
          marginBottom: '6px'
        }}>
          Методический гид по курсовым работам и ВКР
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '780px' }}>
          Учебно-методические рекомендации по научно-исследовательской работе студентов (НИРС): алгоритм выбора темы, 
          каноническая структура введения, правила оформления списка источников и ориентиры для успешной защиты.
        </p>
      </div>

      {/* Guidelines Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
        {STUDENT_GUIDELINES.map((guide) => (
          <div key={guide.id} className="card-academic" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--msu-blue-deep)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={18} color="var(--msu-gold)" />
              {guide.title}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              {guide.summary}
            </p>

            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: guide.example ? '12px' : '0' }}>
              {guide.points.map((pt, i) => (
                <li key={i} style={{ fontSize: '13px', color: 'var(--text-main)', lineHeight: 1.5 }}>
                  {pt}
                </li>
              ))}
            </ul>

            {guide.example && (
              <div style={{
                background: '#f8fafc',
                borderLeft: '3px solid var(--msu-blue-primary)',
                padding: '10px 14px',
                borderRadius: '4px',
                fontSize: '12.5px',
                color: 'var(--text-secondary)',
                fontStyle: 'italic',
                marginTop: '10px'
              }}>
                <strong>Образец:</strong> {guide.example}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Action: Find Advisor */}
      <div className="card-academic" style={{
        background: 'linear-gradient(135deg, #0c2340 0%, #153a6b 100%)',
        color: '#ffffff',
        padding: '20px',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px', color: '#ffffff' }}>
            Готовитесь к выбору темы курсовой или диплома?
          </h4>
          <p style={{ fontSize: '13px', color: '#cbd5e1' }}>
            Ознакомьтесь с исследовательскими направлениями Анны Александровны Туниянц и других преподавателей кафедры.
          </p>
        </div>
        <button
          onClick={() => onNavigateToFaculty('tuniyants-a-a')}
          className="btn-gold"
          style={{ fontSize: '13px', padding: '8px 16px' }}
        >
          <UserCheck size={16} />
          Посмотреть темы научных руководителей →
        </button>
      </div>

    </div>
  );
};
