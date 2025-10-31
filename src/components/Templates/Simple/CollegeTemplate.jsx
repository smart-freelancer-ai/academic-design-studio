import { useDesign } from '../../../contexts/DesignContext'

const CollegeTemplate = () => {
  const { designData, logos } = useDesign()
  const { mainTitle, subtitle } = designData

  return (
    <div className="w-[800px] bg-gradient-to-br from-[#0d2b4e] to-[#1a365d] rounded-2xl overflow-hidden relative border-[3px] border-[#d4af37]">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><path d="M50 10 L60 30 L80 30 L65 45 L75 65 L50 50 L25 65 L35 45 L20 30 L40 30 Z" fill="%23d4af37"/></svg>')`
      }} />

      <div className="relative z-10 p-10">
        <div className="text-center mb-8">
          <img src={logos.university} alt="Logo" className="w-24 mx-auto mb-4" onError={(e) => e.target.style.display = 'none'} />
          <h1 className="font-amiri text-5xl text-[#ffd700] mb-2" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            {mainTitle}
          </h1>
          <p className="text-2xl text-white">{subtitle}</p>
        </div>

        <div className="bg-white/5 backdrop-blur p-8 rounded-2xl">
          <h3 className="text-2xl text-white font-bold mb-6 pb-3 border-b-2 border-[#ffd700]">
            البرامج الأكاديمية
          </h3>
          <ul className="space-y-5 text-gray-100">
            <li className="flex items-start gap-3">
              <i className="fas fa-graduation-cap text-[#ffd700] text-lg mt-1" />
              <span className="flex-1">برامج الدبلوم المهني</span>
            </li>
            <li className="flex items-start gap-3">
              <i className="fas fa-user-graduate text-[#ffd700] text-lg mt-1" />
              <span className="flex-1">برامج الماجستير التخصصية</span>
            </li>
            <li className="flex items-start gap-3">
              <i className="fas fa-award text-[#ffd700] text-lg mt-1" />
              <span className="flex-1">برامج الدكتوراه البحثية</span>
            </li>
            <li className="flex items-start gap-3">
              <i className="fas fa-certificate text-[#ffd700] text-lg mt-1" />
              <span className="flex-1">الدورات التدريبية المعتمدة</span>
            </li>
          </ul>
        </div>

        <div className="mt-8 pt-6 border-t border-[#d4af37]/20 text-center">
          <p className="text-gray-400 mb-4">بالتعاون مع</p>
          <div className="flex justify-around items-center flex-wrap gap-4">
            <img src={logos.foundation} alt="" className="h-10 opacity-80" onError={(e) => e.target.style.display = 'none'} />
            <img src={logos.university} alt="" className="h-10 opacity-80" onError={(e) => e.target.style.display = 'none'} />
            <img src={logos.anbar} alt="" className="h-10 opacity-80" onError={(e) => e.target.style.display = 'none'} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollegeTemplate
