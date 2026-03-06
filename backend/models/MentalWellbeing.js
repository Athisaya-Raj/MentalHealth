const mongoose = require('mongoose');

const mentalWellbeingSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  moodLevel: { type: Number, required: true },
  stressLevel: { type: Number, required: true },
  motivationLevel: { type: Number, required: true },
  notes: { type: String },
  academicRisk: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MentalWellbeing', mentalWellbeingSchema);
