import React from 'react';
import './ScrollWeb.css';
import web1 from '../../assets/web1.webp';
import web2 from '../../assets/web2.webp';
import web3 from '../../assets/web3.webp';
import web4 from '../../assets/web4.webp';
import web5 from '../../assets/web5.webp';
import web6 from '../../assets/web6.webp';
import web7 from '../../assets/web7.webp';
import web8 from '../../assets/web8.webp';
import web9 from '../../assets/web9.webp';
import web10 from '../../assets/web10.webp';
import web11 from '../../assets/web11.webp';
import web12 from '../../assets/web12.webp';

function ScrollWeb() {
  return (
    <div className="scroll-container">
      <div className="scroll-content">
        <img src={web1} alt="Image 1" className="scroll-image" />
        <img src={web2} alt="Image 2" className="scroll-image" />
        <img src={web3} alt="Image 3" className="scroll-image" />
        <img src={web4} alt="Image 4" className="scroll-image" />
        <img src={web5} alt="Image 5" className="scroll-image" />
        <img src={web6} alt="Image 6" className="scroll-image" />
        <img src={web7} alt="Image 7" className="scroll-image" />
        <img src={web8} alt="Image 8" className="scroll-image" />
        <img src={web9} alt="Image 9" className="scroll-image" />
        <img src={web10} alt="Image 10" className="scroll-image" />
        <img src={web11} alt="Image 11" className="scroll-image" />
        <img src={web12} alt="Image 12" className="scroll-image" />
        <img src={web6} alt="Image 6" className="scroll-image" />
        <img src={web7} alt="Image 7" className="scroll-image" />
        <img src={web8} alt="Image 8" className="scroll-image" />
      </div>
    </div>
  );
}

export default ScrollWeb;
