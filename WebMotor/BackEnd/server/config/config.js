const mysql = require('mysql2');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "duyvip123@",
    database: "motor",
    charset: "utf8mb4"
});

module.exports = db;


// kết nối database ở đây
