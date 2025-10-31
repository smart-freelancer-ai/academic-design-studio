import { useDesign } from '../../contexts/DesignContext'
import { colors } from '../../data/defaults'
import { Check } from 'lucide-react'

const ColorPalette = () => {
  const { currentColor, setCurrentColor } = useDesign()

  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-gray-800 mb-3">الألوان</h3>
      
      <div className="grid grid-cols-5 gap-2">
        {colors.map((color) => (
          <button
            key={color.id}
            onClick={() => setCurrentColor(color.id)}
            className={`h-12 rounded-lg bg-gradient-to-br ${color.gradient} transition-all duration-300 relative ${
              currentColor === color.id
                ? 'ring-4 ring-gray-800 ring-offset-2 scale-110'
                : 'hover:scale-105'
            }`}
            title={color.name}
          >
            {currentColor === color.id && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Check size={20} className="text-white drop-shadow-lg" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ColorPalette
