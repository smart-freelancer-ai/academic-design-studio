import { useDesign } from '../../../contexts/DesignContext'

const CertificateTemplate = () => {
  const { designData, logos, uploadedImages } = useDesign()
  const {
    certificateType,
    certificateSubtitle,
    recipientName,
    certificateText,
    grantor1Name,
    grantor1Title,
    grantor2Name,
    grantor2Title,
    certificateDate
  } = designData

  return (
    <div className="w-[1000px] min-h-[700px] bg-gradient-to-br from-white to-gray-50 border-[15px] border-[#d4af37] rounded-3xl relative p-12 shadow-2xl">
      {/* Inner Border */}
      <div className="absolute top-8 left-8 right-8 bottom-8 border-2 border-[#d4af37]/30 rounded-2xl" />

      {/* Corner Decorations */}
      {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((pos) => (
        <div
          key={pos}
          className={`absolute w-20 h-20 opacity-30 ${pos}`}
          style={{
            backgroundImage: `url('data:image/svg+xml,<svg width="80" height="80" xmlns="http://www.w3.org/2000/svg"><path d="M0,0 L80,0 L80,80 Z" fill="%23d4af37"/></svg>')`,
            transform: pos.includes('right') ? 'scaleX(-1)' : '',
            ...(pos.includes('bottom') && { transform: `scaleY(-1) ${pos.includes('right') ? 'scaleX(-1)' : ''}` })
          }}
        />
      ))}

      <div className="relative z-10 text-center">
        {/* Header */}
        <div className="mb-10">
          <img src={logos.mahfal17} alt="Logo" className="w-24 mx-auto mb-5" onError={(e) => e.target.style.display = 'none'} />
          <h1 className="font-amiri text-6xl text-[#d4af37] mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
            {certificateType}
          </h1>
          <p className="font-naskh text-3xl text-[#0d2b4e]">{certificateSubtitle}</p>
        </div>

        {/* Recipient Section */}
        <div className="my-12">
          <p className="text-xl text-gray-600 mb-6">يُمنح هذا التقدير إلى</p>
          
          {/* Photo */}
          <div className="w-44 h-44 mx-auto mb-6 rounded-full border-[5px] border-[#d4af37] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-xl">
            {uploadedImages.recipientPhoto ? (
              <img
                src={uploadedImages.recipientPhoto}
                alt="Recipient"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-5xl">
                <i className="fas fa-user" />
              </div>
            )}
          </div>

          <h2 className="font-amiri text-5xl text-[#0d2b4e] font-bold border-b-[3px] border-[#d4af37] inline-block px-8 pb-3">
            {recipientName}
          </h2>
        </div>

        {/* Certificate Text */}
        <div className="my-10 px-16">
          <p className="text-xl text-gray-700 leading-loose">
            {certificateText}
          </p>
        </div>

        {/* Signatures */}
        <div className="flex justify-around mt-12 px-20">
          <div className="text-center">
            <div className="w-48 h-0.5 bg-gray-800 mx-auto mb-3" />
            <p className="text-xl font-bold text-[#0d2b4e]">{grantor1Name}</p>
            <p className="text-base text-gray-600 mt-1">{grantor1Title}</p>
          </div>
          
          <div className="text-center">
            <div className="w-48 h-0.5 bg-gray-800 mx-auto mb-3" />
            <p className="text-xl font-bold text-[#0d2b4e]">{grantor2Name}</p>
            <p className="text-base text-gray-600 mt-1">{grantor2Title}</p>
          </div>
        </div>

        {/* Date */}
        <p className="mt-8 text-lg text-gray-600">التاريخ: {certificateDate}</p>
      </div>
    </div>
  )
}

export default CertificateTemplate
