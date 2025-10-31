// نظام التصنيف المنظم للقوالب
export const categories = {
  certificates: {
    id: 'certificates',
    name: 'الشهادات',
    icon: '🏆',
    description: 'شهادات التقدير والمشاركة',
    templates: ['participation', 'appreciation', 'academic-certificate']
  },
  cards: {
    id: 'cards',
    name: 'البطاقات',
    icon: '🎴',
    description: 'بطاقات الدعوة والتهنئة',
    templates: ['invitation', 'congratulations', 'researcher-card']
  },
  badges: {
    id: 'badges',
    name: 'الأوسمة',
    icon: '🥇',
    description: 'أوسمة التميز والإنجاز',
    templates: ['excellence-badge', 'reviewer-badge']
  },
  documents: {
    id: 'documents',
    name: 'الوثائق',
    icon: '📄',
    description: 'وثائق بحثية وملفات قضايا',
    templates: ['case-file', 'research-document']
  },
  promotions: {
    id: 'promotions',
    name: 'الإعلانات',
    icon: '📢',
    description: 'إعلانات ترويجية وعروض',
    templates: ['promotional']
  }
};

export const getCategoryByTemplate = (templateId) => {
  for (const [key, category] of Object.entries(categories)) {
    if (category.templates.includes(templateId)) {
      return category;
    }
  }
  return null;
};

export const getTemplatesByCategory = (categoryId) => {
  const category = categories[categoryId];
  return category ? category.templates : [];
};