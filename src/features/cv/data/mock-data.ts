import { CVData, DEFAULT_CV_DATA } from '../types/types';

export const MOCK_DATA_INTERN: CVData = DEFAULT_CV_DATA;
export const MOCK_DATA_LEADER: CVData = DEFAULT_CV_DATA;
export const MOCK_DATA_SENIOR: CVData = DEFAULT_CV_DATA;
export const MOCK_DATA_SALES_ADMIN: CVData = DEFAULT_CV_DATA;
export const MOCK_DATA_CHRO: CVData = DEFAULT_CV_DATA;
export const MOCK_DATA_SALES_EXEC: CVData = DEFAULT_CV_DATA;
export const MOCK_DATA_BA: CVData = DEFAULT_CV_DATA;

export const MOCK_CV_DATA = DEFAULT_CV_DATA;

export const MOCK_DATA_MAP: Record<string, CVData> = {};

export function getMockDataForTemplate(templateId: string): CVData {
    return MOCK_DATA_MAP[templateId] ?? DEFAULT_CV_DATA;
}
