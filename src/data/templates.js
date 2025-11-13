// This file contains the ready-made JSON templates based on the user's previous HTML designs.

export const templates = [
  {
    id: 'template-001',
    name: 'باقة الشهادات (البطاقة البسيطة)',
    description: 'تصميم بسيط على شكل بطاقة لعرض باقة شهادات.',
    type: 'CardStyle',
    data: {
      header: {
        title: 'باقة الحضور مع الشهادات',
        subtitle: 'المشاركة الإلكترونية - المحفل الدولي الـ17',
        icon: 'certificate',
        logo: 'https://i.postimg.cc/YCnhw78x/17-2.png',
      },
      price: {
        amount: '50',
        currency: 'دولار',
        label: 'رسوم المشاركة',
      },
      features: [
        'جميع مزايا باقة الحضور المجانية.',
        'شهادة إلكترونية بحضور المؤتمر.',
        'شهادات إلكترونية للدورات وورش العمل.',
        'إشعار مشاركة رسمي بصيغة PDF.',
      ],
      cta: {
        text: 'سجل الآن في باقة الشهادات',
        link: '#',
      },
      colors: {
        primary: '#d4af37',
        secondary: '#0d2b4e',
      },
    },
  },
  {
    id: 'template-002',
    name: 'المشاركة الحضورية (النمط الداكن)',
    description: 'تصميم فاخر ذو عمودين للمشاركة الحضورية الكاملة.',
    type: 'TwoColumnDark',
    data: {
      header: {
        title: 'باقة المشاركة الحضورية',
        subtitle: 'المحفل العلمي الدولي السابع عشر - تركيا',
        logo: 'https://i.postimg.cc/YCnhw78x/17-2.png',
      },
      price: {
        amount: '480',
        currency: 'دولار',
        label: 'رسوم المشاركة',
        deadline: 'آخر موعد: 25 أكتوبر 2025',
      },
      note: 'الباقة لا تشمل الإقامة الفندقية وتقتصر على حضور فعاليات يومي 20 و21 نوفمبر.',
      features: [
        'المشاركة الحضورية، تقديم ونشر ورقة بحثية.',
        'حضور جميع الدورات التدريبية وورش العمل.',
        'الحصول على حقيبة المحفل العلمي الدولي.',
        'نسخ حديثة من إصدارات منصة أريد العلمية.',
        'زيارات رسمية للمؤسسات العلمية والمراكز البحثية.',
        'خطاب مشاركة واستضافة كعضو رسمي في وفد المحفل.',
        'حضور الأمسيات المسائية والفعاليات المصاحبة.',
      ],
      cta: {
        text: 'الاطلاع على السياسة المالية',
        link: 'https://almahfal.org/p.aspx?id=8',
      },
      colors: {
        primary: '#ffd700',
        secondary: '#0d2b4e',
      },
    },
  },
  {
    id: 'template-003',
    name: 'الباقة الكاملة (النمط المقسم)',
    description: 'تصميم مقسم الألوان يركز على السعر والمزايا الحصرية.',
    type: 'SplitColor',
    data: {
      header: {
        title: 'امتيازات الباقة الكاملة',
        subtitle: '5 أيام في أنقرة',
        logo: 'https://i.postimg.cc/YCnhw78x/17-2.png',
      },
      price: {
        amount: '880',
        currency: 'دولار',
        label: 'رسوم المشاركة',
        deadline: 'حتى 25 أكتوبر 2025',
      },
      features: [
        'إقامة فندقية 5 أيام (غرفة مفردة)',
        'نشر البحث في مجلة محكمة',
        'الحقيبة العلمية ودرع المحفل الفخري',
        'رحلة سياحية مع الوفد',
        'جميع المزايا الأكاديمية الأخرى',
      ],
      colors: {
        primary: '#ffab00',
        secondary: '#1a2c4e',
      },
    },
  },
];

// Default template data for the editor
export const defaultTemplateData = templates[0].data;

// List of all templates for the selector
export const templateList = templates.map(t => ({
  id: t.id,
  name: t.name,
  description: t.description,
  type: t.type,
}));

