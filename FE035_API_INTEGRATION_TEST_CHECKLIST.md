# FE035 - API Integration Test Checklist

Checklist này dành cho quá trình tích hợp và kiểm thử API giữa Frontend và Backend. Cần đảm bảo các API client trong thư mục `src/features/*/api` map đúng theo tài liệu `API_DOCUMENTATION.md` và `FE_API_INTEGRATION_GUIDE.md`.

## 1. Global Setup (Axios/Fetch Client)
- [ ] `NEXT_PUBLIC_API_URL` đã được cấu hình đúng.
- [ ] Interceptor tự động attach token vào header (`Authorization: Bearer <token>`).
- [ ] Interceptor tự động refresh token khi nhận status `401 Unauthorized` (nếu route yêu cầu).
- [ ] API helper handle được Response envelope chuẩn (`{ success, code, data, message, errors }`).
- [ ] Global Error Handling hiển thị toast hợp lý khi BE trả về lỗi validation hoặc server error.

## 2. Auth API (`auth-api.ts`)
- [ ] `POST /auth/login` (Returns token & auth data).
- [ ] `POST /auth/register` (Registration flow).
- [ ] `POST /auth/refresh-token` (Refresh token internally).
- [ ] `POST /auth/forgot-password` (Forgot password send email).
- [ ] `POST /auth/reset-password` (Reset password confirmation).
- [ ] `GET /auth/me` (Lấy thông tin profile hiện tại - Authentication Guard).
- [ ] `PUT /auth/me` (Cập nhật profile name/phone).
- [ ] `POST /auth/change-password` (Change logged in user password).
- [ ] `POST /users/me/avatar` (Upload avatar form-data).

## 3. Profile API (Candidate) (`profile-api.ts`)
- [ ] **Profile**: `GET`, `POST`, `PUT` `/candidate/profile`.
- [ ] **Educations**: `GET`, `POST`, `PUT`, `DELETE` `/candidate/profile/educations`.
- [ ] **Experiences**: `GET`, `POST`, `PUT`, `DELETE` `/candidate/profile/experiences`.
- [ ] **Projects**: `GET`, `POST`, `PUT`, `DELETE` `/candidate/profile/projects`.
- [ ] **Skills**: `GET`, `POST`, `PUT`, `DELETE` `/candidate/profile/skills`.
- [ ] **CV Files**: `GET`, `POST`, `DELETE` `/candidate/profile/cv-files`.
- [ ] `PUT /candidate/profile/cv-files/:id/primary` (Set primary CV).
- [ ] `GET /candidate/profile/cv-files/:id/download` (Download CV - blob).

## 4. Job API (`job-api.ts`)
- [ ] `GET /public/jobs` (Tìm kiếm, filter, pagination).
- [ ] `GET /public/jobs/:id` (Chi tiết Job cho Candidate xem).
- [ ] *[Missing Client]* `POST /public/jobs/:id/apply` (Nộp đơn trực tiếp form data - Cần thêm vào public api).
- [ ] *[Missing Client]* `GET, POST, PUT, DELETE /jobs` (Protected HR Jobs - Cần tạo `hr-job-api.ts`).

## 5. Application API (`application-api.ts`)
- [ ] `POST /applications/apply` (Submit CV cho application mới).
- [ ] `GET /applications` (Load danh sách paginated).
- [ ] `GET /applications/me` (Load danh sách flat list).
- [ ] `GET /applications/:id` (Chi tiết tracking history).
- [ ] `DELETE /applications/:id` (Withdraw application).

## 6. Dashboard & Employer API (`dashboard-api.ts` & `employer-api.ts`)
- [ ] `GET /dashboard/hr/overview` (Load aggregated stats).
- [ ] `GET /dashboard/hr/jobs/:id/stats` (Per-job metrics).
- [ ] `GET /employer/jobs/:id/applicants` (List applicants cho Employer view).
- [ ] `GET /employer/jobs/:id/applicants/:applicantId` (Applicant details).
- [ ] `PATCH /employer/jobs/:id/applicants/:applicantId/stage` (Move stage pipeline).
- [ ] `POST /employer/jobs/:id/applicants/:applicantId/re-analyze` (AI matching).

## 7. Các API Còn Thiếu (Need Mapping Client)
Các endpoint sau đây có trên backend nhưng chưa thấy thư mục api client ở frontend:
- [ ] **Admin Users** (`/api/v1/admin/users`)
- [ ] **Companies CRUD** (`/api/v1/companies`)
- [ ] **HR Jobs Setup** (`/api/v1/jobs` - protected endpoints)
- [ ] **Interviews** (Scheduling /api/v1/interviews - nếu có)
- [ ] **Notifications**

---
**Lưu ý:** FE/QA dùng file này để đối chiếu khi viết integration spec (Jest/Cypress/Playwright) hoặc check thủ công (Postman/UI). Mọi request phải trả về đúng cấu trúc DTO như định nghĩa trong `FE_API_INTEGRATION_GUIDE.md`.
