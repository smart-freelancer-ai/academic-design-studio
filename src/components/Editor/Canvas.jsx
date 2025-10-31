import { useDesign } from '../../contexts/DesignContext'
import TemplateRenderer from '../Templates/TemplateRenderer'

const Canvas = () => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 overflow-auto flex items-center justify-center min-h-[600px]">
      <div id="designCanvas" className="shadow-2xl rounded-2xl">
        <TemplateRenderer />
      </div>
    </div>
  )
}

export default Canvas
