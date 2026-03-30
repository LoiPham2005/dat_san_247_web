# Danh sách API dành cho Customer (Bản Web tham chiếu cho Mobile)

Tài liệu này tổng hợp các API mà bản Web đang sử dụng cho chức năng của Customer. Mobile nên sử dụng các đường dẫn này để đảm bảo tính đồng bộ với Backend.

---

### 🔐 1. Authentication (Xác thực)
| Endpoint | Method | Mô tả | Chi tiết (Body/Query) |
| :--- | :--- | :--- | :--- |
| `/auth/register` | `POST` | Đăng ký tài khoản mới | `email`, `password`, `full_name`, `phone` |
| `/auth/login` | `POST` | Đăng nhập hệ thống | `email`, `password` |
| `/auth/verify-email` | `POST` | Xác thực OTP qua email | `email`, `otp` |
| `/auth/forgot-password` | `POST` | Yêu cầu khôi phục mật khẩu | `email` |
| `/auth/reset-password` | `POST` | Đặt lại mật khẩu mới | `email`, `otp`, `new_password` |
| `/auth/refresh` | `POST` | Làm mới Access Token | `{ "refresh_token": "..." }` |
| `/auth/logout` | `POST` | Đăng xuất khỏi hệ thống | `{ "refresh_token": "..." }` |
| `/auth/me` | `GET` | Kiểm tra phiên đăng nhập | Trả về info user hiện tại |

---

### 🏟️ 2. Venue Discovery (Khám phá Sân)
| Endpoint | Method | Mô tả | Chi tiết (Body/Query) |
| :--- | :--- | :--- | :--- |
| `/public/venues` | `GET` | Tìm kiếm danh sách sân | Params: `keyword`, `city`, `sport_type`, `price_min/max` |
| `/public/venues/detail/{slug}` | `GET` | Xem chi tiết thông tin sân | Trả về thông tin sân, sân con, tiện ích, review |
| `/public/venues/{slug}/schedule` | `GET` | Xem lịch trống sân con | Query: `?date=YYYY-MM-DD` |
| `/public/venues/me/favorites` | `GET` | DS sân yêu thích của tôi | Yêu cầu Auth |
| `/public/venues/me/favorites` | `POST` | Thêm/Xóa yêu thích | `{ "venue_id": "..." }` |
| `/public/venues/me/search-history` | `GET` | Lấy lịch sử tìm kiếm | Danh sách các keyword đã tìm |
| `/public/venues/me/search-history` | `POST` | Lưu từ khóa vừa tìm kiếm | `{ "keyword": "...", "sport_type": "..." }` |
| `/public/venues/me/search-history` | `DELETE`| Xóa toàn bộ lịch sử | Xóa trắng list history |

---

### 📅 3. Booking (Đặt sân)
| Endpoint | Method | Mô tả | Chi tiết (Body/Query) |
| :--- | :--- | :--- | :--- |
| `/customer/bookings` | `GET` | Danh sách đơn đặt của tôi | Lọc theo status (Pending, Confirmed...) |
| `/customer/bookings/{id}` | `GET` | Chi tiết một đơn đặt sân | Thông tin sân, giờ giấc, mã OTP check-in |
| `/customer/bookings` | `POST` | Tạo đơn đặt sân lẻ | `{ "venue_id", "court_id", "date", "start_time", "end_time" }` |
| `/customer/bookings/recurring` | `POST` | Tạo đơn đặt sân cố định | `{ "repeat_type", "days", "start_date", "end_date" }` |
| `/customer/bookings/{id}` | `DELETE`| Hủy đơn đặt sân | Body: `{ "reason": "..." }` |
| `/customer/bookings/waitlists` | `GET` | Danh sách hàng chờ | Các slot sân đang mong muốn nhưng đã đầy |
| `/customer/bookings/recurring` | `GET` | Danh sách đặt sân cố định | Theo dõi các lịch đặt lặp lại hàng tuần/tháng |

---

### 👤 4. Profile & User (Thông tin cá nhân)
| Endpoint | Method | Mô tả | Chi tiết (Body/Query) |
| :--- | :--- | :--- | :--- |
| `/users/me` | `GET` | Lấy profile đầy đủ | Bao gồm thông tin cơ bản và `sport_preferences` |
| `/users/me/profile` | `PATCH` | Cập nhật profile | Tên, avatar, giới tính, ngày sinh, địa chỉ |
| `/users/me/password` | `PATCH` | Thay đổi mật khẩu | `{ "old_password", "new_password" }` |
| `/users/me/sport-preferences` | `POST` | Cập nhật trình độ thể thao | `{ "sport_type", "skill_level" }` |

---

### ⭐ 5. Reviews (Đánh giá)
| Endpoint | Method | Mô tả | Chi tiết (Body/Query) |
| :--- | :--- | :--- | :--- |
| `/customer/reviews/my-reviews` | `GET` | Xem các đánh giá tôi đã viết | Lịch sử review các sân |
| `/customer/reviews` | `POST` | Gửi đánh giá mới | `{ "booking_id", "rating", "comment", "media_ids" }` |
| `/customer/reviews/{id}` | `PATCH` | Sửa đánh giá | Cập nhật số sao hoặc bình luận |
| `/customer/reviews/{id}` | `DELETE`| Xóa đánh giá | Gỡ bỏ review đã đăng |

