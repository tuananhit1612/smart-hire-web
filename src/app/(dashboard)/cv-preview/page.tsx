"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Code,
  FolderKanban,
  Globe,
  Linkedin,
  Edit2,
  Check,
  X,
  User,
  FileText,
  ExternalLink,
  Calendar,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { mockCVVersions, getCVVersionById, CVVersion } from "@/features/cv/types/cv-versions";
import { useToast } from "@/shared/components/ui/toast";

export default function CVPreviewPage() {
  const router = useRouter();

  // Parse URL params on client side
  const [params, setParams] = useState({ cvId: "", returnTo: "", jobId: "" });
  const [cv, setCv] = useState<CVVersion | null>(null);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [hasChanges, setHasChanges] = useState(false);
  const { addToast } = useToast();

  // Get URL params on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const cvId = urlParams.get("id") || mockCVVersions[0]?.id || "";
      const returnTo = urlParams.get("returnTo") || "";
      const jobId = urlParams.get("jobId") || "";
      setParams({ cvId, returnTo, jobId });

      // Load CV
      const foundCV = getCVVersionById(cvId);
      if (foundCV) {
        setCv({ ...foundCV });
      }
    }
  }, []);

  // Handle inline edit
  const startEdit = (field: string, value: string) => {
    setIsEditing(field);
    setEditValue(value);
  };

  const cancelEdit = () => {
    setIsEditing(null);
    setEditValue("");
  };

  const saveEdit = (field: string) => {
    if (!cv) return;

    const updatedCV = { ...cv };

    // Update the appropriate field
    if (field === "summary") {
      updatedCV.data.summary = editValue;
    } else if (field === "fullName") {
      updatedCV.data.personalInfo.fullName = editValue;
    } else if (field === "email") {
      updatedCV.data.personalInfo.email = editValue;
    } else if (field === "phone") {
      updatedCV.data.personalInfo.phone = editValue;
    } else if (field === "location") {
      updatedCV.data.personalInfo.location = editValue;
    }

    setCv(updatedCV);
    setIsEditing(null);
    setEditValue("");
    setHasChanges(true);
  };

  const saveAllChanges = () => {
    addToast("Đã lưu thay đổi!", "success", 3000, "CV của bạn đã được cập nhật thành công.");
    setHasChanges(false);
  };

  const handleSelectCV = () => {
    if (params.returnTo === "apply" && params.jobId) {
      // Pass CV ID directly in URL instead of sessionStorage
      router.push(`/jobs/${params.jobId}?openApply=true&selectedCV=${params.cvId}`);
    } else {
      router.back();
    }
  };

  if (!cv) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-12 h-12 mx-auto text-slate-400 mb-4" />
          <p className="text-slate-500">CV không tồn tại</p>
        </div>
      </div>
    );
  }

  const getLevelBadge = (level: string | number) => {
    let normalizedLevel = level;

    if (typeof level === 'number') {
      if (level >= 80) normalizedLevel = 'expert';
      else if (level >= 60) normalizedLevel = 'advanced';
      else if (level >= 40) normalizedLevel = 'intermediate';
      else normalizedLevel = 'beginner';
    }

    const levelKey = String(normalizedLevel);

    const colors: Record<string, string> = {
      beginner: "bg-gray-100 text-gray-600",
      intermediate: "bg-blue-100 text-blue-600",
      advanced: "bg-purple-100 text-purple-600",
      expert: "bg-green-100 text-green-600",
    };
    const labels: Record<string, string> = {
      beginner: "Cơ bản",
      intermediate: "Trung bình",
      advanced: "Thành thạo",
      expert: "Chuyên gia",
    };
    return { color: colors[levelKey] || colors.beginner, label: labels[levelKey] || levelKey };
  };

  return (
    <div className="w-full pt-6 pb-12">
      {/* CV Content */}
      <div className="max-w-5xl mx-auto px-4 py-4">
        {/* Navigation Row - Like Profile Page */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-md flex items-center justify-center group-hover:bg-sky-50 dark:group-hover:bg-sky-900/30 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="font-medium">Quay lại</span>
          </button>

          <div className="flex items-center gap-3">
            {hasChanges && (
              <Button
                onClick={saveAllChanges}
                className="bg-green-500 hover:bg-green-600 text-white rounded-full"
              >
                <Save className="w-4 h-4 mr-2" />
                Lưu thay đổi
              </Button>
            )}
            {params.returnTo === "apply" && (
              <Button
                onClick={handleSelectCV}
                className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white rounded-full px-6 shadow-lg"
              >
                <Check className="w-4 h-4 mr-2" />
                Chọn CV này để ứng tuyển
              </Button>
            )}
          </div>
        </div>

        {/* CV Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden relative z-10"
        >
          {/* CV Title inside card */}
          <div className="px-8 pt-6 pb-4 border-b border-slate-100 dark:border-slate-800">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              {cv.name}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Template: {cv.templateName} • Cập nhật: {new Date(cv.updatedAt).toLocaleDateString("vi-VN")}
            </p>
          </div>

          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 p-8 text-white">
            <div className="flex items-start gap-6">
              {cv.data.personalInfo.avatarUrl ? (
                <img
                  src={cv.data.personalInfo.avatarUrl}
                  alt={cv.data.personalInfo.fullName}
                  className="w-24 h-24 rounded-2xl object-cover border-4 border-white/30"
                />
              ) : (
                <div className="w-24 h-24 rounded-2xl bg-white/20 flex items-center justify-center">
                  <User className="w-12 h-12 text-white/80" />
                </div>
              )}
              <div className="flex-1">
                <EditableField
                  field="fullName"
                  value={cv.data.personalInfo.fullName}
                  isEditing={isEditing === "fullName"}
                  editValue={editValue}
                  onStart={() => startEdit("fullName", cv.data.personalInfo.fullName)}
                  onCancel={cancelEdit}
                  onSave={() => saveEdit("fullName")}
                  onChange={setEditValue}
                  className="text-3xl font-bold mb-2"
                />

                <div className="flex flex-wrap gap-4 mt-4">
                  <EditableFieldInline
                    icon={<Mail className="w-4 h-4" />}
                    field="email"
                    value={cv.data.personalInfo.email}
                    isEditing={isEditing === "email"}
                    editValue={editValue}
                    onStart={() => startEdit("email", cv.data.personalInfo.email)}
                    onCancel={cancelEdit}
                    onSave={() => saveEdit("email")}
                    onChange={setEditValue}
                  />
                  <EditableFieldInline
                    icon={<Phone className="w-4 h-4" />}
                    field="phone"
                    value={cv.data.personalInfo.phone}
                    isEditing={isEditing === "phone"}
                    editValue={editValue}
                    onStart={() => startEdit("phone", cv.data.personalInfo.phone)}
                    onCancel={cancelEdit}
                    onSave={() => saveEdit("phone")}
                    onChange={setEditValue}
                  />
                  <EditableFieldInline
                    icon={<MapPin className="w-4 h-4" />}
                    field="location"
                    value={cv.data.personalInfo.location}
                    isEditing={isEditing === "location"}
                    editValue={editValue}
                    onStart={() => startEdit("location", cv.data.personalInfo.location)}
                    onCancel={cancelEdit}
                    onSave={() => saveEdit("location")}
                    onChange={setEditValue}
                  />
                </div>

                {(cv.data.personalInfo.socials && cv.data.personalInfo.socials.length > 0) && (
                  <div className="flex gap-4 mt-3">
                    {cv.data.personalInfo.socials.map((social) => {
                      const Icon = social.network === 'LinkedIn' ? Linkedin :
                        social.network === 'GitHub' ? Code :
                          social.network === 'Twitter' ? Code : // Placeholder for Twitter
                            Globe;

                      return (
                        <a
                          key={social.id}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-white/80 hover:text-white"
                        >
                          <Icon className="w-4 h-4" />
                          {social.network}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-8 space-y-8">
            {/* Summary */}
            <Section title="Giới thiệu bản thân" icon={<User className="w-5 h-5" />}>
              <EditableTextarea
                field="summary"
                value={cv.data.summary}
                isEditing={isEditing === "summary"}
                editValue={editValue}
                onStart={() => startEdit("summary", cv.data.summary)}
                onCancel={cancelEdit}
                onSave={() => saveEdit("summary")}
                onChange={setEditValue}
              />
            </Section>

            {/* Experience */}
            {cv.data.experience && cv.data.experience.length > 0 && (
              <Section title="Kinh nghiệm làm việc" icon={<Briefcase className="w-5 h-5" />}>
                <div className="space-y-6">
                  {cv.data.experience.map((exp, index) => (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative pl-6 border-l-2 border-sky-500"
                    >
                      <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-sky-500" />
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                            {exp.position}
                          </h4>
                          <p className="text-sky-600 dark:text-sky-400 font-medium">
                            {exp.company}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Calendar className="w-4 h-4" />
                          {exp.startDate} - {exp.isCurrent ? "Hiện tại" : exp.endDate}
                          {exp.location && (
                            <>
                              <span>•</span>
                              <MapPin className="w-4 h-4" />
                              {exp.location}
                            </>
                          )}
                        </div>
                      </div>
                      <div className="text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                        {exp.description}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Section>
            )}

            {/* Education */}
            {cv.data.education && cv.data.education.length > 0 && (
              <Section title="Học vấn" icon={<GraduationCap className="w-5 h-5" />}>
                <div className="space-y-6">
                  {cv.data.education.map((edu, index) => (
                    <motion.div
                      key={edu.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative pl-6 border-l-2 border-purple-500"
                    >
                      <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-purple-500" />
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                            {edu.school}
                          </h4>
                          <p className="text-purple-600 dark:text-purple-400 font-medium">
                            {edu.degree} - {edu.field}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Calendar className="w-4 h-4" />
                          {edu.startDate} - {edu.endDate}
                        </div>
                      </div>
                      {edu.description && (
                        <div className="text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                          {edu.description}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </Section>
            )}

            {/* Skills */}
            {cv.data.skills && cv.data.skills.length > 0 && (
              <Section title="Kỹ năng" icon={<Code className="w-5 h-5" />}>
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">
                      Kỹ năng chuyên môn
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {cv.data.skills
                        .filter((s) => s.category === "technical")
                        .map((skill) => {
                          const { color, label } = getLevelBadge(skill.level);
                          return (
                            <div
                              key={skill.id}
                              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800"
                            >
                              <span className="font-medium text-slate-700 dark:text-slate-200">
                                {skill.name}
                              </span>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${color}`}>
                                {label}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  {cv.data.skills.some((s) => s.category === "soft") && (
                    <div>
                      <h5 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">
                        Kỹ năng mềm
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {cv.data.skills
                          .filter((s) => s.category === "soft")
                          .map((skill) => {
                            const { color, label } = getLevelBadge(skill.level);
                            return (
                              <div
                                key={skill.id}
                                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 dark:bg-amber-900/20"
                              >
                                <span className="font-medium text-amber-700 dark:text-amber-300">
                                  {skill.name}
                                </span>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${color}`}>
                                  {label}
                                </span>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}
                </div>
              </Section>
            )}

            {/* Projects */}
            {cv.data.projects && cv.data.projects.length > 0 && (
              <Section title="Dự án nổi bật" icon={<FolderKanban className="w-5 h-5" />}>
                <div className="grid md:grid-cols-2 gap-4">
                  {cv.data.projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-slate-900 dark:text-white">
                          {project.name}
                        </h4>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-500 hover:text-sky-600"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      {(project.startDate || project.endDate) && (
                        <p className="text-xs text-slate-400 mb-2">
                          {project.startDate} - {project.endDate || "Hiện tại"}
                        </p>
                      )}
                      <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2 py-1 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Section>
            )}
          </div>
        </motion.div>

        {/* Bottom Action Bar */}
        {params.returnTo === "apply" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-lg flex items-center justify-between"
          >
            <p className="text-slate-600 dark:text-slate-300">
              Hài lòng với CV này? Tiếp tục ứng tuyển!
            </p>
            <Button
              onClick={handleSelectCV}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-full px-8"
            >
              <Check className="w-4 h-4 mr-2" />
              Chọn CV này để ứng tuyển
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Section Component
function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
      </div>
      {children}
    </div>
  );
}

// Editable Field Component
interface EditableFieldProps {
  field: string;
  value: string;
  isEditing: boolean;
  editValue: string;
  onStart: () => void;
  onCancel: () => void;
  onSave: () => void;
  onChange: (value: string) => void;
  className?: string;
}

function EditableField({ value, isEditing, editValue, onStart, onCancel, onSave, onChange, className }: EditableFieldProps) {
  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={editValue}
          onChange={(e) => onChange(e.target.value)}
          className={`bg-white/20 border border-white/30 rounded-lg px-3 py-1 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 ${className}`}
          autoFocus
        />
        <button onClick={onSave} className="p-1 hover:bg-white/20 rounded">
          <Check className="w-5 h-5" />
        </button>
        <button onClick={onCancel} className="p-1 hover:bg-white/20 rounded">
          <X className="w-5 h-5" />
        </button>
      </div>
    );
  }
  return (
    <div className="group flex items-center gap-2">
      <span className={className}>{value}</span>
      <button
        onClick={onStart}
        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/20 rounded transition-opacity"
      >
        <Edit2 className="w-4 h-4" />
      </button>
    </div>
  );
}

// Editable Inline Field Component
function EditableFieldInline({ icon, value, isEditing, editValue, onStart, onCancel, onSave, onChange }: EditableFieldProps & { icon: React.ReactNode }) {
  if (isEditing) {
    return (
      <div className="flex items-center gap-1">
        {icon}
        <input
          type="text"
          value={editValue}
          onChange={(e) => onChange(e.target.value)}
          className="bg-white/20 border border-white/30 rounded px-2 py-0.5 text-sm text-white w-40 focus:outline-none"
          autoFocus
        />
        <button onClick={onSave} className="p-0.5 hover:bg-white/20 rounded">
          <Check className="w-4 h-4" />
        </button>
        <button onClick={onCancel} className="p-0.5 hover:bg-white/20 rounded">
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }
  return (
    <div className="group flex items-center gap-1 text-sm text-white/90">
      {icon}
      <span>{value}</span>
      <button
        onClick={onStart}
        className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-white/20 rounded transition-opacity"
      >
        <Edit2 className="w-3 h-3" />
      </button>
    </div>
  );
}

// Editable Textarea Component
function EditableTextarea({ value, isEditing, editValue, onStart, onCancel, onSave, onChange }: Omit<EditableFieldProps, "className">) {
  if (isEditing) {
    return (
      <div className="space-y-2">
        <textarea
          value={editValue}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-32 p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
          autoFocus
        />
        <div className="flex gap-2">
          <Button onClick={onSave} size="sm" className="rounded-full">
            <Check className="w-4 h-4 mr-1" />
            Lưu
          </Button>
          <Button onClick={onCancel} variant="outline" size="sm" className="rounded-full">
            Hủy
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="group relative">
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
        {value}
      </p>
      <button
        onClick={onStart}
        className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-opacity"
      >
        <Edit2 className="w-4 h-4 text-slate-400" />
      </button>
    </div>
  );
}
