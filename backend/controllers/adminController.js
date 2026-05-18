const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const bcrypt = require('bcrypt');

// --- Students ---

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().select('-password');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const { name, department, year, classSection, registerNumber, email, password, mentor_id } = req.body;
    const existing = await Student.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Student email already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password || 'password123', salt);

    const student = new Student({
      name, department, year, classSection, registerNumber, email, password: hashedPassword, mentor_id
    });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error creating student', error });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }
    const student = await Student.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error updating student', error });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student', error });
  }
};

// --- Teachers ---

exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().select('-password');
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teachers', error });
  }
};

exports.createTeacher = async (req, res) => {
  try {
    const { name, department, email, username, password } = req.body;
    const existing = await Teacher.findOne({ username });
    if (existing) return res.status(400).json({ message: 'Teacher username already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const teacher = new Teacher({
      name, department, email, username, password: hashedPassword
    });
    await teacher.save();
    res.status(201).json(teacher);
  } catch (error) {
    res.status(500).json({ message: 'Error creating teacher', error });
  }
};

exports.updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }
    const teacher = await Teacher.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: 'Error updating teacher', error });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    await Teacher.findByIdAndDelete(req.params.id);
    // Also unassign students that had this teacher
    await Student.updateMany({ mentor_id: req.params.id }, { mentor_id: null });
    res.json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting teacher', error });
  }
};

// --- Assignments ---

exports.assignStudents = async (req, res) => {
  try {
    const { teacherId, studentIds } = req.body;
    if (!teacherId || !studentIds || !Array.isArray(studentIds)) {
      return res.status(400).json({ message: 'Invalid data format for assignment' });
    }
    
    // Unassign these students from any previous mentor, then assign to new
    await Student.updateMany(
      { _id: { $in: studentIds } },
      { $set: { mentor_id: teacherId } }
    );
    
    res.json({ message: 'Students successfully assigned to teacher.' });
  } catch (error) {
    res.status(500).json({ message: 'Error assigning students', error });
  }
};

// --- Bulk Uploads ---

exports.uploadStudents = async (req, res) => {
  try {
    const { students } = req.body; // Expects array of student objects
    if (!students || !Array.isArray(students)) {
      return res.status(400).json({ message: 'Invalid format. Expected { students: [...] }' });
    }

    const salt = await bcrypt.genSalt(10);
    const defaultPassword = await bcrypt.hash('student123', salt);

    const formatted = students.map(s => ({
      ...s,
      password: defaultPassword, // default password for bulk uploads
      mentor_id: s.mentor_id || null
    }));

    await Student.insertMany(formatted, { ordered: false });
    res.json({ message: `Successfully imported students.` });
  } catch (error) {
    // If some duplicate keys error occurs, we can still report success for others
    res.status(207).json({ message: 'Upload completed with some errors (likely duplicate emails)', error });
  }
};

exports.uploadTeachers = async (req, res) => {
  try {
    const { teachers } = req.body; // Expects array of teacher objects
    if (!teachers || !Array.isArray(teachers)) {
      return res.status(400).json({ message: 'Invalid format. Expected { teachers: [...] }' });
    }

    const salt = await bcrypt.genSalt(10);
    const defaultPassword = await bcrypt.hash('teacher123', salt);

    const formatted = teachers.map(t => ({
      ...t,
      password: defaultPassword
    }));

    await Teacher.insertMany(formatted, { ordered: false });
    res.json({ message: `Successfully imported teachers.` });
  } catch (error) {
    res.status(207).json({ message: 'Upload completed with some errors (likely duplicate usernames)', error });
  }
};
