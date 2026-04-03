const express = require('express');
const {
  getPlacementStats,
  getCourseStats,
  getWorkloadStats,
  getMentalStats
} = require('../controllers/teacherController');
const { getAlerts, getMenteeList } = require('../controllers/messageController');

const router = express.Router();

router.get('/stats/placement', getPlacementStats);
router.get('/stats/courses', getCourseStats);
router.get('/stats/workload', getWorkloadStats);
router.get('/stats/mental', getMentalStats);

// New: alerts and mentee list driven by real messages
router.get('/alerts', getAlerts);
router.get('/students', getMenteeList);

module.exports = router;
