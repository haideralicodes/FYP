import React, { useState, useRef, useEffect } from 'react';
import './OurStory.css';
import abstract from './assets/abstract.webp';

function OurStory({ onAddSectionClick }) {
  const [isSelected, setIsSelected] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const ourStoryRef = useRef(null);

  const handleClickInside = () => {
    setIsSelected(true);
    setShowButton(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ourStoryRef.current && !ourStoryRef.current.contains(event.target)) {
        setIsSelected(false);
        setShowButton(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <section
      className="our-story"
      ref={ourStoryRef}
      onClick={handleClickInside}
      style={{
        border: isSelected ? '3px solid blue' : 'none',
        borderLeft: isSelected ? '2px dashed black' : 'none',
        borderRight: isSelected ? '2px dashed black' : 'none',
        cursor: 'pointer',
        position: 'relative'
      }}
    >
      {showButton && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddSectionClick();
            setShowButton(false);
          }}
          style={{
            position: 'absolute',
            top: '-25px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '10px 20px',
            cursor: 'pointer',
            fontSize: '16px',
            zIndex: 10,
            visibility: showButton ? 'visible' : 'hidden',
            opacity: showButton ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
        >
          + Add Section
        </button>
      )}
      <div className='story-txt'>
        <img 
          className='abstract' 
          src={abstract}
          style={{
            border: isSelected ? '1px solid blue' : 'none',
            borderLeft: isSelected ? '1px solid blue' : 'none',
            borderRight: isSelected ? '1px solid blue' : 'none',
          }}
        />
      </div>
      <div className="txtContent">
        <div className='text-content'>
          <h2
            contentEditable
            className="editable"
            style={{
              border: isSelected ? '1px solid blue' : 'none',
              borderLeft: isSelected ? '1px solid blue' : 'none',
              borderRight: isSelected ? '1px solid blue' : 'none',
            }}
          >
            Our Story
          </h2>
          <h3
            contentEditable
            className="editable"
            style={{
              border: isSelected ? '1px solid blue' : 'none',
              borderLeft: isSelected ? '1px solid blue' : 'none',
              borderRight: isSelected ? '1px solid blue' : 'none',
            }}
          >
            Crafting Fashion
          </h3>
          <p
            contentEditable
            className="editable"
            style={{
              border: isSelected ? '1px solid blue' : 'none',
              borderLeft: isSelected ? '1px solid blue' : 'none',
              borderRight: isSelected ? '1px solid blue' : 'none',
            }}
          >
            Mangax is a cutting-edge online fashion designer store located in Islamabad, Pakistan
          </p>
          <button 
            className="button"
            style={{
              border: isSelected ? '2px solid blue' : 'none',
              borderLeft: isSelected ? '2px solid blue' : 'none',
              borderRight: isSelected ? '2px solid blue' : 'none',
            }}
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

export default OurStory;