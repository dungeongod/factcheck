import React from 'react';
import './WhaleAnalytics.scss';
import cohortImage from '../assets/cohort.png';
import eyeIcon from '../assets/eye-icon.svg';

const WhaleAnalytics = () => {
  return (
    <div className="whale-analytics">
      <div className="whale-analytics__left">
        <div className="whale-analytics__dashboard">
          <img 
            src={cohortImage} 
            alt="AVAX Whales Dashboard" 
            className="whale-analytics__dashboard-image"
          />
        </div>
      </div>
      
      <div className="whale-analytics__right">
        <div className="whale-analytics__content">
          <div className="whale-analytics__icon">
            <img src={eyeIcon} alt="Eye icon" width="32" height="32" />
          </div>
          
          <h2 className="whale-analytics__title">
            Watch what the whales are doing
          </h2>
          
          <p className="whale-analytics__description">
            All whales are not equal. Know exactly what the whales impacting YOUR portfolio are doing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhaleAnalytics; 