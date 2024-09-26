import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (email === '') {
      setError('Email is required');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:4000/api/requestOtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setMessage('OTP has been sent to your email');
        setShowOtp(true);
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (error) {
      setError('Failed to send OTP');
      console.error('Error:', error);
    }
  };
  

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Invalid OTP');
        return;
      }
  
      navigate('/reset-password', { state: { email } });

    } catch (error) {
      setError('Failed to verify OTP');
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={showOtp ? handleVerifyOtp : handleForgotPassword}>
        <center><h2>Forgot Password</h2></center>
        {error && <p className="error">{error}</p>}
        {message && <p className="message">{message}</p>}

        <div className="form-group">
          <div className="input-container">
            <input
              type="text"
              id="email"
              value={email}
              placeholder=" "
              onChange={(e) => setEmail(e.target.value)}
              disabled={showOtp}
            />
            <label htmlFor="email">Email:</label>
          </div>
        </div>

        {showOtp && (
          <div className="form-group">
            <div className="input-container">
              <input
                type="text"
                id="otp"
                value={otp}
                placeholder=" "
                onChange={(e) => setOtp(e.target.value)}
              />
              <label htmlFor="otp">Enter OTP:</label>
            </div>
          </div>
        )}

        <button type="submit" className="login-btn">
          {showOtp ? 'Verify OTP' : 'Forgot Password'}
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
