# 📐 بنية المشروع التفصيلية

## 🗂️ الهيكل الكامل

```
academic-design-studio/
├── 📁 src/                          # كود المصدر
│   ├── 📁 components/               # المكونات
│   │   ├── 📁 Controls/            # مكونات التحكم
│   │   │   ├── ModeToggle.jsx          # تبديل الوضع (بسيط/متقدم)
│   │   │   ├── TemplateSelector.jsx    # اختيار القالب
│   │   │   ├── TemplateControls.jsx    # واجهة التحكم الديناميكية
│   │   │   ├── SimpleControls.jsx      # تحكم القوالب البسيطة
│   │   │   ├── CertificateControls.jsx # تحكم شهادة التقدير
│   │   │   ├── PromotionalControls.jsx # تحكم الإعلان الترويجي
│   │   │   ├── ResearcherCardControls.jsx    # تحكم بطاقة الباحث
│   │   │   ├── AcademicCertificateControls.jsx # تحكم الشهادة الأكاديمية
│   │   │   ├── ColorPalette.jsx        # اختيار الألوان
│   │   │   ├── LogoManager.jsx         # إدارة الشعارات
│   │   │   └── ActionButtons.jsx       # أزرار الإجراءات
│   │   │
│   │   ├── 📁 Editor/               # محرر التصاميم
│   │   │   ├── Sidebar.jsx             # الشريط الجانبي
│   │   │   └── Canvas.jsx              # منطقة المعاينة
│   │   │
│   │   ├── 📁 Templates/            # القوالب
│   │   │   ├── TemplateRenderer.jsx    # موجه القوالب
│   │   │   │
│   │   │   ├── 📁 Simple/           # القوالب البسيطة
│   │   │   │   ├── ParticipationTemplate.jsx    # بطاقة المشاركة
│   │   │   │   ├── ComparisonTemplate.jsx       # المقارنة
│   │   │   │   ├── ConferenceTemplate.jsx       # المؤتمر
│   │   │   │   └── CollegeTemplate.jsx          # الأكاديمي
│   │   │   │
│   │   │   └── 📁 Advanced/         # القوالب المتقدمة ⭐
│   │   │       ├── CertificateTemplate.jsx          # شهادة التقدير
│   │   │       ├── PromotionalTemplate.jsx          # الإعلان الترويجي
│   │   │       ├── ResearcherCardTemplate.jsx       # بطاقة الباحث
│   │   │       └── AcademicCertificateTemplate.jsx  # الشهادة الأكاديمية
│   │   │
│   │   └── 📁 UI/                   # مكونات الواجهة
│   │       └── Header.jsx               # رأس الصفحة
│   │
│   ├── 📁 contexts/                 # إدارة الحالة
│   │   └── DesignContext.jsx        # Context للتصميم
│   │
│   ├── 📁 data/                     # البيانات الثابتة
│   │   └── defaults.js              # القيم الافتراضية
│   │
│   ├── App.jsx                      # المكون الرئيسي
│   ├── main.jsx                     # نقطة الدخول
│   └── index.css                    # الأنماط العامة
│
├── 📁 public/                       # الملفات العامة
│
├── index.html                       # HTML الرئيسي
├── package.json                     # الحزم والإعدادات
├── vite.config.js                   # إعدادات Vite
├── tailwind.config.js               # إعدادات Tailwind
├── postcss.config.js                # إعدادات PostCSS
├── .eslintrc.cjs                    # إعدادات ESLint
├── .gitignore                       # Git ignore
│
├── 📄 README.md                     # التوثيق الرئيسي
├── 📄 GUIDE.md                      # دليل الاستخدام
└── 📄 PROJECT_STRUCTURE.md          # هذا الملف
```

---

## 🔑 الملفات الرئيسية

### 1. **DesignContext.jsx** - قلب التطبيق
يدير جميع الحالات:
- الوضع الحالي (بسيط/متقدم)
- القالب المختار
- بيانات التصميم
- الشعارات
- الصور المرفوعة

### 2. **TemplateRenderer.jsx** - موجه القوالب
يختار القالب المناسب بناءً على:
- الوضع الحالي
- القالب المختار

### 3. **defaults.js** - البيانات الافتراضية
يحتوي على:
- روابط الشعارات الافتراضية
- بيانات كل قالب
- قائمة القوالب
- الألوان المتاحة

---

## 🎯 تدفق البيانات

```
User Action
    ↓
Controls Component
    ↓
DesignContext (setState)
    ↓
TemplateRenderer (reads state)
    ↓
Template Component
    ↓
Canvas (displays)
```

---

## 🔧 المكونات القابلة للتوسع

### إضافة قالب جديد:

1. **إنشاء ملف القالب:**
```jsx
// src/components/Templates/Advanced/MyNewTemplate.jsx
import { useDesign } from '../../../contexts/DesignContext'

const MyNewTemplate = () => {
  const { designData, logos } = useDesign()
  
  return (
    <div className="w-[800px] bg-white">
      {/* تصميمك هنا */}
    </div>
  )
}

export default MyNewTemplate
```

2. **إضافة إلى defaults.js:**
```js
export const templates = {
  advanced: [
    // ... القوالب الموجودة
    { id: 'myNew', name: 'قالبي الجديد', icon: 'Star', badge: 'جديد' }
  ]
}

export const defaultTemplateData = {
  myNew: {
    title: 'عنوان افتراضي',
    // ... البيانات الافتراضية
  }
}
```

3. **إضافة كونترولز:**
```jsx
// src/components/Controls/MyNewControls.jsx
```

4. **تسجيل في TemplateRenderer:**
```jsx
case 'myNew':
  return <MyNewTemplate />
```

---

## 🎨 نظام الألوان

### Tailwind Classes المستخدمة:
- `academic-blue`: #0d2b4e
- `academic-gold`: #d4af37
- `academic-purple`: #667eea
- `academic-gradient1`: #667eea
- `academic-gradient2`: #764ba2

### الخطوط:
- `font-arabic`: Tajawal, Cairo
- `font-amiri`: Amiri
- `font-naskh`: Noto Naskh Arabic

---

## 📦 الحزم المستخدمة

### Production:
- `react`: ^18.2.0
- `react-dom`: ^18.2.0
- `html2canvas`: ^1.4.1
- `lucide-react`: ^0.292.0
- `clsx`: ^2.0.0

### Development:
- `vite`: ^5.0.0
- `tailwindcss`: ^3.3.5
- `autoprefixer`: ^10.4.16
- `postcss`: ^8.4.31
- `eslint`: ^8.53.0

---

## 🚀 ميزات قابلة للإضافة

### 1. Database Integration
- حفظ التصاميم في قاعدة بيانات
- مشاركة التصاميم عبر روابط

### 2. More Templates
- قوالب إنفوجرافيك
- قوالب 3D تفاعلية
- قوالب Timeline

### 3. Export Options
- PDF export
- SVG export
- Multiple sizes export

### 4. Collaboration
- Real-time editing
- Comments
- Version control

---

## 📊 إحصائيات المشروع

- **إجمالي الملفات:** ~30
- **إجمالي الأكواد:** ~3,000+ سطر
- **القوالب:** 8 (4 بسيطة + 4 متقدمة)
- **المكونات:** 20+
- **الوقت المتوقع للتطوير:** 8-12 ساعة

---

Created with ❤️ by MiniMax Agent
