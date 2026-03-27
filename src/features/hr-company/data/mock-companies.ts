import { Company } from '../types/company';

export const MOCK_COMPANIES: Company[] = [];

export function getCompanyById(id: string): Company | undefined {
    return MOCK_COMPANIES.find((c) => c.id === id);
}
