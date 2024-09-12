const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoUrl: String,
  attachments: [String]
});

const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports = Lecture;
