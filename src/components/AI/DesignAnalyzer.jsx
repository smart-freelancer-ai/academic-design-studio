import React, { useState, useEffect } from 'react';
import { checkDesignQuality, suggestColorImprovements, calculateContrast } from '../../utils/aiHelper';

const DesignAnalyzer = ({ designData, onApplySuggestion }) => {
  const [analysis, setAnalysis] = useState(null);
  const [colorAnalysis, setColorAnalysis] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (designData) {
      // تحليل التصميم
      const designQuality = checkDesignQuality(designData);
      setAnalysis(designQuality);

      // تحليل الألوان
      if (designData.colors) {
        const colorSuggestions = suggestColorImprovements(designData.colors);
        setColorAnalysis(colorSuggestions);
      }
    }
  }, [designData]);

  if (!analysis) {
    return (
      <div style={styles.container}>
        <p style={styles.loading}>🔍 في انتظار بيانات التصميم...</p>
      </div>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 80) return '#27ae60';
    if (score >= 60) return '#f39c12';
    return '#e74c3c';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'ممتاز';
    if (score >= 60) return 'جيد';
    return 'يحتاج تحسين';
  };

  return (
    <div style={styles.container}>
      {/* رأس المحلل */}
      <div style={styles.header}>
        <h3 style={styles.title}>📊 محلل التصميم الذكي</h3>
        <button
          onClick={() => setShowDetails(!showDetails)}
          style={styles.toggleBtn}
        >
          {showDetails ? '▲ إخفاء التفاصيل' : '▼ إظهار التفاصيل'}
        </button>
      </div>

      {/* درجة الجودة */}
      <div style={styles.scoreCard}>
        <div style={styles.scoreCircle}>
          <svg width="120" height="120" style={styles.scoreSvg}>
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#e9ecef"
              strokeWidth="10"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke={getScoreColor(analysis.score)}
              strokeWidth="10"
              strokeDasharray={`${(analysis.score / 100) * 314} 314`}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
              style={styles.scoreProgress}
            />
          </svg>
          <div style={styles.scoreText}>
            <div style={{ ...styles.scoreNumber, color: getScoreColor(analysis.score) }}>
              {Math.round(analysis.score)}
            </div>
            <div style={styles.scoreLabel}>{getScoreLabel(analysis.score)}</div>
          </div>
        </div>
      </div>

      {/* المشاكل والاقتراحات */}
      {showDetails && (
        <div style={styles.details}>
          {/* المشاكل */}
          {analysis.issues.length > 0 && (
            <div style={styles.section}>
              <h4 style={styles.sectionTitle}>⚠️ المشاكل المكتشفة:</h4>
              <ul style={styles.list}>
                {analysis.issues.map((issue, index) => (
                  <li key={index} style={styles.issueItem}>
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* الاقتراحات */}
          {analysis.suggestions.length > 0 && (
            <div style={styles.section}>
              <h4 style={styles.sectionTitle}>💡 اقتراحات التحسين:</h4>
              <ul style={styles.list}>
                {analysis.suggestions.map((suggestion, index) => (
                  <li key={index} style={styles.suggestionItem}>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* تحليل الألوان */}
          {colorAnalysis.length > 0 && (
            <div style={styles.section}>
              <h4 style={styles.sectionTitle}>🎨 تحليل الألوان:</h4>
              <div style={styles.colorIssues}>
                {colorAnalysis.map((issue, index) => (
                  <div
                    key={index}
                    style={{
                      ...styles.colorIssue,
                      borderLeftColor: issue.severity === 'high' ? '#e74c3c' : '#f39c12'
                    }}
                  >
                    <div style={styles.colorIssueHeader}>
                      <span style={styles.severityBadge}>
                        {issue.severity === 'high' ? '🔴 عالي' : '🟡 متوسط'}
                      </span>
                      <span style={styles.issueType}>{issue.message}</span>
                    </div>
                    <p style={styles.colorSuggestion}>👉 {issue.suggestion}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* تحليل التباين */}
          {designData?.colors && (
            <div style={styles.section}>
              <h4 style={styles.sectionTitle}>🔍 فحص التباين:</h4>
              <div style={styles.contrastGrid}>
                {[
                  { label: 'الخلفية / النص', bg: designData.colors.background, fg: designData.colors.text },
                  { label: 'الخلفية / الرئيسي', bg: designData.colors.background, fg: designData.colors.primary }
                ].map((pair, index) => {
                  const contrast = calculateContrast(pair.bg, pair.fg);
                  const isGood = contrast >= 4.5;
                  return (
                    <div key={index} style={styles.contrastItem}>
                      <div style={styles.contrastColors}>
                        <div style={{ ...styles.colorBox, backgroundColor: pair.bg }} />
                        <span>/</span>
                        <div style={{ ...styles.colorBox, backgroundColor: pair.fg }} />
                      </div>
                      <div style={styles.contrastInfo}>
                        <span>{pair.label}</span>
                        <span style={{
                          ...styles.contrastRatio,
                          color: isGood ? '#27ae60' : '#e74c3c'
                        }}>
                          {contrast.toFixed(2)}:1 {isGood ? '✅' : '❌'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* رسالة نجاح */}
      {analysis.score >= 80 && analysis.issues.length === 0 && (
        <div style={styles.successMessage}>
          ✨ تصميمك ممتاز! لا توجد مشاكل تحتاج إلى تحسين.
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '1rem',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    border: '1px solid #dee2e6'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    paddingBottom: '0.75rem',
    borderBottom: '2px solid #e9ecef'
  },
  title: {
    margin: 0,
    fontSize: '1.1rem',
    color: '#2c3e50'
  },
  toggleBtn: {
    padding: '0.4rem 0.8rem',
    backgroundColor: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.8rem',
    transition: 'all 0.2s'
  },
  loading: {
    textAlign: 'center',
    color: '#6c757d',
    padding: '2rem'
  },
  scoreCard: {
    display: 'flex',
    justifyContent: 'center',
    padding: '1rem',
    marginBottom: '1rem'
  },
  scoreCircle: {
    position: 'relative',
    display: 'inline-block'
  },
  scoreSvg: {
    transform: 'rotate(0deg)'
  },
  scoreProgress: {
    transition: 'stroke-dasharray 1s ease'
  },
  scoreText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center'
  },
  scoreNumber: {
    fontSize: '2rem',
    fontWeight: 'bold',
    lineHeight: '1'
  },
  scoreLabel: {
    fontSize: '0.8rem',
    color: '#6c757d',
    marginTop: '0.25rem'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  section: {
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px',
    border: '1px solid #e9ecef'
  },
  sectionTitle: {
    margin: '0 0 0.75rem 0',
    fontSize: '0.95rem',
    color: '#2c3e50'
  },
  list: {
    margin: 0,
    paddingRight: '1.5rem',
    paddingLeft: 0
  },
  issueItem: {
    marginBottom: '0.5rem',
    color: '#e74c3c',
    fontSize: '0.85rem',
    lineHeight: '1.5'
  },
  suggestionItem: {
    marginBottom: '0.5rem',
    color: '#27ae60',
    fontSize: '0.85rem',
    lineHeight: '1.5'
  },
  colorIssues: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  colorIssue: {
    padding: '0.75rem',
    backgroundColor: 'white',
    borderRadius: '5px',
    borderLeft: '4px solid',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  },
  colorIssueHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem'
  },
  severityBadge: {
    fontSize: '0.75rem',
    padding: '0.25rem 0.5rem',
    backgroundColor: '#fff3cd',
    borderRadius: '3px',
    fontWeight: '500'
  },
  issueType: {
    fontSize: '0.85rem',
    color: '#2c3e50',
    fontWeight: '500'
  },
  colorSuggestion: {
    margin: 0,
    fontSize: '0.8rem',
    color: '#6c757d',
    lineHeight: '1.4'
  },
  contrastGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  contrastItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.75rem',
    backgroundColor: 'white',
    borderRadius: '5px',
    border: '1px solid #e9ecef'
  },
  contrastColors: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  colorBox: {
    width: '30px',
    height: '30px',
    borderRadius: '4px',
    border: '2px solid #dee2e6'
  },
  contrastInfo: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.85rem'
  },
  contrastRatio: {
    fontWeight: 'bold',
    fontSize: '0.9rem'
  },
  successMessage: {
    padding: '1rem',
    backgroundColor: '#d4edda',
    color: '#155724',
    borderRadius: '6px',
    border: '1px solid #c3e6cb',
    textAlign: 'center',
    fontSize: '0.9rem',
    marginTop: '1rem'
  }
};

export default DesignAnalyzer;
