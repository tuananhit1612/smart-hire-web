TÊN ĐỀ TÀI
XÂY DỰNG HỆ THỐNG TUYỂN DỤNG THÔNG MINH ỨNG DỤNG TRÍ TUỆ NHÂN TẠO (AI)

1. TỔNG QUAN DỰ ÁN
1.1. Lý do chọn đề tài
Trong bối cảnh chuyển đổi số mạnh mẽ hiện nay, hoạt động tuyển dụng nhân sự đóng vai trò then chốt đối với sự phát triển của doanh nghiệp. Tuy nhiên, quy trình tuyển dụng truyền thống còn tồn tại nhiều hạn chế như tốn nhiều thời gian, phụ thuộc lớn vào con người, khó đánh giá khách quan hồ sơ ứng viên và khó quản lý số lượng lớn ứng viên cùng lúc.
Sự phát triển của trí tuệ nhân tạo (AI), đặc biệt là các mô hình ngôn ngữ lớn (Large Language Models – LLM), đã mở ra nhiều cơ hội trong việc tự động hóa, phân tích dữ liệu và hỗ trợ ra quyết định. Việc ứng dụng AI vào tuyển dụng giúp nâng cao hiệu quả sàng lọc hồ sơ, đánh giá mức độ phù hợp của ứng viên với vị trí công việc, đồng thời hỗ trợ ứng viên cải thiện hồ sơ và kỹ năng phỏng vấn.
Xuất phát từ thực tế đó, đề tài “Xây dựng Hệ thống tuyển dụng thông minh ứng dụng AI” được thực hiện nhằm xây dựng một nền tảng tuyển dụng hiện đại, tích hợp AI hỗ trợ toàn bộ quy trình tuyển dụng trên cùng một hệ thống.

1.2. Mục tiêu của đề tài
Xây dựng một hệ thống tuyển dụng trực tuyến hoàn chỉnh cho ứng viên và nhà tuyển dụng.


Ứng dụng trí tuệ nhân tạo để tự động phân tích, trích xuất thông tin từ CV ứng viên.


Thực hiện so khớp CV với yêu cầu công việc và chấm điểm mức độ phù hợp.


Hỗ trợ sinh viên và ứng viên tạo CV, đánh giá và gợi ý cải thiện CV.


Hỗ trợ nhà tuyển dụng trong việc sàng lọc hồ sơ, quản lý quy trình tuyển dụng và phỏng vấn.


Xây dựng hệ thống dashboard và thông báo giúp theo dõi tiến trình tuyển dụng theo thời gian thực.



1.3. Phạm vi và đối tượng nghiên cứu
Phạm vi:


Hệ thống web chạy trên nền tảng Internet.


Backend sử dụng Java Spring Boot.


Frontend sử dụng Next.js.


Cơ sở dữ liệu MySQL.


AI chạy local thông qua mô hình LLM (Ollama).


Đối tượng sử dụng:


Ứng viên (Sinh viên, người tìm việc).


Nhà tuyển dụng (HR).


Quản trị viên hệ thống.



2. TỔNG THỂ HỆ THỐNG TUYỂN DỤNG THÔNG MINH
Hệ thống tuyển dụng thông minh AI được xây dựng theo mô hình ATS (Applicant Tracking System) kết hợp với AI Copilot, hỗ trợ toàn bộ vòng đời tuyển dụng từ khi ứng viên tạo CV cho đến khi kết thúc quá trình tuyển dụng.
Toàn bộ quy trình tuyển dụng được thực hiện và quản lý trên cùng một hệ thống, bao gồm:
Tạo và quản lý hồ sơ ứng viên.


Đăng tin tuyển dụng và tiếp nhận hồ sơ.


Phân tích, chấm điểm CV bằng AI.


Theo dõi trạng thái ứng tuyển theo thời gian thực.


Hỗ trợ phỏng vấn ảo và đánh giá ứng viên.



