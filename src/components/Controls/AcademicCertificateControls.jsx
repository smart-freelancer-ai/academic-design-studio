import { useRef } from 'react'
import { useDesign } from '../../contexts/DesignContext'
import { Camera } from 'lucide-react'

const AcademicCertificateControls = () => {
  const { designData, updateDesignData, uploadedImages, uploadImage } = useDesign()
  const photoInputRef = useRef(null)

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0]
    if (file) {
      await uploadImage('graduatePhoto', file)
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

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            الدرجة العلمية
          </label>
          <input
            type="text"
            value={designData.degree || ''}
            onChange={(e) => updateDesignData({ degree: e.target.value })}
            className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-academic-purple focus:ring-2 focus:ring-academic-purple/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            التخصص
          </label>
          <input
            type="text"
            value={designData.field || ''}
            onChange={(e) => updateDesignData({ field: e.target.value })}
            className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-academic-purple focus:ring-2 focus:ring-academic-purple/20 transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          اسم الخريج
        </label>
        <input
          type="text"
          value={designData.recipientName || ''}
          onChange={(e) => updateDesignData({ recipientName: e.target.value })}
          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-academic-purple focus:ring-2 focus:ring-academic-purple/20 transition-all"
        />
      </div>

      <div>
        <button
          onClick={() => photoInputRef.current?.click()}
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Camera size={20} />
          {uploadedImages.graduatePhoto ? '✓ تم رفع الصورة' : 'رفع صورة الخريج'}
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
            المعدل GPA
          </label>
          <input
            type="text"
            value={designData.gpa || ''}
            onChange={(e) => updateDesignData({ gpa: e.target.value })}
            className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-academic-purple focus:ring-2 focus:ring-academic-purple/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            مرتبة الشرف
          </label>
          <input
            type="text"
            value={designData.honor || ''}
            onChange={(e) => updateDesignData({ honor: e.target.value })}
            className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-academic-purple focus:ring-2 focus:ring-academic-purple/20 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            سنة التخرج
          </label>
          <input
            type="text"
            value={designData.graduationYear || ''}
            onChange={(e) => updateDesignData({ graduationYear: e.target.value })}
            className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-academic-purple focus:ring-2 focus:ring-academic-purple/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            التاريخ
          </label>
          <input
            type="text"
            value={designData.date || ''}
            onChange={(e) => updateDesignData({ date: e.target.value })}
            className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-academic-purple focus:ring-2 focus:ring-academic-purple/20 transition-all"
          />
        </div>
      </div>
    </div>
  )
}

export default AcademicCertificateControls
