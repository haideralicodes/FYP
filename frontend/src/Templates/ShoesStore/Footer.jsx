import React, { useState, useEffect, useRef } from 'react';
import './Footer.css';

function Footer({ onAddSectionClick }) {
  const [brandName, setBrandName] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const storedBrandName = localStorage.getItem('businessName');
    setBrandName(storedBrandName || 'BrandName');
  }, []);

  const handleClickInside = () => {
    setIsSelected(true);
    setShowButton(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (footerRef.current && !footerRef.current.contains(event.target)) {
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
    <footer 
      className="footerr"
      ref={footerRef}
      onClick={handleClickInside}
      style={{ border: isSelected ? '3px solid blue' : 'none', cursor: 'pointer', position: 'relative' }}
    >
      {showButton && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowButton(false);
            onAddSectionClick()
          }}
          style={{
            position: 'absolute',
            top: '-18px', // Adjust the position accordingly
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
        className='editable'
        style={{
          border: isSelected ? '1px solid blue' : 'none',
          borderLeft: isSelected ? '1px solid blue' : 'none',
          borderRight: isSelected ? '1px solid blue' : 'none',
          marginTop:"10px",
          width:"500px"
        }}
      >
        {brandName}
      </h2>
      <div className='links'>
        <a href="#">Facebook</a>
        <a href="#">Twitter</a>
        <a href="#">Instagram</a>
        <a href="#">LinkedIn</a>
      </div>
      <div className='brandInfo'>
        <p>info@mysite.com</p>
        <p>Islamabad Capital Territory, Pakistan</p>
        <p>123-456-7890</p>
      </div>
      <p>&copy; 2024 {brandName}. All rights reserved.</p>
    </footer>
  );
}

export default Footer;