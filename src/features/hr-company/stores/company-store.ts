import { create } from 'zustand';
import { Company, DEFAULT_COMPANY } from '../types/company';
import { companyApi } from '../api/company-api';

interface CompanyStore {
    company: Company;
    isEditing: boolean;
    isLoading: boolean;
    error: string | null;
    fetchMyCompany: () => Promise<void>;
    saveCompany: (directUpdates?: Partial<Company>) => Promise<void>;
    uploadLogo: (file: File) => Promise<void>;
    uploadCover: (file: File) => Promise<void>;
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
                        size: (res.companySize as Company['size']) || 'STARTUP',
                        location: res.address || '',
                        address: res.address || '',
                        about: res.description || '',
                        website: res.website || '',
                        tagline: res.tagline || '',
                        email: res.email || '',
                        phone: res.phone || '',
                        founded: res.founded || '',
                        techStack: res.techStack || [],
                        benefits: res.benefits || [],
                        socialLinks: (res.socialLinks as any) || [],
                        logoUrl: res.logoUrl || undefined,
                        coverUrl: res.coverUrl || undefined,
                    }
                });
                console.log('--- [DEBUG fetchMyCompany] Fetched successfully. Mapped company:', get().company);
            }
        } catch (error) {
            set({ error: 'Failed to fetch company data' });
            console.error(error);
        } finally {
            set({ isLoading: false });
        }
    },

    saveCompany: async (directUpdates?: Partial<Company>) => {
        const currentCompany = get().company;
        const companyToSave = directUpdates ? { ...currentCompany, ...directUpdates } : currentCompany;
        
        console.log('--- [DEBUG saveCompany] Current store company:', currentCompany);
        console.log('--- [DEBUG saveCompany] Company to save:', companyToSave);
        
        set({ isLoading: true, error: null });
        try {
            const payload = {
                name: companyToSave.name,
                description: companyToSave.about,
                website: companyToSave.website,
                industry: companyToSave.industry,
                companySize: companyToSave.size,
                address: companyToSave.location,
                city: companyToSave.location,
                tagline: companyToSave.tagline,
                email: companyToSave.email,
                phone: companyToSave.phone,
                founded: companyToSave.founded,
                techStack: companyToSave.techStack,
                benefits: companyToSave.benefits,
                socialLinks: companyToSave.socialLinks,
                coverUrl: companyToSave.coverUrl,
            };
            console.log('--- [DEBUG saveCompany] Sending payload:', payload);
            if (companyToSave.id) {
                await companyApi.updateCompany(Number(companyToSave.id), payload);
                if (directUpdates) {
                    set({ company: companyToSave });
                }
            } else {
                const res = await companyApi.createCompany(payload);
                set({ company: { ...companyToSave, id: res.id.toString() }});
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

    uploadCover: async (file: File) => {
        const { company } = get();
        if (!company.id) return;
        set({ isLoading: true, error: null });
        try {
            const res = await companyApi.uploadCover(Number(company.id), file);
            set({ company: { ...company, coverUrl: res.coverUrl || undefined } });
        } catch (error) {
            set({ error: 'Failed to upload cover' });
            console.error(error);
        } finally {
            set({ isLoading: false });
        }
    },

    setCompany: (company) => set({ company }),

    updateField: (field, value) => {
        console.log(`--- [DEBUG updateField] updating: ${field} = ${value}`);
        set((state) => ({
            company: { ...state.company, [field]: value },
        }));
    },

    setEditing: (editing) => set({ isEditing: editing }),

    resetToDefault: () => set({ company: DEFAULT_COMPANY, isEditing: false, error: null }),
}));
