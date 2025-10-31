import { useState } from 'react';
import { useDesign } from '../../contexts/DesignContext';
import { templates } from '../../data/defaults';
import { categories } from '../../data/categories';
import { 
  Ticket, Scale, Users, GraduationCap, Award, Megaphone, 
  UserCircle, Medal, Trophy, Shield, FileText, BookOpen 
} from 'lucide-react';

const iconMap = {
  Ticket, Scale, Users, GraduationCap, Award, Megaphone,
  UserCircle, Medal, Trophy, Shield, FileText, BookOpen
};

const TemplateSelector = () => {
  const { currentMode, currentTemplate, setCurrentTemplate } = useDesign();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // جميع القوالب حسب الوضع
  const availableTemplates = currentMode === 'simple' ? templates.simple : templates.advanced;

  // تفيلتر القوالب حسب التصنيف
  const filteredTemplates = selectedCategory === 'all'
    ? availableTemplates
    : availableTemplates.filter(t => t.category === selectedCategory);

  // تغيير القالب
  const handleTemplateChange = (templateId) => {
    setCurrentTemplate(templateId);
  };

  // الحصول على أيقونة القالب
  const getIcon = (iconName) => {
    const Icon = iconMap[iconName];
    return Icon ? <Icon size={24} /> : null;
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
        <Award size={20} />
        اختر القالب
      </h3>

      {/* فلتر التصنيف - يظهر فقط في الوضع المتقدم */}
      {currentMode === 'advanced' && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🌟 الكل
            </button>
            {Object.entries(categories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === key
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
          {selectedCategory !== 'all' && (
            <p className="text-xs text-gray-500 mt-2">
              {categories[selectedCategory]?.description}
            </p>
          )}
        </div>
      )}

      {/* قائمة القوالب */}
      <div className="grid grid-cols-2 gap-3">
        {filteredTemplates.map((template) => (
          <button
            key={template.id}
            onClick={() => handleTemplateChange(template.id)}
            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
              currentTemplate === template.id
                ? 'border-blue-600 bg-blue-50 shadow-lg scale-105'
                : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <div className={`${
                currentTemplate === template.id ? 'text-blue-600' : 'text-gray-600'
              }`}>
                {getIcon(template.icon)}
              </div>
              <span className={`text-sm font-medium ${
                currentTemplate === template.id ? 'text-blue-900' : 'text-gray-700'
              }`}>
                {template.name}
              </span>
              {template.badge && (
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  template.badge === 'جديد' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {template.badge}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <p>لا توجد قوالب في هذا التصنيف</p>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;