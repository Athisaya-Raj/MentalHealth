const Student = require('../models/Student');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
  try {
    const { name, department, year, classSection, registerNumber, email, password } = req.body;

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newStudent = new Student({
      name,
      department,
      year,
      classSection,
      registerNumber,
      email,
      password: hashedPassword
    });

    await newStudent.save();

    res.status(201).json({ message: 'User created successfully', student: { id: newStudent._id, name: newStudent.name, email: newStudent.email } });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Special hardcoded logins to maintain compatibility with un-updated frontend components
    if (email === 'student' && password === 'student') {
        return res.status(200).json({ student: { id: 'dummy-student-id', name: 'Student', email: 'student' }});
    }
    if (email === 'teacher' && password === 'teacher') {
        return res.status(200).json({ teacher: true });
    }

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', student: { id: student._id, name: student.name, email: student.email, registerNumber: student.registerNumber } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

module.exports = {
  signup,
  login
};
