import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // 1: Request OTP, 2: Reset Password
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRequestOtp = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      console.log("\n DATA=> ", data)
      if (response.ok) {
        setStep(2);
      } else {
        console.log("\n\t REQUEST FAILED>>>>>>>>>>>>>>>>>>>>> \n")
        setError(data.message || 'Request failed');
      }
    } catch (err) {
        console.log("\n\t REQUEST FAILED................... \n")
      setError('Request failed');
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/login');
      } else {
        setError(data.message || 'Reset failed');
      }
    } catch (err) {
      setError('Reset failed');
    }
  };

  return (
    <div className="forget-password-container">
      {step === 1 && (
        <div className="request-otp">
          <h2>Request OTP</h2>
          {error && <p className="error">{error}</p>}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <button onClick={handleRequestOtp}>Request OTP</button>
        </div>
      )}

      {step === 2 && (
        <div className="reset-password">
          <h2>Reset Password</h2>
          {error && <p className="error">{error}</p>}
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
          <button onClick={handleResetPassword}>Reset Password</button>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
