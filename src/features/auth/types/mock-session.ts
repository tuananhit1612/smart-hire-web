/**
 * ═══════════════════════════════════════════════════════════
 *  Mock Session Data (Removed)
 * ═══════════════════════════════════════════════════════════
 */
import type { SessionUser } from "./auth-types";

const DEFAULT_SESSION_USER: SessionUser = {
    id: "",
    fullName: "",
    email: "",
    role: "candidate",
    joinedDate: "",
};

export const mockCandidateNew: SessionUser = { ...DEFAULT_SESSION_USER };
export const mockCandidateReturning: SessionUser = { ...DEFAULT_SESSION_USER };
export const mockEmployerNew: SessionUser = { ...DEFAULT_SESSION_USER, role: "hr" };
export const mockEmployerReturning: SessionUser = { ...DEFAULT_SESSION_USER, role: "hr" };
export const mockAdmin: SessionUser = { ...DEFAULT_SESSION_USER, role: "admin" };

export const mockUsers = {
    "candidate-new": mockCandidateNew,
    "candidate-returning": mockCandidateReturning,
    "employer-new": mockEmployerNew,
    "employer-returning": mockEmployerReturning,
    admin: mockAdmin,
};
export const DEFAULT_MOCK_USER: SessionUser = { ...DEFAULT_SESSION_USER };
