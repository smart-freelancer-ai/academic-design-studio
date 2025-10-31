// AI Helper - وظائف مساعدة للذكاء الاصطناعي

import { contentLibrary, searchContent, getRandomSuggestions, replaceVariables } from '../data/contentLibrary';

// تحليل السياق وتحديد نوع المحتوى المطلوب
export const analyzeContext = (currentTemplate, currentText) => {
  const context = {
    templateType: currentTemplate,
    textLength: currentText?.length || 0,
    language: detectLanguage(currentText || ''),
    suggestions: []
  };

  // تحديد الفئة المناسبة من المكتبة
  switch (currentTemplate) {
    case 'certificate':
    case 'modern':
    case 'minimal':
      context.category = 'certificates';
      break;
    case 'excellenceBadge':
    case 'reviewerBadge':
      context.category = 'awards';
      break;
    case 'researchDocument':
    case 'caseFile':
      context.category = 'research';
      break;
    default:
      context.category = 'certificates';
  }

  return context;
};

// كشف اللغة
export const detectLanguage = (text) => {
  if (!text) return 'ar';
  const arabicPattern = /[\u0600-\u06FF]/;
  return arabicPattern.test(text) ? 'ar' : 'en';
};

// الحصول على اقتراحات ذكية بناءً على السياق
export const getSmartSuggestions = (context, field = 'all') => {
  const { category, language } = context;
  const suggestions = [];

  if (!contentLibrary[category]) {
    return [];
  }

  const categoryData = contentLibrary[category];

  // إذا كان هناك حقل محدد
  if (field !== 'all' && categoryData[field]) {
    const filtered = categoryData[field].filter(item => {
      const itemLang = detectLanguage(item);
      return language === itemLang;
    });
    return filtered.slice(0, 8);
  }

  // جمع اقتراحات من جميع الحقول
  Object.keys(categoryData).forEach(key => {
    if (Array.isArray(categoryData[key])) {
      const items = categoryData[key]
        .filter(item => detectLanguage(item) === language)
        .slice(0, 3);
      suggestions.push(...items);
    }
  });

  return suggestions.slice(0, 10);
};

// تحليل النص واقتراح تحسينات
export const analyzeText = (text) => {
  if (!text) {
    return {
      quality: 0,
      issues: ['النص فارغ'],
      suggestions: ['أضف محتوى للحصول على تحليل']
    };
  }

  const analysis = {
    quality: 100,
    issues: [],
    suggestions: [],
    statistics: {
      length: text.length,
      words: text.split(/\s+/).length,
      lines: text.split('\n').length,
      language: detectLanguage(text)
    }
  };

  // فحص الطول
  if (text.length < 10) {
    analysis.quality -= 30;
    analysis.issues.push('النص قصير جداً');
    analysis.suggestions.push('أضف المزيد من التفاصيل');
  }

  if (text.length > 500) {
    analysis.quality -= 10;
    analysis.issues.push('النص طويل قد يؤثر على التصميم');
    analysis.suggestions.push('حاول اختصار المحتوى');
  }

  // فحص الأحرف الخاصة
  if (text.includes('  ')) {
    analysis.quality -= 5;
    analysis.issues.push('مسافات متعددة متتالية');
    analysis.suggestions.push('تنظيف المسافات الزائدة');
  }

  // فحص علامات الترقيم
  const hasProperPunctuation = /[.،؛!؟]/.test(text);
  if (!hasProperPunctuation && text.length > 50) {
    analysis.quality -= 10;
    analysis.issues.push('نقص في علامات الترقيم');
    analysis.suggestions.push('أضف علامات ترقيم مناسبة');
  }

  return analysis;
};

// اقتراح بدائل للنص
export const suggestAlternatives = (text, context) => {
  const alternatives = [];
  const { category } = context;

  if (!text || !category || !contentLibrary[category]) {
    return alternatives;
  }

  // البحث عن نصوص مشابهة في المكتبة
  const words = text.toLowerCase().split(/\s+/);
  const categoryData = contentLibrary[category];

  Object.values(categoryData).forEach(items => {
    if (Array.isArray(items)) {
      items.forEach(item => {
        const itemWords = item.toLowerCase().split(/\s+/);
        const commonWords = words.filter(w => itemWords.includes(w));
        
        if (commonWords.length >= 2 && item !== text) {
          alternatives.push({
            text: item,
            similarity: (commonWords.length / words.length) * 100
          });
        }
      });
    }
  });

  // ترتيب حسب التشابه
  return alternatives
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 5)
    .map(a => a.text);
};

