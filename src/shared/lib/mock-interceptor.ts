/**
 * ═══════════════════════════════════════════════════════════
 *  MOCK INTERCEPTOR — Intercepts ALL axios requests and
 *  returns fake data for GitHub Pages static demo.
 *
 *  This must be imported ONCE at app startup to activate.
 * ═══════════════════════════════════════════════════════════
 */

import { apiClient } from "./api-client";
import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import {
  MOCK_CANDIDATE_USER,
  MOCK_HR_USER,
  MOCK_LOGIN_RESPONSE,
  MOCK_JOBS,
  MOCK_APPLICATIONS,
  MOCK_COMPANY,
  MOCK_HR_DASHBOARD,
  MOCK_CANDIDATE_DASHBOARD,
  MOCK_CV_DATA,
  MOCK_NOTIFICATIONS,
  MOCK_PROFILE_EDUCATIONS,
  MOCK_PROFILE_EXPERIENCES,
  MOCK_PROFILE_SKILLS,
  MOCK_PROFILE_PROJECTS,
} from "./mock-data";

// ─── Helpers ─────────────────────────────────────────────

function wrap<T>(data: T, message = "Success") {
  return { success: true, code: "200", data, message };
}

function fakeResponse<T>(data: T, config: InternalAxiosRequestConfig): AxiosResponse<T> {
  return {
    data,
    status: 200,
    statusText: "OK",
    headers: {},
    config,
  };
}

// Detect current user role from localStorage mock session
function getCurrentRole(): string {
  if (typeof window === "undefined") return "CANDIDATE";
  try {
    const session = localStorage.getItem("smarthire-session");
    if (session) {
      const parsed = JSON.parse(session);
      return (parsed.role || "CANDIDATE").toUpperCase();
    }
  } catch { /* ignore */ }
  return "CANDIDATE";
}

// ─── Route Matcher ───────────────────────────────────────

type MockHandler = (config: InternalAxiosRequestConfig) => AxiosResponse;

