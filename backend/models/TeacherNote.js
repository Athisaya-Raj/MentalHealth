const mongoose = require('mongoose');

const teacherNoteSchema = new mongoose.Schema({
  student_id: { type: String, required: true },
  note: { type: String, required: true },
  mentor_id: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TeacherNote', teacherNoteSchema);
