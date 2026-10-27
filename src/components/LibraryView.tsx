import React, { useState } from 'react';
import { Search, BookOpen, Calendar, User, Library, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { READER_SOURCES, ReaderSource } from '../data/reader-sources';
import { findUnderstandingCard } from '../data/understanding-cards';

interface LibraryViewProps {
  onOpenReader: (source: ReaderSource) => void;
  onOpenUnderstandingCard?: (cardId: string) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({ onOpenReader, onOpenUnderstandingCard }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const categories = ['Все', 'Мотивация', 'Эмоции', 'Статьи кафедры', 'Методология и диагностика'];

  // Deduplicate sources by title & author for library display
  const uniqueSources = React.useMemo(() => {
    const seen = new Set<string>();
    return READER_SOURCES.filter(src => {
      const key = `${src.author.trim()}_${src.title.trim()}`.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, []);

  const filteredSources = uniqueSources.filter(src => {
    const matchesCategory = selectedCategory === 'Все' || (src.category && src.category.toLowerCase().includes(selectedCategory.toLowerCase()));
    const matchesSearch = src.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          src.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (src.description && src.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ paddingBottom: '90px' }}>
      
      {/* Title */}
      <div style={{ marginBottom: '22px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }} className="pill pill-teal">
          <Library size={12} />
          <span>Цифровая библиотека</span>
        </div>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 700,
          color: 'var(--ink)',
          fontFamily: 'var(--font-serif)',
          lineHeight: 1.25,
          marginBottom: '6px'
        }}>
          Читальный зал первоисточников
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '14px', maxWidth: '820px' }}>
          Оцифрованная коллекция литературы: классические труды Московской психологической школы, 
          зарубежные монографии и научные публикации преподавателей кафедры с постраничным чтением в ридере.
        </p>
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative', marginBottom: '14px' }}>
        <Search size={16} color="var(--muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
        <input
          type="text"
          placeholder="Поиск первоисточника по автору, названию книги или аннотации..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '20px', WebkitOverflowScrolling: 'touch' }}>
        {categories.map((cat) => (
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

      {/* Grid of Sources */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        {filteredSources.map((source) => (
          <div
            key={source.id}
            className="paper-card"
            style={{
              padding: '22px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '14px'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
                <span className="pill pill-neutral" style={{ fontSize: '10.5px' }}>
                  {source.category}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                  {source.year} г.
                </span>
              </div>

              <h3 style={{
                fontSize: '17px',
                fontWeight: 700,
                color: 'var(--ink)',
                lineHeight: 1.35,
                marginBottom: '6px',
                fontFamily: 'var(--font-serif)'
              }}>
                {source.title}
              </h3>

              <p style={{
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--ink)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                marginBottom: '8px'
              }}>
                <User size={13} color="var(--ochre)" />
                {source.author}
              </p>

              <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.5 }}>
                {source.description}
              </p>
            </div>

            <div style={{
              paddingTop: '12px',
              borderTop: '1px solid var(--line-soft)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 600 }}>
                {source.fileUrl ? (
                  <span className="pill pill-teal" style={{ fontSize: '11px', padding: '2px 8px' }}>
                    {source.fileSize ? `Полный PDF · ${source.fileSize}` : 'Полный файл PDF'}
                  </span>
                ) : (
                  <span>{source.pages.length} фрагм. текста</span>
                )}
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {(() => {
                  const card = findUnderstandingCard(source.understandingCardId || source.id);
                  if (card && onOpenUnderstandingCard) {
                    return (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenUnderstandingCard(card.id);
                        }}
                        style={{
                          background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: 'var(--radius-sm)',
                          padding: '6px 10px',
                          fontSize: '11px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          boxShadow: '0 2px 6px rgba(217, 119, 6, 0.25)'
                        }}
                        title="Открыть Карточку понимания по модели Т.Ю. Базарова"
                      >
                        <Sparkles size={11} color="#fef3c7" />
                        <span>Карточка</span>
                      </button>
                    );
                  }
                  return null;
                })()}

                <button
                  onClick={() => onOpenReader(source)}
                  className="btn-ink"
                  style={{ padding: '6px 14px', fontSize: '12px' }}
                >
                  <BookOpen size={13} />
                  Открыть ридер
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
