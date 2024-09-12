import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WebsiteGenerationScreen.css';
import GeneratedSite from '../../Templates/FashionStoreOne/HomePage';

function WebsiteGenerationScreen() {
  const navigate = useNavigate();

  const handlecontinue = () => {
    navigate('/template-view'); 
  };

  return (
    <div className="webGenScreen">
      <div className="aiText">
        <div className="txtBox">
          <p>🤖 "Greetings! Your site is now ready for you. To personalize the design and content, simply click on the elements you wish to modify."</p>
          <p>🤖 "Greetings! Your site is now ready for you. To personalize the design and content, simply click on the elements you wish to modify.
          Your site is now ready for you. Your site is now ready for you. Your site is now ready for you.
          Your site is now ready for you. Your site is now ready for you. Your site is now ready for you."
          </p>
          <button onClick={handlecontinue} className='contDesign'>
            Continue with the Design {">"}
          </button>
        </div>
      </div>
      <div className="aiWebsite">
        <GeneratedSite className="customGeneratedSite"/>
      </div>
    </div>
  );
}

export default WebsiteGenerationScreen;
