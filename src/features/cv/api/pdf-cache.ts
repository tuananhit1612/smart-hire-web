export interface CachedCVPayload {
  cvData: any;
  design?: any;
  templateId: string;
}

// Ensure the cache persists across HMR (Hot Module Replacement) in development
const globalForCache = global as unknown as {
  pdfCacheMap: Map<string, CachedCVPayload>;
};

if (!globalForCache.pdfCacheMap) {
  globalForCache.pdfCacheMap = new Map();
}

export const pdfCache = {
  set: (id: string, payload: CachedCVPayload) => {
    globalForCache.pdfCacheMap.set(id, payload);
    
    // Auto clear cache after 15 seconds to prevent memory leaks
    setTimeout(() => {
      globalForCache.pdfCacheMap.delete(id);
    }, 15000);
  },
  
  get: (id: string): CachedCVPayload | undefined => {
    return globalForCache.pdfCacheMap.get(id);
  },
  
  delete: (id: string) => {
    globalForCache.pdfCacheMap.delete(id);
  }
};
