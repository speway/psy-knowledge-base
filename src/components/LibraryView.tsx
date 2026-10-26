import React, { useState } from 'react';
import { Search, BookOpen, Calendar, User, Library, X } from 'lucide-react';
import { READER_SOURCES, ReaderSource } from '../data/reader-sources';

interface LibraryViewProps {
  onOpenReader: (source: ReaderSource) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({ onOpenReader }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const categories = ['Все', 'Мотивация', 'Эмоции', 'Статьи кафедры', 'Методология и диагностика'];

  const filteredSources = READER_SOURCES.filter(src => {
    const matchesCategory = selectedCategory === 'Все' || src.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = src.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          src.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          src.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ paddingBottom: '90px' }}>
      
      {/* Title */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }} className="badge-tag badge-turq">
          <Library size={13} />
          <span>Цифровая библиотека</span>
        </div>
        <h1 style={{
          fontSize: '25px',
          fontWeight: 800,
          color: 'var(--blue-deep)',
          fontFamily: 'var(--font-serif)',
          lineHeight: 1.25,
          marginBottom: '6px'
        }}>
          Читальный зал первоисточников
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '820px' }}>
          Оцифрованная коллекция обязательной и дополнительной литературы: труды классиков Московской психологической школы, 
          зарубежные монографии и статьи преподавателей кафедры с постраничным чтением в ридере.
        </p>
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative', marginBottom: '14px' }}>
        <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
        <input
          type="text"
          placeholder="Поиск первоисточника по автору, названию книги или ключевым словам..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '20px', WebkitOverflowScrolling: 'touch' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '5px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '12.5px',
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

      {/* Grid of Sources */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        {filteredSources.map((source) => (
          <div
            key={source.id}
            className="card-clean"
            style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '14px'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
                <span className="badge-tag badge-turq">
                  {source.category}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={12} />
                  {source.year} г.
                </span>
              </div>

              <h3 style={{
                fontSize: '16px',
                fontWeight: 700,
                color: 'var(--blue-deep)',
                lineHeight: 1.35,
                marginBottom: '6px'
              }}>
                {source.title}
              </h3>

              <p style={{
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--blue-mid)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                marginBottom: '8px'
              }}>
                <User size={13} />
                {source.author}
              </p>

              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {source.description}
              </p>
            </div>

            <div style={{
              paddingTop: '12px',
              borderTop: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>
                {source.pages.length} фрагм. текста
              </span>

              <button
                onClick={() => onOpenReader(source)}
                style={{
                  background: 'var(--blue-deep)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '7px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'background 0.15s ease'
                }}
              >
                <BookOpen size={14} />
                Открыть ридер
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
