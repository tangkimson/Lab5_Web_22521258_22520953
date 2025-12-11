const mysql = require('mysql2');
const { Sequelize } = require('sequelize');

// Kết nối dùng câu lệnh SQL thuần
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',      // XAMPP mặc định: user root, không mật khẩu
    database: 'lab5_ex1'
});

// Kết nối dùng Sequelize ORM
const sequelize = new Sequelize('lab5_ex1', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = {
    pool: pool.promise(),
    sequelize
};
