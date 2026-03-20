import { api } from '@/core/api/client';
import { CVFile } from '../types/cv-file-types';
import { CVData } from '../types/types';

export const cvApi = {
    // --- CV Files Management ---
    getCVFiles: () => api.get<CVFile[]>('/api/v1/cvs'),
    getCVFile: (id: string) => api.get<CVFile>(`/api/v1/cvs/${id}`),
    deleteCVFile: (id: string) => api.delete<void>(`/api/v1/cvs/${id}`),
    renameCVFile: (id: string, name: string) => api.patch<CVFile>(`/api/v1/cvs/${id}/rename`, { name }),
    archiveCVFile: (id: string) => api.patch<CVFile>(`/api/v1/cvs/${id}/archive`),
    setDefaultCV: (id: string) => api.patch<CVFile>(`/api/v1/cvs/${id}/default`),

    // --- CV Builder / Editor Data ---
    getCVData: (id: string) => api.get<CVData>(`/api/v1/cvs/${id}/data`),
    createCV: (data: CVData) => api.post<CVData>('/api/v1/cvs', data),
    updateCV: (id: string, data: CVData) => api.put<CVData>(`/api/v1/cvs/${id}`, data),
};