---

### 📍 6. Lookup (Dữ liệu nền)
| Endpoint | Method | Mô tả | Chi tiết (Body/Query) |
| :--- | :--- | :--- | :--- |
| `/public/lookup/sport-types` | `GET` | Danh sách các bộ môn | Trả về Icon, Tên môn thể thao |
| `/public/content/banners` | `GET` | Lấy danh sách banner | Hiển thị ngoài trang Home |
| `/public/promotions` | `GET` | Lấy danh sách khuyến mãi | Các chương trình ưu đãi đang diễn ra |

---

### 💼 7. Owner (Chủ sân)
Dành cho người quản lý cơ sở thể thao. Các API này yêu cầu Header Token với Role `OWNER`.

#### 🏟️ 7.1. Venue Management (Quản lý Sân)
| Endpoint | Method | Mô tả | Chi tiết (Body/Query) |
| :--- | :--- | :--- | :--- |
| `/owner/venues` | `GET` | Danh sách sân tôi sở hữu | Trả về thông tin tóm tắt các sân |
| `/owner/venues` | `POST` | Đăng ký thêm sân mới | `{ name, address, city, district... }` |
| `/owner/venues/{id}` | `GET` | Chi tiết 1 sân (Owner view) | Đầy đủ thông tin bao gồm Lat/Lng |
| `/owner/venues/{id}` | `PATCH` | Cập nhật thông tin sân | `{ name, status, auto_accept... }` |
| `/owner/venues/{id}/verification` | `GET` | Xem hồ sơ pháp lý | Giấy phép kinh doanh, CCCD... |
| `/owner/venues/{id}/verification` | `POST` | Gửi hồ sơ xác thực sân | Upload ảnh các loại giấy tờ |
| `/owner/venues/{id}/operating-hours`| `GET` | Xem giờ hoạt động | List giờ mở/đóng cửa 7 ngày |
| `/owner/venues/{id}/operating-hours`| `PATCH` | Cập nhật giờ hoạt động | Gửi mảng `{ hours: [...] }` |

#### 🎾 7.2. Courts & Pricing (Sân con & Bảng giá)
| Endpoint | Method | Mô tả | Chi tiết (Body/Query) |
| :--- | :--- | :--- | :--- |
| `/owner/venues/{vId}/courts` | `GET` | Danh sách sân con | Ví dụ: Sân 5 số 1, Sân 7 số 2... |
| `/owner/venues/{vId}/courts` | `POST` | Thêm sân con mới | `{ name, price_per_hour, surface_type }` |
| `/owner/venues/{vId}/courts/{id}` | `PATCH` | Sửa thông tin sân con | Tên, giá cơ bản, trạng thái active |
| `/owner/venues/{vId}/courts/{cId}/pricing-rules` | `POST` | Thiết lập giá theo giờ cao điểm | `{ day_of_week, start_time, end_time, price }` |
| `/owner/venues/{vId}/courts/{cId}/maintenances` | `POST` | Lịch bảo trì sân | Chặn khung giờ không cho đặt |

#### 📅 7.3. Booking Management (Quản lý Đơn đặt)
| Endpoint | Method | Mô tả | Chi tiết (Body/Query) |
| :--- | :--- | :--- | :--- |
| `/owner/bookings/{vId}` | `GET` | Toàn bộ đơn đặt của sân | Xem tất cả booking của cơ sở |
| `/owner/bookings/{id}/status` | `PATCH` | Chốt trạng thái đơn | `{ status: "CONFIRMED/CANCELLED..." }` |
| `/owner/bookings/{vId}/waitlist` | `GET` | Danh sách hàng chờ | Khách đang đợi slot trống |
| `/owner/bookings/{vId}/recurring` | `GET` | Danh sách lịch cố định | Quản lý các "kèo" dài hạn |

#### 👥 7.4. Staff Management (Quản lý Nhân viên)
| Endpoint | Method | Mô tả | Chi tiết (Body/Query) |
| :--- | :--- | :--- | :--- |
| `/owner/staff/{vId}` | `GET` | Danh sách nhân viên sân | Các lễ tân đang làm việc tại cơ sở |
| `/owner/staff` | `POST` | Thêm nhân viên mới | `{ email, full_name, venue_id, role }` |
| `/owner/staff/{id}` | `PATCH` | Cập nhật/Khóa tài khoản | Đổi quyền hoặc trạng thái hoạt động |

---

### 🎒 8. Venue Staff (Lễ tân - Tại sân)
Dành cho nhân viên trực tại sân. Yêu cầu Role `STAFF` hoặc `MANAGER`.

| Endpoint | Method | Mô tả | Chi tiết (Body/Query) |
| :--- | :--- | :--- | :--- |
| `/bookings/venue-staff/schedule` | `GET` | **Lịch trình ca làm việc** | Params: `venue_id`, `date`, `search` (Tìm SĐT/Mã QR) |
| `/bookings/venue-staff/{id}/status` | `PATCH` | **Check-in / Trả sân** | `{ status: "CHECKED_IN" }` hoặc `"COMPLETED"` |
| `/owner/venues/dashboard/stats` | `GET` | Thống kê nhanh ca làm | Số ca check-in, doanh thu trong ngày |
