import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UpdatePassword.css';

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword) {
      setError('Both fields are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ oldPassword, newPassword })
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/login');
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error updating password');
    }
  };

  return (
    <div className="update-password-container">
      <form onSubmit={handlePasswordUpdate}>
        <center><h2>Update Password</h2></center>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <div className="input-container">
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              placeholder="Enter your old password"
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-container">
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              placeholder="Enter your new password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
};

export default UpdatePassword;
