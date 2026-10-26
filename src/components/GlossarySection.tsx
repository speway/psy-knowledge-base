import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Shuffle, Bookmark, Tag, X, ArrowUpRight } from 'lucide-react';
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
      const firstChar = (t.term || t.title || '').trim().charAt(0).toUpperCase();
      if (/[А-ЯЁ]/.test(firstChar)) {
        letters.add(firstChar);
      }
    });
    return Array.from(letters).sort((a, b) => a.localeCompare(b, 'ru'));
  }, []);

  // Filtered terms
  const filteredTerms = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return GLOSSARY_TERMS.filter(t => {
      const termName = (t.term || t.title || '').toLowerCase();
      const def = (t.definition || '').toLowerCase();
      const shortDef = (t.shortDefinition || '').toLowerCase();

      const matchesSearch = !q || 
        termName.includes(q) ||
        def.includes(q) ||
        shortDef.includes(q);

      const matchesCategory = selectedCategory === 'Все' || 
        (t.categories && t.categories.includes(selectedCategory)) ||
        t.category === selectedCategory;

      const firstChar = (t.term || t.title || '').trim().toUpperCase().charAt(0);
      const matchesLetter = !selectedLetter || firstChar === selectedLetter;

      return matchesSearch && matchesCategory && matchesLetter;
    });
  }, [searchQuery, selectedCategory, selectedLetter]);

  return (
    <div style={{ paddingBottom: '90px' }}>
      
      {/* Title */}
      <div style={{ marginBottom: '22px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }} className="pill pill-ochre">
          <Bookmark size={12} />
          <span>Академический лексикон</span>
        </div>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 700,
          color: 'var(--ink)',
          fontFamily: 'var(--font-serif)',
          lineHeight: 1.25,
          marginBottom: '6px'
        }}>
          Словарь психологических понятий
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '14px', maxWidth: '820px' }}>
          Единый интерактивный понятийный аппарат кафедры: <strong>280 верифицированных терминов</strong>, 
          структурированных по 9 научным разделам с этимологией, контекстом применения и перекрёстными ссылками.
        </p>
      </div>

      {/* Hero Widget: Термин Дня */}
      <div className="paper-card" style={{
        padding: '24px',
        marginBottom: '24px',
        background: 'var(--surface)',
        borderLeft: '4px solid var(--ochre)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="pill pill-ochre">
              <Sparkles size={12} />
              Термин дня
            </span>
            <span style={{ color: 'var(--muted)', fontSize: '12px', fontWeight: 600 }}>
              Раздел: {termOfDay.category}
            </span>
          </div>

          <button
            onClick={handleShuffleTerm}
            className="btn-ghost"
            style={{ padding: '6px 12px', fontSize: '12px' }}
          >
            <Shuffle size={13} color="var(--ochre)" />
            Другой термин 🎲
          </button>
        </div>

        <h2 style={{
          fontSize: '24px',
          fontWeight: 700,
          color: 'var(--ink)',
          fontFamily: 'var(--font-serif)',
          marginBottom: '6px'
        }}>
          {termOfDay.term || termOfDay.title}
        </h2>

        {termOfDay.shortDefinition && (
          <p style={{ fontSize: '13.5px', color: 'var(--teal)', fontStyle: 'italic', marginBottom: '8px' }}>
            {termOfDay.shortDefinition}
          </p>
        )}

        <p style={{ fontSize: '14px', color: 'var(--ink)', lineHeight: 1.55 }}>
          {termOfDay.definition}
        </p>

        {termOfDay.related && termOfDay.related.length > 0 && (
          <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11.5px', color: 'var(--muted)', fontWeight: 600 }}>Связано с:</span>
            {termOfDay.related.map((r, i) => (
              <span 
                key={i} 
                onClick={() => setSearchQuery(r)}
                className="pill pill-neutral"
                style={{ cursor: 'pointer', fontSize: '10.5px' }}
              >
                {r}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Live Search Input */}
      <div style={{ position: 'relative', marginBottom: '14px' }}>
        <Search size={16} color="var(--muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
        <input
          type="text"
          placeholder="Живой поиск по 280 терминам и определениям..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (e.target.value) setSelectedLetter(null);
          }}
          style={{
            width: '100%',
            padding: '12px 38px 12px 40px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--line)',
            background: 'var(--surface)',
            fontSize: '14px',
            color: 'var(--ink)',
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
              color: 'var(--muted)',
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
            fontWeight: selectedLetter === null ? 800 : 600,
            background: selectedLetter === null ? 'var(--ink)' : 'var(--surface)',
            color: selectedLetter === null ? '#ffffff' : 'var(--ink)',
            border: '1px solid ' + (selectedLetter === null ? 'var(--ink)' : 'var(--line)'),
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
              fontFamily: 'var(--mono)',
              fontWeight: selectedLetter === letter ? 800 : 600,
              background: selectedLetter === letter ? 'var(--ochre)' : 'var(--surface)',
              color: selectedLetter === letter ? '#ffffff' : 'var(--ink)',
              border: '1px solid ' + (selectedLetter === letter ? 'var(--ochre)' : 'var(--line)'),
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
            className={`pill ${selectedCategory === cat ? 'pill-ochre' : 'pill-neutral'}`}
            style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Active Search Status */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 600 }}>
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
              color: 'var(--ochre)',
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '14px' }}>
        {filteredTerms.map((termItem) => (
          <div
            key={termItem.id}
            className="paper-card"
            style={{
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '10px',
              cursor: 'pointer'
            }}
            onClick={() => setSelectedTermDetail(termItem)}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', marginBottom: '6px' }}>
                <span className="pill pill-neutral" style={{ fontSize: '10px' }}>
                  {termItem.category}
                </span>
              </div>

              <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px', fontFamily: 'var(--font-serif)' }}>
                {termItem.term || termItem.title}
              </h3>

              {termItem.shortDefinition && (
                <p style={{ fontSize: '13px', color: 'var(--teal)', fontStyle: 'italic', marginBottom: '6px', lineHeight: 1.4 }}>
                  {termItem.shortDefinition}
                </p>
              )}

              <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.5 }}>
                {termItem.definition}
              </p>
            </div>

            <div style={{ paddingTop: '8px', borderTop: '1px solid var(--line-soft)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '11.5px', color: 'var(--ochre)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                Открыть карточку <ArrowUpRight size={12} />
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 16px', color: 'var(--muted)' }}>
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
          background: 'rgba(16, 32, 28, 0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 110,
          padding: '16px'
        }}>
          <div className="paper-card" style={{
            maxWidth: '580px',
            width: '100%',
            padding: '28px',
            position: 'relative',
            background: 'var(--surface)'
          }}>
            <button
              onClick={() => setSelectedTermDetail(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--ink)'
              }}
            >
              <X size={16} />
            </button>

            <span className="pill pill-ochre" style={{ marginBottom: '8px' }}>
              {selectedTermDetail.category}
            </span>

            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--ink)', fontFamily: 'var(--font-serif)', marginBottom: '6px' }}>
              {selectedTermDetail.term || selectedTermDetail.title}
            </h2>

            {selectedTermDetail.shortDefinition && (
              <p style={{ fontSize: '13.5px', color: 'var(--teal)', fontStyle: 'italic', marginBottom: '12px' }}>
                {selectedTermDetail.shortDefinition}
              </p>
            )}

            <p style={{ fontSize: '14.5px', color: 'var(--ink)', lineHeight: 1.6, marginBottom: '18px' }}>
              {selectedTermDetail.definition}
            </p>

            {selectedTermDetail.usefulFor && selectedTermDetail.usefulFor.length > 0 && (
              <div style={{ marginBottom: '16px', background: 'var(--surface-soft)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--line-soft)' }}>
                <strong style={{ fontSize: '12px', color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.03em', display: 'block', marginBottom: '6px' }}>
                  Применение в психологической практике:
                </strong>
                <ul style={{ paddingLeft: '16px', fontSize: '13px', color: 'var(--muted)' }}>
                  {selectedTermDetail.usefulFor.map((u, i) => (
                    <li key={i}>{u}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedTermDetail.related && selectedTermDetail.related.length > 0 && (
              <div style={{ marginBottom: '18px' }}>
                <span style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                  Связанные понятия:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {selectedTermDetail.related.map((rel, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setSearchQuery(rel);
                        setSelectedTermDetail(null);
                      }}
                      className="pill pill-neutral"
                      style={{ cursor: 'pointer' }}
                    >
                      {rel}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setSelectedTermDetail(null)}
              className="btn-ink"
              style={{ padding: '7px 16px', fontSize: '12.5px' }}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
