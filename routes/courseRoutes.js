const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');
const Course = require('../models/course');
const Lecture = require('../models/lecture');
const { registerCourse } = require('../controllers/courseController');

// Route để đăng ký khóa học
router.post('/register', registerCourse);

// Thêm khóa học mới (chỉ admin)
router.post('/', authenticateToken, authorizeAdmin, async (req, res) => {
  const { name, description, instructor, startDate, endDate, price, imageUrl } = req.body;
  const course = new Course({ name, description, instructor, startDate, endDate, price, imageUrl });
  await course.save();
  res.status(201).json(course);
});

// Sửa khóa học (chỉ admin)
router.put('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(course);
});

// Xóa khóa học (chỉ admin)
router.delete('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Thêm bài giảng vào khóa học (chỉ admin)
router.post('/:courseId/lectures', authenticateToken, authorizeAdmin, async (req, res) => {
  const { title, description, videoUrl, attachments } = req.body;
  const lecture = new Lecture({ title, description, videoUrl, attachments });
  const course = await Course.findById(req.params.courseId);
  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }
  course.lectures.push(lecture);
  await course.save();
  await lecture.save();
  res.status(201).json(lecture);
});

// Lấy danh sách khóa học với phân trang và tìm kiếm
router.get('/', async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;
  const query = search ? { name: new RegExp(search, 'i') } : {};
  const courses = await Course.find(query).limit(limit * 1).skip((page - 1) * limit).exec();
  const count = await Course.countDocuments(query);
  res.json({
    courses,
    totalPages: Math.ceil(count / limit),
    currentPage: page
  });
});

module.exports = router;
