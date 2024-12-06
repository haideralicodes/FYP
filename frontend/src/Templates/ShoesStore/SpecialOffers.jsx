import React, { useState, useRef, useEffect } from 'react';
import './SpecialOffers.css';

function SpecialOffers({ onAddSectionClick }) {
  const [isSelected, setIsSelected] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [heading, setHeading] = useState('Special Offers');
  const [subHeading, setSubHeading] = useState('Limited Time Deals');
  const [description, setDescription] = useState(
    'Explore our exclusive promotions and enjoy the latest trends in fashion. From seasonal discounts to flash sales, we offer you the best deals on a wide range of stylish clothing and accessories. Don\'t miss out on the chance to elevate your wardrobe with our top-quality items at unbeatable prices.'
  );

  const specialOffersRef = useRef(null);

  const handleClickInside = () => {
    setIsSelected(true);
    setShowButton(true);
  };

  useEffect(() => {
    // Load content from local storage on component mount
    const savedHeading = localStorage.getItem('specialOffersHeading');
    const savedSubHeading = localStorage.getItem('specialOffersSubHeading');
    const savedDescription = localStorage.getItem('specialOffersDescription');

    if (savedHeading) setHeading(savedHeading);
    if (savedSubHeading) setSubHeading(savedSubHeading);
    if (savedDescription) setDescription(savedDescription);

    const handleClickOutside = (event) => {
      if (specialOffersRef.current && !specialOffersRef.current.contains(event.target)) {
        setIsSelected(false);
        setShowButton(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Save content to local storage on blur (when editing finishes)
  const handleBlur = (key, value) => {
    localStorage.setItem(key, value);
  };

  return (
    <section
      className="special-offers"
      ref={specialOffersRef}
      onClick={handleClickInside}
      style={{ border: isSelected ? '3px solid blue' : 'none', cursor: 'pointer' }}
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
            top: '1930px',
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

      <h2
        contentEditable
        className="editable"
        suppressContentEditableWarning={true}
        onBlur={(e) => handleBlur('specialOffersHeading', e.target.innerText)}
        style={{
          border: isSelected ? '2px solid blue' : 'none',
          borderLeft: isSelected ? '2px solid blue' : 'none',
          borderRight: isSelected ? '2px solid blue' : 'none',
        }}
      >
        {heading}
      </h2>

      <h3
        contentEditable
        className="editable"
        suppressContentEditableWarning={true}
        onBlur={(e) => handleBlur('specialOffersSubHeading', e.target.innerText)}
        style={{
          border: isSelected ? '2px solid blue' : 'none',
          borderLeft: isSelected ? '2px solid blue' : 'none',
          borderRight: isSelected ? '2px solid blue' : 'none',
        }}
      >
        {subHeading}
      </h3>

      <p
        contentEditable
        className="editable"
        suppressContentEditableWarning={true}
        onBlur={(e) => handleBlur('specialOffersDescription', e.target.innerText)}
        style={{
          border: isSelected ? '2px solid blue' : 'none',
          borderLeft: isSelected ? '2px solid blue' : 'none',
          borderRight: isSelected ? '2px solid blue' : 'none',
        }}
      >
        {description}
      </p>
    </section>
  );
}

export default SpecialOffers;