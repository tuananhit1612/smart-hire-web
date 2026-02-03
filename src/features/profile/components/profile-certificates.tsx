import { Certificate } from "../types/profile";
import { Award, ExternalLink, Calendar } from "lucide-react";

interface ProfileCertificatesProps {
  certificates: Certificate[];
}

export function ProfileCertificates({ certificates }: ProfileCertificatesProps) {
  if (!certificates || certificates.length === 0) return null;

  return (
    <div className="glass-card p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500">
          <Award className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-orange-500">
          Chứng chỉ
        </h2>
      </div>

      <div className="space-y-4">
        {certificates.map((cert) => (
          <div 
            key={cert.id} 
            className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl bg-muted/20 border border-border/50 hover:bg-muted/40 transition-colors gap-4"
          >
            <div className="flex items-start gap-4">
               <div className="h-12 w-12 rounded-lg bg-background border border-border flex-shrink-0 flex items-center justify-center">
                  <Award className="h-6 w-6 text-yellow-500" />
               </div>
               <div>
                 <h3 className="font-bold text-foreground">{cert.name}</h3>
                 <p className="text-sm text-foreground/80">{cert.issuingOrganization}</p>
                 <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">Cấp ngày: {cert.issueDate}</span>
                    {cert.expirationDate && <span>• Hết hạn: {cert.expirationDate}</span>}
                 </div>
               </div>
            </div>
            
            {(cert.credentialUrl || cert.credentialId) && (
              <div className="flex flex-col items-end gap-2">
                 {cert.credentialId && (
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">ID: {cert.credentialId}</span>
                 )}
                 {cert.credentialUrl && (
                    <a 
                      href={cert.credentialUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
                    >
                      Xem chứng chỉ <ExternalLink className="h-3 w-3" />
                    </a>
                 )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
