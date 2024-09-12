import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PrimaryBtn.css';

function PrimaryBtn() {
  const navigate = useNavigate();

  const navigateToSignup = () => {
    console.log("Navigating to Signup");
    navigate('/signup'); 
  }

  return (
    <button className='PrimaryBtn' onClick={navigateToSignup}>
      Get Started
    </button>
  );
}

export default PrimaryBtn;
