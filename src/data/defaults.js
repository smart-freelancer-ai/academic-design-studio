// الشعارات الافتراضية
export const defaultLogos = {
  platform: 'https://i.postimg.cc/264ntgqw/o44-n-Jxl-WA.png',
  university: 'https://i.postimg.cc/902rYTV0/image.png',
  conference: 'https://i.postimg.cc/FFbfsPgL/image.png',
  foundation: 'https://i.postimg.cc/pTvkr76x/aridfoundation.png',
  anbar: 'https://i.postimg.cc/KzbQjVHb/Anbar.png',
  mahfal17: 'https://i.postimg.cc/YCnhw78x/17-2.png',
}

// البيانات الافتراضية للقوالب
import { templates as dynamicTemplates } from './designSchema.json'
import { templates as newTemplates } from './templates'
export const defaultTemplateData = {
  ...newTemplates.reduce((acc, t) => ({ ...acc, [t.id]: t.data }), {}),
  generalAnnouncement: dynamicTemplates[0],
  participation: {
    mainTitle: 'باقة المشاركة الحضورية',
    subtitle: 'المحفل العلمي الدولي السابع عشر - تركيا',
    price: '480',
    currency: '$',
    deadline: '25 أكتوبر 2025',
    features: [
      'المشاركة الحضورية، تقديم ونشر ورقة بحثية',
      'حضور جميع الدورات التدريبية وورش العمل',
      'الحصول على حقيبة المحفل العلمي الدولي',
      'نسخ حديثة من إصدارات منصة أريد العلمية',
      'زيارات رسمية للمؤسسات العلمية',
    ]
  },
  
  comparison: {
    mainTitle: 'باقات المشاركة',
    subtitle: 'المحفل العلمي الدولي',
  },
  
  conference: {
    mainTitle: 'المؤتمر الدولي',
    subtitle: 'للتعليم والبحث العلمي',
  },
  
  college: {
    mainTitle: 'كلية التربية',
    subtitle: 'جامعة أريد',
  },
  
  certificate: {
    certificateType: 'شهادة تقدير',
    certificateSubtitle: 'نشهد بأن',
    recipientName: 'د. أحمد محمد علي',
    certificateText: 'قد شارك بفاعلية في المحفل العلمي الدولي السابع عشر، وقدّم ورقة بحثية متميزة في مجال التعليم والبحث العلمي',
    grantor1Name: 'أ.د. محمد عبدالله',
    grantor1Title: 'رئيس المؤتمر',
    grantor2Name: 'د. خالد حسن',
    grantor2Title: 'الأمين العام',
    certificateDate: '20 نوفمبر 2025',
  },
  
  promotional: {
    mainTitle: 'عرض خاص',
    subtitle: 'الحقيبة البحثية المتكاملة',
    originalPrice: '150',
    discountPrice: '99',
    currency: '$',
    discount: '34%',
    features: [
      'مجموعة كتب علمية حديثة',
      'اشتراك سنوي في المنصة',
      'دورة تدريبية مجانية',
      'شهادة معتمدة',
    ]
  },
  
  researcherCard: {
    researcherName: 'د. محمد عبدالله أحمد',
    title: 'أستاذ مساعد',
    department: 'قسم علوم الحاسوب',
    university: 'جامعة أريد',
    publications: '25',
    citations: '340',
    hIndex: '12',
    specialization: 'الذككاء الاصطناعي',
    email: 'researcher@arrid.edu',
    phone: '+964 XXX XXX XXXX',
  },
  
  academicCertificate: {
    certificateType: 'شهادة أكاديمية فاخرة',
    degree: 'الماجستير',
    field: 'علوم الحاسوب',
    recipientName: 'محمد عبدالله أحمد',
    gpa: '3.85',
    honor: 'مرتبة الشرف الأولى',
    date: '15 يوليو 2025',
    graduationYear: '2025',
  },

  // Badge templates
  excellenceBadge: {
    title: 'وسام التميز الأكاديمي',
    text: 'تُمنح هذه الشهادة تقديراً للجهود المتميزة في التحكيم العلمي والمساهمة الفاعلة في تطوير المعرفة والبحث العلمي',
    recipientName: 'أ.د. أحمد محمد الشريف',
    badgeNumber: '2024-086',
    achievementText: 'تم منح هذا الوسام تقديراً للتميز في تحكيم البحوث العلمية والمساهمة في تعزيز جودة الإنتاج العلمي وفق أعلى معايير الجودة والموضوعية',
    profilePicture: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500',
    badgeImage: 'https://i.postimg.cc/wTYbYFM9/8.png',
    titleColor: '#1a365d'
  },
  reviewerBadge: {
    title: 'وسام المحكم المتميز',
    text: 'تقديراً للتميز في تحكيم الأبحاث العلمية',
    recipientName: 'د. سارة أحمد',
    badgeNumber: '2024-R-152',
    achievementText: 'منح هذا الوسام للمساهمة الفعالة في تحكيم الأبحاث وتقديم ملاحظات بناءة',
    titleColor: '#1a365d'
  },

  // Document templates
  caseFile: {
    title: 'ملف قضية: الجريمة في الفضاء الرقمي',
    subtitle: 'دراسة تحليلية للمنصات الرقمية - الحالة: مفتوحة',
    evidenceALabel: 'الدليل (أ): جرائم العنف التقليدية',
    evidenceBLabel: 'الدليل (ب): الجرائم الإلكترونية',
    stat1Number: '78%',
    stat1Label: 'جرائم تقليدية',
    stat2Number: '22%',
    stat2Label: 'جرائم إلكترونية',
    stat3Number: '356',
    stat3Label: 'تحليل منشور',
    question: 'ما هي الحقيقة المخفية وراء شاشاتنا؟\nلماذا يهيمن أحد الدليلين على الآخر؟',
    stamp: 'سري',
    footerTitle: 'تحقيق الباحثين:',
    researchers: 'أ.د وفاق حافظ بركع و علا خليل إبراهيم',
    institution: 'الجامعة العراقية'
  },
  researchDocument: {
    title: 'عنوان البحث العلمي',
    subtitle: 'دراسة تحليلية متقدمة',
    authorName: 'أ.د. محمد أحمد',
    authorTitle: 'أستاذ دكتور - كلية العلوم',
    institution: 'جامعة أريد الدولية',
    abstractTitle: 'الملخص',
    abstract: 'هذا البحث يتناول موضوعاً علمياً مهماً يساهم في تطوير المعرفة الإنسانية. تم استخدام منهجية بحثية دقيقة وتحليل شامل للبيانات. النتائج تشير إلى استنتاجات مهمة تفتح آفاقاً جديدة للبحث المستقبلي.',
    finding1Number: '95%',
    finding1Label: 'معدل الدقة',
    finding2Number: '1,248',
    finding2Label: 'عينة الدراسة',
    finding3Number: '12',
    finding3Label: 'شهر بحث',
    keywords: 'البحث العلمي, التحليل, المنهجية, النتائج',
    journal: 'المجلة الدولية للبحوث الأكاديمية',
    titleColor: '#1e3a8a'
  }
}

