const db = require('../config/config');

const Product = {

    getAll: ({page, pageSize}, callback) => {

        const sqlGet = page ?  `CALL GetProductsByPage(${page}, ${pageSize});` :  "SELECT * FROM san_pham";

        db.query(sqlGet, (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    getById: (ma_san_pham, callback) => {
        const sqlGet = "SELECT * FROM san_pham WHERE ma_san_pham = ?";
        db.query(sqlGet, [ma_san_pham], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

create: (productData, callback) => {
    const {
        ten_san_pham, gia, size, mau_sac, anh_sanpham, ma_danh_muc, soluong, mo_ta,
        dong_co, dung_tich, duong_kinh_hanh_trinh_piston, ti_so_nen,
        cong_suat_cuc_dai, mo_men_xoan_cuc_dai, bo_ly_hop,
        he_thong_danh_lua, he_thong_khoi_dong, hop_so,
        he_thong_truyen_dong, tieu_thu_nhien_lieu, khi_thai, he_thong_phun_xang
    } = productData;

    const sqlInsert = `
        INSERT INTO san_pham (
            ten_san_pham, gia, size, mau_sac, anh_sanpham, ma_danh_muc, soluong, mo_ta,
            dong_co, dung_tich, duong_kinh_hanh_trinh_piston, ti_so_nen,
            cong_suat_cuc_dai, mo_men_xoan_cuc_dai, bo_ly_hop,
            he_thong_danh_lua, he_thong_khoi_dong, hop_so,
            he_thong_truyen_dong, tieu_thu_nhien_lieu, khi_thai, he_thong_phun_xang
        )
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    const values = [
        ten_san_pham, gia, size, mau_sac, anh_sanpham, ma_danh_muc, soluong, mo_ta,
        dong_co, dung_tich, duong_kinh_hanh_trinh_piston, ti_so_nen,
        cong_suat_cuc_dai, mo_men_xoan_cuc_dai, bo_ly_hop,
        he_thong_danh_lua, he_thong_khoi_dong, hop_so,
        he_thong_truyen_dong, tieu_thu_nhien_lieu, khi_thai, he_thong_phun_xang
    ];

    db.query(sqlInsert, values, (error, result) => {
        if (error) {
            return callback(error);
        }
        callback(null, result);
    });
},


update: (ma_san_pham, productData, callback) => {
    const {
        ten_san_pham, gia, size, mau_sac, anh_sanpham, anhhover1, ma_danh_muc, soluong, mo_ta,
        dong_co, dung_tich, duong_kinh_hanh_trinh_piston, ti_so_nen,
        cong_suat_cuc_dai, mo_men_xoan_cuc_dai, bo_ly_hop,
        he_thong_danh_lua, he_thong_khoi_dong, hop_so,
        he_thong_truyen_dong, tieu_thu_nhien_lieu, khi_thai, he_thong_phun_xang
    } = productData;

    const sqlUpdate = `
        UPDATE san_pham SET
            ten_san_pham = ?, gia = ?, size = ?, mau_sac = ?, anh_sanpham = ?, anhhover1 = ?, 
            ma_danh_muc = ?, soluong = ?, mo_ta = ?,
            dong_co = ?, dung_tich = ?, duong_kinh_hanh_trinh_piston = ?, ti_so_nen = ?,
            cong_suat_cuc_dai = ?, mo_men_xoan_cuc_dai = ?, bo_ly_hop = ?,
            he_thong_danh_lua = ?, he_thong_khoi_dong = ?, hop_so = ?,
            he_thong_truyen_dong = ?, tieu_thu_nhien_lieu = ?, khi_thai = ?, he_thong_phun_xang = ?
        WHERE ma_san_pham = ?
    `;

    const values = [
        ten_san_pham, gia, size, mau_sac, anh_sanpham, anhhover1,
        ma_danh_muc, soluong, mo_ta,
        dong_co, dung_tich, duong_kinh_hanh_trinh_piston, ti_so_nen,
        cong_suat_cuc_dai, mo_men_xoan_cuc_dai, bo_ly_hop,
        he_thong_danh_lua, he_thong_khoi_dong, hop_so,
        he_thong_truyen_dong, tieu_thu_nhien_lieu, khi_thai, he_thong_phun_xang,
        ma_san_pham
    ];

    db.query(sqlUpdate, values, (error, result) => {
        if (error) {
            return callback(error);
        }
        callback(null, result);
    });
},

    
    delete: (ma_san_pham, callback) => {
        const sqlDelete = "DELETE FROM san_pham WHERE ma_san_pham = ?";
        db.query(sqlDelete, [ma_san_pham], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

     searchByName: (searchTerm, callback) => {
        const sqlSearch = "SELECT * FROM san_pham WHERE ten_san_pham LIKE ?";
        const formattedSearchTerm = `%${searchTerm}%`;
        db.query(sqlSearch, [formattedSearchTerm], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    searchByPriceAndName: (minPrice, maxPrice, id_danh_muc, callback) => {
        let sqlSearch = "SELECT * FROM san_pham WHERE gia BETWEEN ? AND ?";
        let queryParams = [minPrice, maxPrice];

    
        if (id_danh_muc && !isNaN(id_danh_muc)) {
            sqlSearch += " AND ma_danh_muc = ?";
            queryParams.push(id_danh_muc);
        }
    
        db.query(sqlSearch, queryParams, (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    }
    
};

module.exports = Product;
