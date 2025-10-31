import React, { useState, useEffect, useRef } from 'react';
import { getSmartSuggestions, analyzeContext, analyzeText, suggestAlternatives } from '../../utils/aiHelper';

const SmartTextEditor = ({ 
  value, 
  onChange, 
  placeholder = 'اكتب هنا...',
  currentTemplate,
  field = 'all'
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [textAnalysis, setTextAnalysis] = useState(null);
  const [alternatives, setAlternatives] = useState([]);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (value) {
      // تحليل النص
      const analysis = analyzeText(value);
      setTextAnalysis(analysis);

      // الحصول على بدائل
      const context = analyzeContext(currentTemplate, value);
      const alts = suggestAlternatives(value, context);
      setAlternatives(alts);
    }
  }, [value, currentTemplate]);

  const handleFocus = () => {
    // عرض الاقتراحات عند التركيز
    const context = analyzeContext(currentTemplate, value);
    const smartSuggestions = getSmartSuggestions(context, field);
    setSuggestions(smartSuggestions);
    setShowSuggestions(true);
  };

  const handleBlur = () => {
    // إخفاء الاقتراحات بعد تأخير قصير
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const applySuggestion = (suggestion) => {
    onChange(suggestion);
    setShowSuggestions(false);
    textareaRef.current?.focus();
  };

  const getQualityColor = (quality) => {
    if (quality >= 80) return '#27ae60';
    if (quality >= 60) return '#f39c12';
    return '#e74c3c';
  };

  return (
    <div style={styles.container}>
      {/* محرر النص */}
      <div style={styles.editorWrapper}>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          style={styles.textarea}
        />
        
        {/* شريط الحالة */}
        {textAnalysis && value && (
          <div style={styles.statusBar}>
            <div style={styles.stats}>
              <span style={styles.stat}>
                📊 {textAnalysis.statistics.words} كلمة
              </span>
              <span style={styles.stat}>
                🔤 {textAnalysis.statistics.length} حرف
              </span>
              <span style={styles.stat}>
                {textAnalysis.statistics.language === 'ar' ? '🇸🇦 عربي' : '🇬🇧 English'}
              </span>
            </div>
            <div style={{
              ...styles.quality,
              color: getQualityColor(textAnalysis.quality)
            }}>
              ★ {Math.round(textAnalysis.quality)}%
            </div>
          </div>
        )}
      </div>

      {/* الاقتراحات الذكية */}
      {showSuggestions && suggestions.length > 0 && (
        <div style={styles.suggestionsBox}>
          <div style={styles.suggestionsHeader}>
            💡 اقتراحات ذكية ({suggestions.length})
          </div>
          <div style={styles.suggestionsList}>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => applySuggestion(suggestion)}
                style={styles.suggestionItem}
              >
                <span style={styles.suggestionText}>{suggestion}</span>
                <span style={styles.applyBtn}>➕</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* البدائل المقترحة */}
      {alternatives.length > 0 && value && (
        <div style={styles.alternativesBox}>
          <div style={styles.alternativesHeader}>
            🔄 بدائل مقترحة:
          </div>
          <div style={styles.alternativesList}>
            {alternatives.map((alt, index) => (
              <button
                key={index}
                onClick={() => onChange(alt)}
                style={styles.alternativeItem}
                title="انقر للاستبدال"
              >
                {alt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* مشاكل واقتراحات */}
      {textAnalysis && textAnalysis.issues.length > 0 && (
        <div style={styles.issuesBox}>
          <div style={styles.issuesHeader}>
            ⚠️ ملاحظات:
          </div>
          <ul style={styles.issuesList}>
            {textAnalysis.issues.map((issue, index) => (
              <li key={index} style={styles.issueItem}>
                {issue}
              </li>
            ))}
          </ul>
          {textAnalysis.suggestions.length > 0 && (
            <div style={styles.quickFixes}>
              <strong>👉 اقتراحات:</strong>
              <ul style={styles.suggestionsList2}>
                {textAnalysis.suggestions.map((sugg, index) => (
                  <li key={index} style={styles.suggestionItem2}>
                    {sugg}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  editorWrapper: {
    position: 'relative',
    border: '2px solid #dee2e6',
    borderRadius: '6px',
    overflow: 'hidden',
    transition: 'border-color 0.2s'
  },
  textarea: {
    width: '100%',
    minHeight: '100px',
    padding: '0.75rem',
    border: 'none',
    outline: 'none',
    fontFamily: 'inherit',
    fontSize: '0.9rem',
    lineHeight: '1.6',
    resize: 'vertical',
    backgroundColor: '#ffffff'
  },
  statusBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 0.75rem',
    backgroundColor: '#f8f9fa',
    borderTop: '1px solid #e9ecef',
    fontSize: '0.75rem',
    color: '#6c757d'
  },
  stats: {
    display: 'flex',
    gap: '1rem'
  },
  stat: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  },
  quality: {
    fontWeight: 'bold',
    fontSize: '0.85rem'
  },
  suggestionsBox: {
    backgroundColor: '#e3f2fd',
    border: '1px solid #90caf9',
    borderRadius: '6px',
    padding: '0.75rem',
    maxHeight: '200px',
    overflowY: 'auto'
  },
  suggestionsHeader: {
    fontSize: '0.85rem',
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: '0.5rem'
  },
  suggestionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  suggestionItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem',
    backgroundColor: 'white',
    border: '1px solid #90caf9',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    textAlign: 'right',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#bbdefb',
      transform: 'translateX(-2px)'
    }
  },
  suggestionText: {
    flex: 1
  },
  applyBtn: {
    fontSize: '0.75rem',
    color: '#1976d2'
  },
  alternativesBox: {
    backgroundColor: '#f3e5f5',
    border: '1px solid #ce93d8',
    borderRadius: '6px',
    padding: '0.75rem'
  },
  alternativesHeader: {
    fontSize: '0.85rem',
    fontWeight: 'bold',
    color: '#7b1fa2',
    marginBottom: '0.5rem'
  },
  alternativesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  alternativeItem: {
    padding: '0.5rem',
    backgroundColor: 'white',
    border: '1px solid #ce93d8',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.8rem',
    textAlign: 'right',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#e1bee7'
    }
  },
  issuesBox: {
    backgroundColor: '#fff3cd',
    border: '1px solid #ffc107',
    borderRadius: '6px',
    padding: '0.75rem'
  },
  issuesHeader: {
    fontSize: '0.85rem',
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: '0.5rem'
  },
  issuesList: {
    margin: '0 0 0.5rem 0',
    paddingRight: '1.25rem',
    paddingLeft: 0
  },
  issueItem: {
    fontSize: '0.8rem',
    color: '#856404',
    marginBottom: '0.25rem'
  },
  quickFixes: {
    marginTop: '0.5rem',
    paddingTop: '0.5rem',
    borderTop: '1px solid #ffc107',
    fontSize: '0.8rem'
  },
  suggestionsList2: {
    margin: '0.5rem 0 0 0',
    paddingRight: '1.25rem',
    paddingLeft: 0
  },
  suggestionItem2: {
    fontSize: '0.8rem',
    color: '#27ae60',
    marginBottom: '0.25rem'
  }
};

export default SmartTextEditor;
