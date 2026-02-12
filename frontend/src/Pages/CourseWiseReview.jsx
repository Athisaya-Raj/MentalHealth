import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // ← ADD THIS
import CourseSelector from '../components/coursewisereview/courseselector';
import CourseCard from '../components/coursewisereview/coursecard';
import ReviewForm from '../components/coursewisereview/reviewform';
import '../components/coursewisereview/coursewisereview.css';


const CourseWiseReview = () => {
  const navigate = useNavigate();  // ← ADD THIS LINE
  const [numberOfCourses, setNumberOfCourses] = useState(0);
  const [courseReviews, setCourseReviews] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle course number selection
  const handleCourseNumberChange = (num) => {
    setNumberOfCourses(num);
    // Initialize empty review objects for each course
    const initialReviews = Array.from({ length: num }, (_, index) => ({
      id: index,
      courseName: '',
      stressLevel: 3,
      difficultyLevel: 3,
      relevance: 3,
      feedback: ''
    }));
    setCourseReviews(initialReviews);
    setIsSubmitted(false);
  };

  // Update individual course review data
  const handleReviewChange = (index, field, value) => {
    const updatedReviews = [...courseReviews];
    updatedReviews[index] = {
      ...updatedReviews[index],
      [field]: value
    };
    setCourseReviews(updatedReviews);
  };

  
    // Handle form submission
    const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate that all courses have names
    const allCoursesNamed = courseReviews.every(review => review.courseName.trim() !== '');
    
    if (!allCoursesNamed) {
        alert('Please provide names for all courses');
        return;
    }

    // Log the data (in production, send to backend)
    console.log('Course Reviews Submitted:', courseReviews);
    setIsSubmitted(true);
    
    // Show success message and navigate after user clicks OK
    alert('Course reviews submitted successfully!');
    navigate('/student/home');  // ← ADD THIS LINE
    };

  // Reset form
  const handleReset = () => {
    setNumberOfCourses(0);
    setCourseReviews([]);
    setIsSubmitted(false);
  };

  return (
    <div className="course-review-container">
      <div className="course-review-header">
        <h1>Course Wise Review</h1>
        <p>Share your feedback to help improve academic experiences</p>
      </div>

      <div className="course-review-content">
        {/* Course Number Selector */}
        <CourseSelector 
          numberOfCourses={numberOfCourses}
          onCourseNumberChange={handleCourseNumberChange}
        />

        {/* Dynamic Course Review Forms */}
        {numberOfCourses > 0 && (
          <form onSubmit={handleSubmit} className="review-form-wrapper">
            <div className="course-cards-grid">
              {courseReviews.map((review, index) => (
                <CourseCard key={review.id} courseNumber={index + 1}>
                  <ReviewForm
                    review={review}
                    index={index}
                    onReviewChange={handleReviewChange}
                  />
                </CourseCard>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button type="submit" className="submit-btn">
                Submit Reviews
              </button>
              <button type="button" onClick={handleReset} className="reset-btn">
                Reset
              </button>
            </div>
          </form>
        )}

        {/* Success Message */}
        {isSubmitted && (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h3>Thank you for your feedback!</h3>
            <p>Your course reviews have been submitted successfully.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseWiseReview;