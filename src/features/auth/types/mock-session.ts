/**
 * ═══════════════════════════════════════════════════════════
 *  Mock Session Data
 *  Predefined user profiles for local development & testing.
 *  Switch between roles to test route guards and UI states.
 * ═══════════════════════════════════════════════════════════
 */

import type { SessionUser } from "./auth-types";

/** Mock candidate user (First time login / Need onboarding) */
export const mockCandidateNew: SessionUser = {
    id: "u1-new",
    name: "Nguyễn Văn Sinh Viên",
    email: "sv.nguyenvan@gmail.com",
    avatar: "NVS",
    role: "candidate",
    joinedDate: new Date().toISOString().split('T')[0],
    isNewUser: true,
};

/** Mock candidate user (Returning / Has profile) */
export const mockCandidateReturning: SessionUser = {
    id: "u1",
    name: "Nguyễn Văn An",
    email: "nguyenvanan@gmail.com",
    avatar: "NVA",
    role: "candidate",
    phone: "0901-xxx-xxx",
    location: "TP.HCM",
    joinedDate: "2025-08-12",
    isNewUser: false,
};

/** Mock employer user (First time login / Need to setup company) */
export const mockEmployerNew: SessionUser = {
    id: "u2-new",
    name: "Trần Thị HR Mới",
    email: "hr.moi@startup.vn",
    avatar: "TTM",
    role: "employer",
    joinedDate: new Date().toISOString().split('T')[0],
    isNewUser: true,
};

/** Mock employer user (Returning / Configured company) */
export const mockEmployerReturning: SessionUser = {
    id: "u2",
    name: "Trần Thị Bảo",
    email: "tranthibao@techcorp.vn",
    avatar: "TTB",
    role: "employer",
    company: "TechCorp Vietnam",
    phone: "0912-xxx-xxx",
    location: "Hà Nội",
    joinedDate: "2025-06-20",
    isNewUser: false,
};

/** Mock admin user */
export const mockAdmin: SessionUser = {
    id: "u3",
    name: "Lê Hoàng Cường",
    email: "lehoangcuong@admin.smarthire.ai",
    avatar: "LHC",
    role: "admin",
    phone: "0903-xxx-xxx",
    location: "TP.HCM",
    joinedDate: "2025-01-01",
    isNewUser: false,
};

/** All mock users indexed by their MockUserKey for quick lookup */
export const mockUsers = {
    "candidate-new": mockCandidateNew,
    "candidate-returning": mockCandidateReturning,
    "employer-new": mockEmployerNew,
    "employer-returning": mockEmployerReturning,
    "admin": mockAdmin,
} as const;

/** Default mock session — change this to test different roles */
export const DEFAULT_MOCK_USER: SessionUser = mockCandidateReturning;
