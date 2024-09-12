const courseModel = require('../models/courseModel');
const emailService = require('../services/emailService');
const userModel = require('./path/to/userModel');

// Đăng ký khóa học
const registerCourse = async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    // Xử lý đăng ký khóa học (lưu thông tin vào cơ sở dữ liệu)
    // ...

    // Tìm thông tin khóa học và email người dùng
    const course = await courseModel.findById(courseId);
    const user = await userModel.findById(userId);

    if (!course || !user) {
      return res.status(404).json({ message: 'Course or User not found' });
    }

    // Gửi email thông báo
    await emailService.sendEnrollmentSuccessNotification(user.email, course.name);

    res.status(200).json({ message: 'Successfully registered for the course and email sent' });
  } catch (error) {
    console.error('Error registering course:', error);
    res.status(500).json({ error: 'Failed to register course' });
  }
};

module.exports = {
  registerCourse,
  // ... các chức năng khác
};
