const express = require('express');
const axios = require('axios');
const ExternalUser = require('../models/ExternalUser');

const router = express.Router();

router.post('/import-external-users', async (req, res) => {
    try {
        const response = await axios.get(
            'https://jsonplaceholder.typicode.com/users'
        );
        const usersFromApi = response.data;

        const dataToSave = usersFromApi.map((u) => ({
            externalId: u.id,
            name: u.name,
            email: u.email,
            phone: u.phone,
            website: u.website
        }));

        await ExternalUser.bulkCreate(dataToSave, {
            ignoreDuplicates: true
        });

        const allUsers = await ExternalUser.findAll();

        res.json({
            success: true,
            message: 'Đã nhập dữ liệu người dùng từ trang ngoài',
            total: allUsers.length,
            data: allUsers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy dữ liệu từ jsonplaceholder',
            error: error.message
        });
    }
});

module.exports = router;
