/**
 * 🔧 Script Chẩn Đoán Lỗi Đăng Ký
 * Chạy: node diagnose.js
 */

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m'
};

console.log(`${colors.blue}=== 🔍 CHẨN ĐOÁN HỆ THỐNG ===\n${colors.reset}`);

// 1. Kiểm tra Node.js
console.log(`${colors.blue}1️⃣ Kiểm tra Node.js${colors.reset}`);
console.log(`   Version: ${process.version}`);
console.log(`   ✓ OK\n`);

// 2. Kiểm tra File
const fs = require('fs');
const path = require('path');

console.log(`${colors.blue}2️⃣ Kiểm tra File Quan Trọng${colors.reset}`);
const files = [
  '../ecomerce-app/src/components/Register.js',
  '../ecomerce-app/src/services/authService.js',
  '../ecomerce-app/src/context/AuthContext.js',
  './controllers/authController.js',
  './models/User.js',
  './routes/authRoutes.js',
  './.env'
];

files.forEach(file => {
  const fullPath = path.join(__dirname, file);
  const exists = fs.existsSync(fullPath);
  console.log(`   ${exists ? '✓' : '✗'} ${file}`);
});
console.log('');

// 3. Kiểm tra .env
console.log(`${colors.blue}3️⃣ Kiểm tra .env${colors.reset}`);
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  console.log(`   ✓ File .env tồn tại`);
  const envContent = fs.readFileSync(envPath, 'utf8');
  const hasMongoDb = envContent.includes('MONGODB_URI');
  const hasPort = envContent.includes('PORT');
  const hasJwt = envContent.includes('JWT_SECRET');
  console.log(`   ${hasMongoDb ? '✓' : '✗'} MONGODB_URI`);
  console.log(`   ${hasPort ? '✓' : '✗'} PORT`);
  console.log(`   ${hasJwt ? '✓' : '✗'} JWT_SECRET`);
} else {
  console.log(`   ✗ File .env không tồn tại!`);
}
console.log('');

// 4. Kiểm tra npm packages
console.log(`${colors.blue}4️⃣ Kiểm tra NPM Packages${colors.reset}`);
const packagePath = path.join(__dirname, 'package.json');
if (fs.existsSync(packagePath)) {
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const deps = pkg.dependencies || {};
  
  const requiredDeps = ['express', 'mongoose', 'bcryptjs', 'jsonwebtoken', 'cors'];
  requiredDeps.forEach(dep => {
    console.log(`   ${deps[dep] ? '✓' : '✗'} ${dep}`);
  });
} else {
  console.log(`   ✗ package.json không tồn tại!`);
}
console.log('');

// 5. Kiểm tra kết nối
console.log(`${colors.blue}5️⃣ Kiểm tra Kết Nối${colors.reset}`);
console.log(`   Kiểm tra MongoDB: http://localhost:27017`);
console.log(`   Kiểm tra Backend: http://localhost:5000`);
console.log(`   Kiểm tra Frontend: http://localhost:3000`);
console.log('');

// 6. Kiểm tra API endpoint
console.log(`${colors.blue}6️⃣ Kiểm tra API Endpoint${colors.reset}`);
testAPI();

async function testAPI() {
  try {
    const response = await fetch('http://localhost:5000/api/health');
    if (response.ok) {
      console.log(`   ✓ Backend đang chạy`);
    } else {
      console.log(`   ✗ Backend trả về lỗi`);
    }
  } catch (error) {
    console.log(`   ✗ Không thể kết nối backend`);
    console.log(`      Lỗi: ${error.message}`);
    console.log(`      Hãy đảm bảo backend đang chạy: cd backend && npm start`);
  }
  
  console.log('');
  console.log(`${colors.blue}=== 📋 CÁC BƯỚC TIẾP THEO ===\n${colors.reset}`);
  console.log(`1. Mở Terminal 1: mongod`);
  console.log(`2. Mở Terminal 2: cd backend && npm start`);
  console.log(`3. Mở Terminal 3: cd ecomerce-app && npm start`);
  console.log(`4. Truy cập: http://localhost:3000/register`);
  console.log(`5. Thử đăng ký\n`);
  console.log(`Nếu lỗi, kiểm tra Console (F12) trên browser!\n`);
}
