import React from 'react';
import './NotificationHeader.scss';
import BellIcon from '../assets/bell-icon.svg';

const NotificationHeader = () => {
  return (
    <div className="notification-header">
      {/* Bell Icon */}
      <div className="notification-header__icon">
        <img src={BellIcon} alt="Bell notification icon" width="32" height="32" />
      </div>

      {/* Headline */}
      <h1 className="notification-header__title">
        Get notified when a highly correlated whale makes a move
      </h1>

      {/* Description */}
      <p className="notification-header__description">
        Find out when a certain whale moves more than any preset amount on-chain or when a dormant whale you care about becomes active.
      </p>
    </div>
  );
};

export default NotificationHeader; 