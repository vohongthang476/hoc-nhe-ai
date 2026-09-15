# Học Nhẹ AI — V1 không API

Công cụ tạo phiếu luyện Toán và Tiếng Việt lớp 2–5 cho phụ huynh và giáo viên. Toàn bộ chạy trên trình duyệt, không có backend, không gọi OpenAI API và không cần tài khoản.

## Tính năng đã hoàn thành

- Chọn vai trò phụ huynh hoặc giáo viên.
- Công cụ 01: tạo Phiếu Toán theo lớp, chủ đề, mức độ và số câu.
- Công cụ 02: tạo Phiếu Tiếng Việt từ ngân hàng học liệu đóng.
- Công cụ 03: làm bài trực tuyến, chấm tự động và lưu kết quả.
- Công cụ 04: chọn từng câu để xem cách làm theo ba bước.
- Công cụ 05: phân tích câu sai, câu bỏ trống và đề xuất phần cần luyện.
- Công cụ 06: tạo kế hoạch 7 ngày theo kết quả yếu nhất, theo dõi tiến độ và mở đúng bài luyện cho từng ngày.
- Góc học nhanh: thử thách 5 phút, luyện lại điểm yếu và xem thành tích/huy hiệu học tập.
- Giao diện học sinh sinh động với biểu tượng môn học, thẻ màu và họa tiết trường học.
- In A4 hoặc lưu PDF bằng chức năng in của trình duyệt.
- Lưu tối đa 12 kết quả gần nhất trong `localStorage`.
- Giao diện máy tính và điện thoại, có chính sách quyền riêng tư, điều khoản và trang minh bạch nội dung.

## Chạy thử

Mở `dist/index.html` bằng trình duyệt. Không cần cài đặt.

## Đưa lên GitHub Pages

1. Tạo repository mới trên GitHub.
2. Đẩy toàn bộ thư mục này lên nhánh `main`.
3. Vào **Settings → Pages → Build and deployment**.
4. Chọn **Source: GitHub Actions**.
5. Workflow `.github/workflows/pages.yml` sẽ tự đăng nội dung trong `dist`.

## Cấu trúc

- `dist/index.html`: giao diện chính.
- `dist/styles.css`: hiển thị responsive và bản in A4.
- `dist/data.js`: danh mục, ngân hàng câu hỏi và thuật toán sinh bài.
- `dist/app.js`: tạo bài, chấm bài, đáp án, in và lưu cục bộ.
- `dist/phuong-phap.html`: phạm vi, nguồn và cách kiểm soát nội dung.
- `dist/quyen-rieng-tu.html`, `dist/dieu-khoan.html`: chính sách V1.
- `KIEM-DUYET-NOI-DUNG.md`: checklist bắt buộc trước khi thu phí.

## Giới hạn quan trọng

Đây là beta công khai, không phải hệ thống hội viên. Mã và học liệu trong một trang tĩnh công khai không thể được khóa an toàn theo gói 99.000 đồng. Không đặt API key, mật khẩu chung hoặc danh sách thành viên trong mã nguồn.

GitHub nêu rõ Pages không nhằm làm hosting miễn phí cho website chủ yếu cung cấp SaaS hoặc giao dịch thương mại. Vì vậy chỉ dùng Pages để thử nghiệm miễn phí; trước khi biến thành dịch vụ thu phí, chuyển sang hosting phù hợp và bổ sung backend xác thực.

Nguồn tham chiếu:

- Chương trình giáo dục phổ thông ban hành theo Thông tư 32/2018/TT-BGDĐT và các sửa đổi liên quan.
- [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
- [Luật Bảo vệ dữ liệu cá nhân 2025, số 91/2025/QH15](https://luatvietnam.vn/dan-su/luat-bao-ve-du-lieu-ca-nhan-2025-so-91-2025-qh15-405135-d1.html)

## Trước khi mở bán

Không mở bán chỉ dựa trên bản V1. Cần: giáo viên kiểm duyệt học liệu, backend đăng nhập, cơ sở dữ liệu, phân quyền thành viên, hosting thương mại, điều khoản bán hàng/hoàn tiền và quy trình bảo vệ dữ liệu trẻ em.

© 2026 Người Trao Giải Pháp. All rights reserved.
