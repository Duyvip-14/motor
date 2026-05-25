# WebMotor - Hướng dẫn chạy không cần Docker

## Yêu cầu cài sẵn

1. **Node.js** 16+ ([nodejs.org](https://nodejs.org))
2. **MySQL Server** 8.0+ ([dev.mysql.com](https://dev.mysql.com/downloads/mysql))
   - User: `root`
   - Password: `duyvip123@` (hoặc sửa lại trong [BackEnd/server/config/config.js](BackEnd/server/config/config.js))
3. **MySQL CLI** trong PATH (mở cmd gõ `mysql --version` test thử)

## Lần đầu chạy

```bash
# 1. Cài tất cả dependencies (root + BackEnd + admin + client)
npm run install:all

# 2. Tạo database + đổ data từ đầu
npm run db:reset
```

`db:reset` sẽ:
- Tạo database `motor` mới (xóa nếu có)
- Chạy lần lượt 7 file SQL trong `docker/init/`:
  - 01-schema.sql (10 tables)
  - 02-seed.sql (stored procedure + 8 xe seed)
  - 03 → 07 (40 xe + 10 phụ kiện)
- Tổng cộng ~50 sản phẩm

## Chạy 3 service cùng lúc

```bash
npm run dev
```

Lệnh này dùng `concurrently` chạy song song:
- 🟡 **SERVER** (Backend) → http://localhost:5000
- 🟦 **ADMIN** → http://localhost:3000
- 🟢 **CLIENT** → http://localhost:3001

Output 3 service được prefix màu khác nhau, log trộn vào 1 terminal. Ctrl+C dừng tất cả.

## Chạy riêng từng service (nếu cần)

```bash
npm run server   # chỉ backend
npm run admin    # chỉ admin
npm run client   # chỉ client (port 3001)
```

## Reset DB khi muốn

```bash
npm run db:reset    # xóa motor, tạo lại + đổ data từ đầu
npm run db:seed     # chỉ chạy lại seed (giữ schema)
```

## Troubleshooting

**Lỗi "mysql command not found":**
- Windows: thêm `C:\Program Files\MySQL\MySQL Server 8.0\bin` vào PATH
- Hoặc dùng full path trong script: thay `mysql` thành `"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"`

**Lỗi "Access denied for user 'root'":**
- Sửa password trong [package.json](package.json) script `db:setup`/`db:seed` cho khớp MySQL local
- Đồng thời sửa [BackEnd/server/config/config.js](BackEnd/server/config/config.js) line 6

**Port 3000/3001/5000 đã dùng:**
- Tìm process đang chiếm: `netstat -ano | findstr :3000`
- Kill: `taskkill /PID <pid> /F`

**Tiếng Việt bị lỗi font khi đọc DB:**
- File SQL đã set `SET NAMES utf8mb4` và schema dùng `utf8mb4_unicode_ci`
- Backend [config.js](BackEnd/server/config/config.js) đã có `charset: 'utf8mb4'`
- Nếu vẫn lỗi: kiểm tra MySQL config `my.ini`/`my.cnf` có `character-set-server=utf8mb4`
