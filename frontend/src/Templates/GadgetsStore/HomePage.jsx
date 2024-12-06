import React from 'react';
import { Close } from '@mui/icons-material';
import Navbar from '../GadgetsStore/Navbar';
import HeroSection from '../GadgetsStore/HeroSection';
import TopPicks from '../GadgetsStore/TopPicks';
import SpecialOffers from '../GadgetsStore/SpecialOffers';
import OurStory from '../GadgetsStore/OurStory';
import Footer from '../GadgetsStore/Footer';

function HomePage({ onAddSectionClick, headings=[], onRemoveHeading }) { 
  return (
    <div>
      <Navbar />

      <div className="headings-stack">
        {headings.map((heading, index) => (
          <div key={index} className="heading-div">
            <h1
              contentEditable
              suppressContentEditableWarning
              style={{ fontFamily: "Times New Roman" }} 
            >
              {heading}
            </h1>
            <Close
              onClick={() => onRemoveHeading(index)} 
              style={{ cursor: 'pointer', marginLeft: '1400px', marginBottom:"10px", color: 'red' }} 
            />
          </div>
        ))}
      </div>

      <HeroSection onAddSectionClick={onAddSectionClick} />

      <div className="headings-stack">
        {headings.map((heading, index) => (
          <div key={index} className="heading-div">
            <h1
              contentEditable
              suppressContentEditableWarning
              style={{ fontFamily: "Times New Roman" }} 
            >
              {heading}
            </h1>
            <Close
              onClick={() => onRemoveHeading(index)} 
              style={{ cursor: 'pointer', marginLeft: '1400px', marginBottom:"10px", color: 'red' }} 
            />
          </div>
        ))}
      </div>

      <TopPicks onAddSectionClick={onAddSectionClick} />

      <div className="headings-stack">
        {headings.map((heading, index) => (
          <div key={index} className="heading-div">
            <h1
              contentEditable
              suppressContentEditableWarning
              style={{ fontFamily: "Times New Roman" }} 
            >
              {heading}
            </h1>
            <Close
              onClick={() => onRemoveHeading(index)} 
              style={{ cursor: 'pointer', marginLeft: '1400px', marginBottom:"10px", color: 'red' }} 
            />
          </div>
        ))}
      </div>
      
      <SpecialOffers onAddSectionClick={onAddSectionClick} />

      <div className="headings-stack">
        {headings.map((heading, index) => (
          <div key={index} className="heading-div">
            <h1
              contentEditable
              suppressContentEditableWarning
              style={{ fontFamily: "Times New Roman" }} 
            >
              {heading}
            </h1>
            <Close
              onClick={() => onRemoveHeading(index)} 
              style={{ cursor: 'pointer', marginLeft: '1400px', marginBottom:"10px", color: 'red' }} 
            />
          </div>
        ))}
      </div>
      
      <Footer onAddSectionClick={onAddSectionClick} />
    </div>
  );
}

export default HomePage;