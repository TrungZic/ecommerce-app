/**
 * Test script để kiểm tra quy trình đăng ký
 * Chạy: npm run test:register
 */

const API_URL = 'http://localhost:5000/api';

async function testRegister() {
  console.log('🧪 Kiểm tra quy trình đăng ký\n');

  const testData = {
    username: `testuser_${Date.now()}`,
    email: `test${Date.now()}@example.com`,
    password: 'Test123456',
    confirmPassword: 'Test123456',
    fullName: 'Nguyễn Văn A',
    phoneNumber: '0123456789',
    address: '123 Đường ABC',
    city: 'Hà Nội'
  };

  console.log('📤 Gửi dữ liệu đăng ký:');
  console.log(JSON.stringify({
    ...testData,
    password: '****',
    confirmPassword: '****'
  }, null, 2));

  try {
    console.log('\n⏳ Đang gửi yêu cầu đăng ký...\n');
    
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();

    if (response.ok && result.success) {
      console.log('✅ ĐĂNG KÝ THÀNH CÔNG!\n');
      console.log('📋 Thông tin user đã lưu:');
      console.log(JSON.stringify(result.user, null, 2));
      console.log('\n✓ Chạy "node backend/check-database.js" để xem tất cả users trong database');
    } else {
      console.log('❌ ĐĂNG KÝ THẤT BẠI\n');
      console.log('Lỗi:', result.message);
    }
  } catch (error) {
    console.error('❌ Lỗi kết nối:', error.message);
    console.log('\n💡 Hãy đảm bảo:');
    console.log('1. Backend đang chạy (npm start trong thư mục backend)');
    console.log('2. MongoDB đang chạy');
    console.log('3. Port 5000 sẵn sàng');
  }
}

testRegister();
