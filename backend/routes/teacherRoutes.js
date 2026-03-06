const express = require('express');
const {
  getPlacementStats,
  getCourseStats,
  getWorkloadStats,
  getMentalStats
} = require('../controllers/teacherController');

const router = express.Router();

router.get('/stats/placement', getPlacementStats);
router.get('/stats/courses', getCourseStats);
router.get('/stats/workload', getWorkloadStats);
router.get('/stats/mental', getMentalStats);

module.exports = router;