// إنشاء نص تلقائي بناءً على السياق
export const generateSmartText = (context, preferences = {}) => {
  const { category, language } = context;
  const { style = 'formal', length = 'medium' } = preferences;

  if (!contentLibrary[category]) {
    return '';
  }

  const parts = [];
  const categoryData = contentLibrary[category];

  // اختيار أجزاء عشوائية من الفئة
  Object.keys(categoryData).forEach(key => {
    if (Array.isArray(categoryData[key]) && categoryData[key].length > 0) {
      const items = categoryData[key].filter(item => 
        detectLanguage(item) === language
      );
      if (items.length > 0) {
        const randomItem = items[Math.floor(Math.random() * items.length)];
        parts.push(randomItem);
      }
    }
  });

  // دمج الأجزاء
  let generated = parts.slice(0, length === 'short' ? 1 : length === 'long' ? 4 : 2).join(' ');

  // استبدال المتغيرات
  generated = replaceVariables(generated, {
    organization: 'الجامعة',
    field: 'البحث العلمي',
    event: 'المؤتمر العلمي'
  });

  return generated;
};

// التحقق من جودة التصميم
export const checkDesignQuality = (designData) => {
  const checks = {
    score: 100,
    issues: [],
    suggestions: []
  };

  // فحص الألوان
  if (designData.colors) {
    const { background, primary, text } = designData.colors;
    
    // فحص التباين
    const contrast = calculateContrast(background, text);
    if (contrast < 4.5) {
      checks.score -= 20;
      checks.issues.push('تباين منخفض بين النص والخلفية');
      checks.suggestions.push('استخدم ألواناً أكثر تبايناً للنص');
    }
  }

  // فحص الخطوط
  if (designData.fonts) {
    const { title, subtitle } = designData.fonts;
    if (title && subtitle && title.family === subtitle.family && title.size === subtitle.size) {
      checks.score -= 10;
      checks.issues.push('العنوان والعنوان الفرعي متطابقان');
      checks.suggestions.push('استخدم أحجام أو أوزان مختلفة للتمييز');
    }
  }

  // فحص المحتوى
  if (designData.content) {
    const textAnalysis = analyzeText(designData.content.title || '');
    if (textAnalysis.quality < 70) {
      checks.score -= 15;
      checks.issues.push(...textAnalysis.issues);
      checks.suggestions.push(...textAnalysis.suggestions);
    }
  }

  return checks;
};

// حساب التباين بين لونين (صيغة مبسطة)
export const calculateContrast = (color1, color2) => {
  // تحويل الألوان إلى RGB
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return 5; // قيمة افتراضية

  // حساب اللمعان النسبي
  const l1 = relativeLuminance(rgb1);
  const l2 = relativeLuminance(rgb2);

  // حساب التباين
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

// تحويل Hex إلى RGB
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : null;
};

// حساب اللمعان النسبي
const relativeLuminance = ({ r, g, b }) => {
  const [rs, gs, bs] = [r, g, b].map(c => {
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

// اقتراح تحسينات للألوان
export const suggestColorImprovements = (colors) => {
  const suggestions = [];
  const { background, primary, text, accent } = colors;

  // فحص التباين الرئيسي
  const mainContrast = calculateContrast(background, text);
  if (mainContrast < 4.5) {
    suggestions.push({
      type: 'contrast',
      severity: 'high',
      message: 'التباين بين الخلفية والنص منخفض جداً',
      suggestion: text.startsWith('#') && parseInt(text.slice(1), 16) > 8388607 
        ? 'جرب لون نص أغمق' 
        : 'جرب لون نص أفتح'
    });
  }

  // فحص تناسق الألوان
  if (primary === accent) {
    suggestions.push({
      type: 'variety',
      severity: 'low',
      message: 'اللون الرئيسي والمميز متطابقان',
      suggestion: 'استخدم لوناً مميزاً مختلفاً لإضافة تنوع'
    });
  }

  return suggestions;
};
