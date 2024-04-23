const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const route = express.Router(); // Tạo một đối tượng Route từ Router của Express

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project5'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

// Thay đổi từ app.post thành route.post
route.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  const sql = 'SELECT * FROM TaiKhoanNV WHERE TenTKNV = ? AND Matkhau = ?';
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (results.length > 0) {
      res.json({ message: 'Đăng nhập thành công' });
    } else {
      res.status(401).json({ error: 'Nhập sai mật khẩu hoặc tên đăng nhập! Hãy nhập lại!' });
    }
  });
});

// Sử dụng route đã tạo
app.use(route);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
