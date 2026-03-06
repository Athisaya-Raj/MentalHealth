const mongoose = require('mongoose');

const placementCheckinSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  preparationLevel: { type: Number, required: true },
  problemsSolved: { type: Number, required: true },
  confidenceLevel: { type: Number, required: true },
  needsHelp: { type: Boolean, required: true },
  academicRisk: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PlacementCheckin', placementCheckinSchema);
