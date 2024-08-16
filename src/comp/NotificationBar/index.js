import React from 'react';
import './style.css';

const NotificationBar = ({ message }) => {
  return (
    <div className="notification-container">
      <div className="notification-bar">
        {message}
      </div>
    </div>
  );
};

export default NotificationBar;
