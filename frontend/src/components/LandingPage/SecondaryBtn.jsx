import React from 'react'
import { useNavigate } from 'react-router-dom';
import './SecondaryBtn.css';

function SecondaryBtn() {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    console.log("Navigating to Signup");
    navigate('/login'); 
  }

  return (
    <>
      <button className='SecondaryBtn' onClick={navigateToLogin}>LOGIN</button>
    </>
  )
}

export default SecondaryBtn