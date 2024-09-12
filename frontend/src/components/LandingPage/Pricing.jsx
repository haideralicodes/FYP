import React from 'react';
import './Pricing.css';

function Pricing() {   

  return (
    <div className='pricing-background'>
      <div className='pricing-wrapper'>
        <h1 className='pricing-heading'>Pricing</h1>
        <br />
        <p>Select a plan - Upgrade for website customizations, seamless</p>
        <p>scheduling and exclusive features.</p>
        <br /><br />
        <div className='pricing-cards'>
          <div className='pricing-card starter-card' style={{backgroundColor:"white"}}>
            <div className="card-content">
              <div className="card-details">
                <h3>Starter</h3>
                <h2>$9.99<span className='monthly-rate'>/month</span></h2>
              </div>
              <button className='signup-button'>Sign up now</button>
              <ul>
                <li><span className='tick-icon'>&#10003;</span>Customizable website templates</li>
                <li><span className='tick-icon'>&#10003;</span>Basic social media scheduling</li>
                <li><span className='tick-icon'>&#10003;</span>Email Support</li>
                <li><span className='tick-icon'>&#10003;</span>1 GB Storage</li>
                <li><span className='tick-icon'>&#10003;</span>Basic support</li>
              </ul>
            </div>
          </div>

          <div className='pricing-card pro-card' style={{backgroundColor:"black"}}>
            <div className="card-content" style={{backgroundColor:"transparent"}}>
              <div className="card-details">
                <div className="special-offer">
                  <h3 style={{backgroundColor:"black", color:"white"}}>Pro</h3>
                  <h4 className='offer-highlight'>Most Popular</h4>
                </div>
                <h2 style={{backgroundColor:"black", color:"white"}}>$29.99<span className='monthly-rate' style={{backgroundColor:"black", color:"white"}}>/month</span></h2>
              </div>
              <button className='pro-card-signup-button'>Sign up now</button>
              <ul style={{backgroundColor:"black", color:"white"}}>
                <li style={{backgroundColor:"black", color:"white", width: "260px"}}><span className='tick-icon' style={{backgroundColor:"black", color:"white"}}>&#10003;</span>All features in the Starter Plan</li>
                <li style={{backgroundColor:"black", color:"white" , width: "260px"}}><span className='tick-icon' style={{backgroundColor:"black", color:"white"}}>&#10003;</span>Advanced website customization</li>
                <li style={{backgroundColor:"black", color:"white" , width: "260px"}}><span className='tick-icon' style={{backgroundColor:"black", color:"white"}}>&#10003;</span>Unlimited social media scheduling</li>
                <li style={{backgroundColor:"black", color:"white" , width: "260px"}}><span className='tick-icon' style={{backgroundColor:"black", color:"white"}}>&#10003;</span>10 GB storage</li>
                <li style={{backgroundColor:"black", color:"white" , width: "260px"}}><span className='tick-icon' style={{backgroundColor:"black", color:"white"}}>&#10003;</span>Priority support</li>
                <li style={{backgroundColor:"black", color:"white" , width: "260px"}}><span className='tick-icon' style={{backgroundColor:"black", color:"white"}}>&#10003;</span>Advanced support</li>
                <li style={{backgroundColor:"black", color:"white" , width: "260px"}}><span className='tick-icon' style={{backgroundColor:"black", color:"white"}}>&#10003;</span>Post and Caption Generation</li>
              </ul>
            </div>
          </div>

          <div className='pricing-card business-card' style={{backgroundColor:"white"}}>
            <div className="card-content">
              <div className="card-details">
                <h3>Business</h3>
                <h2>$49.99<span className='monthly-rate'>/month</span></h2>
              </div>
              <button className='signup-button'>Sign up now</button>
              <ul>
                <li><span className='tick-icon'>&#10003;</span>Customizable website templates</li>
                <li><span className='tick-icon'>&#10003;</span>Basic social media scheduling</li>
                <li><span className='tick-icon'>&#10003;</span>Email Support</li>
                <li><span className='tick-icon'>&#10003;</span>1 GB Storage</li>
                <li><span className='tick-icon'>&#10003;</span>Basic support</li>
                <li><span className='tick-icon'>&#10003;</span>Customizable website templates</li>
                <li><span className='tick-icon'>&#10003;</span>Basic social media scheduling</li>
                <li><span className='tick-icon'>&#10003;</span>Email Support</li>
                <li><span className='tick-icon'>&#10003;</span>1 GB Storage</li>
                <li><span className='tick-icon'>&#10003;</span>Basic support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
