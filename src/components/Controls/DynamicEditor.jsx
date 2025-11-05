import React from 'react';
import { useDesign } from '../../contexts/DesignContext';

const DynamicEditor = () => {
  const { designData, updateDesignData } = useDesign();

  if (!designData || !designData.type || designData.type !== 'GeneralAnnouncement') {
    return <p className="text-sm text-gray-500 p-2">لا يوجد محرر ديناميكي لهذا القالب.</p>;
  }

  const handleStyleChange = (key, value) => {
    updateDesignData({
      style: {
        ...designData.style,
        [key]: value,
      },
    });
  };

  const handleHeaderChange = (key, value) => {
    updateDesignData({
      header: {
        ...designData.header,
        [key]: value,
      },
    });
  };

  const handleSectionContentChange = (sectionIndex, contentKey, value) => {
    const newSections = [...designData.sections];
    newSections[sectionIndex].content[contentKey] = value;
    updateDesignData({ sections: newSections });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold border-b pb-2">محرر القالب الديناميكي</h3>

      {/* Header Controls */}
      <div className="p-3 bg-gray-50 rounded-lg">
        <h4 className="font-semibold mb-2">الرأس (Header)</h4>
        <input
          type="text"
          placeholder="العنوان الرئيسي"
          value={designData.header.mainTitle || ''}
          onChange={(e) => handleHeaderChange('mainTitle', e.target.value)}
          className="w-full p-2 border rounded-md mb-2"
        />
        <input
          type="text"
          placeholder="العنوان الفرعي"
          value={designData.header.subtitle || ''}
          onChange={(e) => handleHeaderChange('subtitle', e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Style Controls */}
      <div className="p-3 bg-gray-50 rounded-lg">
        <h4 className="font-semibold mb-2">الأنماط (Style)</h4>
        <input
          type="color"
          value={designData.style.primaryColor || '#ffd700'}
          onChange={(e) => handleStyleChange('primaryColor', e.target.value)}
          className="w-full h-10 p-1 border rounded-md"
          title="اللون الأساسي"
        />
      </div>

      {/* Sections Controls */}
      {designData.sections && designData.sections.map((section, index) => (
        <div key={index} className="p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500">
          <h4 className="font-semibold mb-2">القسم {index + 1} - ({section.type})</h4>
          
          {section.type === 'quote' && (
            <textarea
              placeholder="نص الاقتباس"
              value={section.content.text || ''}
              onChange={(e) => handleSectionContentChange(index, 'text', e.target.value)}
              className="w-full p-2 border rounded-md h-20"
            />
          )}

          {section.type === 'offer' && (
            <>
              <input
                type="text"
                placeholder="عنوان العرض"
                value={section.content.text || ''}
                onChange={(e) => handleSectionContentChange(index, 'text', e.target.value)}
                className="w-full p-2 border rounded-md mb-2"
              />
              <input
                type="text"
                placeholder="نص الخصم"
                value={section.content.discount || ''}
                onChange={(e) => handleSectionContentChange(index, 'discount', e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default DynamicEditor;
