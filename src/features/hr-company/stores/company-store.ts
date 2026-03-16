import { create } from 'zustand';
import { Company, DEFAULT_COMPANY } from '../types/company';
import { MOCK_COMPANIES } from '../data/mock-companies';

interface CompanyStore {
    company: Company;
    isEditing: boolean;
    setCompany: (company: Company) => void;
    updateField: <K extends keyof Company>(field: K, value: Company[K]) => void;
    setEditing: (editing: boolean) => void;
    resetToDefault: () => void;
}

export const useCompanyStore = create<CompanyStore>((set) => ({
    // Default to first mock company
    company: MOCK_COMPANIES[0] || DEFAULT_COMPANY,
    isEditing: false,

    setCompany: (company) => set({ company }),

    updateField: (field, value) =>
        set((state) => ({
            company: { ...state.company, [field]: value },
        })),

    setEditing: (editing) => set({ isEditing: editing }),

    resetToDefault: () => set({ company: DEFAULT_COMPANY, isEditing: false }),
}));
