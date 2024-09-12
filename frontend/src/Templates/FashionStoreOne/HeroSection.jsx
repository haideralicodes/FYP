import React from 'react';
import './HeroSection.css';
import portrait from './assets/portrait.webp'

function HeroSection({newHeading}) {
  return (
    <section className="hero-section">
      {<h1>{newHeading}</h1>}
      <h1>Discover Our Style</h1>
      <p>Fashion for All Ages</p>
      <img src={portrait} />
    </section>
  );
}

export default HeroSection;
