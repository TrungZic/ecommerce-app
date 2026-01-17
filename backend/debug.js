/**
 * 🔍 Debug Script - Check Database Connection & Login
 * 
 * Chạy: node debug.js (từ thư mục backend/)
 * Dùng để kiểm tra:
 * - MongoDB connection
 * - User accounts in database
 * - Test login
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

async function debugDatabase() {
  console.log('\n' + '='.repeat(60));
  console.log('🔍 DATABASE DEBUG SCRIPT');
  console.log('='.repeat(60) + '\n');

  try {
    // Step 1: Check env variables
    console.log('📝 Environment Variables:');
    console.log(`   MongoDB URI: ${process.env.MONGODB_URI}`);
    console.log(`   JWT Secret: ${process.env.JWT_SECRET ? '✅ Set' : '❌ Not set'}`);
    console.log(`   Port: ${process.env.PORT || 5000}`);

    // Step 2: Connect to MongoDB
    console.log('\n🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ MongoDB Connected Successfully!\n');

    // Step 3: Check users in database
    console.log('📊 Checking Users in Database:');
    const users = await User.find({}).select('username email role');
    
    if (users.length === 0) {
      console.log('❌ NO USERS FOUND IN DATABASE!');
      console.log('\n⚠️  Please run: node seed.js');
    } else {
      console.log(`✅ Found ${users.length} users:\n`);
      users.forEach((user, index) => {
        console.log(`   ${index + 1}. Username: ${user.username}`);
        console.log(`      Email: ${user.email}`);
        console.log(`      Role: ${user.role}`);
        console.log(`      ID: ${user._id}\n`);
      });
    }

    // Step 4: Test login with admin account
    console.log('\n🔐 Testing Admin Login:');
    const adminUser = await User.findOne({ username: 'admin' }).select('+password');
    
    if (!adminUser) {
      console.log('❌ Admin account not found! Run: node seed.js');
    } else {
      console.log('✅ Admin account found!');
      
      // Test password
      const testPassword = 'admin123';
      const isPasswordMatch = await adminUser.matchPassword(testPassword);
      
      if (isPasswordMatch) {
        console.log(`✅ Password test successful! ("${testPassword}" matches)`);
      } else {
        console.log(`❌ Password test failed! ("${testPassword}" doesn't match)`);
      }
    }

    // Step 5: Test login with regular user
    console.log('\n👤 Testing User1 Login:');
    const user1 = await User.findOne({ username: 'user1' }).select('+password');
    
    if (!user1) {
      console.log('❌ User1 account not found! Run: node seed.js');
    } else {
      console.log('✅ User1 account found!');
      
      const testPassword = 'password123';
      const isPasswordMatch = await user1.matchPassword(testPassword);
      
      if (isPasswordMatch) {
        console.log(`✅ Password test successful! ("${testPassword}" matches)`);
      } else {
        console.log(`❌ Password test failed! ("${testPassword}" doesn't match)`);
      }
    }

    // Step 6: Summary
    console.log('\n' + '='.repeat(60));
    console.log('📋 SUMMARY');
    console.log('='.repeat(60));
    console.log('\n✅ What to do next:');
    console.log('   1. Start backend: npm start');
    console.log('   2. Go to: http://localhost:3000/admin');
    console.log('   3. Login with: admin / admin123');
    console.log('   4. Access AdminDashboard\n');

    process.exit(0);

  } catch (error) {
    console.error('\n❌ ERROR OCCURRED:');
    console.error(`   ${error.message}\n`);
    
    if (error.message.includes('connect ECONNREFUSED')) {
      console.log('🔧 Solution:');
      console.log('   - MongoDB is not running');
      console.log('   - Start MongoDB: mongod');
      console.log('   - Or setup MongoDB Atlas in .env');
    } else if (error.message.includes('authentication failed')) {
      console.log('🔧 Solution:');
      console.log('   - MongoDB URI credentials are wrong');
      console.log('   - Check .env file');
    }
    
    process.exit(1);
  }
}

// Run debug script
debugDatabase();
