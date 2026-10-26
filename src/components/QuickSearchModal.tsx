import React, { useState, useEffect } from 'react';
import { X, Search, BookOpen, Users, GraduationCap, Bookmark, ArrowRight } from 'lucide-react';
import { COURSES } from '../data/courses';
import { FACULTY_MEMBERS } from '../data/faculty';
import { READER_SOURCES, ReaderSource } from '../data/reader-sources';
import { GLOSSARY_TERMS } from '../data/glossary';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: string) => void;
  onSelectFaculty?: (facultyId: string) => void;
  onOpenReader: (source: ReaderSource) => void;
  onSelectCourse: (courseId: string) => void;
  onSelectTerm: (term: string) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTab,
  onSelectFaculty,
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
    f.role.toLowerCase().includes(q) ||
    (f.interestsList && f.interestsList.some(s => s.toLowerCase().includes(q))) ||
    (f.coursesTaught && f.coursesTaught.some(c => c.title.toLowerCase().includes(q)))
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
  ).slice(0, 6) : [];

  const hasResults = matchedFaculty.length > 0 || matchedCourses.length > 0 || matchedSources.length > 0 || matchedTerms.length > 0;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(25, 39, 52, 0.7)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      zIndex: 250,
      padding: '40px 16px 20px'
    }}>
      <div 
        className="card-clean"
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
          <Search size={20} color="var(--turq)" />
          <input
            type="text"
            placeholder="Поиск по семинарам, первоисточникам, авторам и терминам..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '15px',
              color: 'var(--text)'
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
              Введите поисковый запрос (например: Леонтьев, мотивация, эмоции, Туниянц, фрустрация)
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
                    if (onSelectFaculty) {
                      onSelectFaculty(f.id);
                    }
                    onSelectTab('teachers');
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
                    <Users size={16} color="var(--blue-mid)" />
                    <div>
                      <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text)' }}>{f.name}</div>
                      <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{f.role}</div>
                    </div>
                  </div>
                  <ArrowRight size={14} color="var(--text-muted)" />
                </div>
              ))}
            </div>
          )}

          {/* Courses & Seminars Results */}
          {matchedCourses.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
                Семинары и курсы ({matchedCourses.length})
              </span>
              {matchedCourses.map(c => (
                <div
                  key={c.id}
                  onClick={() => {
                    onSelectCourse(c.id);
                    onSelectTab('disciplines');
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
                    <BookOpen size={16} color="var(--blue-mid)" />
                    <div>
                      <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text)' }}>{c.title}</div>
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
                Первоисточники в читалке ({matchedSources.length})
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
                    <GraduationCap size={16} color="var(--turq)" />
                    <div>
                      <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text)' }}>{s.title}</div>
                      <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{s.author} ({s.year})</div>
                    </div>
                  </div>
                  <span className="badge-tag badge-turq" style={{ fontSize: '10.5px' }}>Ридер ↗</span>
                </div>
              ))}
            </div>
          )}

          {/* Terms Results */}
          {matchedTerms.length > 0 && (
            <div>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
                Понятия словаря ({matchedTerms.length})
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
                    <Bookmark size={15} color="var(--lilac)" />
                    <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text)' }}>{t.term}</span>
                  </div>
                  <span className="badge-tag badge-lilac" style={{ fontSize: '10px' }}>{t.category}</span>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
