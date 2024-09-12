const nodemailer = require('nodemailer');

// Cấu hình nodemailer với thông tin SMTP của bạn
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Ví dụ sử dụng Gmail, có thể thay đổi tùy theo dịch vụ email của bạn
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Gửi thông báo khi người dùng đăng ký khóa học thành công
const sendEnrollmentSuccessNotification = async (email, courseName) => {
  const mailOptions = {
    from: 'your-email@example.com',
    to: email,
    subject: `Enrollment Successful for: ${courseName}`,
    text: `You have successfully enrolled in the course: ${courseName}.`
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendEnrollmentSuccessNotification,
  // ... các chức năng khác
};
