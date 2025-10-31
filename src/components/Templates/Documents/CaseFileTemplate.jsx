import React from 'react';
import { useDesign } from '../../../contexts/DesignContext';

const CaseFileTemplate = () => {
  const { designState } = useDesign();
  const data = designState.caseFile || {};

  return (
    <div className="w-full h-full relative overflow-hidden" style={{
      background: 'radial-gradient(circle at 20% 80%, rgba(212, 175, 55, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(180, 134, 11, 0.1) 0%, transparent 50%), linear-gradient(135deg, #5d4a3a 0%, #4a413a 30%, #3a332a 100%)'
    }}>
      {/* Wood Texture Effect */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }}></div>

      {/* File Paper */}
      <div className="absolute top-8 left-8 right-8 bottom-8" style={{
        background: 'linear-gradient(to bottom, #f9f5e9 0%, #f4f1ea 20%, #f0ecdf 100%)',
        boxShadow: '0 6px 12px rgba(0,0,0,0.4), inset 0 0 50px rgba(139, 125, 107, 0.1)',
        border: '1px solid #d4d0c0',
        padding: '40px'
      }}>
        {/* Aged Paper Effect */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-amber-900/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-amber-900/20 to-transparent"></div>

        {/* Header */}
        <div className="text-center mb-10 pb-4 border-b-4 border-double border-amber-800 relative">
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2/3 h-px bg-amber-800"></div>
          <h1 className="text-5xl font-bold mb-3" style={{
            fontFamily: 'Amiri, serif',
            color: '#2c1810',
            textShadow: '2px 2px 3px rgba(0,0,0,0.1)',
            letterSpacing: '1px'
          }}>
            {data.title || 'ملف قضية: الجريمة في الفضاء الرقمي'}
          </h1>
          <p className="text-lg italic" style={{
            fontFamily: 'Amiri, serif',
            color: '#5d4a3a'
          }}>
            {data.subtitle || 'دراسة تحليلية للمنصات الرقمية - الحالة: مفتوحة'}
          </p>
        </div>

        {/* Evidence Container */}
        <div className="flex justify-between mb-10 gap-6">
          {/* Evidence A */}
          <div className="w-1/2 bg-white p-2 border border-gray-400 shadow-lg transform -rotate-3 hover:rotate-0 transition-transform">
            {data.evidenceA ? (
              <img 
                src={data.evidenceA} 
                alt="Evidence A"
                className="w-full h-48 object-cover border border-gray-300"
                style={{ filter: 'sepia(0.6) brightness(0.9) contrast(1.1)' }}
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-6xl">📸</span>
              </div>
            )}
            <p className="mt-2 text-center text-sm font-bold bg-gray-100 p-2 rounded">
              {data.evidenceALabel || 'الدليل (أ): جرائم العنف التقليدية'}
            </p>
          </div>

          {/* Evidence B */}
          <div className="w-1/2 bg-white p-2 border border-gray-400 shadow-lg transform rotate-2 hover:rotate-0 transition-transform">
            {data.evidenceB ? (
              <img 
                src={data.evidenceB} 
                alt="Evidence B"
                className="w-full h-48 object-cover border border-gray-300"
                style={{ filter: 'sepia(0.6) brightness(0.9) contrast(1.1)' }}
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-6xl">💻</span>
              </div>
            )}
            <p className="mt-2 text-center text-sm font-bold bg-gray-100 p-2 rounded">
              {data.evidenceBLabel || 'الدليل (ب): الجرائم الإلكترونية'}
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="flex justify-around mb-10 bg-amber-900/10 p-4 rounded border border-dashed border-amber-800">
          <div className="text-center">
            <span className="block text-4xl font-bold" style={{ fontFamily: 'Amiri, serif', color: '#8b4513' }}>
              {data.stat1Number || '78%'}
            </span>
            <span className="text-sm mt-1 block" style={{ color: '#5d4a3a' }}>
              {data.stat1Label || 'جرائم تقليدية'}
            </span>
          </div>
          <div className="text-center">
            <span className="block text-4xl font-bold" style={{ fontFamily: 'Amiri, serif', color: '#8b4513' }}>
              {data.stat2Number || '22%'}
            </span>
            <span className="text-sm mt-1 block" style={{ color: '#5d4a3a' }}>
              {data.stat2Label || 'جرائم إلكترونية'}
            </span>
          </div>
          <div className="text-center">
            <span className="block text-4xl font-bold" style={{ fontFamily: 'Amiri, serif', color: '#8b4513' }}>
              {data.stat3Number || '356'}
            </span>
            <span className="text-sm mt-1 block" style={{ color: '#5d4a3a' }}>
              {data.stat3Label || 'تحليل منشور'}
            </span>
          </div>
        </div>

        {/* Central Question */}
        <div className="my-12 mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 border-4 border-yellow-400 p-6 shadow-xl rounded transform -rotate-1 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 rotate-45 w-6 h-6 bg-yellow-100 border-t-4 border-l-4 border-yellow-400"></div>
            <p className="text-2xl font-bold text-center leading-relaxed" style={{
              fontFamily: 'Caveat, cursive',
              color: '#8b4513'
            }}>
              {data.question || 'ما هي الحقيقة المخفية وراء شاشاتنا؟\nلماذا يهيمن أحد الدليلين على الآخر؟'}
            </p>
          </div>
        </div>

        {/* Red Stamp */}
        <div className="absolute bottom-32 left-52 w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-sm transform -rotate-12 shadow-lg" style={{
          background: 'radial-gradient(circle at 30% 30%, #9a2a2a 0%, #7a1a1a 100%)',
          border: '3px double rgba(255,255,255,0.3)'
        }}>
          {data.stamp || 'سري'}
        </div>

        {/* Footer - Researchers */}
        <div className="absolute bottom-12 right-12 text-right">
          <h3 className="text-lg font-bold mb-2 pb-1 border-b border-amber-800" style={{ fontFamily: 'Amiri, serif', color: '#2c1810' }}>
            {data.footerTitle || 'تحقيق الباحثين:'}
          </h3>
          <p className="text-base mb-1" style={{ color: '#5d4a3a' }}>
            {data.researchers || 'أ.د وفاق حافظ بركع و علا خليل إبراهيم'}
          </p>
          <p className="text-base flex items-center justify-end gap-2" style={{ color: '#5d4a3a' }}>
            {data.institution || 'الجامعة العراقية'}
            <span className="inline-block w-5 h-3.5 bg-gradient-to-b from-red-600 via-white to-black border border-gray-300"></span>
          </p>
        </div>

        {/* Logos */}
        {data.logos && data.logos.length > 0 && (
          <div className="absolute bottom-12 left-12 flex flex-col gap-4">
            {data.logos.slice(0, 2).map((logo, index) => (
              <div key={index} className="w-24 h-24 bg-white border border-gray-300 rounded shadow flex items-center justify-center p-2">
                <img src={logo.url} alt={logo.name} className="max-w-full max-h-full object-contain" />
              </div>
            ))}
          </div>
        )}

        {/* Mystery Elements */}
        <div className="absolute top-1/3 left-1/4 w-20 h-20 rounded-full opacity-20" style={{
          background: 'radial-gradient(circle at 30% 30%, transparent 10px, rgba(139, 125, 107, 0.4) 10px, rgba(139, 125, 107, 0.4) 15px, transparent 15px)'
        }}></div>
      </div>
    </div>
  );
};

export default CaseFileTemplate;