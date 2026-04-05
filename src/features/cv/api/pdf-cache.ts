import fs from "fs";
import path from "path";

export interface CachedCVPayload {
  cvData: any;
  design?: any;
  templateId: string;
}

const getCacheFile = (id: string) => {
  const tmpDir = path.join(process.cwd(), ".next", "cache", "pdf-renders");
  if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
  }
  return path.join(tmpDir, `${id}.json`);
};

export const pdfCache = {
  set: (id: string, payload: CachedCVPayload) => {
    try {
        const file = getCacheFile(id);
        fs.writeFileSync(file, JSON.stringify(payload), "utf8");
    } catch (e) {
        console.error("Cache Write Error", e);
    }
  },
  
  get: (id: string): CachedCVPayload | undefined => {
    try {
        const file = getCacheFile(id);
        if (fs.existsSync(file)) {
            const data = fs.readFileSync(file, "utf8");
            return JSON.parse(data);
        }
    } catch (e) {
        console.error("Cache Read Error", e);
    }
    return undefined;
  },
  
  delete: (id: string) => {
    try {
        const file = getCacheFile(id);
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }
    } catch (e) {
        console.error("Cache Delete Error", e);
    }
  }
};
