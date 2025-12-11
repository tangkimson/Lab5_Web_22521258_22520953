const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
        const extension = path.extname(file.originalname);
        cb(null, uniqueSuffix + extension);
    }
});

const upload = multer({ storage });

router.post('/upload-image', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res
            .status(400)
            .json({ success: false, message: 'Không có tệp ảnh được gửi lên' });
    }

    res.status(201).json({
        success: true,
        message: 'Tải ảnh thành công',
        file: {
            fileName: req.file.filename,
            url: `/uploads/${req.file.filename}`
        }
    });
});

router.get('/images/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, '..', 'uploads', fileName);
    res.sendFile(filePath);
});

module.exports = router;
