import { Project } from "../types/profile";
import { FolderGit2, Link as LinkIcon, Calendar } from "lucide-react";

interface ProfileProjectsProps {
  projects: Project[];
}

export function ProfileProjects({ projects }: ProfileProjectsProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <div className="glass-card p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
          <FolderGit2 className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          Dự án cá nhân
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="group relative p-5 rounded-2xl bg-muted/20 border border-border/50 hover:bg-muted/40 transition-all hover:shadow-lg hover:-translate-y-1"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                 <div>
                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground">{project.role}</p>
                 </div>
                 {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-background border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                    >
                        <LinkIcon className="h-4 w-4" />
                    </a>
                 )}
              </div>

              <div className="text-xs text-muted-foreground flex items-center gap-2">
                <Calendar className="h-3 w-3" />
                <span>{project.startDate} — {project.endDate || "Present"}</span>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {project.technologies.map(tech => (
                  <span key={tech} className="text-xs px-2 py-1 rounded-md bg-background border border-border text-muted-foreground">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
