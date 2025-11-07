import { useDesign } from '../../contexts/DesignContext'
import SimpleControls from './SimpleControls'
import CertificateControls from './CertificateControls'
import PromotionalControls from './PromotionalControls'
import ResearcherCardControls from './ResearcherCardControls'
import AcademicCertificateControls from './AcademicCertificateControls'
import DynamicEditor from './DynamicEditor'
import AIGenerator from './AIGenerator' // Import the new component
import { Edit } from 'lucide-react'

const TemplateControls = () => {
  const { currentMode, currentTemplate } = useDesign()

  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
        <Edit size={20} className="text-academic-purple" />
        المحتوى
      </h3>
      
      {currentMode === 'simple' && (
        <>
          {currentTemplate === 'generalAnnouncement' && <AIGenerator />}
          {currentTemplate === 'generalAnnouncement' && <DynamicEditor />}
          {currentTemplate !== 'generalAnnouncement' && <SimpleControls />}
        </>
      )}
      
      {currentMode === 'advanced' && (
        <>
          {currentTemplate === 'certificate' && <CertificateControls />}
          {currentTemplate === 'promotional' && <PromotionalControls />}
          {currentTemplate === 'researcherCard' && <ResearcherCardControls />}
          {currentTemplate === 'academicCertificate' && <AcademicCertificateControls />}
        </>
      )}
    </div>
  )
}

export default TemplateControls
