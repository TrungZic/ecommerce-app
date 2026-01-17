const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');

dotenv.config();

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123',
      fullName: 'Admin User',
      role: 'admin',
    });
    console.log('✅ Admin user created:', adminUser.username);

    // Create regular users
    const users = await User.create([
      {
        username: 'user1',
        email: 'user1@example.com',
        password: 'password123',
        fullName: 'User One',
        role: 'user',
      },
      {
        username: 'user2',
        email: 'user2@example.com',
        password: 'password123',
        fullName: 'User Two',
        role: 'user',
      },
    ]);
    console.log(`✅ ${users.length} regular users created`);

    // Create products
    const products = await Product.create([
      {
        name: 'Laptop Dell XPS 13',
        description: 'Laptop cao cấp với hiệu năng mạnh, màn hình OLED',
        price: 25000000,
        category: 'Điện tử',
        stock: 10,
        image: '/image/laptop.jpg',
        createdBy: adminUser._id,
      },
      {
        name: 'iPhone 15 Pro',
        description: 'Smartphone mới nhất từ Apple với chip A17 Pro',
        price: 20000000,
        category: 'Điện thoại',
        stock: 20,
        image: '/image/iphone.jpg',
        createdBy: adminUser._id,
      },
      {
        name: 'Samsung Galaxy S24',
        description: 'Điện thoại flagship với camera 200MP',
        price: 18000000,
        category: 'Điện thoại',
        stock: 15,
        image: '/image/samsung.jpg',
        createdBy: adminUser._id,
      },
      {
        name: 'iPad Pro 12.9',
        description: 'Máy tính bảng cao cấp cho công việc chuyên nghiệp',
        price: 16000000,
        category: 'Máy tính bảng',
        stock: 8,
        image: '/image/ipad.jpg',
        createdBy: adminUser._id,
      },
      {
        name: 'Apple Watch Series 9',
        description: 'Đồng hồ thông minh với màn hình Retina luôn bật',
        price: 8000000,
        category: 'Đồng hồ',
        stock: 25,
        image: '/image/watch.jpg',
        createdBy: adminUser._id,
      },
    ]);
    console.log(`✅ ${products.length} products created`);

    console.log('\n✅ Database seeding completed successfully!');
    console.log('\n📝 Login credentials:');
    console.log('   Admin - username: admin, password: admin123');
    console.log('   User  - username: user1, password: password123');
    console.log('   User  - username: user2, password: password123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();