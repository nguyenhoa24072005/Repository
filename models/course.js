const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: String,
  description: String,
  instructor: String,
  startDate: Date,
  endDate: Date,
  price: Number,
  imageUrl: String,
  lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' }]
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