3. CHỨC NĂNG CỦA HỆ THỐNG
3.1. Chức năng người dùng (Ứng viên)
Đăng ký, đăng nhập hệ thống.


Quản lý hồ sơ cá nhân.


Tạo CV trực tuyến theo mẫu có sẵn.


Tải lên CV (PDF/DOCX).


AI tự động phân tích và trích xuất thông tin từ CV.


Nhận đánh giá CV và gợi ý chỉnh sửa từ AI.


Tìm kiếm và ứng tuyển công việc phù hợp.


Theo dõi trạng thái ứng tuyển (đã nộp, phỏng vấn, kết quả).


Luyện tập phỏng vấn ảo với AI. (khó vl)



3.2. Chức năng nhà tuyển dụng (HR)
Đăng ký, đăng nhập và quản lý thông tin công ty.


Đăng tin tuyển dụng và quản lý danh sách công việc.


Xem danh sách ứng viên ứng tuyển theo từng vị trí.


AI tự động chấm điểm mức độ phù hợp giữa CV và yêu cầu công việc.


Xem báo cáo phân tích chi tiết lý do chấm điểm.


Gợi ý ứng viên tiềm năng cho từng vị trí.


Tạo bộ câu hỏi phỏng vấn dựa trên CV và JD.


Quản lý quy trình tuyển dụng theo từng giai đoạn.


Giao tiếp và phỏng vấn ứng viên trực tuyến.



3.3. Chức năng quản trị viên (Admin)
Quản lý người dùng và phân quyền.


Quản lý nội dung hệ thống.


Theo dõi hoạt động và thống kê tổng thể.



4. CHỨC NĂNG TRÍ TUỆ NHÂN TẠO (AI)
Phân tích CV: Trích xuất thông tin như kỹ năng, kinh nghiệm, học vấn.


Chấm điểm CV: Đánh giá mức độ phù hợp với yêu cầu công việc.


Giải thích kết quả: AI cung cấp lý do chấm điểm và các điểm mạnh/yếu.


Gợi ý cải thiện CV: Phát hiện lỗi, thiếu sót và đề xuất chỉnh sửa.


Gợi ý việc làm: Đề xuất công việc phù hợp cho ứng viên.


Phỏng vấn ảo: AI đóng vai trò nhà tuyển dụng, đặt câu hỏi và đánh giá câu trả lời.



5. CÔNG NGHỆ SỬ DỤNG
5.1. Backend
Java Spring Boot


Spring Security + JWT


RESTful API


WebSocket (Realtime)


5.2. Frontend
Next.js


React


Tailwind CSS


5.3. Cơ sở dữ liệu
MySQL


5.4. Trí tuệ nhân tạo
Ollama (LLM chạy local)


Mô hình ngôn ngữ lớn (LLM)


Xử lý ngôn ngữ tự nhiên (NLP)



6. ĐÁNH GIÁ VÀ HƯỚNG PHÁT TRIỂN
6.1. Kết quả đạt được
Xây dựng thành công hệ thống tuyển dụng thông minh.


AI hỗ trợ hiệu quả trong việc phân tích và đánh giá hồ sơ.


Giao diện thân thiện, dễ sử dụng.


6.2. Hạn chế
Chưa triển khai đầy đủ phỏng vấn video trực tuyến.


Kết quả AI phụ thuộc vào chất lượng dữ liệu đầu vào.


6.3. Hướng phát triển
Tích hợp WebRTC cho phỏng vấn video.


Nâng cấp mô hình AI và mở rộng đa ngôn ngữ.


Triển khai trên môi trường cloud.



KẾT LUẬN
Đề tài đã xây dựng thành công một hệ thống tuyển dụng thông minh ứng dụng trí tuệ nhân tạo, góp phần nâng cao hiệu quả tuyển dụng, hỗ trợ cả ứng viên và nhà tuyển dụng. Hệ thống có tính ứng dụng thực tiễn cao và có khả năng mở rộng trong tương lai.

