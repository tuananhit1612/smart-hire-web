"use client";

import * as React from "react";
import { User, Mail, Phone, MapPin, Globe, Plus, Trash2, Link as LinkIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { CandidateProfile, SocialLink } from "../types/profile";
import { motion, AnimatePresence } from "framer-motion";

interface ProfileEditInfoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: CandidateProfile;
  onSave: (updatedProfile: CandidateProfile) => void;
}

const SOCIAL_PLATFORMS = ["LinkedIn", "GitHub", "Website", "Twitter"] as const;

export function ProfileEditInfo({
  open,
  onOpenChange,
  profile: initialProfile,
  onSave,
}: ProfileEditInfoProps) {
  const [profile, setProfile] = React.useState<CandidateProfile>(initialProfile);

  React.useEffect(() => {
    if (open) {
      setProfile(initialProfile);
    }
  }, [open, initialProfile]);

  const updateField = (field: keyof CandidateProfile, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  const updateSocialLink = (index: number, field: keyof SocialLink, value: string) => {
    const newLinks = [...profile.socialLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setProfile({ ...profile, socialLinks: newLinks });
  };

  const addSocialLink = () => {
    setProfile({
      ...profile,
      socialLinks: [
        ...profile.socialLinks,
        { platform: "Website", url: "" },
      ],
    });
  };

  const removeSocialLink = (index: number) => {
    const newLinks = profile.socialLinks.filter((_, i) => i !== index);
    setProfile({ ...profile, socialLinks: newLinks });
  };

  const handleSave = () => {
    onSave(profile);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile Information</DialogTitle>
          <DialogDescription>
            Update your personal details, contact info, and bio.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Section: Basic Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Basic Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={profile.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                startIcon={<User className="h-4 w-4" />}
              />
              <Input
                label="Professional Title"
                value={profile.title}
                onChange={(e) => updateField("title", e.target.value)}
              />
            </div>
            <Input
              label="Avatar URL"
              value={profile.avatarUrl || ""}
              onChange={(e) => updateField("avatarUrl", e.target.value)}
              placeholder="https://..."
            />
          </div>

          {/* Section: Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Contact</h3>
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
                  label="Location"
                  value={profile.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  startIcon={<MapPin className="h-4 w-4" />}
                />
              </div>
            </div>
          </div>

          {/* Section: About */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">About</h3>
            <textarea
              className="w-full min-h-[120px] p-3 rounded-xl bg-card/50 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Tell us about yourself..."
              value={profile.about}
              onChange={(e) => updateField("about", e.target.value)}
            />
          </div>

          {/* Section: Social Links */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Social Links</h3>
              <Button variant="outline" size="sm" onClick={addSocialLink} className="h-7 text-xs">
                <Plus className="h-3 w-3 mr-1" /> Add Link
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

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} className="bg-primary text-white">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
