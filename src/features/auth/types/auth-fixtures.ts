/**
 * ═══════════════════════════════════════════════════════════
 *  Auth Fixtures
 *  Mock API responses for authentication flows:
 *  login, register, forgot/reset password.
 *  Covers success, failure, and locked/blocked scenarios.
 * ═══════════════════════════════════════════════════════════
 */

import type { SessionUser, UserRole } from "./auth-types";
import { mockCandidate, mockEmployer, mockAdmin } from "./mock-session";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  RESPONSE TYPES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type AuthErrorCode =
    | "INVALID_CREDENTIALS"
    | "EMAIL_NOT_FOUND"
    | "ACCOUNT_LOCKED"
    | "ACCOUNT_BANNED"
    | "ACCOUNT_PENDING"
    | "TOO_MANY_ATTEMPTS"
    | "EMAIL_ALREADY_EXISTS"
    | "WEAK_PASSWORD"
    | "INVALID_TOKEN"
    | "TOKEN_EXPIRED"
    | "VALIDATION_ERROR"
    | "SERVER_ERROR";

export interface AuthSuccess<T = unknown> {
    ok: true;
    data: T;
    message: string;
}

export interface AuthError {
    ok: false;
    code: AuthErrorCode;
    message: string;
    details?: string;
    retryAfter?: number; // seconds
    remainingAttempts?: number;
}

export type AuthResponse<T = unknown> = AuthSuccess<T> | AuthError;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  LOGIN FIXTURES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface LoginSuccessData {
    user: SessionUser;
    token: string;
    refreshToken: string;
    expiresIn: number; // seconds
}

export const loginSuccess: Record<UserRole, AuthSuccess<LoginSuccessData>> = {
    candidate: {
        ok: true,
        data: {
            user: mockCandidate,
            token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.mock_candidate_token",
            refreshToken: "rt_candidate_mock_refresh_token_abc123",
            expiresIn: 3600,
        },
        message: "Đăng nhập thành công! Chào mừng bạn trở lại.",
    },
    employer: {
        ok: true,
        data: {
            user: mockEmployer,
            token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.mock_employer_token",
            refreshToken: "rt_employer_mock_refresh_token_def456",
            expiresIn: 3600,
        },
        message: "Đăng nhập thành công! Chào mừng nhà tuyển dụng.",
    },
    admin: {
        ok: true,
        data: {
            user: mockAdmin,
            token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.mock_admin_token",
            refreshToken: "rt_admin_mock_refresh_token_ghi789",
            expiresIn: 7200,
        },
        message: "Đăng nhập Admin thành công.",
    },
};

