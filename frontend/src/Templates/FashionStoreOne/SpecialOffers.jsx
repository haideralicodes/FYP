import React, { useState, useRef, useEffect } from 'react';
import './SpecialOffers.css';

function SpecialOffers({ onAddSectionClick }) {
  const [isSelected, setIsSelected] = useState(false);
  const [heading, setHeading] = useState('Special Offers');
  const [subHeading, setSubHeading] = useState('Limited Time Deals');
  const [description, setDescription] = useState(
    'Explore our exclusive promotions and enjoy the latest trends in fashion. From seasonal discounts to flash sales, we offer you the best deals on a wide range of stylish clothing and accessories. Don\'t miss out on the chance to elevate your wardrobe with our top-quality items at unbeatable prices.'
  );

  const specialOffersRef = useRef(null);

  useEffect(() => {
    // Load content from localStorage on mount
    setHeading(localStorage.getItem('specialOffersHeading') || 'Special Offers');
    setSubHeading(localStorage.getItem('specialOffersSubHeading') || 'Limited Time Deals');
    setDescription(localStorage.getItem('specialOffersDescription') || description);

    const handleClickOutside = (event) => {
      if (specialOffersRef.current && !specialOffersRef.current.contains(event.target)) {
        setIsSelected(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [description]);

  const handleBlur = (key, value, setter) => {
    localStorage.setItem(key, value);
    setter(value);
  };

  return (
    <section
      className="special-offers"
      ref={specialOffersRef}
      onClick={() => setIsSelected(true)}
      style={{ border: isSelected ? '3px solid blue' : 'none', cursor: 'pointer' }}
    >
      <h2
        contentEditable
        suppressContentEditableWarning={true}
        onBlur={(e) => handleBlur('specialOffersHeading', e.target.innerText, setHeading)}
        style={{ border: isSelected ? '2px solid blue' : 'none' }}
      >
        {heading}
      </h2>

      <h3
        contentEditable
        suppressContentEditableWarning={true}
        onBlur={(e) => handleBlur('specialOffersSubHeading', e.target.innerText, setSubHeading)}
        style={{ border: isSelected ? '2px solid blue' : 'none' }}
      >
        {subHeading}
      </h3>

      <p
        contentEditable
        suppressContentEditableWarning={true}
        onBlur={(e) => handleBlur('specialOffersDescription', e.target.innerText, setDescription)}
        style={{ border: isSelected ? '2px solid blue' : 'none' }}
      >
        {description}
      </p>

      {isSelected && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddSectionClick();
          }}
          style={{
            position: 'absolute',
            backgroundColor: '#3b82f6',
            top: '1700px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '10px 20px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          + Add Section
        </button>
      )}
    </section>
  );
}

export default SpecialOffers;
