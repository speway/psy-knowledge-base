import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Shuffle, Bookmark, Tag } from 'lucide-react';
import { GLOSSARY_TERMS, GLOSSARY_CATEGORIES, GlossaryTerm } from '../data/glossary';

interface GlossarySectionProps {
  initialSearchTerm?: string;
}

export const GlossarySection: React.FC<GlossarySectionProps> = ({ initialSearchTerm = '' }) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchTerm);
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  
  // Deterministic "Term of the Day"
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

  const handleRandomTerm = () => {
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

  // Filter terms
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

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '80px' }}>
      
      {/* Title */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }} className="badge-gold">
          <Bookmark size={14} />
          <span>Мини-уголок научного сообщества</span>
        </div>
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: 800, 
          color: 'var(--msu-blue-deep)', 
          fontFamily: 'var(--font-brand)',
          marginBottom: '6px'
        }}>
          Психологический лексикон и понятийный аппарат
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '780px' }}>
          Академический глоссарий кафедры психологии: 280 верифицированных терминов, категориальный аппарат 
          общей психологии, мотивации, эмоций и методологии исследования.
        </p>
      </div>

      {/* Mini-Corner Highlight: Термин Дня */}
      <div className="card-academic" style={{
        background: 'linear-gradient(135deg, #0c2340 0%, #153a6b 100%)',
        color: '#ffffff',
        padding: '22px',
        borderRadius: 'var(--radius-md)',
        marginBottom: '28px',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--msu-gold)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              background: 'var(--msu-gold)',
              color: '#ffffff',
              padding: '4px 10px',
              borderRadius: '9999px',
              fontSize: '11.5px',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <Sparkles size={13} />
              Термин дня
            </span>
            <span style={{ color: '#cbd5e1', fontSize: '12px' }}>
              Категория: {termOfDay.category}
            </span>
          </div>

          <button
            onClick={handleRandomTerm}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#ffffff',
              padding: '6px 12px',
              borderRadius: '6px',
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
            Случайный термин
          </button>
        </div>

        <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', marginBottom: '8px', letterSpacing: '0.01em' }}>
          {termOfDay.term}
        </h2>

        {termOfDay.etymology && (
          <p style={{ fontSize: '12px', color: '#dfb15b', fontStyle: 'italic', marginBottom: '8px' }}>
            {termOfDay.etymology}
          </p>
        )}

        <p style={{ fontSize: '14px', color: '#f1f5f9', lineHeight: 1.55 }}>
          {termOfDay.definition}
        </p>
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative', marginBottom: '14px' }}>
        <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
        <input
          type="text"
          placeholder="Быстрый поиск понятия или определения..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (e.target.value) setSelectedLetter(null);
          }}
          style={{
            width: '100%',
            padding: '12px 16px 12px 40px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-light)',
            background: '#ffffff',
            fontSize: '14px',
            color: 'var(--text-main)',
            outline: 'none',
            boxShadow: 'var(--shadow-sm)'
          }}
        />
      </div>

      {/* Alphabet Selector Ribbon */}
      <div style={{
        display: 'flex',
        gap: '4px',
        overflowX: 'auto',
        paddingBottom: '8px',
        marginBottom: '16px',
        WebkitOverflowScrolling: 'touch'
      }}>
        <button
          onClick={() => setSelectedLetter(null)}
          style={{
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: selectedLetter === null ? 700 : 500,
            background: selectedLetter === null ? 'var(--msu-blue-deep)' : '#ffffff',
            color: selectedLetter === null ? '#ffffff' : 'var(--text-secondary)',
            border: '1px solid ' + (selectedLetter === null ? 'var(--msu-blue-deep)' : 'var(--border-light)'),
            cursor: 'pointer',
            flexShrink: 0
          }}
        >
          Все
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
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: selectedLetter === letter ? 700 : 500,
              background: selectedLetter === letter ? 'var(--msu-blue-deep)' : '#ffffff',
              color: selectedLetter === letter ? '#ffffff' : 'var(--text-secondary)',
              border: '1px solid ' + (selectedLetter === letter ? 'var(--msu-blue-deep)' : 'var(--border-light)'),
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
        marginBottom: '20px',
        WebkitOverflowScrolling: 'touch'
      }}>
        {['Все', ...GLOSSARY_CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '5px 12px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: selectedCategory === cat ? 600 : 500,
              background: selectedCategory === cat ? 'var(--msu-blue-deep)' : '#ffffff',
              color: selectedCategory === cat ? '#ffffff' : 'var(--text-secondary)',
              border: '1px solid ' + (selectedCategory === cat ? 'var(--msu-blue-deep)' : 'var(--border-light)'),
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Terms Count & Results Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Найдено понятий: <strong>{filteredTerms.length}</strong>
        </span>
      </div>

      {/* Terms List (Clean, Compact, Non-cluttered Cards) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredTerms.slice(0, 50).map((termItem) => (
          <div 
            key={termItem.id}
            className="card-academic"
            style={{ padding: '14px 16px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px', marginBottom: '4px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--msu-blue-deep)' }}>
                {termItem.term}
              </h3>
              <span className="badge-neutral" style={{ fontSize: '11px' }}>
                <Tag size={10} style={{ marginRight: '3px' }} />
                {termItem.category}
              </span>
            </div>

            {termItem.etymology && (
              <p style={{ fontSize: '11.5px', color: 'var(--msu-gold-hover)', fontStyle: 'italic', marginBottom: '4px' }}>
                {termItem.etymology}
              </p>
            )}

            <p style={{ fontSize: '13px', color: 'var(--text-main)', lineHeight: 1.5 }}>
              {termItem.definition}
            </p>
          </div>
        ))}
      </div>

      {filteredTerms.length > 50 && (
        <p style={{ textAlign: 'center', fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '16px' }}>
          Отображено первые 50 терминов. Уточните запрос в строке поиска для более точного результата.
        </p>
      )}

      {filteredTerms.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 16px', color: 'var(--text-muted)' }}>
          <p>По вашему запросу терминов не найдено.</p>
        </div>
      )}

    </div>
  );
};
