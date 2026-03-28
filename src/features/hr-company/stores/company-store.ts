import { create } from 'zustand';
import { Company, DEFAULT_COMPANY } from '../types/company';
import { companyApi } from '../api/company-api';

interface CompanyStore {
    company: Company;
    isEditing: boolean;
    isLoading: boolean;
    error: string | null;
    fetchMyCompany: () => Promise<void>;
    saveCompany: () => Promise<void>;
    uploadLogo: (file: File) => Promise<void>;
    setCompany: (company: Company) => void;
    updateField: <K extends keyof Company>(field: K, value: Company[K]) => void;
    setEditing: (editing: boolean) => void;
    resetToDefault: () => void;
}

export const useCompanyStore = create<CompanyStore>((set, get) => ({
    company: DEFAULT_COMPANY,
    isEditing: false,
    isLoading: false,
    error: null,

    fetchMyCompany: async () => {
        set({ isLoading: true, error: null });
        try {
            const companies = await companyApi.getMyCompanies();
            if (companies.length > 0) {
                const res = companies[0];
                set({
                    company: {
                        ...DEFAULT_COMPANY,
                        id: res.id.toString(),
                        name: res.name,
                        industry: res.industry || '',
                        size: (res.companySize as Company['size']) || '11-50',
                        location: res.address || '',
                        about: res.description || '',
                        website: res.website || '',
                        email: '',
                        phone: '',
                        logoUrl: res.logoUrl || undefined,
                    }
                });
            }
        } catch (error) {
            set({ error: 'Failed to fetch company data' });
            console.error(error);
        } finally {
            set({ isLoading: false });
        }
    },

    saveCompany: async () => {
        const { company } = get();
        set({ isLoading: true, error: null });
        try {
            const payload = {
                name: company.name,
                description: company.about,
                website: company.website,
                industry: company.industry,
                companySize: company.size,
                address: company.location,
                city: company.location,
            };
            if (company.id) {
                await companyApi.updateCompany(Number(company.id), payload);
            } else {
                const res = await companyApi.createCompany(payload);
                set({ company: { ...company, id: res.id.toString() }});
            }
            set({ isEditing: false });
        } catch (error) {
            set({ error: 'Failed to save company data' });
            console.error(error);
        } finally {
            set({ isLoading: false });
        }
    },

    uploadLogo: async (file: File) => {
        const { company } = get();
        if (!company.id) return;
        set({ isLoading: true, error: null });
        try {
            const res = await companyApi.uploadLogo(Number(company.id), file);
            set({ company: { ...company, logoUrl: res.logoUrl || undefined } });
        } catch (error) {
            set({ error: 'Failed to upload logo' });
            console.error(error);
        } finally {
            set({ isLoading: false });
        }
    },

    setCompany: (company) => set({ company }),

    updateField: (field, value) =>
        set((state) => ({
            company: { ...state.company, [field]: value },
        })),

    setEditing: (editing) => set({ isEditing: editing }),

    resetToDefault: () => set({ company: DEFAULT_COMPANY, isEditing: false, error: null }),
}));
