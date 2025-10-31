import { useState } from 'react'
import { useDesign } from '../../contexts/DesignContext'
import { Image, ExternalLink, Check } from 'lucide-react'

const LogoManager = () => {
  const { logos, updateLogo } = useDesign()
  const [editingKey, setEditingKey] = useState(null)
  const [tempUrl, setTempUrl] = useState('')

  const logoList = [
    { key: 'platform', label: 'منصة أريد' },
    { key: 'university', label: 'جامعة أريد' },
    { key: 'conference', label: 'المحفل' },
    { key: 'foundation', label: 'مؤسسة أريد' },
  ]

  const handleEdit = (key) => {
    setEditingKey(key)
    setTempUrl(logos[key])
  }

  const handleSave = (key) => {
    updateLogo(key, tempUrl)
    setEditingKey(null)
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
        <Image size={20} className="text-academic-purple" />
        إدارة الشعارات
      </h3>
      
      <div className="space-y-2">
        {logoList.map(({ key, label }) => (
          <div key={key} className="border border-gray-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <img 
                src={logos[key]} 
                alt={label}
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="32" height="32"%3E%3Crect fill="%23ddd" width="32" height="32"/%3E%3C/svg%3E'
                }}
              />
              <span className="text-sm font-medium flex-1">{label}</span>
            </div>
            
            {editingKey === key ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tempUrl}
                  onChange={(e) => setTempUrl(e.target.value)}
                  placeholder="رابط الصورة"
                  className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-academic-purple focus:border-transparent"
                />
                <button
                  onClick={() => handleSave(key)}
                  className="px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Check size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleEdit(key)}
                className="w-full px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <ExternalLink size={14} />
                تغيير الرابط
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default LogoManager
