import { useDesign } from '../../../contexts/DesignContext'

const ResearcherCardTemplate = () => {
  const { designData, logos, uploadedImages } = useDesign()
  const {
    researcherName,
    title,
    department,
    university,
    publications,
    citations,
    hIndex,
    specialization,
    email,
    phone
  } = designData

  return (
    <div className="w-[1000px] bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl overflow-hidden shadow-2xl">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#0d2b4e] via-[#1a365d] to-[#0d2b4e] p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" stroke="white" stroke-width="2" fill="none"/></svg>')`
        }} />
        
        <div className="relative z-10 flex items-center gap-8">
          {/* Photo */}
          <div className="w-40 h-40 rounded-2xl border-4 border-[#d4af37] overflow-hidden bg-white shadow-2xl flex-shrink-0">
            {uploadedImages.researcherPhoto ? (
              <img
                src={uploadedImages.researcherPhoto}
                alt="Researcher"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300 text-6xl">
                <i className="fas fa-user-circle" />
              </div>
            )}
          </div>

          {/* Basic Info */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{researcherName}</h1>
            <p className="text-xl text-[#d4af37] mb-1">{title}</p>
            <p className="text-lg opacity-90">{department}</p>
            <p className="text-base opacity-80">{university}</p>
          </div>

          {/* University Logo */}
          <img src={logos.university} alt="University" className="w-24 opacity-80" onError={(e) => e.target.style.display = 'none'} />
        </div>
      </div>

      {/* Stats Section */}
      <div className="p-8">
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Publications */}
          <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl p-6 text-center text-white shadow-lg">
            <i className="fas fa-file-alt text-4xl mb-3 opacity-80" />
            <p className="text-5xl font-black mb-2">{publications}</p>
            <p className="text-sm opacity-90">الأبحاث المنشورة</p>
          </div>

          {/* Citations */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-center text-white shadow-lg">
            <i className="fas fa-quote-right text-4xl mb-3 opacity-80" />
            <p className="text-5xl font-black mb-2">{citations}</p>
            <p className="text-sm opacity-90">الاستشهادات</p>
          </div>

          {/* H-Index */}
          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-center text-white shadow-lg">
            <i className="fas fa-chart-line text-4xl mb-3 opacity-80" />
            <p className="text-5xl font-black mb-2">{hIndex}</p>
            <p className="text-sm opacity-90">H-Index</p>
          </div>
        </div>

        {/* Specialization */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <i className="fas fa-brain text-purple-500" />
            التخصص
          </h3>
          <p className="text-2xl text-gray-700 font-medium">{specialization}</p>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl p-5 flex items-center gap-4">
            <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
              <i className="fas fa-envelope text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-600 mb-1">البريد الإلكتروني</p>
              <p className="text-sm font-medium text-gray-800 truncate">{email}</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl p-5 flex items-center gap-4">
            <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
              <i className="fas fa-phone text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-600 mb-1">رقم الهاتف</p>
              <p className="text-sm font-medium text-gray-800 truncate">{phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 px-8 py-4 flex justify-between items-center border-t-2 border-gray-200">
        <div className="flex gap-4">
          <img src={logos.platform} alt="" className="h-10 opacity-70" onError={(e) => e.target.style.display = 'none'} />
          <img src={logos.foundation} alt="" className="h-10 opacity-70" onError={(e) => e.target.style.display = 'none'} />
        </div>
        <p className="text-sm text-gray-500">منصة أريد العلمية</p>
      </div>
    </div>
  )
}

export default ResearcherCardTemplate
