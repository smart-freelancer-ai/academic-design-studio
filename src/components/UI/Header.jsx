import { Palette } from 'lucide-react'
import ExportButton from './ExportButton'

const Header = () => {
  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-academic-gradient1 to-academic-gradient2 p-2 rounded-xl">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-academic-blue">
                🎨 استوديو التصاميم الأكاديمية
              </h1>
              <p className="text-xs md:text-sm text-gray-600">
                الإصدار الاحترافي v2.0 | بواسطة MiniMax Agent
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <ExportButton />
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
              ✓ جاهز للاستخدام
            </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
