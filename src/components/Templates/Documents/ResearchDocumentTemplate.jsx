import React from 'react';
import { useDesign } from '../../../contexts/DesignContext';

const ResearchDocumentTemplate = () => {
  const { designState } = useDesign();
  const data = designState.researchDocument || {};

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-12 relative overflow-hidden">
      {/* Academic Pattern Background */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      {/* Header with Logo */}
      <div className="relative z-10">
        {data.logos && data.logos.length > 0 && (
          <div className="flex justify-center items-center gap-8 mb-8">
            {data.logos.slice(0, 3).map((logo, index) => (
              <img 
                key={index}
                src={logo.url} 
                alt={logo.name}
                className="h-20 w-auto"
              />
            ))}
          </div>
        )}

        {/* Title Section */}
        <div className="text-center mb-12 pb-6 border-b-2 border-blue-900">
          <h1 
            className="text-5xl font-bold mb-4"
            style={{
              fontFamily: 'Amiri, serif',
              color: data.titleColor || '#1e3a8a',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            {data.title || 'عنوان البحث العلمي'}
          </h1>
          <p className="text-xl text-gray-600 italic">
            {data.subtitle || 'دراسة تحليلية متقدمة'}
          </p>
        </div>

        {/* Author Info */}
        <div className="bg-white/80 rounded-xl p-8 mb-8 shadow-lg border-l-4 border-blue-900">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Amiri, serif', color: '#1e3a8a' }}>
                {data.authorName || 'أ.د. محمد أحمد'}
              </h2>
              <p className="text-lg text-gray-700 mb-1">
                {data.authorTitle || 'أستاذ دكتور - كلية العلوم'}
              </p>
              <p className="text-gray-600">
                {data.institution || 'جامعة أريد الدولية'}
              </p>
            </div>
            {data.authorPhoto && (
              <div className="w-32 h-32 rounded-full border-4 border-blue-900 overflow-hidden shadow-xl">
                <img 
                  src={data.authorPhoto} 
                  alt="Author"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Abstract Section */}
        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-8 mb-8 shadow-md border border-blue-200">
          <h3 className="text-2xl font-bold mb-4 text-blue-900" style={{ fontFamily: 'Amiri, serif' }}>
            {data.abstractTitle || 'الملخص'}
          </h3>
          <p className="text-lg leading-relaxed text-gray-800">
            {data.abstract || 'هذا البحث يتناول موضوعاً علمياً مهماً يساهم في تطوير المعرفة الإنسانية. تم استخدام منهجية بحثية دقيقة وتحليل شامل للبيانات. النتائج تشير إلى استنتاجات مهمة تفتح آفاقاً جديدة للبحث المستقبلي.'}
          </p>
        </div>

        {/* Key Findings Grid */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-lg text-center border-t-4 border-blue-600">
            <div className="text-5xl font-bold text-blue-900 mb-2" style={{ fontFamily: 'Amiri, serif' }}>
              {data.finding1Number || '95%'}
            </div>
            <div className="text-sm text-gray-600">
              {data.finding1Label || 'معدل الدقة'}
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg text-center border-t-4 border-green-600">
            <div className="text-5xl font-bold text-green-900 mb-2" style={{ fontFamily: 'Amiri, serif' }}>
              {data.finding2Number || '1,248'}
            </div>
            <div className="text-sm text-gray-600">
              {data.finding2Label || 'عينة الدراسة'}
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg text-center border-t-4 border-purple-600">
            <div className="text-5xl font-bold text-purple-900 mb-2" style={{ fontFamily: 'Amiri, serif' }}>
              {data.finding3Number || '12'}
            </div>
            <div className="text-sm text-gray-600">
              {data.finding3Label || 'شهر بحث'}
            </div>
          </div>
        </div>

        {/* Keywords */}
        <div className="bg-white/80 rounded-lg p-6 shadow-md">
          <h4 className="text-lg font-bold mb-3 text-blue-900">
            الكلمات المفتاحية:
          </h4>
          <div className="flex flex-wrap gap-3">
            {(data.keywords || 'البحث العلمي, التحليل, المنهجية, النتائج').split(',').map((keyword, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-blue-100 text-blue-900 rounded-full text-sm font-medium border border-blue-300"
              >
                {keyword.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-8 left-0 right-0 text-center text-sm text-gray-500">
          <p>{data.journal || 'المجلة الدولية للبحوث الأكاديمية'}</p>
          <p className="mt-1">{data.date || new Date().getFullYear()}</p>
        </div>
      </div>

      {/* Decorative Corner Elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-900/5 rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-900/5 rounded-tr-full"></div>
    </div>
  );
};

export default ResearchDocumentTemplate;