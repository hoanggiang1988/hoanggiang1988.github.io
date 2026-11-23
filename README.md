# HG 3D Reverse Engineering Portfolio — GitHub Pages + Content Admin

Website portfolio song ngữ Việt/Anh dành cho Phạm Hoàng Giang. Có trang quản trị nội dung chạy trên trình duyệt, dùng GitHub Contents API để cập nhật dữ liệu trực tiếp vào repository.

## 1. Tính năng

- Portfolio responsive, chuyển đổi Việt / Anh.
- Danh sách dự án Scan 3D – Reverse Engineering – CAD.
- Thư viện hình ảnh và liên kết video.
- Danh sách khóa học / đào tạo.
- Liên kết CV tiếng Việt và tiếng Anh dạng PDF.
- Biểu mẫu yêu cầu báo giá tạo email gửi tới địa chỉ được cấu hình.
- Trang quản trị `admin.html`: thêm, sửa, xóa dự án, thư viện, khóa học; cập nhật liên hệ và CV; tải ảnh/PDF lên repository.

## 2. Cấu trúc thư mục

```text
/
├── index.html
├── admin.html
├── README.md
├── data/
│   └── content.json
├── cv/
│   └── README.txt
└── assets/
    ├── css/
    │   ├── style.css
    │   └── portfolio-v2.css
    ├── js/
    │   ├── main.js       # file từ bản trước, không còn được gọi
    │   ├── site.js
    │   └── admin.js
    └── uploads/
        └── README.txt
```

## 3. Cài đặt lên GitHub Pages

1. Giải nén ZIP trên máy tính.
2. Mở repository website GitHub của bạn.
3. Chọn **Add file → Upload files**.
4. Kéo toàn bộ NỘI DUNG bên trong thư mục `portfolio-v2` lên repository (không kéo thư mục cha). Cho phép thay thế các file trùng tên.
5. Commit changes vào branch `main`.
6. Trong **Settings → Pages**, chọn **Deploy from a branch**, branch `main`, folder `/(root)`, nhấn Save.
7. Đợi GitHub Pages triển khai, sau đó mở URL website.

Lưu ý: nếu repository của bạn đang mang tên khác, hãy giữ nguyên repository hiện tại khi upload. Trang quản trị cần khai báo đúng tên repository thực tế.

## 4. Cấu hình trang quản trị nội dung

Mở `https://TEN-USERNAME.github.io/admin.html` (hoặc `https://TEN-USERNAME.github.io/TEN-REPOSITORY/admin.html` nếu dùng project site).

### Tạo GitHub Fine-grained Personal Access Token

1. GitHub → ảnh đại diện → **Settings**.
2. **Developer settings → Personal access tokens → Fine-grained tokens**.
3. Chọn **Generate new token**.
4. Token name ví dụ `HG Portfolio CMS`; đặt ngày hết hạn.
5. Resource owner: tài khoản GitHub của bạn.
6. Repository access: **Only select repositories**, chọn đúng repository website.
7. Repository permissions → **Contents: Read and write**. Không cấp Administration hoặc quyền không cần thiết.
8. Generate token và sao chép token ngay (GitHub chỉ hiển thị đầy đủ một lần).

### Kết nối

1. Mở `admin.html`.
2. Nhập GitHub username, repository name, branch `main` và token.
3. Nhấn **Kết nối và tải nội dung**.
4. Chọn tab cần quản lý, thêm/sửa/xóa nội dung.
5. Nhấn **LƯU & CẬP NHẬT WEBSITE** ở cuối trang.
6. Chờ khoảng 1–5 phút rồi tải lại website.

Trang quản trị mặc định điền owner `hoanggiang1988` và repository `hoanggiang1988.github.io`. Nếu repository của bạn vẫn có tên `hoanggiang.github.io` hoặc tên khác, hãy sửa trường Repository name cho đúng.

### Bảo mật token

