import React from 'react';
import './StoreSetup.css';
import { useNavigate } from 'react-router-dom';

const StoreSetup = () => {

  const navigate = useNavigate();

  const handleDesignSite = ()=>{
    navigate('/provide-business-details'); 
  }

  return (
    <div className='sotreBox'>
      <h1>Welcome back to your Dashboard</h1>
      <div className="store-setup">
        <div className="progress">
        <h4>Let's set up your Business</h4>
        <div className="progress-bar">
          <div className="progress-completed"></div>
        </div>

        </div>
        <div className="setup-section completed">
          <span className="dot">&#8226;</span>
          <span className="text">Design your website</span>
          <button className="setup-button" onClick={handleDesignSite}>Design Site</button>
        </div>

        <div className="setup-section completed">
          <span className="dot">&#8226;</span>
          <span className="text">Connect Custom Domain</span>
          <button className="setup-button">Connect Domain</button>
        </div>

        <div className="setup-section active">
          <span className="dot">&#8226;</span>
          <div className="custom-domain">
            <div className="domain-header">Connect a custom domain</div>
            <div className="domain-description">
              Make this recommended domain yours or search for an available one.
            </div>
            <div className="domain-input">
              <input type="text" placeholder="e.g., mystunningwebsite.com" />
              <button>Let's Go</button>
            </div>
          </div>
        </div>

        <div className="setup-section">
          <span className="dot">&#8226;</span>
          <span className="text">Set up payment methods</span>
          <button className="setup-button">Set Up Payments</button>
        </div>

        <div className="setup-section">
          <span className="dot">&#8226;</span>
          <span className="text">Set up shipping and delivery</span>
          <button className="setup-button">Set Up Shipping</button>
        </div>

      </div>
    </div>
  );
};

export default StoreSetup;