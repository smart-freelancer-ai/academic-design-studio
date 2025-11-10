import { useState } from 'react'
import { useDesign } from '../../contexts/DesignContext'
import ModeToggle from '../Controls/ModeToggle'
import TemplateSelector from '../Controls/TemplateSelector'
import TemplateControls from '../Controls/TemplateControls'
import ColorPalette from '../Controls/ColorPalette'
import LogoManager from '../Controls/LogoManager'
import ActionButtons from '../Controls/ActionButtons'
import SavedDesignsManager from '../Controls/SavedDesignsManager'
import AIAssistant from '../AI/AIAssistant'

const Sidebar = () => {
  const { currentMode, currentTemplate, isExporting } = useDesign()
  const [showAI, setShowAI] = useState(false)

  if (isExporting) return null // Hide sidebar completely during export
  
  // إخفاء الألوان للقوالب المتقدمة
  const showColors = currentMode === 'simple'

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 overflow-y-auto scrollbar-thin max-h-[calc(100vh-120px)]">
      {/* زر المساعد الذكي */}
      <div className="mb-4">
        <button
          onClick={() => setShowAI(!showAI)}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
        >
          <span className="text-xl">🤖</span>
          <span>{showAI ? 'إخفاء' : 'فتح'} المساعد الذكي</span>
          <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">AI</span>
        </button>
      </div>

      {/* لوحة المساعد الذكي */}
      {showAI && (
        <div className="mb-6 rounded-xl overflow-hidden border-2 border-blue-200" style={{ height: '500px' }}>
          <AIAssistant />
        </div>
      )}

      {/* تبديل الوضع */}
      <ModeToggle />

      {/* اختيار القالب */}
      <TemplateSelector />

      {/* عناصر التحكم */}
      <TemplateControls />

      {/* الألوان */}
      {showColors && <ColorPalette />}

      {/* إدارة الشعارات */}
      <LogoManager />

      {/* إدارة التصاميم والحفظ */}
      <SavedDesignsManager />

      {/* أزرار الإجراءات */}
      <ActionButtons />
    </div>
  )
}

export default Sidebar
