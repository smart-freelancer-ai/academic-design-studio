import { Smile, Rocket } from 'lucide-react'
import { useDesign } from '../../contexts/DesignContext'

const ModeToggle = () => {
  const { currentMode, switchMode } = useDesign()

  return (
    <div className="bg-gradient-to-r from-pink-400 to-red-400 rounded-2xl p-4 mb-6">
      <div className="text-center mb-3">
        <p className="text-white font-bold text-sm flex items-center justify-center gap-2">
          <span>اختر الوضع</span>
        </p>
      </div>
      
      <div className="flex bg-white/20 rounded-xl p-1 gap-1">
        <button
          onClick={() => switchMode('simple')}
          className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
            currentMode === 'simple'
              ? 'bg-white text-red-500 shadow-lg'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          <Smile size={18} />
          <span>بسيط</span>
        </button>
        
        <button
          onClick={() => switchMode('advanced')}
          className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
            currentMode === 'advanced'
              ? 'bg-white text-red-500 shadow-lg'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          <Rocket size={18} />
          <span>متقدم</span>
        </button>
      </div>
    </div>
  )
}

export default ModeToggle
