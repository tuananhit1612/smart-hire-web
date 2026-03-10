"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Plus, X, Code, Users, ChevronDown, Check } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { useConfirmDialog } from "@/shared/components/ui/confirm-dialog";
import { Skill } from "../../types/types";
import { cn } from "@/lib/utils";

interface SkillsSectionProps {
    data: Skill[];
    onChange: (data: Skill[]) => void;
}

const SKILL_LEVELS: { value: Skill["level"]; label: string; color: string; bgColor: string }[] = [
    { value: "beginner", label: "Cơ bản", color: "bg-gray-400", bgColor: "bg-gray-100" },
    { value: "intermediate", label: "Trung bình", color: "bg-green-500", bgColor: "bg-green-50" },
    { value: "advanced", label: "Nâng cao", color: "bg-green-500", bgColor: "bg-green-50" },
    { value: "expert", label: "Chuyên gia", color: "bg-teal-500", bgColor: "bg-teal-50" },
];

// Technical skill suggestions
const TECHNICAL_SUGGESTIONS = [
    "React", "Next.js", "Vue.js", "Angular", "TypeScript", "JavaScript",
    "Node.js", "Python", "Java", "C#", "Go", "Rust", "PHP",
    "PostgreSQL", "MongoDB", "Redis", "Docker", "Kubernetes", "AWS",
    "Git", "Figma", "UI/UX Design", "Machine Learning", "Data Analysis"
];

// Soft skill suggestions
const SOFT_SUGGESTIONS = [
    "Giao tiếp", "Làm việc nhóm", "Quản lý thời gian", "Giải quyết vấn đề",
    "Tư duy phản biện", "Sáng tạo", "Lãnh đạo", "Thích nghi",
    "Đàm phán", "Thuyết trình", "Quản lý dự án", "Agile/Scrum"
];

const generateId = () => Math.random().toString(36).substr(2, 9);

