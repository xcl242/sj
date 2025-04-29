// server.js
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const winston = require('winston'); // 引入日志库
const fs = require('fs');

// 配置日志
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log' })
    ]
});

const app = express();
const port = 3001;

// 允许跨域请求
app.use(cors());
// 解析请求体
app.use(bodyParser.json());

// 确保 uploads 文件夹存在
const uploadsDir = '../js/uploads';
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// 配置 Multer 用于处理文件上传
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// 连接数据库
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '6symxmyz',
    database: 'yu_xin',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 测试数据库连接
pool.getConnection()
   .then(connection => {
        console.log('数据库连接成功');
        connection.release();
    })
   .catch(error => {
        console.error('数据库连接失败:', error);
    });

// 处理注册请求
const handleRegister = async (req, res) => {
    try {
        const { nickname, account, password } = req.body;
        if (!nickname || !account || !password) {
            return res.status(400).json({ message: '注册信息不完整' });
        }
        const avatar = 'default-avatar.jpg';
        const [rows] = await pool.execute(
            'INSERT INTO users (nickname, account, password, avatar) VALUES (?,?,?,?)',
            [nickname, account, password, avatar]
        );
        res.status(201).json({ message: '注册成功' });
    } catch (error) {
        logger.error('注册失败:', error);
        res.status(500).json({ message: '注册失败，请稍后重试' });
    }
};

// 处理登录请求
const handleLogin = async (req, res) => {
    try {
        const { account, password } = req.body;
        if (!account || !password) {
            return res.status(400).json({ message: '登录信息不完整' });
        }
        const [rows] = await pool.execute(
            'SELECT * FROM users WHERE account = ? AND password = ?',
            [account, password]
        );
        if (rows.length > 0) {
            const user = rows[0];
            res.status(200).json({ message: '登录成功', avatar: user.avatar });
        } else {
            res.status(401).json({ message: '账号或密码错误' });
        }
    } catch (error) {
        logger.error('登录失败:', error);
        res.status(500).json({ message: '登录失败，请稍后重试' });
    }
};

// 处理头像更改请求
const handleChangeAvatar = async (req, res) => {
    try {
        const { account } = req.body;
        const avatar = req.file ? req.file.filename : null;
        if (!account || !avatar) {
            return res.status(400).json({ message: '请求参数不完整或未上传头像文件' });
        }
        const [rows] = await pool.execute(
            'UPDATE users SET avatar = ? WHERE account = ?',
            [avatar, account]
        );
        res.status(200).json({ message: '头像更改成功', avatar: avatar });
    } catch (error) {
        logger.error('头像更改失败:', error);
        res.status(500).json({ message: '头像更改失败，请稍后重试' });
    }
};

// 处理商品购买请求
const handlePurchase = async (req, res) => {
    try {
        const { productId, nickname, quantity } = req.body;
        if (productId === undefined || nickname === undefined || quantity === undefined) {
            return res.status(400).json({ message: '请求参数不完整' });
        }
        if (typeof productId!== 'number' || typeof quantity!== 'number' || typeof nickname!== 'string') {
            return res.status(400).json({ message: '请求参数类型错误' });
        }
        const [productRows] = await pool.execute(
            'SELECT * FROM products WHERE id = ?',
            [productId]
        );
        if (productRows.length === 0) {
            return res.status(404).json({ message: '商品不存在' });
        }
        const product = productRows[0];
        if (product.stock < quantity) {
            return res.status(400).json({ message: '库存不足' });
        }
        await pool.execute(
            'UPDATE products SET stock = stock - ? WHERE id = ?',
            [quantity, productId]
        );
        const orderDate = new Date();
        await pool.execute(
            'INSERT INTO orders (nickname, product_id, quantity, order_date) VALUES (?,?,?,?)',
            [nickname, productId, quantity, orderDate]
        );
        res.status(200).json({ message: '购买成功' });
    } catch (error) {
        logger.error('购买失败:', error);
        res.status(500).json({ message: '购买失败，请稍后重试' });
    }
};

// 处理评论提交
app.post('/submit-comment', upload.single('image'), async (req, res) => {
    const { text } = req.body;
    const image = req.file? req.file.filename : null;
    try {
        const [result] = await pool.execute(
            'INSERT INTO comments (text, image) VALUES (?,?)',
            [text, image]
        );
        res.json({ success: true, commentId: result.insertId });
    } catch (error) {
        console.error('Error inserting comment:', error);
        if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            res.json({ success: false, message: '数据库访问权限错误' });
        } else if (error.code === 'ER_NO_SUCH_TABLE') {
            res.json({ success: false, message: '数据库表不存在' });
        } else {
            res.json({ success: false, message: '插入评论时发生未知错误' });
        }
    }
});
// 获取评论列表
app.get('/get-comments', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    try {
        const [rows] = await pool.execute('SELECT * FROM comments ORDER BY id DESC LIMIT? OFFSET?', [limit, offset]);
        const [countRows] = await pool.execute('SELECT COUNT(*) as total FROM comments');
        const total = countRows[0].total;
        const comments = rows.map(row => ({
            id: row.id,
            text: row.text,
            image: row.image? `/uploads/${row.image}` : null
        }));
        res.json({ comments, total });
    } catch (error) {
        console.error('Error fetching comments:', error);
        if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            res.json({ comments: [], total: 0, message: '数据库访问权限错误' });
        } else if (error.code === 'ER_NO_SUCH_TABLE') {
            res.json({ comments: [], total: 0, message: '数据库表不存在' });
        } else {
            res.json({ comments: [], total: 0, message: '获取评论时发生未知错误' });
        }
    }
});
// 删除评论
app.delete('/delete-comment/:id', async (req, res) => {
    const { id: commentId } = req.params;
    try {
        const [result] = await pool.execute('DELETE FROM comments WHERE id =?', [commentId]);
        if (result.affectedRows > 0) {
            res.json({ success: true, message: '评论删除成功' });
        } else {
            res.json({ success: false, message: '评论不存在' });
        }
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.json({ success: false, message: '删除评论时发生未知错误' });
    }
});

// 更新评论
app.put('/update-comment/:id', upload.single('image'), async (req, res) => {
    const { id: commentId } = req.params;
    const { text } = req.body;
    const image = req.file? req.file.filename : null;
    try {
        let query;
        let values;
        if (image) {
            query = 'UPDATE comments SET text =?, image =? WHERE id =?';
            values = [text, image, commentId];
        } else {
            query = 'UPDATE comments SET text =? WHERE id =?';
            values = [text, commentId];
        }
        const [result] = await pool.execute(query, values);
        if (result.affectedRows > 0) {
            res.json({ success: true, message: '评论更新成功' });
        } else {
            res.json({ success: false, message: '评论不存在' });
        }
    } catch (error) {
        console.error('Error updating comment:', error);
        res.json({ success: false, message: '更新评论时发生未知错误' });
    }
});
// 静态文件服务
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
// 处理注册请求
app.post('/register', handleRegister);

// 处理登录请求
app.post('/login', handleLogin);

// 处理头像更改请求
app.post('/change-avatar', upload.single('avatar'), handleChangeAvatar);

// 处理商品购买请求
app.post('/purchase', handlePurchase);
// 启动服务器
app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});