export const loginErrors: Record<string, AuthError> = {
    invalidCredentials: {
        ok: false,
        code: "INVALID_CREDENTIALS",
        message: "Email hoặc mật khẩu không đúng.",
        details: "Vui lòng kiểm tra lại thông tin đăng nhập.",
        remainingAttempts: 3,
    },
    emailNotFound: {
        ok: false,
        code: "EMAIL_NOT_FOUND",
        message: "Email chưa được đăng ký.",
        details: "Không tìm thấy tài khoản với email này. Bạn có muốn đăng ký?",
    },
    accountLocked: {
        ok: false,
        code: "ACCOUNT_LOCKED",
        message: "Tài khoản đã bị tạm khoá.",
        details: "Quá nhiều lần đăng nhập sai. Vui lòng thử lại sau 30 phút hoặc đặt lại mật khẩu.",
        retryAfter: 1800,
        remainingAttempts: 0,
    },
    accountBanned: {
        ok: false,
        code: "ACCOUNT_BANNED",
        message: "Tài khoản đã bị khoá vĩnh viễn.",
        details: "Tài khoản vi phạm điều khoản sử dụng. Liên hệ support@smarthire.ai để khiếu nại.",
    },
    accountPending: {
        ok: false,
        code: "ACCOUNT_PENDING",
        message: "Tài khoản đang chờ phê duyệt.",
        details: "Tài khoản nhà tuyển dụng cần được admin phê duyệt trước khi sử dụng. Thời gian xử lý: 1-2 ngày làm việc.",
    },
    tooManyAttempts: {
        ok: false,
        code: "TOO_MANY_ATTEMPTS",
        message: "Quá nhiều lần thử đăng nhập.",
        details: "Bạn đã thử đăng nhập quá 5 lần. Vui lòng đợi 15 phút trước khi thử lại.",
        retryAfter: 900,
        remainingAttempts: 0,
    },
    serverError: {
        ok: false,
        code: "SERVER_ERROR",
        message: "Lỗi hệ thống. Vui lòng thử lại sau.",
        details: "Máy chủ đang gặp sự cố. Đội ngũ kỹ thuật đã được thông báo.",
    },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  REGISTER FIXTURES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface RegisterSuccessData {
    user: SessionUser;
    token: string;
    requiresVerification: boolean;
}

export const registerSuccess: Record<"candidate" | "employer", AuthSuccess<RegisterSuccessData>> = {
    candidate: {
        ok: true,
        data: {
            user: mockCandidate,
            token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.mock_register_candidate",
            requiresVerification: true,
        },
        message: "Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.",
    },
    employer: {
        ok: true,
        data: {
            user: mockEmployer,
            token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.mock_register_employer",
            requiresVerification: true,
        },
        message: "Đăng ký thành công! Tài khoản NTD sẽ được phê duyệt trong 1-2 ngày làm việc.",
    },
};

export const registerErrors: Record<string, AuthError> = {
    emailExists: {
        ok: false,
        code: "EMAIL_ALREADY_EXISTS",
        message: "Email đã được đăng ký.",
        details: "Một tài khoản với email này đã tồn tại. Bạn có muốn đăng nhập?",
    },
    weakPassword: {
        ok: false,
        code: "WEAK_PASSWORD",
        message: "Mật khẩu quá yếu.",
        details: "Mật khẩu cần ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.",
    },
    validationError: {
        ok: false,
        code: "VALIDATION_ERROR",
        message: "Thông tin đăng ký không hợp lệ.",
        details: "Vui lòng kiểm tra lại các trường bắt buộc.",
    },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  FORGOT / RESET PASSWORD FIXTURES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const forgotPasswordSuccess: AuthSuccess<{ email: string }> = {
    ok: true,
    data: { email: "ngu***an@gmail.com" },
    message: "Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư.",
};

export const forgotPasswordErrors: Record<string, AuthError> = {
    emailNotFound: {
        ok: false,
        code: "EMAIL_NOT_FOUND",
        message: "Không tìm thấy tài khoản.",
        details: "Không có tài khoản nào được đăng ký với email này.",
    },
    tooManyAttempts: {
        ok: false,
        code: "TOO_MANY_ATTEMPTS",
        message: "Quá nhiều yêu cầu.",
        details: "Bạn đã gửi yêu cầu đặt lại mật khẩu quá nhiều lần. Thử lại sau 10 phút.",
        retryAfter: 600,
    },
};

export const resetPasswordSuccess: AuthSuccess<null> = {
    ok: true,
    data: null,
    message: "Mật khẩu đã được đổi thành công! Bạn có thể đăng nhập bằng mật khẩu mới.",
};

export const resetPasswordErrors: Record<string, AuthError> = {
    invalidToken: {
        ok: false,
        code: "INVALID_TOKEN",
        message: "Link đặt lại mật khẩu không hợp lệ.",
        details: "Link này có thể đã được sử dụng hoặc không đúng. Vui lòng yêu cầu link mới.",
    },
    tokenExpired: {
        ok: false,
        code: "TOKEN_EXPIRED",
        message: "Link đặt lại mật khẩu đã hết hạn.",
        details: "Link chỉ có hiệu lực trong 15 phút. Vui lòng yêu cầu link mới.",
    },
    weakPassword: {
        ok: false,
        code: "WEAK_PASSWORD",
        message: "Mật khẩu mới quá yếu.",
        details: "Mật khẩu cần ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.",
    },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  SIMULATOR FUNCTIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** Simulate network delay (300-1200ms) */
function randomDelay(): Promise<void> {
    const ms = 300 + Math.random() * 900;
    return new Promise((r) => setTimeout(r, ms));
}

/**
 * Simulate a login API call.
 * Uses email patterns to determine response:
 * - `*@locked.com`  → account locked
 * - `*@banned.com`  → account banned
 * - `*@pending.com` → account pending
 * - `wrong@*`       → invalid credentials
 * - Otherwise       → success (role based on email domain)
 */
export async function simulateLogin(
    email: string,
    _password: string,
): Promise<AuthResponse<LoginSuccessData>> {
    await randomDelay();

    const lower = email.toLowerCase();
    if (lower.includes("@locked.com")) return loginErrors.accountLocked;
    if (lower.includes("@banned.com")) return loginErrors.accountBanned;
    if (lower.includes("@pending.com")) return loginErrors.accountPending;
    if (lower.startsWith("wrong@")) return loginErrors.invalidCredentials;
    if (lower.includes("admin")) return loginSuccess.admin;
    if (lower.includes("employer") || lower.includes("techcorp") || lower.includes("company"))
        return loginSuccess.employer;
    return loginSuccess.candidate;
}

/**
 * Simulate a register API call.
 * - `exists@*` → email already exists
 * - Otherwise  → success
 */
export async function simulateRegister(
    email: string,
    _password: string,
    role: "candidate" | "employer",
): Promise<AuthResponse<RegisterSuccessData>> {
    await randomDelay();

    if (email.toLowerCase().startsWith("exists@")) return registerErrors.emailExists;
    return registerSuccess[role];
}

/**
 * Simulate forgot password API call.
 * - `notfound@*` → email not found
 * - Otherwise    → success
 */
export async function simulateForgotPassword(
    email: string,
): Promise<AuthResponse<{ email: string }>> {
    await randomDelay();

    if (email.toLowerCase().startsWith("notfound@")) return forgotPasswordErrors.emailNotFound;
    return forgotPasswordSuccess;
}

/**
 * Simulate reset password API call.
 * - token "expired" → token expired
 * - token "invalid" → invalid token
 * - Otherwise       → success
 */
export async function simulateResetPassword(
    token: string,
    _newPassword: string,
): Promise<AuthResponse<null>> {
    await randomDelay();

    if (token === "expired") return resetPasswordErrors.tokenExpired;
    if (token === "invalid") return resetPasswordErrors.invalidToken;
    return resetPasswordSuccess;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  SUMMARY UTILITIES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** Get all available login error scenarios */
export function getLoginErrorScenarios() {
    return Object.entries(loginErrors).map(([key, error]) => ({
        key,
        code: error.code,
        message: error.message,
        testEmail: key === "invalidCredentials" ? "wrong@test.com"
            : key === "accountLocked" ? "user@locked.com"
            : key === "accountBanned" ? "user@banned.com"
            : key === "accountPending" ? "employer@pending.com"
            : key === "tooManyAttempts" ? "user@locked.com"
            : "any@test.com",
    }));
}

/** Get all fixture counts for documentation */
export function getAuthFixtureSummary() {
    return {
        loginSuccess: Object.keys(loginSuccess).length,
        loginErrors: Object.keys(loginErrors).length,
        registerSuccess: Object.keys(registerSuccess).length,
        registerErrors: Object.keys(registerErrors).length,
        forgotPasswordErrors: Object.keys(forgotPasswordErrors).length,
        resetPasswordErrors: Object.keys(resetPasswordErrors).length,
        totalFixtures:
            Object.keys(loginSuccess).length +
            Object.keys(loginErrors).length +
            Object.keys(registerSuccess).length +
            Object.keys(registerErrors).length +
            1 + // forgotPasswordSuccess
            Object.keys(forgotPasswordErrors).length +
            1 + // resetPasswordSuccess
            Object.keys(resetPasswordErrors).length,
    };
}
