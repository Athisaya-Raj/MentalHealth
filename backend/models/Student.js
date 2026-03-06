const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  year: { type: String, required: true },
  classSection: { type: String, required: true },
  registerNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed password
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Student', studentSchema);
