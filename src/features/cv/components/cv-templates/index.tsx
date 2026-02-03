import { CVData } from '../../types/types';
import { ModernTechTemplate } from './ModernTechTemplate';
import { MinimalCleanTemplate } from './MinimalCleanTemplate';
import { ProfessionalSalesTemplate } from './ProfessionalSalesTemplate';
import { ExecutiveHRTemplate } from './ExecutiveHRTemplate';
import { ModernSalesTemplate } from './ModernSalesTemplate';
import { CreativeBATemplate } from './CreativeBATemplate';

// Registry mapping template IDs to components
export const TEMPLATE_COMPONENTS: Record<string, React.ComponentType<{ data: CVData }>> = {
    'modern-tech': ModernTechTemplate,
    'minimal-clean': MinimalCleanTemplate,
    'professional-sales': ProfessionalSalesTemplate,
    'executive-hr': ExecutiveHRTemplate,
    'modern-sales': ModernSalesTemplate,
    'creative-ba': CreativeBATemplate,
    'executive-classic': MinimalCleanTemplate, // Fallback
    'creative-portfolio': ModernTechTemplate, // Fallback
};

// Default fallback template
export const DefaultTemplate = ModernTechTemplate;
