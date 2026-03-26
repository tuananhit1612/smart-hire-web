# 🎨 SmartHire — Hướng dẫn chuyển Frontend sang Figma

> Tài liệu hướng dẫn capture toàn bộ giao diện SmartHire App vào Figma  
> sử dụng **html.to.design Chrome Extension** (chạy trực tiếp trên localhost, không cần tunnel).

---

## 📋 Mục lục

1. [Yêu cầu chuẩn bị](#-yêu-cầu-chuẩn-bị)
2. [Hướng dẫn từng bước](#-hướng-dẫn-từng-bước)
3. [Cài đặt Extension đúng cách](#-cài-đặt-extension-đúng-cách)
4. [Danh sách Routes cần capture](#-danh-sách-routes-cần-capture)
5. [Tổ chức file Figma](#-tổ-chức-file-figma)
6. [Tips & Lưu ý](#-tips--lưu-ý)

---

## 🛠 Yêu cầu chuẩn bị

| Tool | Mô tả | Link |
|------|--------|------|
| **Node.js** | Runtime cho app | Đã cài sẵn |
| **Google Chrome** | Trình duyệt để chạy extension | Đã cài sẵn |
| **Figma** | Công cụ design (free) | [figma.com](https://www.figma.com) |
| **html.to.design Chrome Extension** | Capture web → Figma | [Cài extension](https://chrome.google.com/webstore/detail/htmltodesign/ldnheaepmnmbjjjahokphckbpgciiaed) |
| **html.to.design Figma Plugin** | Nhận data từ extension | [Cài plugin](https://www.figma.com/community/plugin/1159123024924461424) |

> 💡 Cần cài **cả Chrome Extension VÀ Figma Plugin** để hoạt động.

---

## 🚀 Hướng dẫn từng bước

### Bước 1: Chạy app trên localhost

```bash
# Mở terminal tại thư mục dự án
cd "d:\Đồ Án\J2EE\smarthire-app"

# Cài dependencies (nếu chưa)
npm install

# Chạy dev server
npm run dev
```

✅ App sẽ chạy tại: `http://localhost:3000`

---

### Bước 2: Cài html.to.design

**Chrome Extension** (chạy trên trình duyệt — capture localhost):
1. Mở Chrome → truy cập [Chrome Web Store](https://chrome.google.com/webstore/detail/htmltodesign/ldnheaepmnmbjjjahokphckbpgciiaed)
2. Bấm **"Add to Chrome"** → xác nhận cài đặt
3. Pin extension lên thanh toolbar để dễ truy cập

**Figma Plugin** (nhận data từ extension):
1. Mở **Figma** → tạo file mới
2. Main Menu → **Plugins** → **Browse plugins in Community**
3. Tìm **"html.to.design"** → bấm **Install**

---

### Bước 3: Capture từng trang

1. Mở **Chrome** → truy cập `http://localhost:3000` (hoặc route cần capture)
2. Bấm vào **icon html.to.design** trên thanh extension Chrome
3. **Cài đặt đúng** (xem phần bên dưới) → bấm **"Capture Current Page"**
4. Chọn **"Send directly to Figma plugin"** để gửi thẳng vào Figma
5. Mở **Figma** → plugin sẽ tự nhận data và tạo editable layers
6. **Đổi tên frame** theo tên trang (ví dụ: "Login Page")
7. **Lặp lại** cho từng route trong danh sách bên dưới

---

## ⚙️ Cài đặt Extension đúng cách

### Capture chỉ 1 phiên bản (Light HOẶC Dark)

**Viewports** (bên trái):
- ✅ Browser (kích thước hiện tại)
- ❌ Bỏ hết các size khác (1920, 1440, 1024, 768, 390)

**Themes** (bên phải):
- ❌ Browser theme → **BỎ TICK**
- ✅ Light → tick
- ❌ Dark → bỏ tick

→ Kết quả: **1 frame duy nhất** (Light mode)

---

### Capture cả 2 phiên bản Light + Dark

**Viewports** (bên trái):
- ✅ Browser (kích thước hiện tại)
- ❌ Bỏ hết các size khác

**Themes** (bên phải):
- ❌ Browser theme → **BỎ TICK** (quan trọng! nếu tick sẽ ra 3 bản)
- ✅ Light → tick
- ✅ Dark → tick

→ Kết quả: **2 frame** (Light + Dark)

---

### Save location

| Option | Mô tả | Khi nào dùng |
|--------|--------|-------------|
| **Save .h2d file locally** | Download file `.h2d` → import thủ công vào Figma plugin | Muốn lưu backup |
| **Send directly to Figma plugin** ⭐ | Gửi thẳng vào Figma, không cần download | **Khuyên dùng** — nhanh hơn |

---

## 📄 Danh sách Routes cần capture

> Mở từng URL trên Chrome, bấm extension capture.  
> URL base: `http://localhost:3000`

### 🏠 Nhóm 1: Trang công khai (Public Pages)
> Layout: Header + Content + Footer  
> **Không cần đăng nhập**

| # | URL | Trang | Ghi chú |
|---|-----|-------|---------|
| 1 | `localhost:3000/` | **Trang chủ** | Landing page chính |
| 2 | `localhost:3000/ai-job-search` | **AI Tìm việc** | Công cụ tìm kiếm việc bằng AI |
| 3 | `localhost:3000/ai-job-application` | **AI Ứng tuyển** | Hỗ trợ ứng tuyển bằng AI |
| 4 | `localhost:3000/ai-resume-builder` | **AI Tạo CV** | Tạo CV bằng AI |
| 5 | `localhost:3000/ai-cover-letter-generator` | **AI Thư xin việc** | Tạo cover letter bằng AI |
| 6 | `localhost:3000/faqs` | **FAQs** | Câu hỏi thường gặp |

---

### 🔐 Nhóm 2: Trang xác thực (Auth Pages)
> Layout: Standalone (không Header/Footer)  
> **Không cần đăng nhập**

| # | URL | Trang | Ghi chú |
|---|-----|-------|---------|
| 7 | `localhost:3000/login` | **Đăng nhập** | Form login ứng viên |
| 8 | `localhost:3000/register` | **Đăng ký** | Form đăng ký tài khoản |
| 9 | `localhost:3000/forgot-password` | **Quên mật khẩu** | Form nhập email |
| 10 | `localhost:3000/reset-password` | **Đặt lại mật khẩu** | Form đặt password mới |
| 11 | `localhost:3000/admin-login` | **Admin đăng nhập** | Form login admin |

---

### 👤 Nhóm 3: Dashboard — Ứng viên (Candidate)
> Layout: Sidebar + Topbar + Content  
> ⚠️ **CẦN ĐĂNG NHẬP trước** — đăng nhập 1 lần trên localhost, sau đó capture các trang

| # | URL | Trang | Ghi chú |
|---|-----|-------|---------|
| 12 | `localhost:3000/dashboard` | **Dashboard chính** | Tổng quan cho ứng viên |
| 13 | `localhost:3000/profile` | **Hồ sơ cá nhân** | Xem profile |
| 14 | `localhost:3000/profile/edit` | **Chỉnh sửa hồ sơ** | Form edit profile |
| 15 | `localhost:3000/jobs` | **Danh sách việc làm** | Tìm việc |
| 16 | `localhost:3000/jobs/1` | **Chi tiết việc làm** | Thay `1` bằng ID thật |
| 17 | `localhost:3000/applications` | **Đơn ứng tuyển** | Danh sách đã ứng tuyển |
| 18 | `localhost:3000/cv-builder` | **Tạo CV** | CV Builder form |
| 19 | `localhost:3000/cv-files` | **Quản lý file CV** | Danh sách CV đã upload |
| 20 | `localhost:3000/cv-preview` | **Xem trước CV** | Preview CV |
| 21 | `localhost:3000/cv-templates` | **Mẫu CV** | Chọn template CV |
| 22 | `localhost:3000/upload-cv` | **Upload CV** | Upload file CV |
| 23 | `localhost:3000/notifications` | **Thông báo** | Danh sách notifications |

---

### 🎤 Nhóm 4: Phỏng vấn AI (Interview)
> Layout: Sidebar + Topbar + Content  
> ⚠️ **CẦN ĐĂNG NHẬP**

| # | URL | Trang | Ghi chú |
|---|-----|-------|---------|
| 24 | `localhost:3000/interview` | **Phỏng vấn** | Trang chính interview |
| 25 | `localhost:3000/interview/setup` | **Thiết lập PV** | Cấu hình phỏng vấn |
| 26 | `localhost:3000/interview/session` | **Phiên PV** | Phòng phỏng vấn AI |
| 27 | `localhost:3000/interview/result` | **Kết quả PV** | Kết quả sau phỏng vấn |
| 28 | `localhost:3000/interview/report` | **Báo cáo PV** | Báo cáo chi tiết |

---

### 🏢 Nhóm 5: Employer (Nhà tuyển dụng)
> Layout: Dashboard (Sidebar + Topbar)  
> ⚠️ **CẦN ĐĂNG NHẬP bằng tài khoản Employer**

| # | URL | Trang | Ghi chú |
|---|-----|-------|---------|
| 29 | `localhost:3000/employer/dashboard` | **Dashboard NTD** | Tổng quan nhà tuyển dụng |
| 30 | `localhost:3000/employer/jobs/1/applicants` | **DS ứng viên** | Thay `1` bằng job ID thật |
| 31 | `localhost:3000/employer/pipeline` | **Pipeline** | Quản lý pipeline tuyển dụng |
| 32 | `localhost:3000/employer/onboarding` | **Onboarding NTD** | Hướng dẫn bắt đầu cho NTD |
| 33 | `localhost:3000/hr/jobs` | **Quản lý tin tuyển dụng** | CRUD jobs |
| 34 | `localhost:3000/company-profile` | **Hồ sơ công ty** | Thông tin công ty |

---

### 🛡️ Nhóm 6: Admin
> ⚠️ **CẦN ĐĂNG NHẬP bằng tài khoản Admin** (qua `/admin-login`)

| # | URL | Trang | Ghi chú |
|---|-----|-------|---------|
| 35 | `localhost:3000/admin/dashboard` | **Admin Dashboard** | Tổng quan quản trị |
| 36 | `localhost:3000/admin/users` | **Quản lý Users** | CRUD users |
| 37 | `localhost:3000/admin/settings` | **Cài đặt hệ thống** | System settings |
| 38 | `localhost:3000/admin/audit-log` | **Nhật ký hoạt động** | Audit log |

---

### 📝 Nhóm 7: Onboarding

| # | URL | Trang | Ghi chú |
|---|-----|-------|---------|
| 39 | `localhost:3000/dashboard/onboarding` | **Onboarding UV** | Hướng dẫn bắt đầu cho ứng viên |

---

## 📁 Tổ chức file Figma

Sau khi capture xong, tổ chức file Figma như sau:

```
📁 SmartHire Design System
├── 📄 Page: Public Pages
│   ├── Frame: Homepage (Light + Dark)
│   ├── Frame: AI Job Search (Light + Dark)
│   ├── Frame: AI Job Application (Light + Dark)
│   ├── Frame: AI Resume Builder (Light + Dark)
│   ├── Frame: AI Cover Letter (Light + Dark)
│   └── Frame: FAQs (Light + Dark)
│
├── 📄 Page: Auth
│   ├── Frame: Login (Light + Dark)
│   ├── Frame: Register (Light + Dark)
│   ├── Frame: Forgot Password (Light + Dark)
│   ├── Frame: Reset Password (Light + Dark)
│   └── Frame: Admin Login (Light + Dark)
│
├── 📄 Page: Candidate Dashboard
│   ├── Frame: Dashboard (Light + Dark)
│   ├── Frame: Profile (Light + Dark)
│   ├── Frame: Profile Edit (Light + Dark)
│   ├── Frame: Jobs List (Light + Dark)
│   ├── Frame: Job Detail (Light + Dark)
│   ├── Frame: Applications (Light + Dark)
│   ├── Frame: CV Builder (Light + Dark)
│   ├── Frame: CV Files (Light + Dark)
│   ├── Frame: CV Preview (Light + Dark)
│   ├── Frame: CV Templates (Light + Dark)
│   ├── Frame: Upload CV (Light + Dark)
│   └── Frame: Notifications (Light + Dark)
│
├── 📄 Page: Interview
│   ├── Frame: Interview Home (Light + Dark)
│   ├── Frame: Interview Setup (Light + Dark)
│   ├── Frame: Interview Session (Light + Dark)
│   ├── Frame: Interview Result (Light + Dark)
│   └── Frame: Interview Report (Light + Dark)
│
├── 📄 Page: Employer
│   ├── Frame: Employer Dashboard (Light + Dark)
│   ├── Frame: Applicants (Light + Dark)
│   ├── Frame: Pipeline (Light + Dark)
│   ├── Frame: Employer Onboarding (Light + Dark)
│   ├── Frame: HR Jobs (Light + Dark)
│   └── Frame: Company Profile (Light + Dark)
│
├── 📄 Page: Admin
│   ├── Frame: Admin Dashboard (Light + Dark)
│   ├── Frame: Users Management (Light + Dark)
│   ├── Frame: Settings (Light + Dark)
│   └── Frame: Audit Log (Light + Dark)
│
└── 📄 Page: Onboarding
    └── Frame: Candidate Onboarding (Light + Dark)
```

---

## 💡 Tips & Lưu ý

### Thứ tự capture hiệu quả nhất

1. **Capture trang Public trước** (1–6) — không cần login
2. **Capture trang Auth** (7–11) — cũng không cần login  
3. **Đăng nhập Candidate** trên Chrome → capture nhóm 3, 4 (12–28)
4. **Đăng nhập Employer** trên Chrome → capture nhóm 5 (29–34)
5. **Đăng nhập Admin** (qua `/admin-login`) → capture nhóm 6 (35–38)

### Phím tắt

| Phím tắt | Chức năng |
|----------|-----------|
| `Alt + Shift + E` | Capture Current Page |
| `Alt + Shift + D` | Capture Selection |

### Sau khi capture

- **Đổi tên frame** ngay sau khi capture (dễ tìm lại)
- **Sắp xếp** các frame theo thứ tự logic trong mỗi Page
- **Kiểm tra fonts** — có thể cần cài Google Fonts vào Figma
- **Clean up layers** — xóa layers thừa, gộp group

### Xử lý trang cần đăng nhập

1. Mở `localhost:3000/login` trên **Chrome**
2. Đăng nhập bằng tài khoản tương ứng
3. Truy cập từng trang dashboard trên Chrome để xác nhận hiển thị đúng
4. Bấm **extension icon** → **Capture Current Page**
5. Extension capture trực tiếp từ Chrome — **không cần tunnel hay URL public**

### Lưu ý quan trọng

- ⚠️ **Giữ terminal chạy** — cần `npm run dev` đang chạy trong suốt quá trình
- ⚠️ **Bỏ tick "Browser theme"** trong Themes — nếu tick sẽ ra thêm 1 bản thừa
- ⚠️ **Trang dynamic** (job detail, applicants) cần có data mock — kiểm tra trước khi capture
- ⚠️ **Mỗi lần capture** tạo 2 frame (Light + Dark) → tổng 78 frames cho 39 trang

---

## ⏱ Ước tính thời gian

| Công việc | Thời gian |
|-----------|-----------|
| Setup (extension + plugin) | ~ 3 phút |
| Capture 39 trang (Light + Dark) | ~ 30–45 phút |
| Đổi tên + sắp xếp | ~ 15 phút |
| **Tổng cộng** | **~ 1 tiếng** |

---

> 📌 **File này được tạo tự động từ source code của SmartHire App.**  
> Cập nhật lần cuối: 2026-03-20
