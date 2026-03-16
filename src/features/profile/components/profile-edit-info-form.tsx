"use client";

import * as React from "react";
import { User, Mail, Phone, MapPin, Globe, Plus, Trash2, Link as LinkIcon } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { CandidateProfile, SocialLink } from "../types/profile";
import { motion, AnimatePresence } from "framer-motion";

interface ProfileEditInfoFormProps {
  profile: CandidateProfile;
  onChange: (updatedProfile: CandidateProfile) => void;
}

const SOCIAL_PLATFORMS = ["LinkedIn", "GitHub", "Website", "Twitter"] as const;

export function ProfileEditInfoForm({
  profile,
  onChange,
}: ProfileEditInfoFormProps) {
  const updateField = (field: keyof CandidateProfile, value: string | number) => {
    onChange({ ...profile, [field]: value });
  };

  const updateSocialLink = (index: number, field: keyof SocialLink, value: string) => {
    const newLinks = [...profile.socialLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    onChange({ ...profile, socialLinks: newLinks });
  };

  const addSocialLink = () => {
    onChange({
      ...profile,
      socialLinks: [
        ...profile.socialLinks,
        { platform: "Website", url: "" },
      ],
    });
  };

  const removeSocialLink = (index: number) => {
    const newLinks = profile.socialLinks.filter((_, i) => i !== index);
    onChange({ ...profile, socialLinks: newLinks });
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      {/* Section: Basic Info */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Thông tin cơ bản</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
             <Input
                label="Tiêu đề chuyên môn"
                placeholder="VD: Kỹ sư Frontend Cao cấp | Chuyên gia React & Next.js"
                value={profile.headline || ""}
                onChange={(e) => updateField("headline", e.target.value)}
              />
          </div>
          <Input
            label="Họ và tên"
            value={profile.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            startIcon={<User className="h-4 w-4" />}
          />
          <Input
            label="Chức danh hiện tại"
            value={profile.title}
            onChange={(e) => updateField("title", e.target.value)}
          />
          <Input
            label="Số năm kinh nghiệm"
            type="number"
            value={profile.yearsOfExperience || 0}
            onChange={(e) => updateField("yearsOfExperience", parseInt(e.target.value) || 0)}
          />
          <Input
            label="Mức lương mong muốn"
            value={profile.expectedSalary || ""}
            onChange={(e) => updateField("expectedSalary", e.target.value)}
            placeholder="VD: 25.000.000 - 40.000.000 VND"
          />
        </div>
        <Input
          label="URL Ảnh đại diện"
          value={profile.avatarUrl || ""}
          onChange={(e) => updateField("avatarUrl", e.target.value)}
          placeholder="https://..."
        />
      </div>

      {/* Section: Contact */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Liên hệ</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email"
            value={profile.email}
            onChange={(e) => updateField("email", e.target.value)}
            startIcon={<Mail className="h-4 w-4" />}
          />
          <Input
            label="Phone"
            value={profile.phone || ""}
            onChange={(e) => updateField("phone", e.target.value)}
            startIcon={<Phone className="h-4 w-4" />}
          />
          <div className="md:col-span-2">
            <Input
              label="Địa điểm"
              value={profile.location}
              onChange={(e) => updateField("location", e.target.value)}
              startIcon={<MapPin className="h-4 w-4" />}
            />
          </div>
        </div>
      </div>

      {/* Section: About */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Giới thiệu</h3>
        <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Tóm tắt chuyên môn</label>
            <textarea
              className="w-full min-h-[80px] p-3 rounded-xl bg-card border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Giới thiệu ngắn (2-3 câu)..."
              value={profile.summary || ""}
              onChange={(e) => updateField("summary", e.target.value)}
            />
        </div>
        <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Chi tiết/Tiểu sử</label>
            <textarea
              className="w-full min-h-[120px] p-3 rounded-xl bg-card border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Kể về bản thân, sở thích, v.v..."
              value={profile.about}
              onChange={(e) => updateField("about", e.target.value)}
            />
        </div>
      </div>

      {/* Section: Social Links */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Liên kết mạng xã hội</h3>
          <Button variant="outline" size="sm" onClick={addSocialLink} className="h-7 text-xs">
            <Plus className="h-3 w-3 mr-1" /> Thêm liên kết
          </Button>
        </div>
        
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {profile.socialLinks.map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex gap-2 items-start"
              >
                 <div className="w-[120px]">
                    <select
                      className="w-full h-10 rounded-xl border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      value={link.platform}
                      onChange={(e) => updateSocialLink(index, "platform", e.target.value as any)}
                    >
                      {SOCIAL_PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                 </div>
                 <div className="flex-1">
                    <Input 
                      value={link.url}
                      onChange={(e) => updateSocialLink(index, "url", e.target.value)}
                      placeholder="https://..."
                      startIcon={<LinkIcon className="h-4 w-4" />}
                    />
                 </div>
                 <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeSocialLink(index)}
                    className="text-muted-foreground hover:text-red-500"
                  >
                   <Trash2 className="h-4 w-4" />
                 </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
