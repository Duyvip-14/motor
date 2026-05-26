const multer = require('multer');
const { minioClient, BUCKET_NAME } = require('../config/minio');
const path = require('path');

// Multer lưu tạm vào bộ nhớ (memory storage)
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // Giới hạn 10MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        }
        cb(new Error('Chỉ cho phép upload file ảnh (jpg, png, gif, webp, svg)'));
    }
});

// Upload 1 ảnh
const uploadSingle = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Không tìm thấy file ảnh' });
        }

        const file = req.file;
        // Tạo tên file unique: timestamp + tên gốc
        const fileName = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`;

        // Upload lên MinIO
        await minioClient.putObject(
            BUCKET_NAME,
            fileName,
            file.buffer,
            file.size,
            { 'Content-Type': file.mimetype }
        );

        // Trả về URL public
        const fileUrl = `http://localhost:19000/${BUCKET_NAME}/${fileName}`;

        res.status(200).json({
            message: 'Upload thành công',
            url: fileUrl,
            fileName: fileName
        });
    } catch (err) {
        console.error('[Upload] Lỗi:', err);
        res.status(500).json({ error: 'Lỗi khi upload ảnh lên MinIO' });
    }
};

// Upload nhiều ảnh (tối đa 5)
const uploadMultiple = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'Không tìm thấy file ảnh' });
        }

        const urls = [];
        for (const file of req.files) {
            const fileName = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`;
            await minioClient.putObject(
                BUCKET_NAME,
                fileName,
                file.buffer,
                file.size,
                { 'Content-Type': file.mimetype }
            );
            urls.push(`http://localhost:19000/${BUCKET_NAME}/${fileName}`);
        }

        res.status(200).json({
            message: 'Upload thành công',
            urls: urls
        });
    } catch (err) {
        console.error('[Upload] Lỗi:', err);
        res.status(500).json({ error: 'Lỗi khi upload ảnh lên MinIO' });
    }
};

module.exports = { upload, uploadSingle, uploadMultiple };
