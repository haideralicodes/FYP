import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import { LaptopIcon, SmartPhone01Icon } from 'hugeicons-react';
import { useNavigate } from 'react-router-dom';
import './PreviewScreen.css';

function PreviewScreen({ hidden }) {
  const [isMobileView, setIsMobileView] = useState(false);
  const navigate = useNavigate();

  if (hidden) {
    return null;
  }

  const handleMobileClick = () => {
    setIsMobileView(true);
    document.documentElement.style.setProperty('--viewport-width', '470px');
  };

  const handleLaptopClick = () => {
    setIsMobileView(false);
    document.documentElement.style.setProperty('--viewport-width', '100%');
  };

  const handleCustomizeWebsite = () => {
    navigate('/customize-website-screen'); 
  };

  const handleClick = () => {
    navigate('/dashboard'); 
  };

  return (
    <section className='preview'>
      <div className='previewRectangle'>
        <div className='previewbar'>
          <img src={logo} alt="Logo" onClick={handleClick} style={{cursor:"pointer"}}/>
          <LaptopIcon
            onClick={handleLaptopClick}
            style={{ color: isMobileView ? "#999" : "#116fff", width: "46px", height: "40px", cursor: "pointer", backgroundColor: "rgba(0, 0, 0, 0.09)", borderRadius: "10px" }} />
          <SmartPhone01Icon
            style={{ color: isMobileView ? "#116fff" : "#999", width: "46px", height: "40px", cursor: "pointer", backgroundColor: "rgba(0, 0, 0, 0.09)", borderRadius: "10px" }}
            onClick={handleMobileClick}
          />
        </div>
        <div className='midText'>
          <p>You're now in Preview mode</p>
        </div>
        <div className='mybtns'>
          <a onClick={handleCustomizeWebsite}>Customize Website</a>
          <button>Publish</button>
        </div>
      </div>
    </section>
  );
}

export default PreviewScreen;
