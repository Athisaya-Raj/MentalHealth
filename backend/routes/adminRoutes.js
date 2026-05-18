const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Students
router.get('/students', adminController.getStudents);
router.post('/students', adminController.createStudent);
router.put('/students/:id', adminController.updateStudent);
router.delete('/students/:id', adminController.deleteStudent);

// Teachers
router.get('/teachers', adminController.getTeachers);
router.post('/teachers', adminController.createTeacher);
router.put('/teachers/:id', adminController.updateTeacher);
router.delete('/teachers/:id', adminController.deleteTeacher);

// Assignments
router.post('/assign', adminController.assignStudents);

// Bulk Uploads
router.post('/upload-students', adminController.uploadStudents);
router.post('/upload-teachers', adminController.uploadTeachers);

module.exports = router;
