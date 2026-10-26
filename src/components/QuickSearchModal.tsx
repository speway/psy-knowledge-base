import React, { useState, useEffect } from 'react';
import { X, Search, BookOpen, Users, GraduationCap, Bookmark, ArrowRight } from 'lucide-react';
import { COURSES } from '../data/courses';
import { FACULTY_MEMBERS } from '../data/faculty';
import { READER_SOURCES, ReaderSource } from '../data/reader-sources';
import { GLOSSARY_TERMS } from '../data/glossary';
import { NavTab } from './Header';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: NavTab) => void;
  onOpenReader: (source: ReaderSource) => void;
  onSelectCourse: (courseId: string) => void;
  onSelectTerm: (term: string) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTab,
  onOpenReader,
  onSelectCourse,
  onSelectTerm
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const matchedFaculty = q ? FACULTY_MEMBERS.filter(f => 
    f.name.toLowerCase().includes(q) || 
    f.specializations.some(s => s.toLowerCase().includes(q))
  ) : [];

  const matchedCourses = q ? COURSES.filter(c => 
    c.title.toLowerCase().includes(q) || 
    c.description.toLowerCase().includes(q) ||
    c.seminars.some(s => s.title.toLowerCase().includes(q))
  ) : [];

  const matchedSources = q ? READER_SOURCES.filter(s => 
    s.title.toLowerCase().includes(q) || 
    s.author.toLowerCase().includes(q)
  ) : [];

  const matchedTerms = q ? GLOSSARY_TERMS.filter(t => 
    t.term.toLowerCase().includes(q)
  ).slice(0, 5) : [];

  const hasResults = matchedFaculty.length > 0 || matchedCourses.length > 0 || matchedSources.length > 0 || matchedTerms.length > 0;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(12, 35, 64, 0.75)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      zIndex: 70,
      padding: '40px 16px 20px'
    }}>
      <div 
        className="card-academic"
        style={{
          width: '100%',
          maxWidth: '640px',
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          background: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden'
        }}
      >
        {/* Search Input Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '14px 18px',
          borderBottom: '1px solid var(--border-light)'
        }}>
          <Search size={20} color="var(--msu-gold)" />
          <input
            type="text"
            placeholder="Поиск по преподавателям, курсам, книгам и терминам..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '15px',
              color: 'var(--text-main)'
            }}
          />
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Results List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          {!q && (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px', padding: '24px 0' }}>
              Введите ключевое слово (например: Леонтьев, мотивация, Туниянц, эмоции)
            </p>
          )}

          {q && !hasResults && (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px', padding: '24px 0' }}>
              Ничего не найдено по запросу «{query}»
            </p>
          )}

          {/* Faculty Results */}
          {matchedFaculty.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
                Преподаватели ({matchedFaculty.length})
              </span>
              {matchedFaculty.map(f => (
                <div
                  key={f.id}
                  onClick={() => {
                    onSelectTab('faculty');
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    background: '#f8fafc',
                    marginBottom: '6px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Users size={16} color="var(--msu-blue-primary)" />
                    <div>
                      <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-main)' }}>{f.name}</div>
                      <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{f.role}</div>
                    </div>
                  </div>
                  <ArrowRight size={14} color="var(--text-muted)" />
                </div>
              ))}
            </div>
          )}

          {/* Courses Results */}
          {matchedCourses.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
                Дисциплины ({matchedCourses.length})
              </span>
              {matchedCourses.map(c => (
                <div
                  key={c.id}
                  onClick={() => {
                    onSelectCourse(c.id);
                    onSelectTab('courses');
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    background: '#f8fafc',
                    marginBottom: '6px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BookOpen size={16} color="var(--msu-blue-primary)" />
                    <div>
                      <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-main)' }}>{c.title}</div>
                      <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{c.code} · {c.instructorName}</div>
                    </div>
                  </div>
                  <ArrowRight size={14} color="var(--text-muted)" />
                </div>
              ))}
            </div>
          )}

          {/* Sources Results */}
          {matchedSources.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
                Первоисточники в библиотеке ({matchedSources.length})
              </span>
              {matchedSources.map(s => (
                <div
                  key={s.id}
                  onClick={() => {
                    onOpenReader(s);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    background: '#f8fafc',
                    marginBottom: '6px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <GraduationCap size={16} color="var(--msu-gold)" />
                    <div>
                      <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-main)' }}>{s.title}</div>
                      <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{s.author} ({s.year})</div>
                    </div>
                  </div>
                  <span className="badge-blue" style={{ fontSize: '10.5px' }}>Ридер ↗</span>
                </div>
              ))}
            </div>
          )}

          {/* Terms Results */}
          {matchedTerms.length > 0 && (
            <div>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
                Термины словаря ({matchedTerms.length})
              </span>
              {matchedTerms.map(t => (
                <div
                  key={t.id}
                  onClick={() => {
                    onSelectTerm(t.term);
                    onSelectTab('glossary');
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    background: '#f8fafc',
                    marginBottom: '6px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Bookmark size={15} color="var(--msu-gold)" />
                    <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-main)' }}>{t.term}</span>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t.category}</span>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
