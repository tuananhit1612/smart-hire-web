FUNCTIONAL REQUIREMENTS & USE CASES
1. Phạm vi hệ thống
Hệ thống gồm 3 vai trò:
Ứng viên (Candidate)


Nhà tuyển dụng/HR (Employer/HR)


Quản trị viên (Admin)


Hệ thống hỗ trợ toàn bộ vòng đời tuyển dụng:
 Tạo CV → Ứng tuyển → AI phân tích/chấm điểm → Sàng lọc → Phỏng vấn (AI/HR) → Kết quả → Thống kê/Thông báo

2. Chia module để làm việc team hiệu quả
Module 0: Nền tảng hệ thống (Core Platform)
Mục tiêu: đăng nhập, phân quyền, cấu trúc dữ liệu, nền tảng API.
M0.1 Authentication: đăng ký/đăng nhập/refresh token


M0.2 Authorization: RBAC (Candidate/HR/Admin)


M0.3 User profile base + upload file service (CV, avatar)


M0.4 Audit log (tùy chọn), cấu hình hệ thống


Deliverables: API auth + schema users/roles + middleware + storage file.

Module 1: Candidate Portal (Ứng viên)
Mục tiêu: hồ sơ, CV, ứng tuyển, theo dõi tiến trình.
M1.1 Quản lý hồ sơ ứng viên (thông tin cá nhân, kỹ năng, học vấn…)


M1.2 CV Builder (tạo CV theo form → export PDF)


M1.3 Upload CV & quản lý phiên bản CV


M1.4 Tìm việc + nộp hồ sơ + theo dõi trạng thái ứng tuyển


Deliverables: UI Candidate + APIs candidate_profile, cv_files, apply.

Module 2: Employer/HR Portal
Mục tiêu: công ty, job post, pipeline tuyển dụng.
M2.1 Hồ sơ công ty tuyển dụng


M2.2 Đăng tin tuyển dụng (Job/JD)


M2.3 Danh sách ứng viên ứng tuyển theo từng job


M2.4 Quản lý pipeline tuyển dụng (Applied/Screening/Interview/Offer/Hired/Rejected)


Deliverables: UI HR + APIs company, jobs, applications, stages.

Module 3: AI Service (LLM Local/Ollama)
Mục tiêu: AI phân tích CV, chấm điểm, gợi ý sửa, hỏi đáp phỏng vấn.
M3.1 CV Parsing (extract structured data)


M3.2 CV ↔ JD Matching & Scoring (có giải thích)


M3.3 CV Review (chỉ ra lỗi/thiếu + đề xuất sửa)


M3.4 Generate interview questions (theo CV/JD)


M3.5 Virtual Interview (chat) + evaluate answers


Deliverables: AI APIs + prompt templates + output JSON chuẩn.

Module 4: Realtime & Notification
Mục tiêu: cập nhật trạng thái realtime + thông báo.
M4.1 WebSocket realtime events (status update, new application…)


M4.2 Notification in-app (bell)


M4.3 Email notification (SMTP/service)


M4.4 Lịch phỏng vấn (tùy chọn)


Deliverables: WS gateway + events + notification center.

Module 5: Dashboard & Reporting
Mục tiêu: thống kê tiến trình tuyển dụng.
M5.1 Dashboard HR: số lượng ứng tuyển, tỉ lệ qua vòng, pipeline funnel


M5.2 Dashboard Admin: tổng quan hệ thống


M5.3 Export báo cáo (CSV/PDF) (tùy chọn)


Deliverables: charts + APIs aggregate.

3. Phụ thuộc module (để team làm song song)
Module 1,2 phụ thuộc Module 0 (auth, role, user base)


Module 3 có thể làm song song nhưng cần chuẩn schema input/output


Module 4 phụ thuộc Module 2 (pipeline events)


Module 5 phụ thuộc Module 2 + dữ liệu ứng tuyển


Gợi ý team 3 người:
Dev A: Module 0 + Module 4 (backend core + websocket/notify)


Dev B: Module 2 + Module 5 (HR + job + pipeline + dashboard)


Dev C: Module 1 + Module 3 (Candidate + CV + AI)



4. REQUIREMENTS (Yêu cầu chức năng)
4.1. Authentication & Authorization (M0)
FR-01 Hệ thống cho phép đăng ký tài khoản theo loại: Candidate/HR.
 FR-02 Đăng nhập bằng email + password, trả về JWT access/refresh token.
 FR-03 Phân quyền RBAC:
