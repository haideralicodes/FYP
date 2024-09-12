import React from 'react';
import './ScrollDesign.css';
import hero1 from '../../assets/example1.webp';
import hero2 from '../../assets/example2.webp';
import hero3 from '../../assets/example3.webp';
import hero4 from '../../assets/example4.webp';
import hero5 from '../../assets/example5.webp';
import hero6 from '../../assets/example6.webp';
import hero7 from '../../assets/example7.webp';
import hero8 from '../../assets/example8.webp';
import hero9 from '../../assets/example9.webp';

function ScrollDesign() {
  return (
    <div className="scroll-container">
      <div className="scroll-content">
        <img src={hero1} alt="Image 1" className="scroll-image" />
        <img src={hero2} alt="Image 2" className="scroll-image" />
        <img src={hero3} alt="Image 3" className="scroll-image" />
        <img src={hero4} alt="Image 4" className="scroll-image" />
        <img src={hero5} alt="Image 5" className="scroll-image" />
        <img src={hero6} alt="Image 6" className="scroll-image" />
        <img src={hero7} alt="Image 7" className="scroll-image" />
        <img src={hero8} alt="Image 8" className="scroll-image" />
        <img src={hero9} alt="Image 9" className="scroll-image" />
        <img src={hero1} alt="Image 1" className="scroll-image" />
        <img src={hero2} alt="Image 2" className="scroll-image" />
        <img src={hero3} alt="Image 3" className="scroll-image" />
        <img src={hero4} alt="Image 4" className="scroll-image" />
        <img src={hero5} alt="Image 5" className="scroll-image" />
        <img src={hero6} alt="Image 6" className="scroll-image" />
        <img src={hero7} alt="Image 7" className="scroll-image" />
        <img src={hero8} alt="Image 8" className="scroll-image" />
        <img src={hero9} alt="Image 9" className="scroll-image" />
      </div>
    </div>
  );
}

export default ScrollDesign;
