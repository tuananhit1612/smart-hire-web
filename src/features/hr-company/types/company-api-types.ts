export interface CreateCompanyRequest {
    name: string;
    description?: string;
    website?: string;
    industry?: string;
    companySize?: string;
    address?: string;
    contactEmail?: string;
    contactPhone?: string;
}

export type UpdateCompanyRequest = Partial<CreateCompanyRequest>;

export interface CompanyResponse {
    id: number;
    name: string;
    description: string | null;
    website: string | null;
    industry: string | null;
    companySize: string | null;
    address: string | null;
    contactEmail: string | null;
    contactPhone: string | null;
    logoUrl: string | null;
    ownerId: number;
    ownerName: string;
    createdAt: string;
    updatedAt: string;
}