// قائمة القوالب حسب التصنيف
export const templates = {
  simple: [
    { id: 'generalAnnouncement', name: 'إعلان ديناميكي', icon: 'Sparkles', category: 'dynamic' },
    { id: 'participation', name: 'باقة المشاركة', icon: 'Ticket', category: 'cards' },
    { id: 'comparison', name: 'المقارنة', icon: 'Scale', category: 'promotions' },
    { id: 'conference', name: 'المؤتمر', icon: 'Users', category: 'cards' },
    { id: 'college', name: 'أكاديمي', icon: 'GraduationCap', category: 'cards' },
  ],
  advanced: [
    { id: 'certificate', name: 'شهادة تقدير', icon: 'Award', badge: 'متقدم', category: 'certificates' },
    { id: 'promotional', name: 'إعلان ترويجي', icon: 'Megaphone', badge: 'متقدم', category: 'promotions' },
    { id: 'researcherCard', name: 'بطاقة باحث', icon: 'UserCircle', badge: 'متقدم', category: 'cards' },
    { id: 'academicCertificate', name: 'شهادة أكاديمية', icon: 'Medal', badge: 'متقدم', category: 'certificates' },
    { id: 'excellenceBadge', name: 'وسام التميز', icon: 'Trophy', badge: 'جديد', category: 'badges' },
    { id: 'reviewerBadge', name: 'وسام المحكم', icon: 'Shield', badge: 'جديد', category: 'badges' },
    { id: 'caseFile', name: 'ملف قضية', icon: 'FileText', badge: 'جديد', category: 'documents' },
    { id: 'researchDocument', name: 'وثيقة بحثية', icon: 'BookOpen', badge: 'جديد', category: 'documents' },
  ]
}

// الألوان
export const colors = [
  { id: 'blue', gradient: 'from-[#0d2b4e] to-[#1a365d]', name: 'أزرق أكاديمي' },
  { id: 'dark-blue', gradient: 'from-[#1a5276] to-[#2874a6]', name: 'أزرق غامق' },
  { id: 'green', gradient: 'from-[#1b5e20] to-[#2e7d32]', name: 'أخضر' },
  { id: 'purple', gradient: 'from-[#4a148c] to-[#6a1b9a]', name: 'بنفسجي' },
  { id: 'red', gradient: 'from-[#b71c1c] to-[#c62828]', name: 'أحمر' },
]
