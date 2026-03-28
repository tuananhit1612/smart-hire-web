/**
 * ═══════════════════════════════════════════════════════════
 *  Company API Types — 1:1 with backend Company DTOs
 *
 *  Source: com.smarthire.backend.features.company.dto.*
 * ═══════════════════════════════════════════════════════════
 */

import type { CompanySize } from "@/shared/types/enums";

/** Mirrors CreateCompanyRequest.java */
export interface CreateCompanyRequest {
  name: string;
  website?: string;
  industry?: string;
  companySize?: string;
  description?: string;
  address?: string;
  city?: string;
}

/** Mirrors UpdateCompanyRequest.java (same shape as Create) */
export type UpdateCompanyRequest = Partial<CreateCompanyRequest>;

/** Mirrors CompanyResponse.java */
export interface CompanyResponse {
  id: number;
  name: string;
  logoUrl: string | null;
  website: string | null;
  industry: string | null;
  companySize: CompanySize | null;
  description: string | null;
  address: string | null;
  city: string | null;
  createdBy: number;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}