Candidate: chỉ thao tác dữ liệu cá nhân


HR: quản lý công ty, job, ứng viên ứng tuyển vào job của công ty


Admin: quản trị toàn hệ thống
 FR-04 Quên mật khẩu/đổi mật khẩu (Should).
 FR-05 Nhật ký thao tác quan trọng (Admin/HR) (Could).



4.2. Candidate Portal (M1)
FR-11 Candidate tạo/sửa hồ sơ ứng viên (profile).
 FR-12 Candidate tạo CV bằng form (CV Builder) và xuất PDF.
 FR-13 Candidate upload CV (PDF/DOCX) và quản lý nhiều phiên bản.
 FR-14 Candidate xem danh sách job, lọc theo keyword/location/level.
 FR-15 Candidate nộp hồ sơ vào job và theo dõi trạng thái theo pipeline.
 FR-16 Candidate nhận gợi ý job phù hợp (AI/Rule).

4.3. Employer/HR Portal (M2)
FR-21 HR tạo/sửa hồ sơ công ty.
 FR-22 HR đăng tin tuyển dụng: title, description, requirements, skills must-have/nice-to-have.
 FR-23 HR xem danh sách ứng viên đã apply cho từng job.
 FR-24 HR chuyển trạng thái ứng viên theo pipeline; ghi chú; đặt lịch phỏng vấn (Should).
 FR-25 HR xem điểm matching + giải thích điểm số do AI trả về.
 FR-26 HR nhận gợi ý ứng viên tiềm năng theo job.

4.4. AI Functions (M3)
FR-31 AI parsing CV → trả về JSON chuẩn: personal_info, education, experience, skills, projects…
 FR-32 AI matching CV↔JD → trả về:
score_total (0–100)


score_breakdown (skills_match, exp_match, semantic_match…)


strengths, gaps, recommendations


explanation ngắn gọn, dễ hiểu
 FR-33 AI review CV → chỉ ra lỗi/thiếu (format, keyword, logic, thiếu định lượng) + gợi ý rewrite theo section.
 FR-34 AI generate interview questions theo CV/JD (kỹ thuật + hành vi + tình huống).
 FR-35 Phỏng vấn ảo dạng chat: AI hỏi → user trả lời → AI chấm theo rubric (clarity, relevance, structure) + feedback.



4.5. Realtime & Notification (M4)
FR-41 Khi HR đổi trạng thái ứng viên, Candidate nhận realtime update (WebSocket).
 FR-42 Khi có ứng viên apply, HR nhận realtime event + notification.
 FR-43 Thông báo in-app: lưu lịch sử, đánh dấu đã đọc.
 FR-44 Email notification cho các sự kiện quan trọng: apply thành công, mời phỏng vấn, kết quả.

4.6. Dashboard & Reporting (M5)
FR-51 HR dashboard hiển thị:
tổng số ứng viên/job


funnel theo stage


tỉ lệ pass từng vòng


top skill thiếu so với job (nếu có)
 FR-52 Admin dashboard:


tổng user theo role


tổng job đăng


tải hệ thống / hoạt động (Could)



5. NON-FUNCTIONAL REQUIREMENTS (phi chức năng)
NFR-01 Security
JWT + refresh token; hash password (BCrypt)


RBAC kiểm soát endpoint


Validate upload file type/size (PDF/DOCX)


Log hoạt động HR/Admin


NFR-02 Performance
Danh sách job/applications phân trang


AI xử lý async (khuyến nghị dùng queue) để không block UI


NFR-03 Reliability
Lưu kết quả AI theo version (CV version, JD version) để đối chiếu


NFR-04 Usability
UI rõ ràng theo vai trò; trạng thái pipeline trực quan


NFR-05 Maintainability
Tách AI service khỏi backend core (microservice hoặc module riêng)



6. USE CASE CATALOG (Danh sách Use Case)
(UCxx: Actor – tên use case)
Authentication
UC01 Candidate/HR đăng ký


UC02 Candidate/HR đăng nhập


UC03 Admin quản lý user & role (tùy chọn)


Candidate
UC11 Cập nhật hồ sơ ứng viên


UC12 Tạo CV bằng CV Builder


UC13 Upload CV & quản lý phiên bản


UC14 Tìm kiếm việc làm


UC15 Ứng tuyển công việc


UC16 Theo dõi trạng thái ứng tuyển


UC17 Luyện phỏng vấn ảo với AI


