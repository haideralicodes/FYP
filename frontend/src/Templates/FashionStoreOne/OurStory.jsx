import React from 'react';
import './OurStory.css';
import abstract from './assets/abstract.webp'

function OurStory() {
  return (
    <section className="our-story">
      <div className='story-txt'>
        <img className='abstract' src={abstract} />
      </div>
      <div className="txtContent">
        <div className='text-content'>
          <h2>Our Story</h2>
          <h3>Crafting Fashion</h3>
          <p>Mangax is a cutting-edge online fashion designer store located in Islamabad, Pakistan. We pride ourselves on curating a diverse collection of clothing and accessories that cater to the unique styles of young boys and girls. Our brand stands out by offering a blend of contemporary and trendy items that set new fashion standards in the city.</p>
          <button className="button">Learn More</button>
        </div>
      </div>
    </section>
  );
}

export default OurStory;
