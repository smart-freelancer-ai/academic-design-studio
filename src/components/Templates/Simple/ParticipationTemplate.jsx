import { useDesign } from '../../../contexts/DesignContext'

const ParticipationTemplate = () => {
  const { designData, logos } = useDesign()
  const { mainTitle, subtitle, price, currency, deadline, features = [] } = designData

  return (
    <div className="w-[800px] bg-gradient-to-br from-[#0d2b4e] to-[#1a365d] rounded-2xl overflow-hidden relative border-[3px] border-[#d4af37]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><path d="M50 10 L60 30 L80 30 L65 45 L75 65 L50 50 L25 65 L35 45 L20 30 L40 30 Z" fill="%23d4af37"/></svg>')`
      }} />

      <div className="relative z-10 p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <img src={logos.mahfal17} alt="Logo" className="w-24 mx-auto mb-4" onError={(e) => e.target.style.display = 'none'} />
          <h1 className="font-amiri text-5xl text-[#ffd700] mb-2" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            {mainTitle}
          </h1>
          <p className="text-2xl text-white">{subtitle}</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-[1fr_2fr] gap-8">
          {/* Left Column */}
          <div className="space-y-5">
            {/* Price Box */}
            <div className="bg-gradient-to-br from-[#ffd700] to-[#f9b233] text-[#0d2b4e] p-6 rounded-2xl text-center">
              <p className="text-lg mb-1 font-medium">رسوم المشاركة</p>
              <p className="text-5xl font-black my-2">{currency}{price}</p>
              <p className="text-sm bg-[#0d2b4e]/80 text-white px-3 py-1 rounded-full inline-block">
                آخر موعد: {deadline}
              </p>
            </div>

            {/* Info Box */}
            <div className="bg-white/5 backdrop-blur p-5 rounded-2xl text-center">
              <i className="fas fa-info-circle text-[#ffd700] text-2xl mb-3 block"></i>
              <h4 className="text-white font-bold mb-2">ملاحظة هامة</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                الباقة <strong className="text-[#ffd700]">لا تشمل الإقامة الفندقية</strong> وتقتصر على حضور الفعاليات
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-white/5 backdrop-blur p-8 rounded-2xl">
            <h3 className="text-2xl text-white font-bold mb-6 pb-3 border-b-2 border-[#ffd700]">
              مزايا الباقة الحصرية
            </h3>
            <ul className="space-y-4 text-gray-100">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <i className="fas fa-book-open text-[#ffd700] text-lg mt-1" />
                  <span className="flex-1">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-[#d4af37]/20 text-center">
          <p className="text-gray-400 mb-4">شركاء النجاح</p>
          <div className="flex justify-around items-center flex-wrap gap-4">
            <img src={logos.foundation} alt="" className="h-10 opacity-80" onError={(e) => e.target.style.display = 'none'} />
            <img src={logos.platform} alt="" className="h-10 opacity-80" onError={(e) => e.target.style.display = 'none'} />
            <img src={logos.university} alt="" className="h-10 opacity-80" onError={(e) => e.target.style.display = 'none'} />
            <img src={logos.anbar} alt="" className="h-10 opacity-80" onError={(e) => e.target.style.display = 'none'} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParticipationTemplate
