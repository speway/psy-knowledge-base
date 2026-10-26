import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Shuffle, Bookmark, Tag, X, ChevronRight, BookOpen } from 'lucide-react';
import { GLOSSARY_TERMS, GLOSSARY_CATEGORIES, GlossaryTerm } from '../data/glossary';

interface GlossarySectionProps {
  initialSearchTerm?: string;
}

export const GlossarySection: React.FC<GlossarySectionProps> = ({ initialSearchTerm = '' }) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchTerm);
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedTermDetail, setSelectedTermDetail] = useState<GlossaryTerm | null>(null);

  // Deterministic daily term
  const dayOfYear = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }, []);

  const [termOfDayIndex, setTermOfDayIndex] = useState<number>(() => {
    return dayOfYear % GLOSSARY_TERMS.length;
  });

  const termOfDay = GLOSSARY_TERMS[termOfDayIndex] || GLOSSARY_TERMS[0];

  const handleShuffleTerm = () => {
    const nextIdx = Math.floor(Math.random() * GLOSSARY_TERMS.length);
    setTermOfDayIndex(nextIdx);
  };

  // Alphabet list
  const alphabet = useMemo(() => {
    const letters = new Set<string>();
    GLOSSARY_TERMS.forEach(t => {
      const firstChar = t.term.trim().charAt(0).toUpperCase();
      if (/[А-ЯЁ]/.test(firstChar)) {
        letters.add(firstChar);
      }
    });
    return Array.from(letters).sort((a, b) => a.localeCompare(b, 'ru'));
  }, []);

  // Filtered terms
  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter(t => {
      const matchesSearch = searchQuery === '' || 
        t.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.definition.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'Все' || t.category === selectedCategory;

      const matchesLetter = !selectedLetter || t.term.trim().toUpperCase().startsWith(selectedLetter);

      return matchesSearch && matchesCategory && matchesLetter;
    });
  }, [searchQuery, selectedCategory, selectedLetter]);

  const handleSelectTermFromList = (term: GlossaryTerm) => {
    setSelectedTermDetail(term);
  };

  return (
    <div style={{ paddingBottom: '90px' }}>
      
      {/* Page Title */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }} className="badge-tag badge-turq">
          <Bookmark size={13} />
          <span>Академический лексикон</span>
        </div>
        <h1 style={{
          fontSize: '25px',
          fontWeight: 800,
          color: 'var(--blue-deep)',
          fontFamily: 'var(--font-serif)',
          lineHeight: 1.25,
          marginBottom: '6px'
        }}>
          Психологический понятийный аппарат
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '820px' }}>
          Единый интерактивный глоссарий кафедры психологии: 280 верифицированных понятий общей психологии, 
          мотивации, эмоций, экспериментальной психодиагностики и методологии.
        </p>
      </div>

      {/* Hero Widget: Термин Дня (Interactive) */}
      <div className="card-clean" style={{
        background: 'linear-gradient(135deg, #2b6175 0%, #358682 60%, #5d487d 100%)',
        color: '#ffffff',
        padding: '24px',
        borderRadius: 'var(--radius-md)',
        marginBottom: '24px',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              background: 'rgba(255, 255, 255, 0.22)',
              color: '#ffffff',
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)',
              fontSize: '11.5px',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <Sparkles size={13} />
              Термин дня
            </span>
            <span style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '12px' }}>
              Категория: {termOfDay.category}
            </span>
          </div>

          <button
            onClick={handleShuffleTerm}
            style={{
              background: 'rgba(255, 255, 255, 0.18)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#ffffff',
              padding: '6px 12px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
          >
            <Shuffle size={13} />
            Другой термин 🎲
          </button>
        </div>

        <h2 style={{
          fontSize: '24px',
          fontWeight: 800,
          color: '#ffffff',
          fontFamily: 'var(--font-serif)',
          marginBottom: '6px'
        }}>
          {termOfDay.term}
        </h2>

        {termOfDay.etymology && (
          <p style={{ fontSize: '12.5px', color: '#c4e8e5', fontStyle: 'italic', marginBottom: '8px' }}>
            {termOfDay.etymology}
          </p>
        )}

        <p style={{ fontSize: '14.5px', color: '#f7fafc', lineHeight: 1.55 }}>
          {termOfDay.definition}
        </p>
      </div>

      {/* Live Search Input */}
      <div style={{ position: 'relative', marginBottom: '14px' }}>
        <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
        <input
          type="text"
          placeholder="Живой поиск термина или фрагмента определения..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (e.target.value) setSelectedLetter(null);
          }}
          style={{
            width: '100%',
            padding: '12px 38px 12px 40px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            background: '#ffffff',
            fontSize: '14px',
            color: 'var(--text)',
            outline: 'none',
            boxShadow: 'var(--shadow-sm)'
          }}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Alphabet Ribbon */}
      <div style={{
        display: 'flex',
        gap: '4px',
        overflowX: 'auto',
        paddingBottom: '8px',
        marginBottom: '14px',
        WebkitOverflowScrolling: 'touch'
      }}>
        <button
          onClick={() => setSelectedLetter(null)}
          style={{
            padding: '4px 10px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '12px',
            fontWeight: selectedLetter === null ? 700 : 500,
            background: selectedLetter === null ? 'var(--blue-deep)' : '#ffffff',
            color: selectedLetter === null ? '#ffffff' : 'var(--text-secondary)',
            border: '1px solid ' + (selectedLetter === null ? 'var(--blue-deep)' : 'var(--border)'),
            cursor: 'pointer',
            flexShrink: 0
          }}
        >
          Все (280)
        </button>
        {alphabet.map((letter) => (
          <button
            key={letter}
            onClick={() => {
              setSelectedLetter(letter);
              setSearchQuery('');
            }}
            style={{
              minWidth: '28px',
              height: '28px',
              padding: '0 4px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '12px',
              fontWeight: selectedLetter === letter ? 700 : 500,
              background: selectedLetter === letter ? 'var(--turq)' : '#ffffff',
              color: selectedLetter === letter ? '#ffffff' : 'var(--text-secondary)',
              border: '1px solid ' + (selectedLetter === letter ? 'var(--turq)' : 'var(--border)'),
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Category Pills */}
      <div style={{
        display: 'flex',
        gap: '6px',
        overflowX: 'auto',
        paddingBottom: '8px',
        marginBottom: '18px',
        WebkitOverflowScrolling: 'touch'
      }}>
        {['Все', ...GLOSSARY_CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '5px 12px',
              borderRadius: 'var(--radius-full)',
              fontSize: '12px',
              fontWeight: selectedCategory === cat ? 700 : 500,
              background: selectedCategory === cat ? 'var(--blue-deep)' : '#ffffff',
              color: selectedCategory === cat ? '#ffffff' : 'var(--text-secondary)',
              border: '1px solid ' + (selectedCategory === cat ? 'var(--blue-deep)' : 'var(--border)'),
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Active Search & Filter Status */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Отображается понятий: <strong>{filteredTerms.length}</strong>
        </span>
        {(searchQuery || selectedLetter || selectedCategory !== 'Все') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedLetter(null);
              setSelectedCategory('Все');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--turq)',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Сбросить фильтры ✕
          </button>
        )}
      </div>

      {/* Terms Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
        {filteredTerms.map((termItem) => (
          <div
            key={termItem.id}
            className="card-clean"
            style={{
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }}
            onClick={() => handleSelectTermFromList(termItem)}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', marginBottom: '6px' }}>
                <span className="badge-tag badge-turq" style={{ fontSize: '10.5px' }}>
                  {termItem.category}
                </span>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--blue-deep)', marginBottom: '4px' }}>
                {termItem.term}
              </h3>

              {termItem.etymology && (
                <p style={{ fontSize: '11.5px', color: 'var(--turq)', fontStyle: 'italic', marginBottom: '6px' }}>
                  {termItem.etymology}
                </p>
              )}

              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                {termItem.definition}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 16px', color: 'var(--text-muted)' }}>
          <p>По вашему запросу понятий не найдено.</p>
        </div>
      )}

      {/* Modal for detailed term view */}
      {selectedTermDetail && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(25, 39, 52, 0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 110,
          padding: '16px'
        }}>
          <div className="card-clean" style={{
            maxWidth: '560px',
            width: '100%',
            padding: '24px',
            position: 'relative'
          }}>
            <button
              onClick={() => setSelectedTermDetail(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'var(--bg)',
                border: 'none',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-muted)'
              }}
            >
              <X size={18} />
            </button>

            <span className="badge-tag badge-turq" style={{ marginBottom: '8px' }}>
              {selectedTermDetail.category}
            </span>

            <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--blue-deep)', fontFamily: 'var(--font-serif)', marginBottom: '6px' }}>
              {selectedTermDetail.term}
            </h2>

            {selectedTermDetail.etymology && (
              <p style={{ fontSize: '13px', color: 'var(--turq)', fontStyle: 'italic', marginBottom: '12px' }}>
                {selectedTermDetail.etymology}
              </p>
            )}

            <p style={{ fontSize: '14.5px', color: 'var(--text)', lineHeight: 1.6, marginBottom: '20px' }}>
              {selectedTermDetail.definition}
            </p>

            <button
              onClick={() => setSelectedTermDetail(null)}
              style={{
                background: 'var(--blue-deep)',
                color: '#ffffff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
