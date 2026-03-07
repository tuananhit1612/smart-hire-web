"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderKanban, Plus, Trash2, Link as LinkIcon, X } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { useConfirmDialog } from "@/shared/components/ui/confirm-dialog";
import { SortableList } from "@/shared/components/ui/sortable-list";
import { Project } from "../../types/types";

interface ProjectsSectionProps {
    data: Project[];
    onChange: (data: Project[]) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

// Skill suggestions for autocomplete
const TECH_SUGGESTIONS = [
    "React", "Next.js", "Vue.js", "Angular", "TypeScript", "JavaScript",
    "Node.js", "Express", "Python", "Django", "FastAPI", "Java", "Spring Boot",
    "C#", ".NET", "Go", "Rust", "PHP", "Laravel", "Ruby", "Rails",
    "PostgreSQL", "MySQL", "MongoDB", "Redis", "Firebase", "Supabase",
    "Docker", "Kubernetes", "AWS", "GCP", "Azure", "Vercel", "Netlify",
    "TailwindCSS", "SCSS", "Figma", "Git", "GraphQL", "REST API"
];

export function ProjectsSection({ data, onChange }: ProjectsSectionProps) {
    const { confirm, DialogComponent } = useConfirmDialog();

    const handleAdd = () => {
        const newItem: Project = {
            id: generateId(),
            name: "",
            description: "",
            technologies: [],
            link: "",
        };
        onChange([...data, newItem]);
    };

    const handleRemove = async (id: string) => {
        const confirmed = await confirm({
            title: "Xóa dự án",
            message: "Bạn có chắc muốn xóa dự án này? Hành động này không thể hoàn tác.",
            variant: "danger",
        });

        if (confirmed) {
            onChange(data.filter((item) => item.id !== id));
        }
    };

    const handleUpdate = (id: string, field: keyof Project, value: string | string[]) => {
        onChange(
            data.map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    const handleAddTech = (projectId: string, tech: string) => {
        const project = data.find((p) => p.id === projectId);
        if (!project || !tech.trim()) return;
        if (project.technologies.includes(tech.trim())) return; // Prevent duplicates
        handleUpdate(projectId, "technologies", [...project.technologies, tech.trim()]);
    };

    const handleRemoveTech = (projectId: string, techIndex: number) => {
        const project = data.find((p) => p.id === projectId);
        if (!project) return;
        handleUpdate(
            projectId,
            "technologies",
            project.technologies.filter((_, i) => i !== techIndex)
        );
    };

    const handleReorder = (newItems: Project[]) => {
        onChange(newItems);
    };

    return (
        <>
            {DialogComponent}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
            >
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-green-900 flex items-center gap-2 md:gap-3">
                            <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-r from-green-500 to-green-500 text-white flex-shrink-0 shadow-lg shadow-green-500/20">
                                <FolderKanban className="w-4 h-4 md:w-5 md:h-5" />
                            </div>
                            <span>Dự án</span>
                        </h2>
                        <p className="text-sm md:text-base text-gray-500 mt-2">
                            Showcase các dự án cá nhân hoặc nhóm mà bạn đã thực hiện
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<Plus className="w-4 h-4" />}
                        onClick={handleAdd}
                        className="w-fit flex-shrink-0"
                    >
                        Thêm
                    </Button>
                </div>

                {/* Project Items with Drag & Drop */}
                <div className="space-y-4">
                    {data.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-2xl p-8 text-center"
                        >
                            <FolderKanban className="w-12 h-12 mx-auto text-green-200 mb-3" />
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                Chưa có dự án nào
                            </p>
                            <Button
                                variant="ghost"
                                size="sm"
                                leftIcon={<Plus className="w-4 h-4" />}
                                onClick={handleAdd}
                                className="mt-3"
                            >
                                Thêm dự án
                            </Button>
                        </motion.div>
                    ) : (
                        <SortableList
                            items={data}
                            onReorder={handleReorder}
                            renderItem={(project, index, dragHandle) => (
                                <ProjectCard
                                    project={project}
                                    index={index}
                                    dragHandle={dragHandle}
                                    onUpdate={handleUpdate}
                                    onRemove={handleRemove}
                                    onAddTech={handleAddTech}
                                    onRemoveTech={handleRemoveTech}
                                />
                            )}
                        />
                    )}
                </div>
            </motion.div>
        </>
    );
}

// Separate component for project card to manage local state for tech input
function ProjectCard({
    project,
    index,
    dragHandle,
    onUpdate,
    onRemove,
    onAddTech,
    onRemoveTech,
}: {
    project: Project;
    index: number;
    dragHandle: React.ReactNode;
    onUpdate: (id: string, field: keyof Project, value: string | string[]) => void;
    onRemove: (id: string) => void;
    onAddTech: (projectId: string, tech: string) => void;
    onRemoveTech: (projectId: string, techIndex: number) => void;
}) {
    const [techInput, setTechInput] = React.useState("");
    const [showSuggestions, setShowSuggestions] = React.useState(false);

    // Filter suggestions based on input
    const filteredSuggestions = TECH_SUGGESTIONS.filter(
        (tech) =>
            tech.toLowerCase().includes(techInput.toLowerCase()) &&
            !project.technologies.includes(tech)
    ).slice(0, 6);

    const handleTechKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            onAddTech(project.id, techInput);
            setTechInput("");
            setShowSuggestions(false);
        }
    };

    const handleSelectSuggestion = (tech: string) => {
        onAddTech(project.id, tech);
        setTechInput("");
        setShowSuggestions(false);
    };

    return (
        <div className="relative bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 rounded-2xl p-4 md:p-6 hover:shadow-lg transition-shadow group">
            {/* Drag Handle */}
            <div className="absolute left-2 top-1/2 -translate-y-1/2 hidden md:block">
                {dragHandle}
            </div>

            {/* Delete Button */}
            <button
                onClick={() => onRemove(project.id)}
                className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100"
            >
                <Trash2 className="w-4 h-4" />
            </button>

            {/* Item Number Badge */}
            <div className="absolute -left-3 top-6 flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-green-500 text-white text-xs font-bold shadow-lg hidden md:flex">
                {index + 1}
            </div>

            <div className="space-y-4 md:pl-8">
                {/* Mobile Drag Handle & Number */}
                <div className="flex items-center gap-2 md:hidden">
                    {dragHandle}
                    <span className="text-xs font-semibold text-green-600">
                        #{index + 1}
                    </span>
                </div>

                {/* Project Name */}
                <Input
                    label="Tên dự án *"
                    placeholder="SmartHire - AI Recruitment Platform"
                    value={project.name}
                    onChange={(e) => onUpdate(project.id, "name", e.target.value)}
                />

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Mô tả
                    </label>
                    <textarea
                        value={project.description}
                        onChange={(e) => onUpdate(project.id, "description", e.target.value)}
                        placeholder="Mô tả ngắn gọn về dự án, mục tiêu và vai trò của bạn..."
                        rows={3}
                        className="w-full rounded-xl border border-gray-200 dark:border-zinc-700 bg-transparent px-4 py-3 text-sm dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none hover:border-green-200 dark:hover:border-green-500/50"
                    />
                </div>

                {/* Technologies with Autocomplete */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Công nghệ sử dụng
                    </label>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        <AnimatePresence mode="popLayout">
                            {project.technologies.map((tech, techIndex) => (
                                <motion.span
                                    key={tech}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-500/20 text-green-700 dark:text-green-400"
                                >
                                    {tech}
                                    <button
                                        onClick={() => onRemoveTech(project.id, techIndex)}
                                        className="ml-1 hover:text-red-500 transition-colors"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </motion.span>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Input with suggestions */}
                    <div className="relative">
                        <Input
                            placeholder="Nhập công nghệ và nhấn Enter"
                            value={techInput}
                            onChange={(e) => {
                                setTechInput(e.target.value);
                                setShowSuggestions(e.target.value.length > 0);
                            }}
                            onKeyPress={handleTechKeyPress}
                            onFocus={() => techInput && setShowSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                        />

                        {/* Suggestions dropdown */}
                        {showSuggestions && filteredSuggestions.length > 0 && (
                            <div className="absolute z-20 mt-1 w-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-lg shadow-green-500/5 overflow-hidden">
                                {filteredSuggestions.map((tech) => (
                                    <button
                                        key={tech}
                                        type="button"
                                        onClick={() => handleSelectSuggestion(tech)}
                                        className="w-full px-4 py-2 text-left text-sm hover:bg-green-50 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 transition-colors"
                                    >
                                        {tech}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Link */}
                <div className="relative">
                    <div className="absolute left-3 top-[42px] text-gray-400 pointer-events-none z-10">
                        <LinkIcon className="w-4 h-4" />
                    </div>
                    <Input
                        label="Link dự án (tùy chọn)"
                        placeholder="https://github.com/username/project"
                        value={project.link || ""}
                        onChange={(e) => onUpdate(project.id, "link", e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>
        </div>
    );
}
