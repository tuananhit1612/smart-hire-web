import { Project } from "../types/profile";
import { FolderGit2, Link as LinkIcon } from "lucide-react";

interface ProfileProjectsProps {
  projects: Project[];
}

export function ProfileProjects({ projects }: ProfileProjectsProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <div className="bg-white dark:bg-[#1C252E] rounded-[24px] p-6 sm:p-8 shadow-[0_8px_32px_rgba(145,158,171,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.24)] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.04] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(168,85,247,0.12)] group">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
          <FolderGit2 className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-extrabold text-[#1C252E] dark:text-white">Dự án cá nhân</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group/card relative p-6 rounded-2xl bg-[#F4F6F8]/80 dark:bg-[#212B36]/80 border border-[rgba(145,158,171,0.2)] dark:border-white/10 hover:border-purple-500/40 hover:bg-white dark:hover:bg-[#1C252E] hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-between items-start gap-4 mb-3">
              <div>
                <h3 className="font-bold text-lg text-[#1C252E] dark:text-white group-hover/card:text-purple-500 transition-colors line-clamp-1">
                  {project.name}
                </h3>
                <p className="text-[14px] font-bold text-[#637381] dark:text-[#919EAB] mt-1">{project.role}</p>
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.2)] dark:border-white/10 text-[#637381] dark:text-[#919EAB] hover:text-purple-500 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all shadow-sm"
                >
                  <LinkIcon className="w-4 h-4" />
                </a>
              )}
            </div>

            <div className="text-[12px] font-semibold tracking-wide uppercase text-[#919EAB] dark:text-[#637381] mb-3">
              {project.startDate} — {project.endDate || "Hiện tại"}
            </div>

            <p className="text-[15px] text-[#637381] dark:text-[#919EAB] leading-relaxed line-clamp-3 mb-4">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {project.technologies.map(tech => (
                <span key={tech} className="text-[12px] font-bold px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#1C252E] shadow-sm text-[#1C252E] dark:text-[#DFE3E8]">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


