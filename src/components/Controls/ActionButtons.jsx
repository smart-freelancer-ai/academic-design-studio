import { useRef } from 'react'
import { useDesign } from '../../contexts/DesignContext'
import html2canvas from 'html2canvas'
import { Download, Save, Upload, RotateCcw } from 'lucide-react'

const ActionButtons = () => {
  const { saveDesign, loadDesign, resetDesign, currentTemplate } = useDesign()
  const fileInputRef = useRef(null)

  const handleDownload = async () => {
    const canvas = document.querySelector('#designCanvas > *')
    if (!canvas) {
      alert('لا يوجد تصميم للتحميل!')
      return
    }

    try {
      const canvasElement = await html2canvas(canvas, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      })

      const link = document.createElement('a')
      link.download = `design-${currentTemplate}-${Date.now()}.png`
      link.href = canvasElement.toDataURL('image/png')
      link.click()
    } catch (error) {
      console.error('Error downloading:', error)
      alert('حدث خطأ أثناء التحميل')
    }
  }

  const handleLoadFile = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result)
        loadDesign(data)
        alert('تم استيراد التصميم بنجاح!')
      } catch (error) {
        alert('خطأ في قراءة الملف!')
      }
    }
    reader.readAsText(file)
  }

  const handleReset = () => {
    if (confirm('هل تريد إعادة تعيين جميع الإعدادات؟')) {
      resetDesign()
    }
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleDownload}
        className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
      >
        <Download size={20} />
        تحميل التصميم
      </button>

      <button
        onClick={saveDesign}
        className="w-full py-3 bg-gradient-to-r from-academic-gradient1 to-academic-gradient2 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
      >
        <Save size={20} />
        حفظ JSON
      </button>

      <button
        onClick={() => fileInputRef.current?.click()}
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
      >
        <Upload size={20} />
        استيراد JSON
      </button>

      <button
        onClick={handleReset}
        className="w-full py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
      >
        <RotateCcw size={20} />
        إعادة تعيين
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleLoadFile}
        className="hidden"
      />
    </div>
  )
}

export default ActionButtons
