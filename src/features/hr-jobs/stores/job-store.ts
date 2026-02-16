import { create } from 'zustand';
import { Job, JobStatus, JobType, DEFAULT_JOB } from '../types/job';
import { MOCK_JOBS } from '../data/mock-jobs';

interface JobFilters {
    status: JobStatus | 'all';
    type: JobType | 'all';
    search: string;
    department: string | 'all';
}

interface JobStore {
    // State
    jobs: Job[];
    selectedJob: Job | null;
    isFormOpen: boolean;
    isPreviewOpen: boolean;
    isLoading: boolean;
    filters: JobFilters;

    // Actions
    setJobs: (jobs: Job[]) => void;
    addJob: (job: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateJob: (id: string, updates: Partial<Job>) => void;
    deleteJob: (id: string) => void;            // soft-delete → status = 'closed'
    permanentDeleteJob: (id: string) => void;   // hard-delete → removes from array
    restoreJob: (id: string) => void;           // restore → status = 'open'
    cloneJob: (id: string) => void;             // duplicate job as draft
    toggleJobStatus: (id: string) => void;      // open ↔ paused
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
    // Initial State
    jobs: MOCK_JOBS,
    selectedJob: null,
    isFormOpen: false,
    isPreviewOpen: false,
    isLoading: false,
    filters: DEFAULT_FILTERS,

    // Actions
    setJobs: (jobs) => set({ jobs }),

    addJob: (jobData) => {
        const newJob: Job = {
            ...DEFAULT_JOB,
            ...jobData,
            id: `job-${Date.now()}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        set((state) => ({ jobs: [newJob, ...state.jobs] }));
    },

    updateJob: (id, updates) => {
        set((state) => ({
            jobs: state.jobs.map((job) =>
                job.id === id
                    ? { ...job, ...updates, updatedAt: new Date().toISOString() }
                    : job
            ),
        }));
    },

    // Soft delete: change status to 'closed' (job stays in array)
    deleteJob: (id) => {
        set((state) => ({
            jobs: state.jobs.map((job) =>
                job.id === id
                    ? { ...job, status: 'closed' as JobStatus, updatedAt: new Date().toISOString() }
                    : job
            ),
            selectedJob: state.selectedJob?.id === id ? null : state.selectedJob,
        }));
    },

    // Hard delete: permanently remove from array
    permanentDeleteJob: (id) => {
        set((state) => ({
            jobs: state.jobs.filter((job) => job.id !== id),
            selectedJob: state.selectedJob?.id === id ? null : state.selectedJob,
        }));
    },

    // Restore: set closed → open
    restoreJob: (id) => {
        set((state) => ({
            jobs: state.jobs.map((job) =>
                job.id === id
                    ? { ...job, status: 'open' as JobStatus, updatedAt: new Date().toISOString() }
                    : job
            ),
        }));
    },

    // Clone: create a copy as draft
    cloneJob: (id) => {
        const { jobs } = get();
        const source = jobs.find((j) => j.id === id);
        if (!source) return;
        const cloned: Job = {
            ...source,
            id: `job-${Date.now()}`,
            title: `${source.title} (Bản sao)`,
            status: 'draft',
            applicantCount: 0,
            viewCount: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        set((state) => ({ jobs: [cloned, ...state.jobs] }));
    },

    // Toggle: open ↔ paused
    toggleJobStatus: (id) => {
        set((state) => ({
            jobs: state.jobs.map((job) => {
                if (job.id !== id) return job;
                let newStatus: JobStatus;
                if (job.status === 'open') {
                    newStatus = 'paused';
                } else if (job.status === 'paused') {
                    newStatus = 'open';
                } else {
                    // draft/closed → open
                    newStatus = 'open';
                }
                return { ...job, status: newStatus, updatedAt: new Date().toISOString() };
            }),
        }));
    },

    selectJob: (job) => set({ selectedJob: job }),
    setFormOpen: (open) => set({ isFormOpen: open }),
    setPreviewOpen: (open) => set({ isPreviewOpen: open }),
    setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
    resetFilters: () => set({ filters: DEFAULT_FILTERS }),

    // Computed: active jobs (not closed) filtered by current filters
    getFilteredJobs: () => {
        const { jobs, filters } = get();
        return jobs.filter((job) => {
            // When filter is 'all', exclude 'closed' jobs from main view
            if (filters.status === 'all' && job.status === 'closed') return false;
            if (filters.status !== 'all' && job.status !== filters.status) return false;
            if (filters.type !== 'all' && job.type !== filters.type) return false;
            if (filters.department !== 'all' && job.department !== filters.department) return false;
            if (filters.search) {
                const search = filters.search.toLowerCase();
                return (
                    job.title.toLowerCase().includes(search) ||
                    job.department.toLowerCase().includes(search) ||
                    job.description.toLowerCase().includes(search)
                );
            }
            return true;
        });
    },

    // Get only closed jobs (for the "Đã đóng" section)
    getClosedJobs: () => {
        const { jobs } = get();
        return jobs.filter((job) => job.status === 'closed');
    },

    getJobStats: () => {
        const { jobs } = get();
        const activeJobs = jobs.filter((j) => j.status !== 'closed');
        return {
            total: activeJobs.length,
            open: jobs.filter((j) => j.status === 'open').length,
            paused: jobs.filter((j) => j.status === 'paused').length,
            closed: jobs.filter((j) => j.status === 'closed').length,
            applicants: activeJobs.reduce((sum, j) => sum + j.applicantCount, 0),
            views: activeJobs.reduce((sum, j) => sum + j.viewCount, 0),
        };
    },
}));
