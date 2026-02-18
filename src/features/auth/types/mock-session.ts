/**
 * ═══════════════════════════════════════════════════════════
 *  Mock Session Data
 *  Predefined user profiles for local development & testing.
 *  Switch between roles to test route guards and UI states.
 * ═══════════════════════════════════════════════════════════
 */

import type { SessionUser } from "./auth-types";

/** Mock candidate user */
export const mockCandidate: SessionUser = {
    id: "u1",
    name: "Nguyễn Văn An",
    email: "nguyenvanan@gmail.com",
    avatar: "NVA",
    role: "candidate",
    phone: "0901-xxx-xxx",
    location: "TP.HCM",
    joinedDate: "2025-08-12",
};

/** Mock employer user */
export const mockEmployer: SessionUser = {
    id: "u2",
    name: "Trần Thị Bảo",
    email: "tranthibao@techcorp.vn",
    avatar: "TTB",
    role: "employer",
    company: "TechCorp Vietnam",
    phone: "0912-xxx-xxx",
    location: "Hà Nội",
    joinedDate: "2025-06-20",
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
};

/** All mock users indexed by role for quick lookup */
export const mockUsers = {
    candidate: mockCandidate,
    employer: mockEmployer,
    admin: mockAdmin,
} as const;

/** Default mock session — change this to test different roles */
export const DEFAULT_MOCK_USER: SessionUser = mockCandidate;
