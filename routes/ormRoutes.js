const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const ShoppingCart = require('../models/ShoppingCart');

const router = express.Router();

/*
    PHẦN 1: USER BẰNG ORM (TRẢ VỀ ĐÚNG FORMAT ĐỀ BÀI)
    -----------------------------------------------
    - action: mô tả hành động (view_all, create, update, delete)
    - status: success hoặc error
    - User / Users: dữ liệu người dùng
*/

/**
 * Xem tất cả người dùng
 * GET /api/orm/orm-users
 */
router.get('/orm-users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json({
            action: 'view_all',
            status: 'success',
            Users: users
        });
    } catch (error) {
        res.status(500).json({
            action: 'view_all',
            status: 'error',
            message: error.message
        });
    }
});

/**
 * Thêm người dùng mới
 * POST /api/orm/orm-users
 * Body dạng JSON
 */
router.post('/orm-users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            action: 'create',
            status: 'success',
            User: user
        });
    } catch (error) {
        res.status(500).json({
            action: 'create',
            status: 'error',
            message: error.message
        });
    }
});

/**
 * Cập nhật người dùng
 * PUT /api/orm/orm-users/:id
 */
router.put('/orm-users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                action: 'update',
                status: 'error',
                message: 'Không tìm thấy người dùng'
            });
        }

        await user.update(req.body);

        res.json({
            action: 'update',
            status: 'success',
            User: user
        });
    } catch (error) {
        res.status(500).json({
            action: 'update',
            status: 'error',
            message: error.message
        });
    }
});

/**
 * Xóa người dùng
 * DELETE /api/orm/orm-users/:id
 */
router.delete('/orm-users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                action: 'delete',
                status: 'error',
                message: 'Không tìm thấy người dùng'
            });
        }

        await user.destroy();

        res.json({
            action: 'delete',
            status: 'success',
            User: user
        });
    } catch (error) {
        res.status(500).json({
            action: 'delete',
            status: 'error',
            message: error.message
        });
    }
});

/*
    PHẦN 2: PRODUCT BẰNG ORM
*/

/**
 * Xem tất cả sản phẩm
 * GET /api/orm/orm-products
 */
router.get('/orm-products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json({
            action: 'view_all',
            status: 'success',
            Products: products
        });
    } catch (error) {
        res.status(500).json({
            action: 'view_all',
            status: 'error',
            message: error.message
        });
    }
});

/**
 * Thêm sản phẩm
 * POST /api/orm/orm-products
 */
router.post('/orm-products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({
            action: 'create',
            status: 'success',
            Product: product
        });
    } catch (error) {
        res.status(500).json({
            action: 'create',
            status: 'error',
            message: error.message
        });
    }
});

/**
 * Cập nhật sản phẩm
 * PUT /api/orm/orm-products/:id
 */
router.put('/orm-products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                action: 'update',
                status: 'error',
                message: 'Không tìm thấy sản phẩm'
            });
        }

        await product.update(req.body);

        res.json({
            action: 'update',
            status: 'success',
            Product: product
        });
    } catch (error) {
        res.status(500).json({
            action: 'update',
            status: 'error',
            message: error.message
        });
    }
});

/**
 * Xóa sản phẩm
 * DELETE /api/orm/orm-products/:id
 */
router.delete('/orm-products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                action: 'delete',
                status: 'error',
                message: 'Không tìm thấy sản phẩm'
            });
        }

        await product.destroy();

        res.json({
            action: 'delete',
            status: 'success',
            Product: product
        });
    } catch (error) {
        res.status(500).json({
            action: 'delete',
            status: 'error',
            message: error.message
        });
    }
});

/*
    PHẦN 3: SHOPPING CART BẰNG ORM
*/

/**
 * Xem tất cả giỏ hàng
 * GET /api/orm/orm-carts
 */
router.get('/orm-carts', async (req, res) => {
    try {
        const carts = await ShoppingCart.findAll();
        res.json({
            action: 'view_all',
            status: 'success',
            ShoppingCarts: carts
        });
    } catch (error) {
        res.status(500).json({
            action: 'view_all',
            status: 'error',
            message: error.message
        });
    }
});

/**
 * Thêm giỏ hàng
 * POST /api/orm/orm-carts
 */
router.post('/orm-carts', async (req, res) => {
    try {
        const cart = await ShoppingCart.create(req.body);
        res.status(201).json({
            action: 'create',
            status: 'success',
            ShoppingCart: cart
        });
    } catch (error) {
        res.status(500).json({
            action: 'create',
            status: 'error',
            message: error.message
        });
    }
});

/**
 * Cập nhật giỏ hàng
 * PUT /api/orm/orm-carts/:id
 */
router.put('/orm-carts/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const cart = await ShoppingCart.findByPk(id);

        if (!cart) {
            return res.status(404).json({
                action: 'update',
                status: 'error',
                message: 'Không tìm thấy giỏ hàng'
            });
        }

        await cart.update(req.body);

        res.json({
            action: 'update',
            status: 'success',
            ShoppingCart: cart
        });
    } catch (error) {
        res.status(500).json({
            action: 'update',
            status: 'error',
            message: error.message
        });
    }
});

/**
 * Xóa giỏ hàng
 * DELETE /api/orm/orm-carts/:id
 */
router.delete('/orm-carts/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const cart = await ShoppingCart.findByPk(id);

        if (!cart) {
            return res.status(404).json({
                action: 'delete',
                status: 'error',
                message: 'Không tìm thấy giỏ hàng'
            });
        }

        await cart.destroy();

        res.json({
            action: 'delete',
            status: 'success',
            ShoppingCart: cart
        });
    } catch (error) {
        res.status(500).json({
            action: 'delete',
            status: 'error',
            message: error.message
        });
    }
});

module.exports = router;
