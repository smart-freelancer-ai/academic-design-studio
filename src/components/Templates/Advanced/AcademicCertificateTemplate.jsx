import { useDesign } from '../../../contexts/DesignContext'

const AcademicCertificateTemplate = () => {
  const { designData, logos, uploadedImages } = useDesign()
  const {
    certificateType,
    degree,
    field,
    recipientName,
    gpa,
    honor,
    date,
    graduationYear
  } = designData

  return (
    <div className="w-[1100px] min-h-[750px] bg-gradient-to-br from-amber-50 via-white to-amber-50 border-[20px] border-double border-[#d4af37] rounded-3xl relative p-12 shadow-2xl">
      {/* Ornate Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url('data:image/svg+xml,<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><path d="M100 20 L120 60 L160 60 L130 90 L150 130 L100 100 L50 130 L70 90 L40 60 L80 60 Z" fill="%23d4af37"/></svg>')`
      }} />

      {/* Decorative Corners */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-8 border-t-8 border-[#d4af37] rounded-tl-3xl" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-8 border-t-8 border-[#d4af37] rounded-tr-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-8 border-b-8 border-[#d4af37] rounded-bl-3xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-8 border-b-8 border-[#d4af37] rounded-br-3xl" />

      <div className="relative z-10">
        {/* University Header */}
        <div className="text-center mb-10">
          <img src={logos.university} alt="University" className="w-28 mx-auto mb-6" onError={(e) => e.target.style.display = 'none'} />
          <h1 className="font-amiri text-7xl text-[#d4af37] font-bold mb-4" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.1)' }}>
            {certificateType}
          </h1>
          <div className="w-48 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-6" />
        </div>

        {/* Degree Info */}
        <div className="text-center mb-10">
          <div className="inline-block bg-gradient-to-r from-[#0d2b4e] to-[#1a365d] text-white px-12 py-4 rounded-2xl shadow-xl mb-6">
            <p className="text-2xl font-bold">درجة {degree}</p>
            <p className="text-xl mt-2">في {field}</p>
          </div>
        </div>

        {/* Recipient Section */}
        <div className="text-center mb-10">
          <p className="text-2xl text-gray-600 mb-8 font-naskh">
            يُمنح هذه الشهادة للخريج
          </p>

          {/* Photo */}
          <div className="w-48 h-48 mx-auto mb-8 rounded-full border-8 border-[#d4af37] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-2xl">
            {uploadedImages.graduatePhoto ? (
              <img
                src={uploadedImages.graduatePhoto}
                alt="Graduate"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-6xl">
                <i className="fas fa-user-graduate" />
              </div>
            )}
          </div>

          <div className="relative inline-block">
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
            <h2 className="font-amiri text-6xl text-[#0d2b4e] font-black px-12 pb-4">
              {recipientName}
            </h2>
          </div>
        </div>

        {/* Achievement Details */}
        <div className="grid grid-cols-2 gap-8 mb-10 px-20">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 text-center">
            <p className="text-sm text-gray-600 mb-2">المعدل التراكمي</p>
            <p className="text-5xl font-black text-[#d4af37]">{gpa}</p>
            <p className="text-xs text-gray-500 mt-2">GPA</p>
          </div>

          <div className="bg-gradient-to-br from-[#d4af37] to-[#f9b233] rounded-2xl p-6 shadow-lg text-center">
            <i className="fas fa-award text-white text-4xl mb-3" />
            <p className="text-white font-bold text-xl">{honor}</p>
          </div>
        </div>

        {/* Footer Info */}
        <div className="flex justify-between items-end px-12">
          <div className="text-center">
            <div className="w-48 h-0.5 bg-gray-800 mx-auto mb-3" />
            <p className="text-lg font-bold text-[#0d2b4e]">توقيع العميد</p>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-br from-[#0d2b4e] to-[#1a365d] text-white px-8 py-4 rounded-xl">
              <p className="text-sm opacity-90">سنة التخرج</p>
              <p className="text-4xl font-black">{graduationYear}</p>
            </div>
          </div>

          <div className="text-center">
            <div className="w-48 h-0.5 bg-gray-800 mx-auto mb-3" />
            <p className="text-lg font-bold text-[#0d2b4e]">توقيع رئيس الجامعة</p>
          </div>
        </div>

        <p className="text-center text-gray-500 mt-8">تاريخ الإصدار: {date}</p>
      </div>

      {/* Official Seal */}
      <div className="absolute bottom-16 left-16 w-24 h-24 rounded-full border-4 border-[#d4af37] bg-white shadow-xl flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-stamp text-[#d4af37] text-3xl" />
        </div>
      </div>
    </div>
  )
}

export default AcademicCertificateTemplate
