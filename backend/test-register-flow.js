/**
 * 🧪 Test Toàn Bộ Quy Trình Đăng Ký
 * Chạy: node test-register-flow.js
 */

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  cyan: '\x1b[36m'
};

async function testFlow() {
  console.log(`\n${colors.cyan}╔════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.cyan}║  🧪 TEST TOÀN BỘ QUY TRÌNH ĐĂNG KÝ     ║${colors.reset}`);
  console.log(`${colors.cyan}╚════════════════════════════════════════╝${colors.reset}\n`);

  // Test 1: Kiểm tra Backend
  console.log(`${colors.blue}1️⃣  Kiểm tra Backend có chạy không...${colors.reset}`);
  const backendOk = await testBackend();
  
  if (!backendOk) {
    console.log(`${colors.red}❌ Backend không chạy!${colors.reset}`);
    console.log(`${colors.yellow}   Hãy chạy: cd backend && npm start${colors.reset}\n`);
    return;
  }

  // Test 2: Kiểm tra MongoDB
  console.log(`\n${colors.blue}2️⃣  Kiểm tra MongoDB có chạy không...${colors.reset}`);
  const mongoOk = await testMongoDB();
  
  if (!mongoOk) {
    console.log(`${colors.red}❌ MongoDB không chạy!${colors.reset}`);
    console.log(`${colors.yellow}   Hãy chạy: mongod${colors.reset}\n`);
    return;
  }

  // Test 3: Test API Register endpoint
  console.log(`\n${colors.blue}3️⃣  Kiểm tra API Register endpoint...${colors.reset}`);
  await testRegisterAPI();

  // Test 4: Hướng dẫn tiếp theo
  console.log(`\n${colors.cyan}╔════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.cyan}║  📋 HƯỚNG DẪN DEBUG                    ║${colors.reset}`);
  console.log(`${colors.cyan}╚════════════════════════════════════════╝${colors.reset}\n`);
  
  console.log(`${colors.green}✓${colors.reset} Backend & MongoDB đang chạy bình thường\n`);
  
  console.log(`${colors.yellow}Nếu form vẫn không hoạt động:${colors.reset}\n`);
  console.log(`1. Mở trình duyệt ở http://localhost:3000/register`);
  console.log(`2. Nhấn F12 để mở Developer Tools`);
  console.log(`3. Chuyển sang tab "Console"`);
  console.log(`4. Điền form và nhấn "Đăng Ký"`);
  console.log(`5. Gửi tất cả thông báo lỗi cho tôi\n`);

  console.log(`${colors.yellow}Hoặc kiểm tra Network tab:${colors.reset}\n`);
  console.log(`1. Mở DevTools → Network tab`);
  console.log(`2. Nhấn "Đăng Ký"`);
  console.log(`3. Tìm request tới "register"`);
  console.log(`4. Xem Status Code và Response\n`);
}

async function testBackend() {
  try {
    const response = await fetch('http://localhost:5000/api/health', {
      method: 'GET',
      timeout: 5000
    });
    if (response.ok) {
      const data = await response.json();
      console.log(`${colors.green}   ✓ Backend đang chạy (port 5000)${colors.reset}`);
      return true;
    }
  } catch (error) {
    console.log(`${colors.red}   ✗ Lỗi: ${error.message}${colors.reset}`);
  }
  return false;
}

async function testMongoDB() {
  try {
    const mongoose = require('mongoose');
    const dotenv = require('dotenv');
    dotenv.config();

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 5000,
    });
    
    console.log(`${colors.green}   ✓ MongoDB kết nối thành công${colors.reset}`);
    await mongoose.connection.close();
    return true;
  } catch (error) {
    console.log(`${colors.red}   ✗ Lỗi: ${error.message}${colors.reset}`);
  }
  return false;
}

async function testRegisterAPI() {
  try {
    const testData = {
      username: `test_${Date.now()}`,
      email: `test_${Date.now()}@example.com`,
      password: 'Test123456',
      confirmPassword: 'Test123456',
      fullName: 'Nguyễn Văn Test',
      phoneNumber: '0123456789',
      address: '123 Test Street',
      city: 'Hà Nội'
    };

    console.log(`   Gửi test data...`);
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();

    if (response.ok && result.success) {
      console.log(`${colors.green}   ✓ API Register hoạt động bình thường${colors.reset}`);
      console.log(`${colors.green}   ✓ User mới được tạo: ${result.user.username}${colors.reset}`);
    } else {
      console.log(`${colors.red}   ✗ Lỗi từ API: ${result.message}${colors.reset}`);
    }
  } catch (error) {
    console.log(`${colors.red}   ✗ Lỗi kết nối: ${error.message}${colors.reset}`);
  }
}

// Chạy test
testFlow().catch(err => {
  console.error(`${colors.red}❌ Lỗi:${colors.reset}`, err);
  process.exit(1);
});
