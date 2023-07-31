// ReviewCard.js
import React from 'react';
import './card.css';

const ReviewCard = ({ reviewerName, reviewerSchool, reviewText, imageUrl }) => {
  return (
    <div className="review-card">
      <div className="review-card-content">
        <div className="review-card-image">
          <img src={imageUrl} alt="Reviewer" />
        </div>
        <h3 className="reviewer-name">{reviewerName}</h3>
        <h3 classname="reviewer-school">{reviewerSchool}</h3>
        <p className="review-text">{reviewText}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
