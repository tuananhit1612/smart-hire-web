/**
 * ═══════════════════════════════════════════════════════════
 *  Company API Types — 1:1 with backend Company DTOs
 *
 *  Source: com.smarthire.backend.features.company.dto.*
 * ═══════════════════════════════════════════════════════════
 */

import type { CompanySize } from "@/shared/types/enums";

// Nested DTOs
export interface CompanyBenefitDto {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface CompanySocialLinkDto {
  platform: 'LinkedIn' | 'Facebook' | 'Twitter' | 'Website' | 'GitHub' | string;
  url: string;
}

/** Mirrors CreateCompanyRequest.java */
export interface CreateCompanyRequest {
  name: string;
  website?: string;
  industry?: string;
  companySize?: string;
  description?: string;
  address?: string;
  city?: string;
  coverUrl?: string;
  tagline?: string;
  email?: string;
  phone?: string;
  founded?: string;
  techStack?: string[];
  benefits?: CompanyBenefitDto[];
  socialLinks?: CompanySocialLinkDto[];
}

/** Mirrors UpdateCompanyRequest.java (same shape as Create) */
export type UpdateCompanyRequest = Partial<CreateCompanyRequest>;

/** Mirrors CompanyResponse.java */
export interface CompanyResponse {
  id: number;
  name: string;
  logoUrl: string | null;
  coverUrl: string | null;
  website: string | null;
  industry: string | null;
  companySize: CompanySize | null;
  description: string | null;
  address: string | null;
  city: string | null;
  tagline: string | null;
  email: string | null;
  phone: string | null;
  founded: string | null;
  techStack: string[];
  benefits: CompanyBenefitDto[];
  socialLinks: CompanySocialLinkDto[];
  createdBy: number;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}
