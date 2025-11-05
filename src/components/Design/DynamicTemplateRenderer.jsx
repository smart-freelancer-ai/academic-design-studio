import React from 'react';
import { useDesign } from '../../contexts/DesignContext';
import { renderTemplate } from '../../utils/templateRenderer'; // سنقوم بإنشاء هذه الدالة لاحقاً
import { defaultTemplateData } from '../../data/defaults';

const DynamicTemplateRenderer = () => {
  const { currentTemplate, designData } = useDesign();

  // في حال لم يكن هناك قالب محدد، نستخدم بيانات افتراضية
  const templateData = designData || defaultTemplateData[currentTemplate] || {};

  // هنا يتم استدعاء دالة تقوم بتحويل كائن JSON إلى مكون React
  return (
    <div className="p-4">
      {renderTemplate(templateData)}
    </div>
  );
};

export default DynamicTemplateRenderer;
