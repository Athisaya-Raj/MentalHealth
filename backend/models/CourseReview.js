const mongoose = require('mongoose');

const courseReviewSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  courseName: { type: String, required: true },
  difficultyLevel: { type: Number, required: true },
  understandingLevel: { type: Number, required: true },
  workloadRating: { type: Number, required: true },
  comments: { type: String },
  academicRisk: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CourseReview', courseReviewSchema);
