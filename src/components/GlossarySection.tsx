import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Shuffle, Bookmark, Tag, X, ChevronRight, BookOpen, Layers } from 'lucide-react';
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
      
      {/* Page Title */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }} className="badge-tag badge-turq">
          <Bookmark size={13} />
          <span>Психологический лексикон</span>
        </div>
        <h1 style={{
          fontSize: '25px',
          fontWeight: 800,
          color: 'var(--blue-deep)',
          fontFamily: 'var(--font-serif)',
          lineHeight: 1.25,
          marginBottom: '6px'
        }}>
          Словарь психологических понятий
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '820px' }}>
          Интерактивный понятийный аппарат кафедры психологии: <strong>280 академических терминов</strong>, 
          структурированных по 9 научным разделам с этимологией, контекстом применения и перекрёстными ссылками.
        </p>
      </div>

      {/* Hero Widget: Термин Дня */}
      <div className="card-clean" style={{
        background: 'linear-gradient(135deg, #245266 0%, #358682 60%, #5d487d 100%)',
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
              Раздел: {termOfDay.category}
            </span>
          </div>

          <button
            onClick={handleShuffleTerm}
            style={{
              background: 'rgba(255, 255, 255, 0.18)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#ffffff',
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
          >
            <Shuffle size={13} />
            Другой случайный термин 🎲
          </button>
        </div>

        <h2 style={{
          fontSize: '24px',
          fontWeight: 800,
          color: '#ffffff',
          fontFamily: 'var(--font-serif)',
          marginBottom: '6px'
        }}>
          {termOfDay.term || termOfDay.title}
        </h2>

        {termOfDay.shortDefinition && (
          <p style={{ fontSize: '13.5px', color: '#c4e8e5', fontStyle: 'italic', marginBottom: '8px' }}>
            {termOfDay.shortDefinition}
          </p>
        )}

        <p style={{ fontSize: '14.5px', color: '#f7fafc', lineHeight: 1.55 }}>
          {termOfDay.definition}
        </p>

        {termOfDay.related && termOfDay.related.length > 0 && (
          <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)' }}>Связано с:</span>
            {termOfDay.related.map((r, i) => (
              <span 
                key={i} 
                onClick={() => setSearchQuery(r)}
                style={{ 
                  background: 'rgba(255, 255, 255, 0.15)', 
                  padding: '2px 8px', 
                  borderRadius: '10px', 
                  fontSize: '11px', 
                  cursor: 'pointer' 
                }}
              >
                {r}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Live Search Input */}
      <div style={{ position: 'relative', marginBottom: '14px' }}>
        <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
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

      {/* Active Search Status & Count */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Найдено понятий: <strong>{filteredTerms.length}</strong>
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '14px' }}>
        {filteredTerms.map((termItem) => (
          <div
            key={termItem.id}
            className="card-clean"
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
                <span className="badge-tag badge-turq" style={{ fontSize: '10.5px' }}>
                  {termItem.category}
                </span>
              </div>

              <h3 style={{ fontSize: '16.5px', fontWeight: 800, color: 'var(--blue-deep)', marginBottom: '4px', fontFamily: 'var(--font-serif)' }}>
                {termItem.term || termItem.title}
              </h3>

              {termItem.shortDefinition && (
                <p style={{ fontSize: '13px', color: 'var(--blue-mid)', fontStyle: 'italic', marginBottom: '6px', lineHeight: 1.4 }}>
                  {termItem.shortDefinition}
                </p>
              )}

              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                {termItem.definition}
              </p>
            </div>

            <div style={{ paddingTop: '8px', borderTop: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '11.5px', color: 'var(--turq)', fontWeight: 700 }}>
                Открыть статью →
              </span>
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
          background: 'rgba(25, 39, 52, 0.7)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 110,
          padding: '16px'
        }}>
          <div className="card-clean" style={{
            maxWidth: '580px',
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

            <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--blue-deep)', fontFamily: 'var(--font-serif)', marginBottom: '6px' }}>
              {selectedTermDetail.term || selectedTermDetail.title}
            </h2>

            {selectedTermDetail.shortDefinition && (
              <p style={{ fontSize: '13.5px', color: 'var(--turq)', fontStyle: 'italic', marginBottom: '12px' }}>
                {selectedTermDetail.shortDefinition}
              </p>
            )}

            <p style={{ fontSize: '14.5px', color: 'var(--text)', lineHeight: 1.6, marginBottom: '16px' }}>
              {selectedTermDetail.definition}
            </p>

            {selectedTermDetail.usefulFor && selectedTermDetail.usefulFor.length > 0 && (
              <div style={{ marginBottom: '14px', background: '#f8fafc', padding: '10px 14px', borderRadius: 'var(--radius-sm)' }}>
                <strong style={{ fontSize: '12px', color: 'var(--blue-deep)', display: 'block', marginBottom: '4px' }}>
                  Применение в психологической практике:
                </strong>
                <ul style={{ paddingLeft: '16px', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                  {selectedTermDetail.usefulFor.map((u, i) => (
                    <li key={i}>{u}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedTermDetail.related && selectedTermDetail.related.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
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
                      className="badge-tag badge-blue"
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
