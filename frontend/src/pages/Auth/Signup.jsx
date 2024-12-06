import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import cog from '../../assets/cog.png';
import noodle from '../../assets/noodle.png';
import cylinder from '../../assets/cylinder.png';
import tube from '../../assets/tube.png';
import pyramid from '../../assets/pyramid.png';

// Ali@1234

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login'); 
  }

  const handleSignup = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?![@$#%^!*&()\-=_+])(?=.*[A-Z])(?=.*[@$!%*?&#]).{8,}$/;
  
    if (!email.includes('@gmail.com')) {
      alert('Email must be a valid @gmail.com address');
      return;
    }
  
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      alert('All fields are required');
      return;
    }
  
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!passwordRegex.test(password)) {
      alert('Password must be at least 8 characters long, contain at least one capital letter, one special character, and not start with a special character.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:4000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          password,
        }),
      });
  
      if (response.ok) {
        console.log('Signup successful');
        navigate('/login');
      } else {
        const data = await response.json();
        setError(data.message || 'Error signing up');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error signing up');
    }
  };
  

  return (
    <div className="signup-container">
      <form onSubmit={handleSignup} className="signup-form">
        <center><h2>Signup</h2></center>
        <div className="form-group">
          <div className="input-container">
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder=" "
            />
            <label htmlFor="firstName">First Name</label>
          </div>
        </div>
        <div className="form-group">
          <div className="input-container">
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder=" "
            />
            <label htmlFor="lastName">Last Name</label>
          </div>
        </div>
        <div className="form-group">
          <div className="input-container">
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
            />
            <label htmlFor="email">Email</label>
          </div>
        </div>
        <div className="form-group">
          <div className="input-container">
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder=" "
            />
            <label htmlFor="phone">Phone Number</label>
          </div>
        </div>
        <div className="form-group">
          <div className="input-container">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
            />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="form-group">
          <div className="input-container">
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder=" "
            />
            <label htmlFor="confirm-password">Confirm Password</label>
          </div>
        </div>
        <button type="submit" className="signup-btn">Signup</button>
        <p className='loginInfo'>Already have an account?<span className='loginn' onClick={navigateToLogin}> Login</span></p>
      </form>
      <img src={cog} alt="Cog" className="cog" />
      <img src={cylinder} alt="Cylinder" className="cylinder" />
      <img src={noodle} alt="Noodle" className="noodle" />
      <img src={tube} alt="Tube" className="tube" />
      <img src={pyramid} alt="Pyramid" className="pyramid" />
    </div>
  );
};

export default Signup;
