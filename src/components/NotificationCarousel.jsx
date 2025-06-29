import React, { useState, useEffect, useRef } from 'react';
import './NotificationCarousel.scss';
import barChartIcon from '../assets/bar-chart-icon.svg';

const NotificationCarousel = () => {
  const [translateX, setTranslateX] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [emailValue, setEmailValue] = useState('hello@gmail.com');
  const [dropdownOpen, setDropdownOpen] = useState({ amount: false, days: false });
  const trackRef = useRef(null);
  const intervalRef = useRef(null);

  const notifications = [
    {
      id: 1,
      icon: (
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.2" d="M25.9998 24H5.99984C5.82482 23.9989 5.65314 23.952 5.50195 23.8638C5.35077 23.7756 5.22539 23.6492 5.13833 23.4974C5.05127 23.3456 5.00559 23.1735 5.00586 22.9985C5.00613 22.8235 5.05233 22.6516 5.13984 22.5C5.96359 21.075 6.99984 17.4762 6.99984 13C6.99984 10.6131 7.94806 8.32387 9.63588 6.63604C11.3237 4.94821 13.6129 4 15.9998 4C18.3868 4 20.676 4.94821 22.3638 6.63604C24.0516 8.32387 24.9998 10.6131 24.9998 13C24.9998 17.4775 26.0373 21.075 26.8623 22.5C26.95 22.6518 26.9962 22.8239 26.9963 22.9991C26.9965 23.1744 26.9506 23.3466 26.8632 23.4985C26.7759 23.6504 26.6501 23.7767 26.4986 23.8647C26.3471 23.9527 26.1751 23.9994 25.9998 24Z" fill="#374151"/>
          <path d="M27.7245 21.9925C27.0308 20.7975 25.9995 17.4163 25.9995 13C25.9995 10.3478 24.946 7.8043 23.0706 5.92893C21.1952 4.05357 18.6517 3 15.9995 3C13.3474 3 10.8038 4.05357 8.92846 5.92893C7.0531 7.8043 5.99953 10.3478 5.99953 13C5.99953 17.4175 4.96703 20.7975 4.27328 21.9925C4.09612 22.2963 4.0022 22.6415 4.00099 22.9931C3.99978 23.3448 4.09133 23.6906 4.2664 23.9956C4.44147 24.3006 4.69388 24.5541 4.99816 24.7304C5.30244 24.9068 5.64784 24.9997 5.99953 25H11.1008C11.3315 26.1289 11.9451 27.1436 12.8377 27.8722C13.7303 28.6009 14.8472 28.9989 15.9995 28.9989C17.1518 28.9989 18.2687 28.6009 19.1614 27.8722C20.054 27.1436 20.6676 26.1289 20.8983 25H25.9995C26.3511 24.9995 26.6964 24.9064 27.0005 24.73C27.3046 24.5535 27.5568 24.3 27.7317 23.9951C27.9066 23.6901 27.9981 23.3444 27.9968 22.9928C27.9956 22.6412 27.9016 22.2962 27.7245 21.9925ZM15.9995 27C15.3793 26.9998 14.7744 26.8074 14.268 26.4492C13.7617 26.0911 13.3788 25.5848 13.172 25H18.827C18.6203 25.5848 18.2374 26.0911 17.731 26.4492C17.2247 26.8074 16.6198 26.9998 15.9995 27ZM5.99953 23C6.96203 21.345 7.99953 17.51 7.99953 13C7.99953 10.8783 8.84238 8.84344 10.3427 7.34315C11.843 5.84285 13.8778 5 15.9995 5C18.1213 5 20.1561 5.84285 21.6564 7.34315C23.1567 8.84344 23.9995 10.8783 23.9995 13C23.9995 17.5063 25.0345 21.3412 25.9995 23H5.99953Z" fill="#374151"/>
        </svg>
      ),
      title: "We'll be sending notifications to you here",
      type: 'email',
      value: emailValue,
      action: 'Save',
      hasCheckmark: false
    },
    {
      id: 2,
      icon: <img src={barChartIcon} alt="Bar chart" width="20" height="20" />,
      title: 'Notify me when any wallets move more than',
      type: 'amount',
      value: '$1,000.00',
      action: null,
      hasCheckmark: true,
      options: ['$500.00', '$1,000.00', '$5,000.00', '$10,000.00']
    },
    {
      id: 3,
      icon: <img src={barChartIcon} alt="Bar chart" width="20" height="20" />,
      title: 'Notify me when any wallet dormant for',
      type: 'days',
      value: '> 30 days',
      action: null,
      hasCheckmark: true,
      subtitle: 'becomes active',
      options: ['> 7 days', '> 30 days', '> 60 days', '> 90 days']
    }
  ];

  // Create infinite scroll by duplicating notifications multiple times
  const infiniteNotifications = [...notifications, ...notifications, ...notifications, ...notifications];
  const cardWidth = 210; // Width including margin
  const totalWidth = notifications.length * cardWidth;

  const startAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isHovered && !isDragging) {
        setTranslateX(prev => {
          const newTranslateX = prev - cardWidth; // Move by full card width
          // Reset position when we've moved one full cycle
          if (Math.abs(newTranslateX) >= totalWidth) {
            return 0;
          }
          return newTranslateX;
        });
      }
    }, 4000); // Move every 4 seconds
  };

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, isDragging]);

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
    setDragOffset(0);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart(e.clientX);
    setDragOffset(0);
    e.preventDefault();
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const offset = currentX - dragStart;
    setDragOffset(offset);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const offset = currentX - dragStart;
    setDragOffset(offset);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Apply drag offset to translateX
    if (Math.abs(dragOffset) > 10) {
      setTranslateX(prev => {
        const newTranslateX = prev + dragOffset;
        // Keep within bounds
        if (newTranslateX > 0) return 0;
        if (Math.abs(newTranslateX) >= totalWidth) return -totalWidth + cardWidth;
        return newTranslateX;
      });
    }
    
    setDragOffset(0);
  };

  const handleDropdownToggle = (type) => {
    setDropdownOpen(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleOptionSelect = (type, value) => {
    setDropdownOpen(prev => ({
      ...prev,
      [type]: false
    }));
  };

  const renderNotificationCard = (notification, index) => {
    const originalNotification = notifications.find(n => n.id === notification.id);
    
    // Calculate if this card is going out of view on the left
    // Card position relative to viewport (actual card width is 190px + 20px margin = 210px)
    const actualCardWidth = 210; // 190px card + 20px margin
    const cardPosition = index * cardWidth + translateX + dragOffset;
    // Card is exiting left when it's going out of the left edge of the viewport
    const isExitingLeft = cardPosition < -20 && cardPosition > -210;
    
    // Debug logging
    if (index <= 5) { // Only log first few cards to avoid spam
      console.log(`Card ${index}: position=${cardPosition}, tilted=${isExitingLeft}`);
    }
    
    return (
      <div className={`notification-carousel__card ${isExitingLeft ? 'tilted' : ''}`}>
        <div className="notification-carousel__header">
          <div className="notification-carousel__icon">
            {notification.icon}
          </div>
          {notification.hasCheckmark && (
            <div className="notification-carousel__checkmark">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#3B82F6"/>
                <path d="m9 12 2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
          {notification.action && (
            <span className="notification-carousel__action">
              {notification.action}
            </span>
          )}
        </div>
        
        <div className="notification-carousel__body">
          <p className="notification-carousel__title">
            {notification.title}
          </p>
          
          {notification.type === 'email' ? (
            <input
              type="email"
              className="notification-carousel__input"
              value={originalNotification?.type === 'email' ? emailValue : notification.value}
              onChange={(e) => {
                if (originalNotification?.type === 'email') {
                  setEmailValue(e.target.value);
                }
              }}
              placeholder="Enter email address"
            />
          ) : (
            <div className="notification-carousel__dropdown-wrapper">
              <div 
                className={`notification-carousel__dropdown ${dropdownOpen[notification.type] ? 'open' : ''}`}
                onClick={() => handleDropdownToggle(notification.type)}
              >
                {notification.value}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="m6 9 6 6 6-6" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              {dropdownOpen[notification.type] && (
                <div className="notification-carousel__dropdown-options">
                  {notification.options?.map((option, idx) => (
                    <div 
                      key={idx}
                      className="notification-carousel__dropdown-option"
                      onClick={() => handleOptionSelect(notification.type, option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {notification.subtitle && (
            <p className="notification-carousel__subtitle">
              {notification.subtitle}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="notification-carousel">
      <div 
        className="notification-carousel__wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          handleDragEnd();
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleDragEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleDragEnd}
      >
        <div 
          ref={trackRef}
          className={`notification-carousel__track ${isDragging ? 'dragging' : ''}`}
          style={{
            transform: `translateX(${translateX + dragOffset}px)`,
            width: `${infiniteNotifications.length * cardWidth}px`
          }}
        >
          {infiniteNotifications.map((notification, index) => (
            <div key={`${notification.id}-${index}`} className="notification-carousel__slide">
              {renderNotificationCard(notification, index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationCarousel; 