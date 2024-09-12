import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footerr">
      <h2>BrandName</h2>
      <div className='links'>
        <a href="#">Facebook</a>
        <a href="#">Twitter</a>
        <a href="#">Instagram</a>
        <a href="#">LinkedIn</a>
      </div>
      <div className='brandInfo'>
        <p href="#">info@mysite.com</p>
        <p href="#">Islamabad Capital Territory, Pakistan</p>
        <p href="#">123-456-7890</p>
      </div>
      <p>&copy; 2024 BrandName. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
