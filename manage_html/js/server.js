const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 初始连接不指定数据库（避免提前连接不存在的数据库）
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '6symxmyz', // 确保你的 MySQL 密码正确
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function createDatabaseAndTable() {
  try {
    // 1. 创建数据库（禁用预处理，传递空参数数组）
    await pool.execute(
      'CREATE DATABASE IF NOT EXISTS manage_database', 
      [], // 无参数时传空数组
      { prepare: false } // 关键：禁用预处理
    );

    // 2. 切换数据库（必须同样禁用预处理）
    await pool.execute(
      'USE yu_xin', 
      [], 
      { prepare: false } // 核心修复：添加禁用预处理配置
    );

    // 3. 创建用户表（DDL 语句同样禁用预处理）
    await pool.execute(
      `CREATE TABLE IF NOT EXISTS manage_database (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(50) NOT NULL
      )`, 
      [], 
      { prepare: false }
    );

    console.log('数据库和表创建/连接成功');
  } catch (error) {
    console.error('数据库初始化失败:', error);
  }
}
createDatabaseAndTable();

// 登录接口（查询语句使用预处理，无需修改，因为查询支持参数化）
app.post('/login', async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).send('请填写完整的用户名和密码');
  }
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE name = ? AND password = ?',
      [name, password] // 查询语句的参数化支持预处理，正常传递数组
    );
    if (rows.length > 0) {
      res.status(200).json({ success: true, redirect: '/manager.html' });
    } else {
      res.status(401).json({ success: false, message: '用户名或密码错误' });
    }
  } catch (error) {
    console.error('登录查询失败:', error);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

app.listen(port, () => {
  console.log(`服务器运行在端口 ${port}`);
});