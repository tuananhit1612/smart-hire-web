"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, FolderGit2, Link as LinkIcon, Calendar } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Project } from "../types/profile";

interface ProfileEditProjectsFormProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

const EMPTY_PROJECT: Omit<Project, "id" | "technologies"> = {
  projectName: "",
  startDate: "",
  endDate: "",
  description: "",
  link: "",
};

export function ProfileEditProjectsForm({
  projects,
  onChange,
}: ProfileEditProjectsFormProps) {

  const addProject = () => {
    const newProject: Project = {
      ...EMPTY_PROJECT,
      id: `proj-${Date.now()}`,
      technologies: [],
    };
    onChange([...projects, newProject]);
  };

  const removeProject = (id: string) => {
    onChange(projects.filter((p) => p.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    onChange(
      projects.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const addTechnology = (id: string, tech: string) => {
    if (!tech.trim()) return;
    const project = projects.find(p => p.id === id);
    if (project && !project.technologies.includes(tech)) {
      updateProject(id, "technologies", [...project.technologies, tech]);
    }
  };

  const removeTechnology = (id: string, tech: string) => {
    const project = projects.find(p => p.id === id);
    if (project) {
      updateProject(id, "technologies", project.technologies.filter(t => t !== tech));
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in zoom-in-95 duration-500">
      <AnimatePresence mode="popLayout">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            layout
            className="p-4 rounded-xl bg-muted/30 border border-border/50 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <FolderGit2 className="h-4 w-4" />
                Dự án {index + 1}
              </div>
              <button
                onClick={() => removeProject(project.id)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Tên dự án"
                placeholder="VD: SmartHire AI"
                value={project.projectName}
                onChange={(e) => updateProject(project.id, "projectName", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Ngày bắt đầu"
                placeholder="YYYY-MM"
                value={project.startDate}
                onChange={(e) => updateProject(project.id, "startDate", e.target.value)}
                startIcon={<Calendar className="h-4 w-4" />}
              />
              <Input
                label="Ngày kết thúc"
                placeholder="YYYY-MM hoặc Hiện tại"
                value={project.endDate || ""}
                onChange={(e) => updateProject(project.id, "endDate", e.target.value)}
                startIcon={<Calendar className="h-4 w-4" />}
              />
              <Input
                label="Liên kết dự án"
                placeholder="https://..."
                value={project.link || ""}
                onChange={(e) => updateProject(project.id, "link", e.target.value)}
                startIcon={<LinkIcon className="h-4 w-4" />}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Công nghệ</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {project.technologies.map(tech => (
                  <span key={tech} className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs flex items-center gap-1">
                    {tech}
                    <button onClick={() => removeTechnology(project.id, tech)} className="hover:text-red-500"><Trash2 className="h-3 w-3" /></button>
                  </span>
                ))}
              </div>
              <Input
                placeholder="Thêm công nghệ (Enter để thêm)"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTechnology(project.id, e.currentTarget.value);
                    e.currentTarget.value = "";
                  }
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Mô tả</label>
              <textarea
                className="w-full min-h-[100px] p-3 rounded-xl bg-card border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Mô tả dự án và đóng góp của bạn..."
                value={project.description}
                onChange={(e) => updateProject(project.id, "description", e.target.value)}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {projects.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <FolderGit2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>Chưa có dự án nào</p>
          <Button variant="ghost" onClick={addProject} className="text-primary hover:text-primary/80">Thêm dự án đầu tiên</Button>
        </div>
      )}

      {projects.length > 0 && (
        <Button variant="outline" onClick={addProject} className="w-full border-dashed">
          <Plus className="h-4 w-4 mr-2" /> Thêm dự án
        </Button>
      )}
    </div>
  );
}
