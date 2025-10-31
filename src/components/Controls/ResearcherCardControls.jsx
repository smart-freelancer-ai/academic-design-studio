import { useRef } from 'react'
import { useDesign } from '../../contexts/DesignContext'
import { Camera } from 'lucide-react'

const ResearcherCardControls = () => {
  const { designData, updateDesignData, uploadedImages, uploadImage } = useDesign()
  const photoInputRef = useRef(null)

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0]
    if (file) {
      await uploadImage('researcherPhoto', file)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          اسم الباحث
        </label>
        <input
          type="text"
          value={designData.researcherName || ''}
          onChange={(e) => updateDesignData({ researcherName: e.target.value })}
          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-academic-purple focus:ring-2 focus:ring-academic-purple/20 transition-all"
        />
      </div>

      <div>
        <button
          onClick={() => photoInputRef.current?.click()}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Camera size={20} />
          {uploadedImages.researcherPhoto ? '✓ تم رفع الصورة' : 'رفع صورة الباحث'}
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
            اللقب العلمي
          </label>
          <input
            type="text"
            value={designData.title || ''}
            onChange={(e) => updateDesignData({ title: e.target.value })}
            className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-academic-purple focus:ring-2 focus:ring-academic-purple/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            التخصص
          </label>
          <input
            type="text"
            value={designData.specialization || ''}
            onChange={(e) => updateDesignData({ specialization: e.target.value })}
            className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-academic-purple focus:ring-2 focus:ring-academic-purple/20 transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          القسم
        </label>
        <input
          type="text"
          value={designData.department || ''}
          onChange={(e) => updateDesignData({ department: e.target.value })}
          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-academic-purple focus:ring-2 focus:ring-academic-purple/20 transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          الجامعة
        </label>
        <input
          type="text"
          value={designData.university || ''}
          onChange={(e) => updateDesignData({ university: e.target.value })}
          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-academic-purple focus:ring-2 focus:ring-academic-purple/20 transition-all"
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            الأبحاث
          </label>
          <input
            type="text"
            value={designData.publications || ''}
            onChange={(e) => updateDesignData({ publications: e.target.value })}
            className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-academic-purple focus:ring-2 focus:ring-academic-purple/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            الاستشهادات
          </label>
          <input
            type="text"
            value={designData.citations || ''}
            onChange={(e) => updateDesignData({ citations: e.target.value })}
            className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-academic-purple focus:ring-2 focus:ring-academic-purple/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            H-Index
          </label>
          <input
            type="text"
            value={designData.hIndex || ''}
            onChange={(e) => updateDesignData({ hIndex: e.target.value })}
            className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-academic-purple focus:ring-2 focus:ring-academic-purple/20 transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          البريد الإلكتروني
        </label>
        <input
          type="email"
          value={designData.email || ''}
          onChange={(e) => updateDesignData({ email: e.target.value })}
          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-academic-purple focus:ring-2 focus:ring-academic-purple/20 transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          رقم الهاتف
        </label>
        <input
          type="tel"
          value={designData.phone || ''}
          onChange={(e) => updateDesignData({ phone: e.target.value })}
          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-academic-purple focus:ring-2 focus:ring-academic-purple/20 transition-all"
        />
      </div>
    </div>
  )
}

export default ResearcherCardControls
