const PlacementCheckin = require('../models/PlacementCheckin');
const CourseReview = require('../models/CourseReview');
const TimetableWorkload = require('../models/TimetableWorkload');
const MentalWellbeing = require('../models/MentalWellbeing');

const getPlacementStats = async (req, res) => {
  try {
    const stats = await PlacementCheckin.aggregate([
      {
        $group: {
          _id: null,
          avgConfidenceLevel: { $avg: '$confidenceLevel' },
          avgPreparationLevel: { $avg: '$preparationLevel' },
          avgProblemsSolved: { $avg: '$problemsSolved' },
          riskCount: { $sum: { $cond: ['$academicRisk', 1, 0] } },
          totalResponses: { $sum: 1 }
        }
      }
    ]);
    res.json(stats[0] || {});
  } catch (error) {
    console.error('getPlacementStats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getCourseStats = async (req, res) => {
  try {
    const stats = await CourseReview.aggregate([
      {
        $group: {
          _id: '$courseName',
          avgDifficultyLevel: { $avg: '$difficultyLevel' },
          avgUnderstandingLevel: { $avg: '$understandingLevel' },
          avgWorkloadRating: { $avg: '$workloadRating' },
          riskCount: { $sum: { $cond: ['$academicRisk', 1, 0] } },
          totalResponses: { $sum: 1 }
        }
      }
    ]);
    res.json(stats);
  } catch (error) {
    console.error('getCourseStats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getWorkloadStats = async (req, res) => {
  try {
    const stats = await TimetableWorkload.aggregate([
      {
        $group: {
          _id: null,
          avgHoursStudied: { $avg: '$hoursStudied' },
          avgSleepHours: { $avg: '$sleepHours' },
          avgWorkloadStressLevel: { $avg: '$workloadStressLevel' },
          riskCount: { $sum: { $cond: ['$academicRisk', 1, 0] } },
          totalResponses: { $sum: 1 }
        }
      }
    ]);
    res.json(stats[0] || {});
  } catch (error) {
    console.error('getWorkloadStats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getMentalStats = async (req, res) => {
  try {
    const stats = await MentalWellbeing.aggregate([
      {
        $group: {
          _id: null,
          avgMoodLevel: { $avg: '$moodLevel' },
          avgStressLevel: { $avg: '$stressLevel' },
          avgMotivationLevel: { $avg: '$motivationLevel' },
          riskCount: { $sum: { $cond: ['$academicRisk', 1, 0] } },
          totalResponses: { $sum: 1 }
        }
      }
    ]);
    res.json(stats[0] || {});
  } catch (error) {
    console.error('getMentalStats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getPlacementStats,
  getCourseStats,
  getWorkloadStats,
  getMentalStats
};
