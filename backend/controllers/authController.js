const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Hàm validate email
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Đăng ký
exports.register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, fullName, phoneNumber, address, city } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ thông tin' });
    }

    // Kiểm tra định dạng email
    if (!validateEmail(email)) {
      return res.status(400).json({ success: false, message: 'Email không hợp lệ' });
    }

    // Kiểm tra độ dài password
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Mật khẩu phải tối thiểu 6 ký tự' });
    }

    // Kiểm tra password khớp
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Mật khẩu không khớp' });
    }

    // Kiểm tra user đã tồn tại
    const existingUser = await User.findOne({ $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }] });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email hoặc tên đăng nhập đã tồn tại' });
    }

    // Tạo user mới
    const user = await User.create({
      username: username.trim().toLowerCase(),
      email: email.toLowerCase().trim(),
      password,
      fullName: fullName ? fullName.trim() : '',
      phoneNumber: phoneNumber ? phoneNumber.trim() : '',
      address: address ? address.trim() : '',
      city: city ? city.trim() : '',
    });

    console.log('✅ User registered successfully:', user.username);

    const userObj = user.toObject ? user.toObject() : user;
    res.status(201).json({
      success: true,
      message: 'Đăng ký thành công!',
      user: {
        id: userObj._id,
        username: userObj.username,
        email: userObj.email,
        fullName: userObj.fullName || '',
        phoneNumber: userObj.phoneNumber || '',
        address: userObj.address || '',
        city: userObj.city || '',
        role: userObj.role || 'user',
      },
    });
  } catch (error) {
    console.error('❌ Register error:', error);
    res.status(500).json({ success: false, message: error.message || 'Lỗi đăng ký người dùng' });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kiểm tra input
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Vui lòng cung cấp tên đăng nhập và mật khẩu' });
    }

    // Kiểm tra JWT_SECRET
    if (!process.env.JWT_SECRET) {
      console.error('❌ JWT_SECRET is not defined in environment variables');
      return res.status(500).json({ success: false, message: 'Lỗi cấu hình server' });
    }

    // Tìm user
    const user = await User.findOne({ username: username.toLowerCase() }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Tên đăng nhập hoặc mật khẩu không chính xác' });
    }

    // Kiểm tra password
    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({ success: false, message: 'Tên đăng nhập hoặc mật khẩu không chính xác' });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('✅ User logged in successfully:', user.username);

    res.status(200).json({
      success: true,
      message: 'Đăng nhập thành công!',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName || '',
        phoneNumber: user.phoneNumber || '',
        address: user.address || '',
        city: user.city || '',
        role: user.role || 'user',
      },
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ success: false, message: error.message || 'Lỗi đăng nhập' });
  }
};

// Lấy thông tin user
exports.getProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: 'Không có quyền truy cập' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Người dùng không tồn tại' });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('❌ Get profile error:', error);
    res.status(500).json({ success: false, message: error.message || 'Lỗi lấy thông tin người dùng' });
  }
};

// Cập nhật thông tin user
exports.updateProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: 'Không có quyền truy cập' });
    }

    const { fullName, phoneNumber, address, city } = req.body;

    const updateData = {};
    if (fullName) updateData.fullName = fullName.trim();
    if (phoneNumber) updateData.phoneNumber = phoneNumber.trim();
    if (address) updateData.address = address.trim();
    if (city) updateData.city = city.trim();

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'Người dùng không tồn tại' });
    }

    console.log('✅ User profile updated:', user.username);

    res.status(200).json({
      success: true,
      message: 'Cập nhật thông tin thành công!',
      user,
    });
  } catch (error) {
    console.error('❌ Update profile error:', error);
    res.status(500).json({ success: false, message: error.message || 'Lỗi cập nhật thông tin' });
  }
};

// Đổi mật khẩu
exports.changePassword = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: 'Không có quyền truy cập' });
    }

    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ thông tin' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'Mật khẩu mới phải tối thiểu 6 ký tự' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Mật khẩu mới không khớp' });
    }

    const user = await User.findById(req.user.id).select('+password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'Người dùng không tồn tại' });
    }

    const isPasswordMatch = await user.matchPassword(oldPassword);
    if (!isPasswordMatch) {
      return res.status(400).json({ success: false, message: 'Mật khẩu cũ không chính xác' });
    }

    user.password = newPassword;
    await user.save();

    console.log('✅ Password changed for user:', user.username);

    res.status(200).json({
      success: true,
      message: 'Đổi mật khẩu thành công!',
    });
  } catch (error) {
    console.error('❌ Change password error:', error);
    res.status(500).json({ success: false, message: error.message || 'Lỗi đổi mật khẩu' });
  }
};

// Quên mật khẩu
exports.forgotPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ thông tin' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ success: false, message: 'Email không hợp lệ' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'Mật khẩu phải tối thiểu 6 ký tự' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Mật khẩu mới không khớp' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Email không tồn tại' });
    }

    user.password = newPassword;
    await user.save();

    console.log('✅ Password reset for user:', user.username);

    res.status(200).json({
      success: true,
      message: 'Đặt lại mật khẩu thành công!',
    });
  } catch (error) {
    console.error('❌ Forgot password error:', error);
    res.status(500).json({ success: false, message: error.message || 'Lỗi đặt lại mật khẩu' });
  }
};