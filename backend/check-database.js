const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const User = require('./models/User');

async function checkDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Kết nối MongoDB thành công');

    // Check users collection
    const userCount = await User.countDocuments();
    console.log(`\n📊 Tổng số users: ${userCount}`);

    if (userCount > 0) {
      console.log('\n📝 Danh sách users:');
      const users = await User.find().select('-password');
      users.forEach((user, index) => {
        console.log(`\n${index + 1}. ${user.username}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Họ tên: ${user.fullName || '(chưa điền)'}`);
        console.log(`   Điện thoại: ${user.phoneNumber || '(chưa điền)'}`);
        console.log(`   Địa chỉ: ${user.address || '(chưa điền)'}`);
        console.log(`   Thành phố: ${user.city || '(chưa điền)'}`);
        console.log(`   Role: ${user.role}`);
        console.log(`   Ngày tạo: ${new Date(user.createdAt).toLocaleString('vi-VN')}`);
      });
    } else {
      console.log('❌ Chưa có user nào trong database');
    }

    // Close connection
    await mongoose.connection.close();
    console.log('\n✓ Đóng kết nối');
  } catch (error) {
    console.error('❌ Lỗi:', error.message);
    process.exit(1);
  }
}

checkDatabase();
