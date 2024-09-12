import React from "react";
import "./Footer.css";
import logo from '../../assets/logo.png';
import twitter from '../../assets/twitter.png';
import instagram from '../../assets/insta.png';
import linkedin from '../../assets/linkedin.png';
import youtube from '../../assets/youtube.png';


const Footer = () => {
  return (
    <footer className="backClr">
      <div className="footer">
          <div className="s1">
            <img src={logo}/>
          </div>
          <div className="s2">
            <ul className="nav-item">
              <li><a href="#">Home</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Help</a></li>
            </ul>
          </div>
          <div className="s3">
            <img src={twitter}/>
            <img src={instagram}/>
            <img src={linkedin}/>
            <img src={youtube}/>
          </div>
          <div className="s4">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
          </div>
      </div>
    </footer>
  );
}

export default Footer;
