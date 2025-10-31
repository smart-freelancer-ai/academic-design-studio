import { useDesign } from '../../../contexts/DesignContext'

const ComparisonTemplate = () => {
  const { designData, logos } = useDesign()
  const { mainTitle, subtitle } = designData

  return (
    <div className="w-[1200px] bg-white rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0d2b4e] to-[#1a365d] text-white p-10 text-center">
        <h3 className="text-xl opacity-80 mb-2">{subtitle}</h3>
        <h1 className="font-amiri text-5xl text-[#d4af37]">{mainTitle}</h1>
      </div>

      {/* Cards */}
      <div className="flex p-10 gap-8 bg-gray-50">
        {/* Card 1 */}
        <div className="flex-1 bg-white rounded-2xl shadow-xl border-2 border-gray-200 flex flex-col">
          <div className="p-6 text-center border-b border-gray-100">
            <h3 className="text-2xl font-bold text-[#0d2b4e]">الحضور فقط</h3>
            <div className="text-3xl font-black text-[#d4af37] my-3">مجاني</div>
          </div>
          <div className="p-6 flex-grow">
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-[#d4af37] mt-1" />
                <span>حضور جلسات المؤتمر الرئيسي</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-[#d4af37] mt-1" />
                <span>مشاهدة البث المباشر</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-[#d4af37] mt-1" />
                <span>قاعات النقاش التفاعلية</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Card 2 - Featured */}
        <div className="flex-1 bg-white rounded-2xl shadow-2xl border-2 border-[#d4af37] flex flex-col relative transform scale-105">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#d4af37] text-[#0d2b4e] px-6 py-1.5 rounded-full font-bold text-sm">
            الأكثر طلباً
          </div>
          <div className="p-6 text-center border-b border-gray-100">
            <h3 className="text-2xl font-bold text-[#0d2b4e]">الحضور مع الشهادات</h3>
            <div className="text-3xl font-black text-[#d4af37] my-3">50 دولار</div>
          </div>
          <div className="p-6 flex-grow">
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <i className="fas fa-star text-[#d4af37] mt-1" />
                <span>جميع مزايا الباقة الأساسية</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-[#d4af37] mt-1" />
                <span>شهادة حضور المؤتمر</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-[#d4af37] mt-1" />
                <span>شهادات الدورات التدريبية</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-[#d4af37] mt-1" />
                <span>إشعار مشاركة رسمي</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex-1 bg-white rounded-2xl shadow-xl border-2 border-gray-200 flex flex-col">
          <div className="p-6 text-center border-b border-gray-100">
            <h3 className="text-2xl font-bold text-[#0d2b4e]">تقديم بحث</h3>
            <div className="text-3xl font-black text-[#d4af37] my-3">100 دولار</div>
          </div>
          <div className="p-6 flex-grow">
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <i className="fas fa-star text-[#d4af37] mt-1" />
                <span>جميع مزايا الباقة المميزة</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-[#d4af37] mt-1" />
                <span>تقديم ورقة بحثية</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-[#d4af37] mt-1" />
                <span>نشر البحث في المجلة</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 p-6 border-t border-gray-200 text-center">
        <div className="flex justify-center items-center gap-10 flex-wrap">
          <img src={logos.mahfal17} alt="" className="h-12 opacity-90" onError={(e) => e.target.style.display = 'none'} />
          <img src={logos.foundation} alt="" className="h-12 opacity-90" onError={(e) => e.target.style.display = 'none'} />
          <img src={logos.university} alt="" className="h-12 opacity-90" onError={(e) => e.target.style.display = 'none'} />
          <img src={logos.anbar} alt="" className="h-12 opacity-90" onError={(e) => e.target.style.display = 'none'} />
        </div>
      </div>
    </div>
  )
}

export default ComparisonTemplate
