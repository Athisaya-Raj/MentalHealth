const mongoose = require('mongoose');

const timetableWorkloadSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  hoursStudied: { type: Number, required: true },
  sleepHours: { type: Number, required: true },
  workloadStressLevel: { type: Number, required: true },
  academicRisk: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TimetableWorkload', timetableWorkloadSchema);
