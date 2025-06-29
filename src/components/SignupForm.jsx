import React, { useState } from 'react';
import './SignupForm.scss';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => {
    // Check if email contains "@" and "."
    return email.includes('@') && email.includes('.');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Email validation as per requirement 7
    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      return;
    }
    
    setIsSubmitting(true);
    
    // Redirect to https://app.loch.one/welcome as per requirement 8
    setTimeout(() => {
      window.location.href = 'https://app.loch.one/welcome';
    }, 500); // Small delay for better UX
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  return (
    <div className="signup-form">
      <h1 className="signup-headline">
        Sign up for<br />
        exclusive access.
      </h1>
      
      <form onSubmit={handleSubmit}>
        <div className="signup-input-group">
          <input
            type="email"
            className={`signup-input ${error ? 'error' : ''}`}
            placeholder="Your email address"
            value={email}
            onChange={handleInputChange}
            disabled={isSubmitting}
          />
          {error && <span className="signup-error">{error}</span>}
        </div>
        
        <button 
          type="submit"
          className={`signup-button ${isSubmitting ? 'submitting' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Redirecting...' : 'Get started'}
        </button>
      </form>
      
      <p className="signup-subtext">
        You'll receive an email with an invite link to join.
      </p>
    </div>
  );
};

export default SignupForm; 