import React from 'react';
import { useDesign } from '../../../contexts/DesignContext';

const ExcellenceBadgeTemplate = () => {
  const { designState } = useDesign();
  const data = designState.excellenceBadge || {};

  return (
    <div className="w-full h-full bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 p-8 relative overflow-hidden">
      {/* Border Decoration */}
      <div className="absolute top-4 left-4 right-4 bottom-4 border-2 border-amber-500 rounded-lg">
        <div className="absolute top-2 left-2 right-2 bottom-2 border border-amber-300 rounded-md"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
        {/* Title */}
        <h1 
          className="text-5xl font-bold mb-6"
          style={{ 
            fontFamily: 'Amiri, serif',
            color: data.titleColor || '#1a365d',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          {data.title || 'وسام التميز الأكاديمي'}
        </h1>

        {/* Certificate Text */}
        <p className="text-xl text-gray-700 mb-8 max-w-2xl leading-relaxed">
          {data.text || 'تُمنح هذه الشهادة تقديراً للجهود المتميزة في التحكيم العلمي والمساهمة الفاعلة في تطوير المعرفة والبحث العلمي'}
        </p>

        {/* Recipient Name */}
        <h2 
          className="text-6xl font-bold mb-10"
          style={{
            fontFamily: 'Amiri, serif',
            background: 'linear-gradient(135deg, #1a365d, #b8860b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            padding: '10px 0'
          }}
        >
          {data.recipientName || 'أ.د. أحمد محمد الشريف'}
        </h2>

        {/* Profile Picture Container */}
        {data.profilePicture && (
          <div className="mb-8 w-48 h-48 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 p-2 shadow-2xl">
            <div 
              className="w-full h-full rounded-full bg-cover bg-center border-2 border-white"
              style={{ backgroundImage: `url(${data.profilePicture})` }}
            ></div>
          </div>
        )}

        {/* Badge Image */}
        <div className="mb-6 w-44 h-44 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 p-4 shadow-2xl flex items-center justify-center">
          {data.badgeImage ? (
            <div 
              className="w-full h-full rounded-full bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${data.badgeImage})` }}
            ></div>
          ) : (
            <span className="text-7xl">🏆</span>
          )}
        </div>

        {/* Badge Number */}
        <p className="text-2xl font-bold text-amber-600 mb-6">
          {data.badgeNumber || 'الوسام رقم: 2024-086'}
        </p>

        {/* Achievement Text */}
        <div className="bg-amber-50 bg-opacity-80 rounded-lg p-6 max-w-3xl border-r-4 border-amber-500">
          <p className="text-lg text-gray-800 leading-relaxed">
            {data.achievementText || 'تم منح هذا الوسام تقديراً للتميز في تحكيم البحوث العلمية والمساهمة في تعزيز جودة الإنتاج العلمي وفق أعلى معايير الجودة والموضوعية'}
          </p>
        </div>

        {/* Platform Logos */}
        {data.logos && data.logos.length > 0 && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
            {data.logos.map((logo, index) => (
              <img 
                key={index}
                src={logo.url} 
                alt={logo.name}
                className="h-16 w-auto opacity-80"
              />
            ))}
          </div>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-amber-300 rounded-full opacity-20 blur-2xl"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-yellow-400 rounded-full opacity-20 blur-3xl"></div>
    </div>
  );
};

export default ExcellenceBadgeTemplate;