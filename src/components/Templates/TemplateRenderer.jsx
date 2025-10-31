import { useDesign } from '../../contexts/DesignContext'

// Simple Templates
import ParticipationTemplate from './Simple/ParticipationTemplate'
import ComparisonTemplate from './Simple/ComparisonTemplate'
import ConferenceTemplate from './Simple/ConferenceTemplate'
import CollegeTemplate from './Simple/CollegeTemplate'

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
        return <ParticipationTemplate />
      case 'comparison':
        return <ComparisonTemplate />
      case 'conference':
        return <ConferenceTemplate />
      case 'college':
        return <CollegeTemplate />
      default:
        return <ParticipationTemplate />
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
