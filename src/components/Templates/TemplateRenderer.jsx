import { useDesign } from '../../contexts/DesignContext'

// Simple Templates

import DynamicTemplateRenderer from '../Design/DynamicTemplateRenderer'

// Advanced Templates
import CertificateTemplate from './Advanced/CertificateTemplate'
import PromotionalTemplate from './Advanced/PromotionalTemplate'
import ResearcherCardTemplate from './Advanced/ResearcherCardTemplate'
import AcademicCertificateTemplate from './Advanced/AcademicCertificateTemplate'
import ExcellenceBadgeTemplate from './Advanced/ExcellenceBadgeTemplate'

// Document Templates
import CaseFileTemplate from './Documents/CaseFileTemplate'
import ResearchDocumentTemplate from './Documents/ResearchDocumentTemplate'

const TemplateRenderer = () => {
  const { currentMode, currentTemplate } = useDesign()

  if (currentMode === 'simple') {
    switch (currentTemplate) {
      case 'participation':
      case 'comparison':
      case 'conference':
      case 'college':
      case 'generalAnnouncement':
        return <DynamicTemplateRenderer />
      default:
        return <DynamicTemplateRenderer />
    }
  }

  if (currentMode === 'advanced') {
    switch (currentTemplate) {
      case 'certificate':
        return <CertificateTemplate />
      case 'promotional':
        return <PromotionalTemplate />
      case 'researcherCard':
        return <ResearcherCardTemplate />
      case 'academicCertificate':
        return <AcademicCertificateTemplate />
      case 'excellenceBadge':
        return <ExcellenceBadgeTemplate />
      case 'reviewerBadge':
        return <ExcellenceBadgeTemplate /> // يستخدم نفس القالب مع بيانات مختلفة
      case 'caseFile':
        return <CaseFileTemplate />
      case 'researchDocument':
        return <ResearchDocumentTemplate />
      default:
        return <CertificateTemplate />
    }
  }

  return null
}

export default TemplateRenderer
