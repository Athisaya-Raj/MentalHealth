const PlacementCheckin = require('../models/PlacementCheckin');
const CourseReview = require('../models/CourseReview');
const TimetableWorkload = require('../models/TimetableWorkload');
const MentalWellbeing = require('../models/MentalWellbeing');

const submitPlacementCheckin = async (req, res) => {
  try {
    const { studentId, preparationLevel, problemsSolved, confidenceLevel, needsHelp } = req.body;

    let academicRisk = false;
    if (confidenceLevel <= 2) {
      academicRisk = true;
    }

    const checkin = new PlacementCheckin({
      studentId,
      preparationLevel,
      problemsSolved,
      confidenceLevel,
      needsHelp,
      academicRisk
    });

    await checkin.save();
    res.status(201).json({ message: 'Survey saved successfully', data: checkin });
  } catch (error) {
    console.error('Error in submitPlacementCheckin:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const submitCourseReview = async (req, res) => {
  try {
    const { studentId, courseName, difficultyLevel, understandingLevel, workloadRating, comments } = req.body;

    let academicRisk = false;
    if (understandingLevel <= 2 || workloadRating >= 4) {
      academicRisk = true;
    }

    const review = new CourseReview({
      studentId,
      courseName,
      difficultyLevel,
      understandingLevel,
      workloadRating,
      comments,
      academicRisk
    });

    await review.save();
    res.status(201).json({ message: 'Survey saved successfully', data: review });
  } catch (error) {
    console.error('Error in submitCourseReview:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const submitTimetableWorkload = async (req, res) => {
  try {
    const { studentId, hoursStudied, sleepHours, workloadStressLevel } = req.body;

    let academicRisk = false;
    if (sleepHours <= 5 || workloadStressLevel >= 4) {
      academicRisk = true;
    }

    const workload = new TimetableWorkload({
      studentId,
      hoursStudied,
      sleepHours,
      workloadStressLevel,
      academicRisk
    });

    await workload.save();
    res.status(201).json({ message: 'Survey saved successfully', data: workload });
  } catch (error) {
    console.error('Error in submitTimetableWorkload:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const submitMentalWellbeing = async (req, res) => {
  try {
    const { studentId, moodLevel, stressLevel, motivationLevel, notes } = req.body;

    let academicRisk = false;
    if (stressLevel >= 4 || moodLevel <= 2) {
      academicRisk = true;
    }

    const wellbeing = new MentalWellbeing({
      studentId,
      moodLevel,
      stressLevel,
      motivationLevel,
      notes,
      academicRisk
    });

    await wellbeing.save();
    res.status(201).json({ message: 'Survey saved successfully', data: wellbeing });
  } catch (error) {
    console.error('Error in submitMentalWellbeing:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  submitPlacementCheckin,
  submitCourseReview,
  submitTimetableWorkload,
  submitMentalWellbeing
};
