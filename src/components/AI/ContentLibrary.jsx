import React, { useState, useMemo } from 'react';
import { contentLibrary, searchContent, getRandomSuggestions } from '../../data/contentLibrary';
import { detectLanguage } from '../../utils/aiHelper';

const ContentLibrary = ({ onSelectContent, currentCategory = 'certificates' }) => {
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState('all');

  // الحصول على الفئات المتاحة
  const categories = useMemo(() => [
    { id: 'certificates', name: 'الشهادات', icon: '📜', nameEn: 'Certificates' },
    { id: 'awards', name: 'الأوسمة', icon: '🏆', nameEn: 'Awards' },
    { id: 'research', name: 'الأبحاث', icon: '📚', nameEn: 'Research' },
    { id: 'events', name: 'الفعاليات', icon: '🎯', nameEn: 'Events' },
    { id: 'review', name: 'التحكيم', icon: '⚖️', nameEn: 'Review' },
    { id: 'cv', name: 'السيرة الذاتية', icon: '📝', nameEn: 'CV' }
  ], []);

  // الحصول على الفئات الفرعية
  const subCategories = useMemo(() => {
    if (!contentLibrary[selectedCategory]) return [];
    return Object.keys(contentLibrary[selectedCategory]).map(key => ({
      id: key,
      name: formatSubCategoryName(key),
      count: Array.isArray(contentLibrary[selectedCategory][key]) 
        ? contentLibrary[selectedCategory][key].length 
        : 0
    }));
  }, [selectedCategory]);

  // الحصول على المحتوى المفلتر
  const filteredContent = useMemo(() => {
    if (!contentLibrary[selectedCategory]) return [];

    let items = [];

    if (selectedSubCategory) {
      // عرض فئة فرعية محددة
      const subCatData = contentLibrary[selectedCategory][selectedSubCategory];
      if (Array.isArray(subCatData)) {
        items = subCatData;
      }
    } else {
      // عرض جميع العناصر من الفئة
      Object.values(contentLibrary[selectedCategory]).forEach(subCat => {
        if (Array.isArray(subCat)) {
          items.push(...subCat);
        }
      });
    }

    // تطبيق البحث
    if (searchTerm) {
      items = items.filter(item => 
        item.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // تطبيق فلتر اللغة
    if (languageFilter !== 'all') {
      items = items.filter(item => detectLanguage(item) === languageFilter);
    }

    return items;
  }, [selectedCategory, selectedSubCategory, searchTerm, languageFilter]);

  // تنسيق اسم الفئة الفرعية
  function formatSubCategoryName(key) {
    const names = {
      titles: 'العناوين',
      openings: 'الافتتاحيات',
      achievements: 'الإنجازات',
      closings: 'الخواتيم',
      criteria: 'المعايير',
      recognitions: 'عبارات التقدير',
      abstracts: 'الملخصات',
      methodologies: 'المنهجيات',
      findings: 'النتائج',
      recommendations: 'التوصيات',
      invitations: 'الدعوات',
      themes: 'المواضيع',
      sessions: 'الجلسات',
      roles: 'الأدوار',
      qualifications: 'المؤهلات',
      responsibilities: 'المسؤوليات',
      sections: 'الأقسام',
      skills: 'المهارات'
    };
    return names[key] || key;
  }

  return (
    <div className="content-library" style={styles.container}>
      {/* رأس المكتبة */}
      <div style={styles.header}>
        <h3 style={styles.title}>📚 مكتبة المحتوى الأكاديمي</h3>
        <p style={styles.subtitle}>اختر من مئات العبارات والنصوص الجاهزة</p>
      </div>

      {/* شريط البحث */}
      <div style={styles.searchBar}>
        <input
          type="text"
          placeholder="🔍 ابحث في المكتبة..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <select
          value={languageFilter}
          onChange={(e) => setLanguageFilter(e.target.value)}
          style={styles.langFilter}
        >
          <option value="all">كل اللغات</option>
          <option value="ar">عربي فقط</option>
          <option value="en">English only</option>
        </select>
      </div>

      {/* الفئات الرئيسية */}
      <div style={styles.categories}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              setSelectedSubCategory(null);
            }}
            style={{
              ...styles.categoryBtn,
              ...(selectedCategory === cat.id ? styles.categoryBtnActive : {})
            }}
          >
            <span style={styles.categoryIcon}>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* الفئات الفرعية */}
      {subCategories.length > 0 && (
        <div style={styles.subCategories}>
          <button
            onClick={() => setSelectedSubCategory(null)}
            style={{
              ...styles.subCategoryBtn,
              ...(!selectedSubCategory ? styles.subCategoryBtnActive : {})
            }}
          >
            الكل ({filteredContent.length})
          </button>
          {subCategories.map(subCat => (
            <button
              key={subCat.id}
              onClick={() => setSelectedSubCategory(subCat.id)}
              style={{
                ...styles.subCategoryBtn,
                ...(selectedSubCategory === subCat.id ? styles.subCategoryBtnActive : {})
              }}
            >
              {subCat.name} ({subCat.count})
            </button>
          ))}
        </div>
      )}

      {/* المحتوى */}
      <div style={styles.contentGrid}>
        {filteredContent.length === 0 ? (
          <div style={styles.emptyState}>
            <p>❌ لا توجد نتائج</p>
            <p style={styles.emptyHint}>جرب تغيير البحث أو الفلاتر</p>
          </div>
        ) : (
          filteredContent.map((item, index) => (
            <button
              key={index}
              onClick={() => onSelectContent(item)}
              style={styles.contentItem}
              title="انقر لإضافة هذا النص"
            >
              <span style={styles.contentText}>{item}</span>
              <span style={styles.langBadge}>
                {detectLanguage(item) === 'ar' ? '🇸🇦' : '🇬🇧'}
              </span>
            </button>
          ))
        )}
      </div>

      {/* معلومات إحصائية */}
      <div style={styles.footer}>
        <small>
          عرض {filteredContent.length} عبارة من أصل المكتبة
        </small>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    maxHeight: '600px',
    overflow: 'hidden'
  },
  header: {
    textAlign: 'center',
    paddingBottom: '0.5rem',
    borderBottom: '2px solid #dee2e6'
  },
  title: {
    margin: '0 0 0.5rem 0',
    fontSize: '1.25rem',
    color: '#2c3e50'
  },
  subtitle: {
    margin: 0,
    fontSize: '0.875rem',
    color: '#6c757d'
  },
  searchBar: {
    display: 'flex',
    gap: '0.5rem'
  },
  searchInput: {
    flex: 1,
    padding: '0.5rem 1rem',
    border: '2px solid #dee2e6',
    borderRadius: '6px',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    ':focus': {
      borderColor: '#3498db'
    }
  },
  langFilter: {
    padding: '0.5rem',
    border: '2px solid #dee2e6',
    borderRadius: '6px',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '0.85rem'
  },
  categories: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    padding: '0.5rem 0'
  },
  categoryBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    border: '2px solid #dee2e6',
    borderRadius: '20px',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '0.875rem',
    transition: 'all 0.2s',
    ':hover': {
      borderColor: '#3498db',
      transform: 'translateY(-2px)'
    }
  },
  categoryBtnActive: {
    backgroundColor: '#3498db',
    color: 'white',
    borderColor: '#3498db'
  },
  categoryIcon: {
    fontSize: '1.2rem'
  },
  subCategories: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    padding: '0.5rem',
    backgroundColor: 'white',
    borderRadius: '6px',
    border: '1px solid #dee2e6'
  },
  subCategoryBtn: {
    padding: '0.4rem 0.8rem',
    border: '1px solid #dee2e6',
    borderRadius: '15px',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '0.8rem',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap'
  },
  subCategoryBtnActive: {
    backgroundColor: '#27ae60',
    color: 'white',
    borderColor: '#27ae60'
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '0.75rem',
    padding: '0.5rem',
    overflowY: 'auto',
    maxHeight: '350px',
    backgroundColor: 'white',
    borderRadius: '6px',
    border: '1px solid #dee2e6'
  },
  contentItem: {
    position: 'relative',
    padding: '0.75rem',
    border: '1px solid #e9ecef',
    borderRadius: '6px',
    backgroundColor: 'white',
    cursor: 'pointer',
    textAlign: 'right',
    transition: 'all 0.2s',
    ':hover': {
      borderColor: '#3498db',
      backgroundColor: '#f0f8ff',
      transform: 'translateY(-2px)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }
  },
  contentText: {
    display: 'block',
    fontSize: '0.85rem',
    lineHeight: '1.4',
    color: '#2c3e50'
  },
  langBadge: {
    position: 'absolute',
    top: '0.25rem',
    left: '0.25rem',
    fontSize: '0.75rem'
  },
  emptyState: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: '2rem',
    color: '#6c757d'
  },
  emptyHint: {
    fontSize: '0.875rem',
    marginTop: '0.5rem'
  },
  footer: {
    textAlign: 'center',
    padding: '0.5rem',
    color: '#6c757d',
    borderTop: '1px solid #dee2e6'
  }
};

export default ContentLibrary;
