import { useDesign } from '../../../contexts/DesignContext'

const PromotionalTemplate = () => {
  const { designData, logos } = useDesign()
  const {
    mainTitle,
    subtitle,
    originalPrice,
    discountPrice,
    currency,
    discount,
    features = []
  } = designData

  return (
    <div className="w-[900px] bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl overflow-hidden shadow-2xl border-4 border-orange-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="30" fill="white"/></svg>')`
        }} />
        <div className="relative z-10">
          <p className="text-white text-2xl font-black animate-pulse">✨ عرض خاص - لفترة محدودة ✨</p>
        </div>
      </div>

      <div className="p-10">
        {/* Header with Logo */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1">
            <h1 className="font-bold text-4xl text-gray-800 mb-2">{mainTitle}</h1>
            <p className="text-xl text-gray-600">{subtitle}</p>
          </div>
          <img src={logos.platform} alt="Logo" className="w-24" onError={(e) => e.target.style.display = 'none'} />
        </div>

        {/* Price Section */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-orange-200 mb-8 relative overflow-hidden">
          {/* Discount Badge */}
          <div className="absolute -top-3 -right-3 bg-gradient-to-br from-red-500 to-pink-500 text-white w-24 h-24 rounded-full flex items-center justify-center shadow-lg transform rotate-12">
            <div className="text-center">
              <p className="text-sm font-medium">خصم</p>
              <p className="text-2xl font-black">{discount}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 items-center">
            {/* Original Price */}
            <div className="text-center">
              <p className="text-gray-500 text-lg mb-2">السعر الأصلي</p>
              <p className="text-4xl text-gray-400 line-through font-bold">
                {currency}{originalPrice}
              </p>
            </div>

            {/* Discounted Price */}
            <div className="text-center bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-lg">
              <p className="text-lg mb-2">السعر الآن</p>
              <p className="text-6xl font-black drop-shadow-lg">
                {currency}{discountPrice}
              </p>
              <p className="text-sm mt-2 opacity-90">فقط!</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <span className="bg-gradient-to-br from-blue-500 to-indigo-500 w-10 h-10 rounded-full flex items-center justify-center text-white">
              ✓
            </span>
            ما تحصل عليه
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                <div className="bg-gradient-to-br from-green-400 to-emerald-400 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="fas fa-check text-white text-sm" />
                </div>
                <span className="text-gray-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-8 text-center">
          <button className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white text-2xl font-black py-5 px-16 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-3xl">
            🔥 احصل على العرض الآن 🔥
          </button>
          <p className="text-gray-500 text-sm mt-4">⭐ عدد محدود متاح - لا تفوت الفرصة!</p>
        </div>
      </div>
    </div>
  )
}

export default PromotionalTemplate
