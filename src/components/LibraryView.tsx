import React, { useState } from 'react';
import { Search, GraduationCap, BookOpen, User, Calendar, BookMarked } from 'lucide-react';
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
    <div className="animate-fade-in" style={{ paddingBottom: '80px' }}>
      
      {/* Title */}
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: 800, 
          color: 'var(--msu-blue-deep)', 
          fontFamily: 'var(--font-brand)',
          marginBottom: '6px'
        }}>
          Библиотека первоисточников и хрестоматий
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          Оцифрованные классические труды отечественных и зарубежных психологов, статьи кафедры и хрестоматии с возможностью постраничного чтения в ридере.
        </p>
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
        <input
          type="text"
          placeholder="Поиск по автору, названию или ключевым словам..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px', marginBottom: '20px', WebkitOverflowScrolling: 'touch' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              fontSize: '12.5px',
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

      {/* Books Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        {filteredSources.map((source) => (
          <div 
            key={source.id} 
            className="card-academic"
            style={{ 
              padding: '18px', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span className="badge-blue" style={{ fontSize: '11px' }}>
                  {source.category}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                  <Calendar size={12} />
                  {source.year} г.
                </span>
              </div>

              <h3 style={{ fontSize: '15.5px', fontWeight: 700, color: 'var(--msu-blue-deep)', marginBottom: '4px', lineHeight: 1.35 }}>
                {source.title}
              </h3>

              <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--msu-gold-hover)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <User size={13} />
                {source.author}
              </p>

              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                {source.description}
              </p>
            </div>

            <div style={{ paddingTop: '10px', borderTop: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                Страниц: {source.pages.length}
              </span>
              <button
                onClick={() => onOpenReader(source)}
                className="btn-primary"
                style={{ padding: '6px 14px', fontSize: '12.5px' }}
              >
                <BookOpen size={14} />
                Открыть ридер
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredSources.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 16px', color: 'var(--text-muted)' }}>
          <BookMarked size={36} color="#cbd5e1" style={{ margin: '0 auto 12px' }} />
          <p>По вашему запросу первоисточников не найдено.</p>
        </div>
      )}

    </div>
  );
};