HR
UC21 Cập nhật hồ sơ công ty


UC22 Đăng tin tuyển dụng


UC23 Xem danh sách ứng viên theo job


UC24 Xem điểm matching + giải thích


UC25 Chuyển stage pipeline + gửi thông báo


UC26 Sinh câu hỏi phỏng vấn theo CV/JD


Realtime/Notification
UC31 Nhận realtime event


UC32 Nhận email/in-app notification


Dashboard
UC41 Xem dashboard tuyển dụng



7. USE CASE DETAIL (Mô tả chi tiết – mẫu chuyên nghiệp)
UC15 – Ứng tuyển công việc
Actor: Candidate
 Mục tiêu: Nộp hồ sơ vào một tin tuyển dụng.
 Tiền điều kiện: Candidate đã đăng nhập; có CV (upload hoặc tạo).
 Hậu điều kiện: Tạo bản ghi Application; HR nhận thông báo; hệ thống (tùy chọn) chạy AI matching.
Luồng chính:
Candidate mở trang chi tiết Job.


Chọn CV muốn dùng (version).


Nhấn “Ứng tuyển”.


Hệ thống tạo Application với stage = APPLIED.


Gửi notification cho HR (in-app + realtime).


Kích hoạt tác vụ AI matching (async).


Candidate nhận xác nhận “Ứng tuyển thành công”.


Ngoại lệ:
E1: CV thiếu → yêu cầu upload/tạo CV.


E2: Đã apply job này → hiển thị thông báo và chặn apply trùng.


E3: Job đã đóng → không cho apply.


Dữ liệu tạo: applications, notifications (HR), ai_match_results (sau khi AI chạy).

UC24 – HR xem điểm matching & giải thích
Actor: HR
 Mục tiêu: Xem mức độ phù hợp ứng viên với JD.
 Tiền điều kiện: Có application + kết quả AI.
 Hậu điều kiện: HR hiểu strengths/gaps để quyết định sàng lọc.
Luồng chính:
HR vào Job → tab Applicants.


Chọn 1 ứng viên.


Hệ thống hiển thị:


score_total (0–100)


breakdown: skill match, exp match, semantic match


strengths (điểm mạnh)


gaps (thiếu so với JD)


recommendations (đề xuất: yêu cầu bổ sung/đặt câu hỏi)


HR có thể lọc/sắp xếp ứng viên theo score.


Ngoại lệ:
E1: Chưa có AI result → hiển thị “Đang xử lý” + nút “Chạy lại”.



UC25 – HR chuyển stage pipeline + realtime
Actor: HR
 Mục tiêu: Quản lý tiến trình ứng viên theo pipeline.
 Tiền điều kiện: HR sở hữu job; application tồn tại.
 Hậu điều kiện: Stage cập nhật; Candidate nhận realtime + notification/email (tùy chính sách).
Luồng chính:
HR chọn ứng viên trong pipeline board.


Kéo thả hoặc chọn stage mới (SCREENING/INTERVIEW/OFFER/HIRED/REJECTED).


Nhập ghi chú (optional).


Hệ thống cập nhật application.stage.


Phát WebSocket event application.stage.updated.


Tạo in-app notification cho Candidate (và email nếu bật).



UC12 – Tạo CV bằng CV Builder
Actor: Candidate
 Mục tiêu: Tạo CV chuẩn ATS theo mẫu.
 Luồng chính:
Candidate vào “CV Builder”.


Điền thông tin theo section (Profile/Education/Experience/Projects/Skills).


Preview CV.


Lưu version.


Export PDF và lưu vào cv_files.



UC17 – Phỏng vấn ảo với AI
Actor: Candidate
 Mục tiêu: Luyện tập phỏng vấn theo CV/JD và nhận đánh giá.
 Luồng chính:
Candidate chọn job mục tiêu hoặc chọn CV.


Hệ thống gọi AI tạo bộ câu hỏi (theo CV/JD).


AI hỏi từng câu → Candidate trả lời.


AI đánh giá câu trả lời theo rubric + gợi ý cải thiện.


Xuất report tổng: điểm mạnh/yếu, đề xuất luyện lại.



8. Definition of Done (DoD) cho team làm chuẩn
Một module/feature coi là xong khi:
API + DB migration đầy đủ


UI chạy đúng theo role


Có validate + error handling


Có test tối thiểu (unit/integration cơ bản)


Có log/audit cho thao tác HR quan trọng


Demo được theo kịch bản (end-to-end)

