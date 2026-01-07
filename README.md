# tóm tắt Project: Ứng Dụng E-Commerce Bán Hàng
Đây là một ứng dụng React cho thương mại điện tử - cửa hàng bán các sản phẩm công nghệ trực tuyến. Dưới đây là tóm tắt toàn bộ nội dung:

# 🎯 Chức Năng Chính
Quản lý Sản Phẩm (15 sản phẩm)

5 danh mục: Laptop, Điện thoại, Tai nghe, Chuột & Bàn phím, Phụ kiện
Các sản phẩm bao gồm: Dell XPS, iPhone 15, Samsung S24, Sony WH, Logitech MX, v.v.
Tính năng tìm kiếm theo tên/mô tả
Lọc sản phẩm theo danh mục
Xác Thực Người Dùng (AuthContext)

Đăng ký tài khoản (username, email, password)
Đăng nhập với kiểm tra username/password
Đăng xuất
Lưu trữ danh sách người dùng đã đăng ký
Giỏ Hàng (CartContext)

Thêm sản phẩm vào giỏ
Xóa sản phẩm khỏi giỏ
Cập nhật số lượng
Hiển thị tổng số lượng item trong giỏ
Quản lý Đơn Hàng (OrderContext)

Tạo đơn hàng từ giỏ hàng
Cập nhật thông tin giao hàng (địa chỉ, số điện thoại, ghi chú)
Theo dõi trạng thái đơn hàng (Chờ xác nhận, Đang giao, v.v.)
Xóa đơn hàng
Lấy lịch sử đơn hàng theo người dùng
Quản Trị Viên (AdminContext)

Đăng nhập admin riêng biệt
Dashboard quản lý (chưa được phát triển đầy đủ)
# 📄 Các Trang Chính
Trang Chủ - Hiển thị sản phẩm, tìm kiếm, lọc theo danh mục
Giỏ Hàng - Xem, chỉnh sửa giỏ hàng và thanh toán
Đăng Nhập/Đăng Ký - Xác thực người dùng
Tài Khoản - Quản lý thông tin cá nhân và lịch sử đơn hàng
Giới Thiệu & Liên Hệ - Thông tin về cửa hàng
Admin Dashboard - Quản lý hệ thống
# 🛠️ Công Nghệ Sử Dụng
React 19.2.3 - Framework chính
React Router 7.11.0 - Định tuyến
Context API - Quản lý trạng thái toàn cục
CSS - Styling
# 💾 Cấu Trúc Dữ Liệu
Dữ liệu sản phẩm được lưu trữ tĩnh trong Home component
Người dùng, giỏ hàng, đơn hàng được quản lý bằng Context API (lưu trong state, không có database)
Lưu ý: Đây là một ứng dụng frontend đơn giản, chưa có backend/database thực sự, nên dữ liệu sẽ bị mất khi reload trang.

# link demo: https://ecommerce-app-liard-beta.vercel.app/