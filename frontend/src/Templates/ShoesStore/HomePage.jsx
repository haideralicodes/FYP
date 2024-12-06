import React from 'react';
import { Close } from '@mui/icons-material';
import Navbar from '../ShoesStore/Navbar';
import HeroSection from '../ShoesStore/HeroSection';
import TopPicks from '../ShoesStore/TopPicks';
import SpecialOffers from '../ShoesStore/SpecialOffers';
import OurStory from '../ShoesStore/OurStory';
import Footer from '../ShoesStore/Footer';

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