- Token được lưu trong `localStorage` của trình duyệt sau khi kết nối để tiện sử dụng lần sau. Nó không được gửi tới máy chủ bên thứ ba; yêu cầu GitHub API được gửi trực tiếp từ trình duyệt.
- Chỉ dùng trang quản trị trên máy tính cá nhân đáng tin cậy. Không sử dụng máy công cộng.
- Khi dùng xong, nhấn **Xóa token khỏi trình duyệt**. Để thu hồi token, vào GitHub → Settings → Developer settings → Fine-grained tokens → chọn token → Revoke.
- Ai có token hợp lệ với quyền Contents write trên repository có thể thay đổi nội dung website. Không chia sẻ token qua chat/email.
- Đây là CMS cá nhân đơn giản, không phải hệ thống có tài khoản người dùng, phân quyền nhiều cấp hoặc đăng nhập máy chủ.

## 5. Cách quản lý nội dung

- **Dự án:** điền tiêu đề Việt/Anh, danh mục, mô tả, phần mềm, link. Chọn ảnh và nhấn Tải ảnh lên GitHub trước khi lưu dự án.
- **Thư viện:** chọn Hình ảnh để tải ảnh lên; chọn Video để lưu URL video (ví dụ YouTube). Video mở ở trang nguồn, không tự tải video lên repository.
- **Đào tạo:** điền tên khóa học, trình độ, mô tả Việt/Anh, phần mềm và link chi tiết.
- **CV:** chọn PDF cho từng ngôn ngữ, tải lên GitHub, sau đó nhấn Lưu đường dẫn CV.
- **Thông tin cá nhân:** cập nhật email, số điện thoại, địa điểm và liên kết mạng nghề nghiệp. Email nhận báo giá được dùng cho form yêu cầu báo giá.

File tải lên qua trang quản trị giới hạn 8 MB mỗi file. Nên nén ảnh trước khi tải; không tải file scan STL/OBJ rất lớn vào repository website.

## 6. Biểu mẫu báo giá — giới hạn của GitHub Pages

GitHub Pages chỉ phục vụ file tĩnh, không chạy backend và không lưu dữ liệu biểu mẫu. Khi khách gửi form, website sẽ mở ứng dụng email mặc định với nội dung đã điền (mailto). Khách cần nhấn Send trong ứng dụng email. Nếu muốn form gửi trực tiếp và lưu yêu cầu mà không cần email client, cần kết nối dịch vụ form bên ngoài hoặc backend riêng; cấu hình đó không được bật sẵn trong gói này.

## 7. Cá nhân hóa trước khi công bố

- Kiểm tra email và số điện thoại trong tab **Thông tin cá nhân**.
- Thay dự án mẫu bằng dự án thật và ảnh mà bạn có quyền công bố.
- Tải CV PDF thật lên tab **CV song ngữ**.
- Kiểm tra các nội dung tiếng Anh, link video, LinkedIn/Fiverr/Upwork.
- Không đăng dữ liệu khách hàng, bản vẽ hoặc hình ảnh dự án nếu chưa được phép.

## 8. Sự cố thường gặp

- **404 khi kết nối:** kiểm tra owner, repository, branch `main`, file `data/content.json` có trong repository và token được cấp đúng repository.
- **401 / 403:** token sai, hết hạn, bị thu hồi hoặc thiếu Contents: Read and write.
- **Không thấy cập nhật:** kiểm tra commit đã xuất hiện trong GitHub, chờ deploy, sau đó hard refresh trình duyệt (Ctrl + F5).
- **Ảnh không hiện:** kiểm tra ảnh có trong `assets/uploads/` và đường dẫn tương đối bắt đầu bằng `assets/uploads/`.
- **CV không tải:** kiểm tra PDF đã tải lên và đường dẫn CV có dạng `cv/ten-file.pdf`.

---

Built for GitHub Pages. No paid hosting required.
