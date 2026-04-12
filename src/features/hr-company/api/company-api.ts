import { apiClient } from '@/shared/lib/api-client';
import { CompanyResponse, CreateCompanyRequest, UpdateCompanyRequest } from '../types/company-api-types';

export const companyApi = {
    createCompany: async (data: CreateCompanyRequest): Promise<CompanyResponse> => {
        const response = await apiClient.post('/companies', data);
        return response.data.data;
    },
    updateCompany: async (id: number, data: UpdateCompanyRequest): Promise<CompanyResponse> => {
        const response = await apiClient.put(`/companies/${id}`, data);
        return response.data.data;
    },
    getMyCompanies: async (): Promise<CompanyResponse[]> => {
        const response = await apiClient.get('/companies/my');
        return response.data.data;
    },
    getCompanyById: async (id: number): Promise<CompanyResponse> => {
        const response = await apiClient.get(`/companies/${id}`);
        return response.data.data;
    },
    uploadLogo: async (id: number, file: File): Promise<CompanyResponse> => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await apiClient.post(`/companies/${id}/logo`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data.data;
    },
    uploadCover: async (id: number, file: File): Promise<CompanyResponse> => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await apiClient.post(`/companies/${id}/cover`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data.data;
    },
    deleteCompany: async (id: number): Promise<void> => {
        await apiClient.delete(`/companies/${id}`);
    }
};
