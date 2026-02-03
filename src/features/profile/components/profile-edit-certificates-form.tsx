"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Award, Calendar, Link as LinkIcon, Building2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Certificate } from "../types/profile";

interface ProfileEditCertificatesFormProps {
  certificates: Certificate[];
  onChange: (certificates: Certificate[]) => void;
}

const EMPTY_CERTIFICATE: Omit<Certificate, "id"> = {
  name: "",
  issuingOrganization: "",
  issueDate: "",
  expirationDate: "",
  credentialId: "",
  credentialUrl: "",
};

export function ProfileEditCertificatesForm({
  certificates,
  onChange,
}: ProfileEditCertificatesFormProps) {

  const addCertificate = () => {
    const newCertificate: Certificate = {
      ...EMPTY_CERTIFICATE,
      id: `cert-${Date.now()}`,
    };
    onChange([...certificates, newCertificate]);
  };

  const removeCertificate = (id: string) => {
    onChange(certificates.filter((c) => c.id !== id));
  };

  const updateCertificate = (id: string, field: keyof Certificate, value: string) => {
    onChange(
      certificates.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  return (
    <div className="space-y-4 animate-in fade-in zoom-in-95 duration-500">
      <AnimatePresence mode="popLayout">
        {certificates.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            layout
            className="p-4 rounded-xl bg-muted/30 border border-border/50 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Award className="h-4 w-4" />
                Chứng chỉ {index + 1}
              </div>
              <button
                onClick={() => removeCertificate(cert.id)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Tên chứng chỉ"
                placeholder="VD: AWS Certified Solutions Architect"
                value={cert.name}
                onChange={(e) => updateCertificate(cert.id, "name", e.target.value)}
              />
              <Input
                label="Tổ chức cấp"
                placeholder="VD: Amazon Web Services"
                value={cert.issuingOrganization}
                onChange={(e) => updateCertificate(cert.id, "issuingOrganization", e.target.value)}
                startIcon={<Building2 className="h-4 w-4" />}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Ngày cấp"
                placeholder="YYYY-MM"
                value={cert.issueDate}
                onChange={(e) => updateCertificate(cert.id, "issueDate", e.target.value)}
                startIcon={<Calendar className="h-4 w-4" />}
              />
              <Input
                label="Ngày hết hạn"
                placeholder="YYYY-MM (Tùy chọn)"
                value={cert.expirationDate || ""}
                onChange={(e) => updateCertificate(cert.id, "expirationDate", e.target.value)}
                startIcon={<Calendar className="h-4 w-4" />}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Mã chứng chỉ"
                placeholder="Tùy chọn"
                value={cert.credentialId || ""}
                onChange={(e) => updateCertificate(cert.id, "credentialId", e.target.value)}
              />
              <Input
                label="Liên kết chứng chỉ"
                placeholder="https://..."
                value={cert.credentialUrl || ""}
                onChange={(e) => updateCertificate(cert.id, "credentialUrl", e.target.value)}
                startIcon={<LinkIcon className="h-4 w-4" />}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {certificates.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Award className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>Chưa có chứng chỉ nào</p>
          <Button variant="ghost" onClick={addCertificate} className="text-primary hover:text-primary/80">Thêm chứng chỉ đầu tiên</Button>
        </div>
      )}

      {certificates.length > 0 && (
        <Button variant="outline" onClick={addCertificate} className="w-full border-dashed">
          <Plus className="h-4 w-4 mr-2" /> Thêm chứng chỉ
        </Button>
      )}
    </div>
  );
}
