import { useRef } from 'react'
import { useDesign } from '../../contexts/DesignContext'
import { Camera } from 'lucide-react'

const CertificateControls = () => {
  const { designData, updateDesignData, uploadedImages, uploadImage } = useDesign()
  const photoInputRef = useRef(null)

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0]
    if (file) {
      await uploadImage('recipientPhoto', file)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          نوع الشهادة
        </label>
        <input
          type="text"
          value={designData.certificateType || ''}
          onChange={(e) => updateDesignData({ certificateType: e.target.value })}
          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-academic-purple focus:ring-2 focus:ring-academic-purple/20 transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          العنوان الفرعي
        </label>
        <input
          type="text"
          value={designData.certificateSubtitle || ''}
          onChange={(e) => updateDesignData({ certificateSubtitle: e.target.value })}
          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-academic-purple focus:ring-2 focus:ring-academic-purple/20 transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          اسم المستلم
        </label>
        <input
          type="text"
          value={designData.recipientName || ''}
          onChange={(e) => updateDesignData({ recipientName: e.target.value })}
          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-academic-purple focus:ring-2 focus:ring-academic-purple/20 transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          نص الشهادة
        </label>
        <textarea
          value={designData.certificateText || ''}
          onChange={(e) => updateDesignData({ certificateText: e.target.value })}
          rows={4}
          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-academic-purple focus:ring-2 focus:ring-academic-purple/20 transition-all resize-none"
        />
      </div>

      <div>
        <button
          onClick={() => photoInputRef.current?.click()}
          className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Camera size={20} />
          {uploadedImages.recipientPhoto ? '✓ تم رفع الصورة' : 'رفع صورة المستلم'}
        </button>
        <input
          ref={photoInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            اسم المانح الأول
          </label>
          <input
            type="text"
            value={designData.grantor1Name || ''}
            onChange={(e) => updateDesignData({ grantor1Name: e.target.value })}
            className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-academic-purple focus:ring-2 focus:ring-academic-purple/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            منصبه
          </label>
          <input
            type="text"
            value={designData.grantor1Title || ''}
            onChange={(e) => updateDesignData({ grantor1Title: e.target.value })}
            className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-academic-purple focus:ring-2 focus:ring-academic-purple/20 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            اسم المانح الثاني
          </label>
          <input
            type="text"
            value={designData.grantor2Name || ''}
            onChange={(e) => updateDesignData({ grantor2Name: e.target.value })}
            className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-academic-purple focus:ring-2 focus:ring-academic-purple/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            منصبه
          </label>
          <input
            type="text"
            value={designData.grantor2Title || ''}
            onChange={(e) => updateDesignData({ grantor2Title: e.target.value })}
            className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-academic-purple focus:ring-2 focus:ring-academic-purple/20 transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          التاريخ
        </label>
        <input
          type="text"
          value={designData.certificateDate || ''}
          onChange={(e) => updateDesignData({ certificateDate: e.target.value })}
          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-academic-purple focus:ring-2 focus:ring-academic-purple/20 transition-all"
        />
      </div>
    </div>
  )
}

export default CertificateControls
