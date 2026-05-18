const PlacementCheckin = require('../models/PlacementCheckin');
const CourseReview = require('../models/CourseReview');
const TimetableWorkload = require('../models/TimetableWorkload');
const MentalWellbeing = require('../models/MentalWellbeing');
const TeacherNote = require('../models/TeacherNote');
const Student = require('../models/Student');

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

const createNote = async (req, res) => {
  try {
    const { student_id, note } = req.body;
    const mentor_id = 'teacher'; // Mock authentication
    if (!student_id || !note) {
      return res.status(400).json({ message: 'student_id and note are required' });
    }
    const newNote = new TeacherNote({ student_id, note, mentor_id });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.error('createNote error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getNotes = async (req, res) => {
  try {
    const { mentor_id } = req.query;
    if (!mentor_id) return res.status(400).json({ message: 'mentor_id query param required' });
    
    const notes = await TeacherNote.find({ mentor_id }).sort({ timestamp: -1 }).lean();
    res.json(notes);
  } catch (error) {
    console.error('getNotes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getDashboardData = async (req, res) => {
  try {
    const students = await Student.find({ mentor_id: 'teacher' }).lean();
    
    // Fetch recent data for each student
    const dashboardData = await Promise.all(students.map(async (student) => {
      // Find latest wellbeing data for exhaustion and suggestion
      const mental = await MentalWellbeing.findOne({ studentId: student._id }).sort({ timestamp: -1 }).lean();
      
      // Find latest workload data
      const workload = await TimetableWorkload.findOne({ studentId: student._id }).sort({ timestamp: -1 }).lean();
      
      // Find latest course review for suggestion if no mental note
      const review = await CourseReview.findOne({ studentId: student._id }).sort({ timestamp: -1 }).lean();
      
      // Calculate derived fields
      const exhaustionScore = mental ? mental.stressLevel : (workload ? workload.workloadStressLevel : 3);
      const workloadScore = workload ? workload.workloadStressLevel : 3;
      
      // Determine risk level based on exhaustion/workload
      let riskLevel = 'low';
      if (exhaustionScore >= 8 || workloadScore >= 8) riskLevel = 'high';
      else if (exhaustionScore >= 5 || workloadScore >= 5) riskLevel = 'moderate';
      
      // Pick a suggestion to show
      let suggestion = '';
      if (mental && mental.notes) suggestion = mental.notes;
      else if (review && review.comments) suggestion = review.comments;
      
      return {
        id: student._id.toString(),
        year: student.year,
        studentRef: student.name, // Using name instead of Student #XX
        exhaustion: exhaustionScore,
        workload: workloadScore,
        backToBack: 2, // Default or derived from elsewhere
        energyLevel: exhaustionScore > 6 ? 'low' : (exhaustionScore > 3 ? 'medium' : 'high'),
        riskLevel: riskLevel,
        suggestion: suggestion,
        subject: review ? review.courseName : student.department,
        timestamp: mental ? new Date(mental.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'recently'
      };
    }));
    
    res.json(dashboardData);
  } catch (error) {
    console.error('getDashboardData error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getPlacementStats,
  getCourseStats,
  getWorkloadStats,
  getMentalStats,
  createNote,
  getNotes,
  getDashboardData
};
