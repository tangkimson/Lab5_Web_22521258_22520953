const express = require('express');
const { pool } = require('../db');

const router = express.Router();

/*
    USER bằng SQL thuần
*/

// Lấy tất cả User
router.get('/users', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Users');
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Thêm User
router.post('/users', async (req, res) => {
    try {
        const { fullName, address, registrationDate } = req.body;
        const [result] = await pool.query(
            'INSERT INTO Users (fullName, address, registrationDate) VALUES (?, ?, ?)',
            [fullName, address, registrationDate]
        );
        const [rows] = await pool.query('SELECT * FROM Users WHERE userId = ?', [
            result.insertId
        ]);
        res.status(201).json({ success: true, data: rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Cập nhật User
router.put('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { fullName, address, registrationDate } = req.body;

        const [before] = await pool.query(
            'SELECT * FROM Users WHERE userId = ?',
            [id]
        );
        if (before.length === 0) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
        }

        await pool.query(
            'UPDATE Users SET fullName = ?, address = ?, registrationDate = ? WHERE userId = ?',
            [fullName, address, registrationDate, id]
        );

        const [after] = await pool.query(
            'SELECT * FROM Users WHERE userId = ?',
            [id]
        );

        res.json({ success: true, data: after[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Xóa User
router.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const [before] = await pool.query(
            'SELECT * FROM Users WHERE userId = ?',
            [id]
        );
        if (before.length === 0) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
        }

        await pool.query('DELETE FROM Users WHERE userId = ?', [id]);

        res.json({ success: true, data: before[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/*
    PRODUCT bằng SQL thuần
*/

router.get('/products', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Products');
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/products', async (req, res) => {
    try {
        const { productName, price, manufacturingDate } = req.body;
        const [result] = await pool.query(
            'INSERT INTO Products (productName, price, manufacturingDate) VALUES (?, ?, ?)',
            [productName, price, manufacturingDate]
        );
        const [rows] = await pool.query(
            'SELECT * FROM Products WHERE productId = ?',
            [result.insertId]
        );
        res.status(201).json({ success: true, data: rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.put('/products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { productName, price, manufacturingDate } = req.body;

        const [before] = await pool.query(
            'SELECT * FROM Products WHERE productId = ?',
            [id]
        );
        if (before.length === 0) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
        }

        await pool.query(
            'UPDATE Products SET productName = ?, price = ?, manufacturingDate = ? WHERE productId = ?',
            [productName, price, manufacturingDate, id]
        );

        const [after] = await pool.query(
            'SELECT * FROM Products WHERE productId = ?',
            [id]
        );

        res.json({ success: true, data: after[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete('/products/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const [before] = await pool.query(
            'SELECT * FROM Products WHERE productId = ?',
            [id]
        );
        if (before.length === 0) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
        }

        await pool.query('DELETE FROM Products WHERE productId = ?', [id]);

        res.json({ success: true, data: before[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/*
    SHOPPINGCART bằng SQL thuần
*/

router.get('/carts', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM ShoppingCarts');
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/carts', async (req, res) => {
    try {
        const { userId, productId, quantity, createdAt } = req.body;
        const [result] = await pool.query(
            'INSERT INTO ShoppingCarts (userId, productId, quantity, createdAt) VALUES (?, ?, ?, ?)',
            [userId, productId, quantity, createdAt]
        );
        const [rows] = await pool.query(
            'SELECT * FROM ShoppingCarts WHERE cartId = ?',
            [result.insertId]
        );
        res.status(201).json({ success: true, data: rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.put('/carts/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { userId, productId, quantity, createdAt } = req.body;

        const [before] = await pool.query(
            'SELECT * FROM ShoppingCarts WHERE cartId = ?',
            [id]
        );
        if (before.length === 0) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy giỏ hàng' });
        }

        await pool.query(
            'UPDATE ShoppingCarts SET userId = ?, productId = ?, quantity = ?, createdAt = ? WHERE cartId = ?',
            [userId, productId, quantity, createdAt, id]
        );

        const [after] = await pool.query(
            'SELECT * FROM ShoppingCarts WHERE cartId = ?',
            [id]
        );
        res.json({ success: true, data: after[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete('/carts/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const [before] = await pool.query(
            'SELECT * FROM ShoppingCarts WHERE cartId = ?',
            [id]
        );
        if (before.length === 0) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy giỏ hàng' });
        }

        await pool.query('DELETE FROM ShoppingCarts WHERE cartId = ?', [id]);

        res.json({ success: true, data: before[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