const mockRoutes: { method: string; pattern: RegExp; handler: MockHandler }[] = [
  // ── Auth ──
  {
    method: "post",
    pattern: /\/auth\/login$/,
    handler: (config) => fakeResponse(wrap(MOCK_LOGIN_RESPONSE), config),
  },
  {
    method: "post",
    pattern: /\/auth\/register$/,
    handler: (config) => fakeResponse(wrap(MOCK_LOGIN_RESPONSE), config),
  },
  {
    method: "post",
    pattern: /\/auth\/refresh-token$/,
    handler: (config) => fakeResponse(wrap(MOCK_LOGIN_RESPONSE), config),
  },
  {
    method: "post",
    pattern: /\/auth\/forgot-password$/,
    handler: (config) => fakeResponse(wrap(undefined, "Email đặt lại mật khẩu đã được gửi."), config),
  },
  {
    method: "post",
    pattern: /\/auth\/reset-password$/,
    handler: (config) => fakeResponse(wrap(undefined, "Mật khẩu đã được đặt lại thành công."), config),
  },
  {
    method: "get",
    pattern: /\/auth\/verify-reset-token/,
    handler: (config) => fakeResponse(wrap(undefined, "Token hợp lệ."), config),
  },
  {
    method: "get",
    pattern: /\/auth\/me$/,
    handler: (config) => {
      const role = getCurrentRole();
      const user = role === "HR" ? MOCK_HR_USER : MOCK_CANDIDATE_USER;
      return fakeResponse(wrap(user), config);
    },
  },
  {
    method: "put",
    pattern: /\/auth\/me$/,
    handler: (config) => fakeResponse(wrap(MOCK_CANDIDATE_USER), config),
  },
  {
    method: "post",
    pattern: /\/auth\/change-password$/,
    handler: (config) => fakeResponse(wrap(undefined, "Mật khẩu đã được thay đổi."), config),
  },
  {
    method: "post",
    pattern: /\/auth\/me\/avatar$/,
    handler: (config) => fakeResponse(wrap("https://via.placeholder.com/150"), config),
  },

  // ── Jobs ──
  {
    method: "get",
    pattern: /\/public\/jobs$/,
    handler: (config) => fakeResponse(wrap(MOCK_JOBS), config),
  },
  {
    method: "get",
    pattern: /\/public\/jobs\/\d+$/,
    handler: (config) => {
      const url = config.url || "";
      const idMatch = url.match(/\/public\/jobs\/(\d+)/);
      const id = idMatch ? parseInt(idMatch[1]) : 1;
      const job = MOCK_JOBS.find((j) => j.id === id) || MOCK_JOBS[0];
      return fakeResponse(wrap(job), config);
    },
  },

  // ── HR Job Management ──
  {
    method: "get",
    pattern: /\/jobs$/,
    handler: (config) => fakeResponse(wrap(MOCK_JOBS.slice(0, 3)), config),
  },
  {
    method: "post",
    pattern: /\/jobs$/,
    handler: (config) => fakeResponse(wrap(MOCK_JOBS[0]), config),
  },
  {
    method: "put",
    pattern: /\/jobs\/\d+$/,
    handler: (config) => fakeResponse(wrap(MOCK_JOBS[0]), config),
  },
  {
    method: "delete",
    pattern: /\/jobs\/\d+$/,
    handler: (config) => fakeResponse(wrap(undefined, "Đã xoá thành công."), config),
  },

  // ── Applications ──
  {
    method: "get",
    pattern: /\/applications/,
    handler: (config) => fakeResponse(wrap(MOCK_APPLICATIONS), config),
  },
  {
    method: "post",
    pattern: /\/applications/,
    handler: (config) => fakeResponse(wrap(MOCK_APPLICATIONS[0]), config),
  },
  {
    method: "put",
    pattern: /\/applications/,
    handler: (config) => fakeResponse(wrap(MOCK_APPLICATIONS[0]), config),
  },
  {
    method: "patch",
    pattern: /\/applications/,
    handler: (config) => fakeResponse(wrap(MOCK_APPLICATIONS[0]), config),
  },

  // ── Company ──
  {
    method: "get",
    pattern: /\/companies/,
    handler: (config) => fakeResponse(wrap(MOCK_COMPANY), config),
  },
  {
    method: "post",
    pattern: /\/companies/,
    handler: (config) => fakeResponse(wrap(MOCK_COMPANY), config),
  },
  {
    method: "put",
    pattern: /\/companies/,
    handler: (config) => fakeResponse(wrap(MOCK_COMPANY), config),
  },
  {
    method: "delete",
    pattern: /\/companies/,
    handler: (config) => fakeResponse(wrap(undefined, "Đã xoá."), config),
  },

  // ── Dashboard ──
  {
    method: "get",
    pattern: /\/dashboard\/hr/,
    handler: (config) => fakeResponse(wrap(MOCK_HR_DASHBOARD), config),
  },
  {
    method: "get",
    pattern: /\/dashboard\/candidate/,
    handler: (config) => fakeResponse(wrap(MOCK_CANDIDATE_DASHBOARD), config),
  },
  {
    method: "get",
    pattern: /\/dashboard/,
    handler: (config) => {
      const role = getCurrentRole();
      const data = role === "HR" ? MOCK_HR_DASHBOARD : MOCK_CANDIDATE_DASHBOARD;
      return fakeResponse(wrap(data), config);
    },
  },

  // ── CV / Resume ──
  {
    method: "get",
    pattern: /\/cv-builder/,
    handler: (config) => fakeResponse(wrap(MOCK_CV_DATA), config),
  },
  {
    method: "post",
    pattern: /\/cv-builder/,
    handler: (config) => fakeResponse(wrap({ id: 1, ...MOCK_CV_DATA }), config),
  },
  {
    method: "put",
    pattern: /\/cv-builder/,
    handler: (config) => fakeResponse(wrap({ id: 1, ...MOCK_CV_DATA }), config),
  },
  {
    method: "get",
    pattern: /\/cv-files/,
    handler: (config) =>
      fakeResponse(
        wrap([
          { id: 1, fileName: "NguyenVanAn_CV.pdf", fileType: "PDF", source: "UPLOAD", createdAt: "2025-04-01T10:00:00Z" },
          { id: 2, fileName: "SmartHire_Resume.pdf", fileType: "PDF", source: "BUILDER", createdAt: "2025-04-05T14:00:00Z" },
        ]),
        config
      ),
  },
  {
    method: "post",
    pattern: /\/cv\/parse/,
    handler: (config) => fakeResponse(wrap(MOCK_CV_DATA), config),
  },

  // ── Profile sections ──
  {
    method: "get",
    pattern: /\/users\/me\/educations/,
    handler: (config) => fakeResponse(wrap(MOCK_PROFILE_EDUCATIONS), config),
  },
  {
    method: "get",
    pattern: /\/users\/me\/experiences/,
    handler: (config) => fakeResponse(wrap(MOCK_PROFILE_EXPERIENCES), config),
  },
  {
    method: "get",
    pattern: /\/users\/me\/skills/,
    handler: (config) => fakeResponse(wrap(MOCK_PROFILE_SKILLS), config),
  },
  {
    method: "get",
    pattern: /\/users\/me\/projects/,
    handler: (config) => fakeResponse(wrap(MOCK_PROFILE_PROJECTS), config),
  },
  {
    method: "post",
    pattern: /\/users\/me\/(educations|experiences|skills|projects)/,
    handler: (config) => fakeResponse(wrap({ id: Date.now() }), config),
  },
  {
    method: "put",
    pattern: /\/users\/me\/(educations|experiences|skills|projects)/,
    handler: (config) => fakeResponse(wrap({ id: 1 }), config),
  },
  {
    method: "delete",
    pattern: /\/users\/me\/(educations|experiences|skills|projects)/,
    handler: (config) => fakeResponse(wrap(undefined, "Đã xoá."), config),
  },
  {
    method: "put",
    pattern: /\/users\/me$/,
    handler: (config) => fakeResponse(wrap(MOCK_CANDIDATE_USER), config),
  },

  // ── Onboarding ──
  {
    method: "post",
    pattern: /\/onboarding/,
    handler: (config) => fakeResponse(wrap(undefined, "Onboarding hoàn tất."), config),
  },
  {
    method: "get",
    pattern: /\/onboarding/,
    handler: (config) => fakeResponse(wrap({ status: "COMPLETED" }), config),
  },

  // ── Notifications ──
  {
    method: "get",
    pattern: /\/notifications/,
    handler: (config) => fakeResponse(wrap(MOCK_NOTIFICATIONS), config),
  },

  // ── Interviews ──
  {
    method: "get",
    pattern: /\/interviews/,
    handler: (config) => fakeResponse(wrap([]), config),
  },
  {
    method: "post",
    pattern: /\/interviews/,
    handler: (config) => fakeResponse(wrap({ id: 1 }), config),
  },
];

// ─── Install Interceptor ─────────────────────────────────

let installed = false;

export function installMockInterceptor() {
  if (installed) return;
  installed = true;

  console.log(
    "%c🎭 SmartHire Demo Mode — All API calls are mocked",
    "color: #f59e0b; font-size: 14px; font-weight: bold;"
  );

  apiClient.interceptors.request.use((config) => {
    const url = config.url || "";
    const method = (config.method || "get").toLowerCase();

    for (const route of mockRoutes) {
      if (route.method === method && route.pattern.test(url)) {
        // Return a resolved promise adapter to short-circuit the real request
        config.adapter = () =>
          Promise.resolve(route.handler(config));
        return config;
      }
    }

    // Fallback: return a generic empty success for any unmatched route
    config.adapter = () =>
      Promise.resolve(
        fakeResponse(wrap(null, "Mock: No specific handler"), config)
      );
    return config;
  });
}
