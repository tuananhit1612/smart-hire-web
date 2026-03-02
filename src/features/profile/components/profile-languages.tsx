import { Language } from "../types/profile";
import { Languages } from "lucide-react";

interface ProfileLanguagesProps {
  languages: Language[];
}

export function ProfileLanguages({ languages }: ProfileLanguagesProps) {
  if (!languages || languages.length === 0) return null;

  return (
    <div className="bg-white dark:bg-[#1C252E] rounded-[24px] p-6 sm:p-8 shadow-[0_8px_32px_rgba(145,158,171,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.24)] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.04] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(99,102,241,0.12)] group">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
          <Languages className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-extrabold text-[#1C252E] dark:text-white">Ngôn ngữ</h2>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {languages.map((lang) => (
          <div
            key={lang.id}
            className="flex items-center justify-between p-4 rounded-xl bg-[#F4F6F8]/80 dark:bg-[#212B36]/80 border border-[rgba(145,158,171,0.12)] dark:border-white/10 hover:border-indigo-500/30 hover:bg-white dark:hover:bg-[#1C252E] transition-all shadow-sm"
          >
            <span className="font-bold text-[15px] text-[#1C252E] dark:text-white">{lang.language}</span>
            <span className="text-[12px] px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-500 font-bold tracking-wide uppercase">
              {lang.proficiency}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

