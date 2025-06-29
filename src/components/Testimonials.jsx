import React, { useState, useRef } from 'react';
import './Testimonials.scss';
import lochLogo from '../assets/loch-logo.svg';

const Testimonials = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Jack F",
      role: "Ex Blackrock PM",
      quote: "Love how Loch integrates portfolio analytics and whale watching into one unified app."
    },
    {
      id: 2,
      name: "Yash P",
      role: "Research, 3poch Crypto Hedge Fund",
      quote: "I use Loch everyday now. I don't think I could analyze crypto whale trends markets without it. I'm addicted!"
    },
    {
      id: 3,
      name: "Shiv S",
      role: "Co-Founder Magik Labs",
      quote: "Managing my own portfolio is helpful and well designed. What's really interesting is watching the whales though. No one else has made whale tracking so simple."
    },
    {
        id: 1,
        name: "Jack F",
        role: "Ex Blackrock PM",
        quote: "Love how Loch integrates portfolio analytics and whale watching into one unified app."
      },
      {
        id: 2,
        name: "Yash P",
        role: "Research, 3poch Crypto Hedge Fund",
        quote: "I use Loch everyday now. I don't think I could analyze crypto whale trends markets without it. I'm addicted!"
      },
      {
        id: 3,
        name: "Shiv S",
        role: "Co-Founder Magik Labs",
        quote: "Managing my own portfolio is helpful and well designed. What's really interesting is watching the whales though. No one else has made whale tracking so simple."
      }
  ];

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - dragStart) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setDragStart(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - dragStart) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="testimonials">
      <h2 className="testimonials__title">Testimonials</h2>
      <div className="testimonials__logo-container">
        <div className="testimonials__logo">
          <img src={lochLogo} alt="Loch Logo" />
        </div>
        <div 
            ref={containerRef}
            className={`testimonials__container ${isDragging ? 'dragging' : ''}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonials__card">
                <div className="testimonials__header">
                <h3 className="testimonials__name">{testimonial.name}</h3>
                <p className="testimonials__role">{testimonial.role}</p>
                </div>
                <p className="testimonials__quote">"{testimonial.quote}"</p>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials; 