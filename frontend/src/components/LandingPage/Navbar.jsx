import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo.png';

function Navbar() {
  const navigate = useNavigate();

  const navigateToSignup = () => {
    navigate('/Signup');
  };

  return (
    <div className='nav'>
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <ul className="nav-items">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/">FAQs</Link></li>
          <li><Link to="/">Pricing</Link></li>
          <li><Link to="/">About Us</Link></li>
          <li><Link to="/">Help</Link></li>
        </ul>
        <div className="buttons">
          <button className='signup' onClick={navigateToSignup}>Get Started</button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
