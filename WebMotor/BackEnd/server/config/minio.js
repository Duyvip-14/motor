const Minio = require('minio');

const minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 19000,
    useSSL: false,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin123'
});

const BUCKET_NAME = 'motor-images';

// Tự động tạo bucket nếu chưa có và set public policy
const initBucket = async () => {
    try {
        const exists = await minioClient.bucketExists(BUCKET_NAME);
        if (!exists) {
            await minioClient.makeBucket(BUCKET_NAME);
            console.log(`[MinIO] Bucket "${BUCKET_NAME}" đã được tạo.`);
        }

        // Set bucket policy cho phép đọc public
        const policy = {
            Version: '2012-10-17',
            Statement: [
                {
                    Effect: 'Allow',
                    Principal: { AWS: ['*'] },
                    Action: ['s3:GetObject'],
                    Resource: [`arn:aws:s3:::${BUCKET_NAME}/*`]
                }
            ]
        };
        await minioClient.setBucketPolicy(BUCKET_NAME, JSON.stringify(policy));
        console.log(`[MinIO] Bucket "${BUCKET_NAME}" đã set public read.`);
    } catch (err) {
        console.error('[MinIO] Lỗi khi khởi tạo bucket:', err.message);
    }
};

initBucket();

module.exports = { minioClient, BUCKET_NAME };
