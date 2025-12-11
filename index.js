const express = require('express');
const path = require('path');
const { sequelize } = require('./db');

const sqlRouter = require('./routes/sqlRoutes');
const ormRouter = require('./routes/ormRoutes');
const emailRouter = require('./routes/emailRoutes');
const uploadRouter = require('./routes/uploadRoutes');
const externalRouter = require('./routes/externalRoutes');

const app = express();

app.use(express.json());

// cho phép truy cập thư mục uploads qua đường dẫn /uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// router SQL thuần
app.use('/api/sql', sqlRouter);

// router ORM
app.use('/api/orm', ormRouter);

// router email, upload, external
app.use('/api', emailRouter);
app.use('/api', uploadRouter);
app.use('/api', externalRouter);

app.get('/', (req, res) => {
    res.send('Lab 5 API đã chạy!');
});

sequelize
    .sync()
    .then(() => {
        console.log('Đã kết nối và đồng bộ cơ sở dữ liệu');
        const port = 3000;
        app.listen(port, () => {
            console.log(`Máy chủ đang chạy tại http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error('Lỗi khi kết nối cơ sở dữ liệu:', err.message);
    });
