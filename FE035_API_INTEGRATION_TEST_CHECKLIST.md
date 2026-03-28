# FE035 - API Integration Test Checklist

Checklist này dành cho quá trình tích hợp và kiểm thử API giữa Frontend và Backend. Cần đảm bảo các API client trong thư mục `src/features/*/api` map đúng theo tài liệu `API_DOCUMENTATION.md` và `FE_API_INTEGRATION_GUIDE.md`.

## 1. Global Setup (Axios/Fetch Client)
- [x] `NEXT_PUBLIC_API_URL` đã được cấu hình đúng. → `.env.local`
- [x] Interceptor tự động attach token vào header (`Authorization: Bearer <token>`). → `api-client.ts` L33-42
- [x] Interceptor tự động refresh token khi nhận status `401 Unauthorized` (nếu route yêu cầu). → `api-client.ts` L98-167
- [x] API helper handle được Response envelope chuẩn (`{ success, code, data, message, errors }`). → `shared/types/api.ts` (`ApiWrapper<T>`)
- [x] Global Error Handling hiển thị toast hợp lý khi BE trả về lỗi validation hoặc server error. → `api-error.ts` (`getErrorMessage()`)

## 2. Auth API (`auth-api.ts`)
- [x] `POST /auth/login` (Returns token & auth data).
- [x] `POST /auth/register` (Registration flow).
- [x] `POST /auth/refresh-token` (Refresh token internally).
- [x] `POST /auth/forgot-password` (Forgot password send email).
- [x] `POST /auth/reset-password` (Reset password confirmation).
- [x] `GET /auth/me` (Lấy thông tin profile hiện tại - Authentication Guard).
- [x] `PUT /auth/me` (Cập nhật profile name/phone).
- [x] `POST /auth/change-password` (Change logged in user password).
- [x] `POST /users/me/avatar` (Upload avatar form-data).

## 3. Profile API (Candidate) (`profile-api.ts`)
- [x] **Profile**: `GET`, `POST`, `PUT` `/candidate/profile`.
- [x] **Educations**: `GET`, `POST`, `PUT`, `DELETE` `/candidate/profile/educations`.
- [x] **Experiences**: `GET`, `POST`, `PUT`, `DELETE` `/candidate/profile/experiences`.
- [x] **Projects**: `GET`, `POST`, `PUT`, `DELETE` `/candidate/profile/projects`.
- [x] **Skills**: `GET`, `POST`, `PUT`, `DELETE` `/candidate/profile/skills`.
- [x] **CV Files**: `GET`, `POST`, `DELETE` `/candidate/profile/cv-files`.
- [x] `PUT /candidate/profile/cv-files/:id/primary` (Set primary CV).
- [x] `GET /candidate/profile/cv-files/:id/download` (Download CV - blob).

## 4. Job API (`job-api.ts`)
- [x] `GET /jobs/public` (Tìm kiếm, filter, pagination). → `job-api.ts` `search()`
- [x] `GET /jobs/public/:id` (Chi tiết Job cho Candidate xem). → `job-api.ts` `getDetail()`
- [x] `POST /applications/apply` (Nộp đơn — dùng `application-api.ts` thay vì public route).
- [x] `GET, POST, PUT, DELETE /jobs` (Protected HR Jobs). → `hr-job-api.ts` (full CRUD + status change)

## 5. Application API (`application-api.ts`)
- [x] `POST /applications/apply` (Submit CV cho application mới).
- [x] `GET /applications` (Load danh sách paginated).
- [x] `GET /applications/me` (Load danh sách flat list).
- [x] `GET /applications/:id` (Chi tiết tracking history).
- [x] `DELETE /applications/:id` (Withdraw application).

## 6. Dashboard & Employer API (`dashboard-api.ts` & `employer-api.ts`)
- [x] `GET /dashboard/hr/overview` (Load aggregated stats).
- [x] `GET /dashboard/hr/jobs/:id/stats` (Per-job metrics).
- [x] `GET /employer/jobs/:id/applicants` (List applicants cho Employer view).
- [x] `GET /employer/jobs/:id/applicants/:applicantId` (Applicant details).
- [x] `PATCH /employer/jobs/:id/applicants/:applicantId/stage` (Move stage pipeline).
- [x] `POST /employer/jobs/:id/applicants/:applicantId/re-analyze` (AI matching).

## 7. Các API Đã Bổ Sung (Previously Missing — Now Covered)
- [x] **Admin Users** (`/api/v1/admin/users`) → `admin-user-api.ts` (list, detail, status, role)
- [x] **Admin Dashboard** (`/api/v1/admin/dashboard`) → `admin-dashboard-api.ts` (overview, CSV exports)
- [x] **Companies CRUD** (`/api/v1/companies`) → `company-api.ts` (create, update, list, detail, logo, delete)
- [x] **HR Jobs Setup** (`/api/v1/jobs`) → `hr-job-api.ts` (CRUD + status change)
- [x] **Notifications** → `notification-api.ts` (list, unread-count, mark-read, mark-all-read)

---
**Lưu ý:** FE/QA dùng file này để đối chiếu khi viết integration spec (Jest/Cypress/Playwright) hoặc check thủ công (Postman/UI). Mọi request phải trả về đúng cấu trúc DTO như định nghĩa trong `FE_API_INTEGRATION_GUIDE.md`.
