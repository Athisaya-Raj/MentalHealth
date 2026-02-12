import React from 'react';

const reviewform = ({ review, index, onReviewChange }) => {
  // Slider labels for better UX
  const getSliderLabel = (value, type) => {
    const labels = {
      stress: ['Very Low', 'Low', 'Moderate', 'High', 'Very High'],
      difficulty: ['Very Easy', 'Easy', 'Moderate', 'Difficult', 'Very Difficult'],
      relevance: ['Not Relevant', 'Slightly Relevant', 'Moderately Relevant', 'Relevant', 'Very Relevant']
    };
    return labels[type][value - 1];
  };

  return (
    <div className="review-form">
      {/* Course Name Input */}
      <div className="form-group">
        <label htmlFor={`course-name-${index}`} className="form-label">
          Course Name <span className="required">*</span>
        </label>
        <input
          type="text"
          id={`course-name-${index}`}
          value={review.courseName}
          onChange={(e) => onReviewChange(index, 'courseName', e.target.value)}
          placeholder="e.g., Data Structures and Algorithms"
          className="course-input"
          required
        />
      </div>

      {/* Stress Level Slider */}
      <div className="form-group">
        <label htmlFor={`stress-${index}`} className="form-label">
          Stress Level
        </label>
        <div className="slider-container">
          <input
            type="range"
            id={`stress-${index}`}
            min="1"
            max="5"
            value={review.stressLevel}
            onChange={(e) => onReviewChange(index, 'stressLevel', Number(e.target.value))}
            className="slider stress-slider"
          />
          <div className="slider-value">
            <span className="value-number">{review.stressLevel}</span>
            <span className="value-label">{getSliderLabel(review.stressLevel, 'stress')}</span>
          </div>
        </div>
        <div className="slider-labels">
          <span>Very Low</span>
          <span>Very High</span>
        </div>
      </div>

      {/* Difficulty Level Slider */}
      <div className="form-group">
        <label htmlFor={`difficulty-${index}`} className="form-label">
          Difficulty Level
        </label>
        <div className="slider-container">
          <input
            type="range"
            id={`difficulty-${index}`}
            min="1"
            max="5"
            value={review.difficultyLevel}
            onChange={(e) => onReviewChange(index, 'difficultyLevel', Number(e.target.value))}
            className="slider difficulty-slider"
          />
          <div className="slider-value">
            <span className="value-number">{review.difficultyLevel}</span>
            <span className="value-label">{getSliderLabel(review.difficultyLevel, 'difficulty')}</span>
          </div>
        </div>
        <div className="slider-labels">
          <span>Very Easy</span>
          <span>Very Difficult</span>
        </div>
      </div>

      {/* Relevance Slider */}
      <div className="form-group">
        <label htmlFor={`relevance-${index}`} className="form-label">
          Course Relevance
        </label>
        <div className="slider-container">
          <input
            type="range"
            id={`relevance-${index}`}
            min="1"
            max="5"
            value={review.relevance}
            onChange={(e) => onReviewChange(index, 'relevance', Number(e.target.value))}
            className="slider relevance-slider"
          />
          <div className="slider-value">
            <span className="value-number">{review.relevance}</span>
            <span className="value-label">{getSliderLabel(review.relevance, 'relevance')}</span>
          </div>
        </div>
        <div className="slider-labels">
          <span>Not Relevant</span>
          <span>Very Relevant</span>
        </div>
      </div>

      {/* Optional Feedback */}
      <div className="form-group">
        <label htmlFor={`feedback-${index}`} className="form-label">
          Additional Feedback <span className="optional">(Optional)</span>
        </label>
        <textarea
          id={`feedback-${index}`}
          value={review.feedback}
          onChange={(e) => onReviewChange(index, 'feedback', e.target.value)}
          placeholder="Share your thoughts, suggestions, or experiences with this course..."
          className="feedback-textarea"
          rows="4"
        />
      </div>
    </div>
  );
};

export default reviewform;