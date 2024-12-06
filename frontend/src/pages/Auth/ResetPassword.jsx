import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

const ResetPassword = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || ''; // Retrieve email from state

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [alertType, setAlertType] = useState(null);

  const handleResetPassword = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setAlertType('error');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:4000/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword: password })
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setAlertType('success');
        navigate('/login');
      } else {
        setError(result.message);
        setAlertType('error');
      }
    } catch (error) {
      setError('Server error');
      setAlertType('error');
    }
  };  

  return (
    <div className="login-container">
      <form onSubmit={handleResetPassword} className="login-form">
        <center><h2>Reset Password</h2></center>
        {error && (
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity={alertType}>
              <AlertTitle>{alertType === 'success' ? 'Success' : 'Error'}</AlertTitle>
              {error}
            </Alert>
          </Stack>
        )}

        <div className="form-group">
          <div className="input-container">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
            />
            <label htmlFor="password">Enter New Password:</label>
          </div>
        </div>

        <div className="form-group">
          <div className="input-container">
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder=" "
            />
            <label htmlFor="confirmPassword">Confirm New Password:</label>
          </div>
        </div>

        <button type="submit" className="login-btn">Update Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
