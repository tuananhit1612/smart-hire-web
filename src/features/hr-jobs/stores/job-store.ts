import { create } from 'zustand';
import { Job, JobStatus, JobType, DEFAULT_JOB } from '../types/job';
import { hrJobApi } from '../api/hr-job-api';
import { mapHrJobToFeJob, mapFeJobToCreateRequest, mapFeJobToUpdateRequest } from '../utils/hr-job-mapper';

import { useCompanyStore } from '../../hr-company/stores/company-store';

// We now fetch active company directly from companyStore inside the actions


interface JobFilters {
    status: JobStatus | 'all';
    type: JobType | 'all';
    search: string;
    department: string | 'all';
}

interface JobStore {
    jobs: Job[];
    selectedJob: Job | null;
    isFormOpen: boolean;
    isPreviewOpen: boolean;
    isLoading: boolean;
    error: string | null;
    filters: JobFilters;

    // Async Actions
    fetchMyJobs: () => Promise<void>;
    addJob: (job: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    updateJob: (id: string, updates: Partial<Job>) => Promise<void>;
    deleteJob: (id: string) => Promise<void>;
    permanentDeleteJob: (id: string) => Promise<void>;
    restoreJob: (id: string) => Promise<void>;
    toggleJobStatus: (id: string) => Promise<void>;

    // Sync Actions
    cloneJob: (id: string) => void;
    selectJob: (job: Job | null) => void;
    setFormOpen: (open: boolean) => void;
    setPreviewOpen: (open: boolean) => void;
    setFilters: (filters: Partial<JobFilters>) => void;
    resetFilters: () => void;

    // Computed
    getFilteredJobs: () => Job[];
    getClosedJobs: () => Job[];
    getJobStats: () => { total: number; open: number; paused: number; closed: number; applicants: number; views: number };
}

const DEFAULT_FILTERS: JobFilters = {
    status: 'all',
    type: 'all',
    search: '',
    department: 'all',
};

export const useJobStore = create<JobStore>((set, get) => ({
    jobs: [],
    selectedJob: null,
    isFormOpen: false,
    isPreviewOpen: false,
    isLoading: false,
    error: null,
    filters: DEFAULT_FILTERS,

    fetchMyJobs: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await hrJobApi.getMyJobs();
            set({ jobs: data.map(mapHrJobToFeJob) });
        } catch (error: any) {
            set({ error: error.message || 'Lỗi khi tải danh sách công việc' });
        } finally {
            set({ isLoading: false });
        }
    },

    addJob: async (jobData) => {
        set({ isLoading: true, error: null });
        try {
            const companyIdStr = useCompanyStore.getState().company.id;
            const companyId = companyIdStr ? Number(companyIdStr) : 0;
            if (!companyId) {
                throw new Error("Không tìm thấy thông tin công ty. Vui lòng cập nhật Hồ sơ công ty trước khi tạo tin.");
            }

            const req = mapFeJobToCreateRequest(jobData, companyId);
            const data = await hrJobApi.createJob(req);
            const newJob = mapHrJobToFeJob(data);
            set((state) => ({ jobs: [newJob, ...state.jobs], isFormOpen: false }));
        } catch (error: any) {
            set({ error: error.message || 'Lỗi khi tạo công việc' });
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    updateJob: async (id, updates) => {
        set({ isLoading: true, error: null });
        try {
            // Because skills might be partially updated, it's problematic if we only send the ones added.
            // Best practice: Frontend sends all skills for update or we map carefully.
            const req = mapFeJobToUpdateRequest(updates);
            // We also need to send full skills if updates contain mustHaveSkills or niceToHaveSkills.
            const data = await hrJobApi.updateJob(Number(id), req);
            const updatedJob = mapHrJobToFeJob(data);
            set((state) => ({
                jobs: state.jobs.map((job) => (job.id === id ? updatedJob : job)),
                isFormOpen: false,
                selectedJob: state.selectedJob?.id === id ? updatedJob : state.selectedJob
            }));
        } catch (error: any) {
            set({ error: error.message || 'Lỗi khi cập nhật công việc' });
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    // Soft delete -> Close job API
    deleteJob: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const data = await hrJobApi.changeJobStatus(Number(id), 'CLOSED');
            const updatedJob = mapHrJobToFeJob(data);
            set((state) => ({
                jobs: state.jobs.map((job) => (job.id === id ? updatedJob : job)),
            }));
        } catch (error: any) {
            set({ error: error.message || 'Lỗi khi đóng công việc' });
        } finally {
            set({ isLoading: false });
        }
    },

    // Permanent delete -> Call DELETE API
    permanentDeleteJob: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await hrJobApi.deleteJob(Number(id));
            set((state) => ({
                jobs: state.jobs.filter((job) => job.id !== id),
                selectedJob: state.selectedJob?.id === id ? null : state.selectedJob,
            }));
        } catch (error: any) {
            set({ error: error.message || 'Lỗi khi xóa công việc' });
        } finally {
            set({ isLoading: false });
        }
    },

    // Restore -> Open job API
    restoreJob: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const data = await hrJobApi.changeJobStatus(Number(id), 'OPEN');
            const updatedJob = mapHrJobToFeJob(data);
            set((state) => ({
                jobs: state.jobs.map((job) => (job.id === id ? updatedJob : job)),
            }));
        } catch (error: any) {
            set({ error: error.message || 'Lỗi khi khôi phục công việc' });
        } finally {
            set({ isLoading: false });
        }
    },

    toggleJobStatus: async (id) => {
        const job = get().jobs.find((j) => j.id === id);
        if (!job) return;
        set({ isLoading: true, error: null });
        try {
            const newStatus = job.status === 'OPEN' ? 'DRAFT' : 'OPEN';
            const data = await hrJobApi.changeJobStatus(Number(id), newStatus);
            const updatedJob = mapHrJobToFeJob(data);
            set((state) => ({
                jobs: state.jobs.map((j) => (j.id === id ? updatedJob : j)),
            }));
        } catch (error: any) {
            set({ error: error.message || 'Lỗi khi chuyển trạng thái' });
        } finally {
            set({ isLoading: false });
        }
    },

    // Clone as draft locally before saving (or we can save it directly)
    cloneJob: (id) => {
        const { jobs } = get();
        const source = jobs.find((j) => j.id === id);
        if (!source) return;
        const cloned: Job = {
            ...source,
            id: `new-clone-${Date.now()}`,
            title: `${source.title} (Bản sao)`,
            status: 'DRAFT',
            applicantCount: 0,
            viewCount: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        // Just set form open with cloned data (we could handle this in UI, but placing in store for now)
        set({ selectedJob: cloned, isFormOpen: true });
    },

    selectJob: (job) => set({ selectedJob: job }),
    setFormOpen: (open) => set({ isFormOpen: open }),
    setPreviewOpen: (open) => set({ isPreviewOpen: open }),
    setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
    resetFilters: () => set({ filters: DEFAULT_FILTERS }),

    getFilteredJobs: () => {
        const { jobs, filters } = get();
        return jobs.filter((job) => {
            if (filters.status === 'all' && job.status === 'CLOSED') return false;
            if (filters.status !== 'all' && job.status !== filters.status) return false;
            if (filters.type !== 'all' && job.type !== filters.type) return false;
            // if (filters.department !== 'all' && job.department !== filters.department) return false;
            if (filters.search) {
                const search = filters.search.toLowerCase();
                return (
                    job.title.toLowerCase().includes(search) ||
                    // job.department.toLowerCase().includes(search) ||
                    job.description.toLowerCase().includes(search)
                );
            }
            return true;
        });
    },

    getClosedJobs: () => {
        const { jobs } = get();
        return jobs.filter((job) => job.status === 'CLOSED');
    },

    getJobStats: () => {
        const { jobs } = get();
        const activeJobs = jobs.filter((j) => j.status !== 'CLOSED');
        return {
            total: activeJobs.length,
            open: jobs.filter((j) => j.status === 'OPEN').length,
            paused: 0, // removed paused
            closed: jobs.filter((j) => j.status === 'CLOSED').length,
            applicants: activeJobs.reduce((sum, j) => sum + j.applicantCount, 0),
            views: activeJobs.reduce((sum, j) => sum + j.viewCount, 0),
        };
    },
}));
