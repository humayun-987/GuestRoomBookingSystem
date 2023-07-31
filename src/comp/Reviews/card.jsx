// ReviewCard.js
import React from 'react';
import './card.css';

const ReviewCard = ({ reviewerName, reviewerOrganization, reviewText, imageUrl }) => {
  return (
    <div className="review-card">
      <div className="review-card-content">
        <div className="review-card-details">
          <div className="review-card-image">
            <img src={imageUrl} alt="Reviewer" />
          </div>
          <div className="reviewer-details">
            <h3 className="reviewer-name">{reviewerName}</h3>
            <h3 className="reviewer-organization">{reviewerOrganization}</h3>
          </div>
        </div>
        <div className="review-text-container">
          <p className="review-text">{reviewText}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
