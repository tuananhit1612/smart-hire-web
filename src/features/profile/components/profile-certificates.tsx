import { Certificate } from "../types/profile";
import { Award, ExternalLink } from "lucide-react";

interface ProfileCertificatesProps {
  certificates: Certificate[];
}

export function ProfileCertificates({ certificates }: ProfileCertificatesProps) {
  if (!certificates || certificates.length === 0) return null;

  return (
    <div className="bg-white dark:bg-[#1C252E] rounded-[24px] p-6 sm:p-8 shadow-[0_8px_32px_rgba(145,158,171,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.24)] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.04] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(234,179,8,0.12)] group">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 group-hover:scale-110 transition-transform">
          <Award className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-extrabold text-[#1C252E] dark:text-white">Chứng chỉ</h2>
      </div>

      <div className="space-y-4">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl bg-[#F4F6F8]/80 dark:bg-[#212B36]/80 border border-[rgba(145,158,171,0.12)] dark:border-white/10 hover:border-yellow-500/40 hover:bg-white dark:hover:bg-[#1C252E] hover:shadow-lg transition-all duration-300 gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-xl bg-white dark:bg-[#1C252E] shadow-sm border border-[rgba(145,158,171,0.2)] dark:border-white/10 flex-shrink-0 flex items-center justify-center font-extrabold text-yellow-500 text-xl uppercase">
                {cert.name.charAt(0)}
              </div>
              <div className="pt-0.5">
                <h3 className="font-bold text-[16px] text-[#1C252E] dark:text-white leading-tight">{cert.name}</h3>
                <p className="text-[14px] font-bold text-[#637381] dark:text-[#919EAB] mt-1">{cert.issuingOrganization}</p>
                <div className="flex items-center gap-3 text-[13px] font-semibold tracking-wide text-[#919EAB] dark:text-[#637381] mt-2">
                  <span>Cấp ngày: {cert.issueDate}</span>
                  {cert.expirationDate && <span>• Hết hạn: {cert.expirationDate}</span>}
                </div>
              </div>
            </div>

            {(cert.credentialUrl || cert.credentialId) && (
              <div className="flex flex-col md:items-end gap-2.5 shrink-0 pt-2 md:pt-0">
                {cert.credentialId && (
                  <span className="text-[12px] font-bold font-mono text-[#919EAB] dark:text-[#637381] bg-white dark:bg-[#1C252E] shadow-sm border border-[rgba(145,158,171,0.2)] dark:border-white/10 px-3 py-1.5 rounded-lg">ID: {cert.credentialId}</span>
                )}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 h-9 px-4 rounded-xl bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.2)] dark:border-white/10 text-[13px] font-bold text-[#1C252E] dark:text-white hover:text-yellow-500 hover:border-yellow-500/50 hover:bg-yellow-500/5 transition-all shadow-sm"
                  >
                    Xem chứng chỉ <ExternalLink className="w-4 h-4" />
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


