const express = require('express');
const {
  submitPlacementCheckin,
  submitCourseReview,
  submitTimetableWorkload,
  submitMentalWellbeing
} = require('../controllers/surveyController');

const router = express.Router();

router.post('/placement', submitPlacementCheckin);
router.post('/course-review', submitCourseReview);
router.post('/workload', submitTimetableWorkload);
router.post('/mental', submitMentalWellbeing);

module.exports = router;