// Custom Level Dropdown Component
function LevelDropdown({
    value,
    onChange,
}: {
    value: Skill["level"];
    onChange: (level: Skill["level"]) => void;
}) {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const currentLevel = SKILL_LEVELS.find(l => l.value === value) || SKILL_LEVELS[1];

    // Close on click outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center gap-2 h-9 px-3 rounded-xl border border-gray-200 dark:border-zinc-700",
                    "bg-white text-sm font-medium",
                    "hover:border-green-400",
                    "focus:outline-none focus:ring-2 focus:ring-green-500",
                    "transition-all duration-200 flex-1"
                )}
            >
                <span className={cn("w-2.5 h-2.5 rounded-full", currentLevel.color)} />
                <span className="text-gray-700 flex-1 text-left">
                    {currentLevel.label}
                </span>
                <ChevronDown className={cn(
                    "w-4 h-4 text-gray-400 transition-transform duration-200",
                    isOpen && "rotate-180"
                )} />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-30 mt-1 w-full min-w-[140px] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
                    >
                        {SKILL_LEVELS.map((level) => (
                            <button
                                key={level.value}
                                type="button"
                                onClick={() => {
                                    onChange(level.value);
                                    setIsOpen(false);
                                }}
                                className={cn(
                                    "w-full flex items-center gap-2 px-3 py-2.5 text-sm transition-colors",
                                    "hover:bg-gray-50 dark:hover:bg-zinc-700/50",
                                    value === level.value && level.bgColor
                                )}
                            >
                                <span className={cn("w-2.5 h-2.5 rounded-full", level.color)} />
                                <span className="flex-1 text-left text-gray-700 dark:text-gray-200">
                                    {level.label}
                                </span>
                                {value === level.value && (
                                    <Check className="w-4 h-4 text-green-500" />
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function SkillsSection({ data, onChange }: SkillsSectionProps) {
    const [newTechnicalSkill, setNewTechnicalSkill] = React.useState("");
    const [newSoftSkill, setNewSoftSkill] = React.useState("");
    const [selectedTechnicalLevel, setSelectedTechnicalLevel] = React.useState<Skill["level"]>("intermediate");
    const [selectedSoftLevel, setSelectedSoftLevel] = React.useState<Skill["level"]>("intermediate");
    const [showTechnicalSuggestions, setShowTechnicalSuggestions] = React.useState(false);
    const [showSoftSuggestions, setShowSoftSuggestions] = React.useState(false);
    const { confirm, DialogComponent } = useConfirmDialog();

    // Filter skills by category
    const technicalSkills = data.filter(s => s.category === "technical");
    const softSkills = data.filter(s => s.category === "soft");

    // Filter suggestions
    const filteredTechnicalSuggestions = TECHNICAL_SUGGESTIONS.filter(
        (skill) =>
            skill.toLowerCase().includes(newTechnicalSkill.toLowerCase()) &&
            !data.some((s) => s.name.toLowerCase() === skill.toLowerCase())
    ).slice(0, 5);

    const filteredSoftSuggestions = SOFT_SUGGESTIONS.filter(
        (skill) =>
            skill.toLowerCase().includes(newSoftSkill.toLowerCase()) &&
            !data.some((s) => s.name.toLowerCase() === skill.toLowerCase())
    ).slice(0, 5);

    const handleAddTechnical = () => {
        if (!newTechnicalSkill.trim()) return;
        if (data.some((s) => s.name.toLowerCase() === newTechnicalSkill.toLowerCase())) return;

        const newItem: Skill = {
            id: generateId(),
            name: newTechnicalSkill.trim(),
            level: selectedTechnicalLevel,
            category: "technical",
        };
        onChange([...data, newItem]);
        setNewTechnicalSkill("");
        setShowTechnicalSuggestions(false);
    };

    const handleAddSoft = () => {
        if (!newSoftSkill.trim()) return;
        if (data.some((s) => s.name.toLowerCase() === newSoftSkill.toLowerCase())) return;

        const newItem: Skill = {
            id: generateId(),
            name: newSoftSkill.trim(),
            level: selectedSoftLevel,
            category: "soft",
        };
        onChange([...data, newItem]);
        setNewSoftSkill("");
        setShowSoftSuggestions(false);
    };

    const handleRemove = async (id: string) => {
        const skill = data.find((s) => s.id === id);
        const confirmed = await confirm({
            title: "Xóa kỹ năng",
            message: `Bạn có chắc muốn xóa kỹ năng "${skill?.name}"?`,
            variant: "warning",
        });

        if (confirmed) {
            onChange(data.filter((item) => item.id !== id));
        }
    };

    const handleUpdateLevel = (id: string, level: Skill["level"]) => {
        onChange(
            data.map((item) =>
                item.id === id ? { ...item, level } : item
            )
        );
    };

    const handleSelectTechnicalSuggestion = (skill: string) => {
        const newItem: Skill = {
            id: generateId(),
            name: skill,
            level: selectedTechnicalLevel,
            category: "technical",
        };
        onChange([...data, newItem]);
        setNewTechnicalSkill("");
        setShowTechnicalSuggestions(false);
    };

    const handleSelectSoftSuggestion = (skill: string) => {
        const newItem: Skill = {
            id: generateId(),
            name: skill,
            level: selectedSoftLevel,
            category: "soft",
        };
        onChange([...data, newItem]);
        setNewSoftSkill("");
        setShowSoftSuggestions(false);
    };

    const getLevelIndex = (level: Skill["level"]) => {
        return SKILL_LEVELS.findIndex((l) => l.value === level);
    };

    const getLevelInfo = (level: Skill["level"]) => {
        return SKILL_LEVELS.find((l) => l.value === level) || SKILL_LEVELS[1];
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
                <div>
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-green-900 flex items-center gap-2 md:gap-3">
                        <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-r from-green-500 to-green-500 text-white flex-shrink-0 shadow-lg shadow-green-500/20">
                            <Zap className="w-4 h-4 md:w-5 md:h-5" />
                        </div>
                        <span>Kỹ năng</span>
                    </h2>
                    <p className="text-sm md:text-base text-gray-500 mt-2">
                        Liệt kê kỹ năng chuyên môn và kỹ năng mềm của bạn
                    </p>
                </div>

                {/* Two Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Technical Skills */}
                    <SkillColumn
                        title="Kỹ năng chuyên môn"
                        icon={Code}
                        iconColor="bg-green-500"
                        skills={technicalSkills}
                        inputValue={newTechnicalSkill}
                        onInputChange={setNewTechnicalSkill}
                        onAdd={handleAddTechnical}
                        selectedLevel={selectedTechnicalLevel}
                        onLevelChange={setSelectedTechnicalLevel}
                        showSuggestions={showTechnicalSuggestions}
                        setShowSuggestions={setShowTechnicalSuggestions}
                        suggestions={filteredTechnicalSuggestions}
                        onSelectSuggestion={handleSelectTechnicalSuggestion}
                        placeholder="VD: React, Python..."
                        onUpdateLevel={handleUpdateLevel}
                        onRemove={handleRemove}
                    />

                    {/* Soft Skills */}
                    <SkillColumn
                        title="Kỹ năng mềm"
                        icon={Users}
                        iconColor="bg-green-500"
                        skills={softSkills}
                        inputValue={newSoftSkill}
                        onInputChange={setNewSoftSkill}
                        onAdd={handleAddSoft}
                        selectedLevel={selectedSoftLevel}
                        onLevelChange={setSelectedSoftLevel}
                        showSuggestions={showSoftSuggestions}
                        setShowSuggestions={setShowSoftSuggestions}
                        suggestions={filteredSoftSuggestions}
                        onSelectSuggestion={handleSelectSoftSuggestion}
                        placeholder="VD: Giao tiếp, Làm việc nhóm..."
                        onUpdateLevel={handleUpdateLevel}
                        onRemove={handleRemove}
                    />
                </div>

                {/* Total Count */}
                {data.length > 0 && (
                    <div className="text-center pt-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Tổng cộng: {data.length} kỹ năng ({technicalSkills.length} chuyên môn, {softSkills.length} kỹ năng mềm)
                        </span>
                    </div>
                )}
            </motion.div>
        </>
    );
}

// Extracted Skill Card Component
function SkillCard({ 
    skill, 
    onUpdateLevel, 
    onRemove 
}: { 
    skill: Skill;
    onUpdateLevel: (id: string, level: Skill["level"]) => void;
    onRemove: (id: string) => void;
}) {
    const getLevelIndex = (level: Skill["level"]) => {
        return SKILL_LEVELS.findIndex((l) => l.value === level);
    };

    const getLevelInfo = (level: Skill["level"]) => {
        return SKILL_LEVELS.find((l) => l.value === level) || SKILL_LEVELS[1];
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center gap-3 p-3 bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 rounded-xl hover:shadow-md transition-all group"
        >
            {/* Skill Name */}
            <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 dark:text-white truncate text-sm">
                    {skill.name}
                </h4>
            </div>

            {/* Level Selector - Pills */}
            <div className="flex items-center gap-0.5">
                {SKILL_LEVELS.map((level, levelIdx) => (
                    <button
                        key={level.value}
                        type="button"
                        onClick={() => onUpdateLevel(skill.id, level.value)}
                        className={cn(
                            "w-5 h-5 rounded-full transition-all duration-200",
                            levelIdx <= getLevelIndex(skill.level)
                                ? getLevelInfo(skill.level).color
                                : "bg-gray-200 dark:bg-gray-700",
                            "hover:scale-110"
                        )}
                        title={level.label}
                    />
                ))}
            </div>

            {/* Delete Button */}
            <button
                onClick={() => onRemove(skill.id)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors opacity-0 group-hover:opacity-100"
            >
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    );
}

// Extracted Skill Column Component
function SkillColumn({
    title,
    icon: Icon,
    iconColor,
    skills,
    inputValue,
    onInputChange,
    onAdd,
    selectedLevel,
    onLevelChange,
    showSuggestions,
    setShowSuggestions,
    suggestions,
    onSelectSuggestion,
    placeholder,
    onUpdateLevel,
    onRemove
}: {
    title: string;
    icon: React.ElementType;
    iconColor: string;
    skills: Skill[];
    inputValue: string;
    onInputChange: (value: string) => void;
    onAdd: () => void;
    selectedLevel: Skill["level"];
    onLevelChange: (level: Skill["level"]) => void;
    showSuggestions: boolean;
    setShowSuggestions: (show: boolean) => void;
    suggestions: string[];
    onSelectSuggestion: (skill: string) => void;
    placeholder: string;
    onUpdateLevel: (id: string, level: Skill["level"]) => void;
    onRemove: (id: string) => void;
}) {
    return (
        <div className="flex-1 min-w-0">
            {/* Column Header */}
            <div className="flex items-center gap-2 mb-4">
                <div className={cn("p-2 rounded-lg", iconColor)}>
                    <Icon className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                    {title}
                </h3>
                <span className="ml-auto text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                    {skills.length}
                </span>
            </div>

            {/* Add Input */}
            <div className="space-y-2 mb-4">
                <div className="relative">
                    <Input
                        placeholder={placeholder}
                        value={inputValue}
                        onChange={(e) => {
                            onInputChange(e.target.value);
                            setShowSuggestions(e.target.value.length > 0);
                        }}
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), onAdd())}
                        onFocus={() => inputValue && setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                        className="text-sm"
                    />

                    {/* Suggestions */}
                    {showSuggestions && suggestions.length > 0 && (
                        <div className="absolute z-20 mt-1 w-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-lg overflow-hidden">
                            {suggestions.map((skill) => (
                                <button
                                    key={skill}
                                    type="button"
                                    onClick={() => onSelectSuggestion(skill)}
                                    className="w-full px-3 py-2 text-left text-sm hover:bg-green-50 text-gray-700"
                                >
                                    {skill}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex gap-2">
                    <LevelDropdown
                        value={selectedLevel}
                        onChange={onLevelChange}
                    />
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={onAdd}
                        disabled={!inputValue.trim()}
                    >
                        <Plus className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Skills List */}
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                <AnimatePresence mode="popLayout">
                    {skills.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-xl p-6 text-center"
                        >
                            <p className="text-gray-400 dark:text-gray-500 text-sm">
                                Chưa có kỹ năng nào
                            </p>
                        </motion.div>
                    ) : (
                        skills.map((skill) => (
                            <SkillCard 
                                key={skill.id} 
                                skill={skill} 
                                onUpdateLevel={onUpdateLevel}
                                onRemove={onRemove}
                            />
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
