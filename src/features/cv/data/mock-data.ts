import { CVData, DEFAULT_CV_DATA } from '../types/types';

export const MOCK_DATA_INTERN: CVData = { ...DEFAULT_CV_DATA, id: 'intern' };
export const MOCK_DATA_LEADER: CVData = { ...DEFAULT_CV_DATA, id: 'leader' };
export const MOCK_DATA_SENIOR: CVData = { ...DEFAULT_CV_DATA, id: 'senior' };
export const MOCK_DATA_SALES_ADMIN: CVData = { ...DEFAULT_CV_DATA, id: 'sales-admin' };
export const MOCK_DATA_CHRO: CVData = { ...DEFAULT_CV_DATA, id: 'chro' };
export const MOCK_DATA_SALES_EXEC: CVData = { ...DEFAULT_CV_DATA, id: 'sales-exec' };
export const MOCK_DATA_BA: CVData = { ...DEFAULT_CV_DATA, id: 'ba' };

export const MOCK_CV_DATA = { ...DEFAULT_CV_DATA, id: 'mock' };

export const MOCK_DATA_MAP: Record<string, CVData> = {
    'modern-tech': MOCK_DATA_SENIOR,
    'minimal-clean': MOCK_DATA_BA,
    'creative-portfolio': MOCK_DATA_INTERN,
    'executive-classic': MOCK_DATA_LEADER,
};

export function getMockDataForTemplate(templateId: string): CVData {
    return MOCK_DATA_MAP[templateId] || MOCK_CV_DATA;
}
