"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Linkedin, Facebook, Twitter, Globe, ExternalLink, Plus, X } from "lucide-react";
import { SocialLink } from "../types/company";
import { Button } from "@/shared/components/ui/button";

interface CompanySocialLinksProps {
    socialLinks: SocialLink[];
    onUpdate?: (links: SocialLink[]) => void;
    editable?: boolean;
}

const PLATFORM_ICONS: Record<SocialLink["platform"], React.ElementType> = {
    LinkedIn: Linkedin,
    Facebook: Facebook,
    Twitter: Twitter,
    Website: Globe,
    GitHub: Globe,
};

const PLATFORM_COLORS: Record<SocialLink["platform"], string> = {
    LinkedIn: "from-[#22c55e] to-[#10b981]",
    Facebook: "from-[#22c55e] to-[#10b981]",
    Twitter: "from-[#22c55e] to-[#10b981]",
    Website: "from-green-500 to-emerald-600",
    GitHub: "from-gray-700 to-gray-800",
};

export function CompanySocialLinks({ socialLinks, onUpdate, editable = true }: CompanySocialLinksProps) {
    const [isAdding, setIsAdding] = React.useState(false);
    const [newLink, setNewLink] = React.useState<Partial<SocialLink>>({
        platform: "Website",
        url: "",
    });

    const handleAdd = () => {
        if (newLink.platform && newLink.url) {
            onUpdate?.([...socialLinks, newLink as SocialLink]);
            setNewLink({ platform: "Website", url: "" });
            setIsAdding(false);
        }
    };

    const handleRemove = (index: number) => {
        onUpdate?.(socialLinks.filter((_, i) => i !== index));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 dark:bg-[#1C252E]/80 backdrop-blur-xl rounded-3xl border border-white/40 dark:border-white/[0.08] shadow-xl shadow-[#22c55e]/20 dark:shadow-black/20 p-6"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22c55e] to-[#10b981] flex items-center justify-center">
                        <Globe className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-lg font-bold text-[#1C252E] dark:text-white">Liên kết mạng xã hội</h2>
                </div>
                {editable && !isAdding && (
                    <Button
                        onClick={() => setIsAdding(true)}
                        variant="ghost"
                        size="sm"
                        className="text-[#22c55e] hover:text-[#22c55e] hover:bg-[#22c55e]/10 rounded-full"
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Thêm
                    </Button>
                )}
            </div>

            {/* Add Form */}
            {isAdding && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mb-4 p-4 bg-[#22c55e]/10 dark:bg-white/[0.04] rounded-2xl border border-[#22c55e]/30 dark:border-white/[0.08]"
                >
                    <div className="flex flex-wrap gap-3">
                        <select
                            value={newLink.platform}
                            onChange={(e) =>
                                setNewLink({ ...newLink, platform: e.target.value as SocialLink["platform"] })
                            }
                            className="bg-white dark:bg-[#1C252E] rounded-xl px-4 py-2 border-2 border-[#22c55e]/30 dark:border-white/[0.08] focus:border-[#22c55e]/30 focus:outline-none text-slate-800 dark:text-white"
                        >
                            <option value="Website">Website</option>
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="Facebook">Facebook</option>
                            <option value="Twitter">Twitter</option>
                            <option value="GitHub">GitHub</option>
                        </select>
                        <input
                            type="url"
                            value={newLink.url}
                            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                            placeholder="https://..."
                            className="flex-1 min-w-[200px] bg-white dark:bg-[#1C252E] rounded-xl px-4 py-2 border-2 border-[#22c55e]/30 dark:border-white/[0.08] focus:border-[#22c55e]/30 focus:outline-none text-slate-800 dark:text-white"
                        />
                        <Button
                            onClick={handleAdd}
                            className="bg-green-500 hover:bg-green-600 text-white rounded-full px-4"
                        >
                            Thêm
                        </Button>
                        <Button
                            onClick={() => setIsAdding(false)}
                            variant="outline"
                            className="rounded-full px-4"
                        >
                            Hủy
                        </Button>
                    </div>
                </motion.div>
            )}

            {/* Links */}
            {socialLinks.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                    {socialLinks.map((link, index) => {
                        const Icon = PLATFORM_ICONS[link.platform];
                        const color = PLATFORM_COLORS[link.platform];

                        return (
                            <motion.a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className={`group relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${color} rounded-full text-white font-medium shadow-lg hover:shadow-xl transition-shadow`}
                            >
                                <Icon className="w-4 h-4" />
                                {link.platform}
                                <ExternalLink className="w-3 h-3 opacity-70" />

                                {editable && (
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleRemove(index);
                                        }}
                                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                )}
                            </motion.a>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-6 text-[#22c55e] dark:text-[#637381]">
                    <Globe className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    <p>Chưa có liên kết mạng xã hội</p>
                </div>
            )}
        </motion.div>
    );
}

