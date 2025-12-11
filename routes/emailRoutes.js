const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

router.post('/send-email', async (req, res) => {
    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
        return res.status(400).json({
            success: false,
            message: 'Cần nhập đầy đủ email, subject và message'
        });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'yourgmail@gmail.com',      // TODO: đổi thành Gmail của bạn
            pass: 'your_app_password_here'    // TODO: mật khẩu ứng dụng
        }
    });

    const mailOptions = {
        from: 'yourgmail@gmail.com',
        to: email,
        subject: subject,
        text: message
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        res.json({
            success: true,
            message: 'Đã gửi thư điện tử thành công',
            info: info
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gửi thư điện tử thất bại',
            error: error.message
        });
    }
});

module.exports = router;
