import { useDesign } from '../../contexts/DesignContext'
import { Plus, Trash2, Star } from 'lucide-react'

const SimpleControls = () => {
  const { designData, updateDesignData, updateFeature, addFeature, removeFeature } = useDesign()

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          العنوان الرئيسي
        </label>
        <input
          type="text"
          value={designData.mainTitle || ''}
          onChange={(e) => updateDesignData({ mainTitle: e.target.value })}
          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-academic-purple focus:ring-2 focus:ring-academic-purple/20 transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          العنوان الفرعي
        </label>
        <input
          type="text"
          value={designData.subtitle || ''}
          onChange={(e) => updateDesignData({ subtitle: e.target.value })}
          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-academic-purple focus:ring-2 focus:ring-academic-purple/20 transition-all"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            السعر
          </label>
          <input
            type="text"
            value={designData.price || ''}
            onChange={(e) => updateDesignData({ price: e.target.value })}
            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-academic-purple focus:ring-2 focus:ring-academic-purple/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            العملة
          </label>
          <select
            value={designData.currency || '$'}
            onChange={(e) => updateDesignData({ currency: e.target.value })}
            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-academic-purple focus:ring-2 focus:ring-academic-purple/20 transition-all"
          >
            <option value="$">دولار ($)</option>
            <option value="€">يورو (€)</option>
            <option value="£">جنيه (£)</option>
            <option value="ريال">ريال</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          آخر موعد
        </label>
        <input
          type="text"
          value={designData.deadline || ''}
          onChange={(e) => updateDesignData({ deadline: e.target.value })}
          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-academic-purple focus:ring-2 focus:ring-academic-purple/20 transition-all"
        />
      </div>

      {/* الميزات */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
          <Star size={16} className="text-yellow-500" />
          الميزات
        </label>
        
        <div className="space-y-2 mb-3">
          {(designData.features || []).map((feature, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => updateFeature(index, e.target.value)}
                className="flex-1 px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-academic-purple focus:ring-2 focus:ring-academic-purple/20 transition-all"
              />
              <button
                onClick={() => removeFeature(index)}
                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addFeature}
          className="w-full py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          إضافة ميزة
        </button>
      </div>
    </div>
  )
}

export default SimpleControls
