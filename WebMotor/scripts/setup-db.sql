-- ============================================
-- WebMotor - Setup database từ đầu (không dùng Docker)
-- Chạy: mysql -u root -p < scripts/setup-db.sql
-- ============================================

DROP DATABASE IF EXISTS motor;
CREATE DATABASE motor CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE motor;

SELECT 'Database motor đã được tạo!' AS status;
