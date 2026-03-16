# SmartHire AI - Nền tảng Tuyển dụng thông minh

SmartHire là một nền tảng tuyển dụng thế hệ mới tích hợp Trí tuệ Nhân tạo (AI), giúp kết nối Ứng viên (Candidate) và Nhà tuyển dụng (Employer) một cách thông minh, tự động hóa quy trình phỏng vấn và đánh giá năng lực.

*Hiện tại dự án đã hoàn thành **Giai đoạn 1 (Phase 1): Full Frontend UI/UX & Mock Data Lifecycle**.*

---

## 🚀 Các Tính Năng Nổi Bật (Features)

Toàn bộ các luồng giao diện đều được thiết kế chỉn chu với **Tailwind CSS**, animation mượt mà bằng **Framer Motion** và đã có sẵn dữ liệu mẫu (Mock Data).

### 1. Hệ thống Xác thực & Phân quyền (Authentication & Authorization)
- **Role-based Auth:** Hỗ trợ 3 vai trò riêng biệt (Ứng viên, Nhà tuyển dụng, Quản trị viên).
- **Next.js Middleware:** Bảo vệ các Private Routes dựa trên Role. (Ví dụ: `employer` không thể vào `/admin/`, chưa đăng nhập bị tự động trả về trang `/login` cùng với `callbackUrl`).
- **Session Persistence:** State đăng nhập được lưu ở cả `localStorage` (client) và `cookies` (edge middleware) giúp giữ session khi F5 reload. Skeleton Loading mượt mà trong quá trình check session.

### 2. Dành cho Ứng Viên (Candidate Portal)
- **Tìm kiếm việc làm:** Danh sách công việc phong phú, bộ lọc, xem chi tiết Job Description.
- **Smart CV Builder:** 
  - Khung tạo CV kéo thả (Drag & Drop), chia step.
  - Cho phép xem trước (Preview) với thao tác Pan, Zoom.
  - Tính năng AI Auto-fill điền dữ liệu mẫu.
  - Xuất file định dạng PDF chất lượng cao.
- **AI Mock Interview (Phỏng Vấn Giả Lập):** 
  - Giao diện phòng phỏng vấn chat trực tiếp với AI.
  - Có Typing indicator (AI đang code/suy nghĩ), progress bar, hints.
  - Màn hình kết quả (Result) phân tích đa chiều bằng màn hình điểm tổng quan (Circular Progress bar) và Rubric Score (Kĩ năng, Hành vi, Tình huống).

### 3. Dành cho Nhà Tuyển Dụng (Employer / HR Portal)
- **Theo dõi ứng viên (ATS Pipeline):** Quản lý trạng thái hồ sơ (Mới nộp, Đang duyệt, Phỏng vấn, Từ chối, Đã tuyển) bằng giao diện list card.
- **AI Match Score (Phân Tích Độ Khớp):**
  - Đánh giá hồ sơ tự động so với Job Description.
  - Giao diện Điểm số Vòng tròn (Circular Score biểu thị %).
  - Score Breakdown (Biểu đồ thanh phân tích chi tiết: Kỹ năng, Kinh nghiệm, Văn hóa).
  - Tóm tắt AI (Điểm mạnh & Gaps cần cải thiện).
- **Applicant Drawer:** Modal xem chi tiết ứng viên, xem CV dạng inline, chuyển đổi trạng thái (Duyệt/Loại) trực tiếp.

### 4. Dành cho Quản Trị Viên (Admin Portal)
- **Bảng điều khiển (Dashboard):** Thống kê số liệu, đồ thị.
- **Audit Logs:** Theo dõi lịch sử hoạt động hệ thống.
- **Dark Mode UI:** Theme đặc biệt dành cho Dashboard admin.

---

## 💻 Công Nghệ Sử Dụng (Tech Stack)

- **Framework:** [Next.js 14](https://nextjs.org/) (App Directory)
- **Ngôn ngữ:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Export PDF:** html2pdf.js

---

## 🛠 Hướng dẫn Cài đặt & Chạy Local

Bạn cần cài đặt Node.js (phiên bản 18+ khuyến nghị).

1. **Clone repository:**
   ```bash
   git clone https://github.com/Smart-Hire-AI/smarthire-app.git
   cd smarthire-app
   ```

2. **Cài đặt dependencies:**
   ```bash
   npm install
   # hoặc yarn install / pnpm install
   ```

3. **Chạy Development Server:**
   ```bash
   npm run dev
   # hoặc yarn dev / pnpm dev
   ```

4. **Trải nghiệm:**
   Mở trình duyệt và truy cập [http://localhost:3000](http://localhost:3000).

---

## 📌 Roadmap (Định hướng tiếp theo)

1. **Backend Integration:** Xây dựng server (NodeJS/Java/Python...) và tích hợp API thực tế sử dụng `React Query` hoặc `Axios`, thay thế cho JSON mock data.
2. **Landing Page:** Thiết kế trang chủ quảng bá marketing (Hero, Features, Testimonials, CTA).
3. **Database:** Dựng Database PostgreSQL/MongoDB.
4. **Realtime Websocket:** Cho luồng chat / notification / AI Interview qua giọng nói (WebRTC + Speech to Text).
