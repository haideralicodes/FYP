import React, { useState, useRef, useEffect } from 'react';
import '../ShoesStore/TopPicks.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import product1 from './assets/shoe3.png';
import product2 from './assets/shoe4.png';
import product3 from './assets/shoe5.png';
import product4 from './assets/shoe6.png';
import product5 from './assets/shoe7.png';
import product6 from './assets/shoe8.png';
import product7 from './assets/shoe9.png';
import product8 from './assets/shoe10.png';
import product9 from './assets/shoe11.png';
import product10 from './assets/shoe12.png';

function TopPicks({ onAddSectionClick }) {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const topPicksRef = useRef(null);
  const [heading, setHeading] = useState('Top Picks');

  const products = [
    {
      productSrc: product1,
      productName: "Product 1 Name",
      productPrice: "Rs 2000"
    },
    {
      productSrc: product2,
      productName: "Product 2 Name",
      productPrice: "Rs 2500"
    },
    {
      productSrc: product3,
      productName: "Product 3 Name",
      productPrice: "Rs 1800"
    },
    {
      productSrc: product4,
      productName: "Product 4 Name",
      productPrice: "Rs 3000"
    },
    {
      productSrc: product5,
      productName: "Product 5 Name",
      productPrice: "Rs 1500"
    },
    {
      productSrc: product6,
      productName: "Product 5 Name",
      productPrice: "Rs 1500"
    },
    {
      productSrc: product7,
      productName: "Product 5 Name",
      productPrice: "Rs 1500"
    },
    {
      productSrc: product8,
      productName: "Product 5 Name",
      productPrice: "Rs 1500"
    },
    {
      productSrc: product9,
      productName: "Product 5 Name",
      productPrice: "Rs 1500"
    },
    {
      productSrc: product10,
      productName: "Product 5 Name",
      productPrice: "Rs 1500"
    }
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  const handleClickInside = () => {
    setIsSelected(true);
    setShowButton(true);
  };

  useEffect(() => {

    const savedHeading = localStorage.getItem('topPicksHeading');
    if (savedHeading) {
      setHeading(savedHeading);
    }

    const handleClickOutside = (event) => {
      if (topPicksRef.current && !topPicksRef.current.contains(event.target)) {
        setIsSelected(false);
        setShowButton(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleHeadingChange = (e) => {
    const newHeading = e.target.innerText;
    setHeading(newHeading);
    // Save the new heading to localStorage
    localStorage.setItem('topPicksHeading', newHeading);
  };

  return (
    <section 
      className="top-picks"
      ref={topPicksRef}
      onClick={handleClickInside}
      style={{ border: isSelected ? '3px solid blue' : 'none', cursor:"pointer" }}
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
            top: '1240px',
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
        suppressContentEditableWarning={true}
        onBlur={handleHeadingChange}
        style={{
          border: isSelected ? '1px solid blue' : 'none',
          borderLeft: isSelected ? '1px solid blue' : 'none',
          borderRight: isSelected ? '1px solid blue' : 'none',
          color:"white"
        }}
      >
        {heading}
      </h2>
      <div 
        className="carousel-container"
        style={{
          border: isSelected ? '1px solid blue' : 'none',
          borderLeft: isSelected ? '1px solid blue' : 'none',
          borderRight: isSelected ? '1px solid blue' : 'none',
        }}
      >
        <FaChevronLeft className="carousel-icon left" onClick={handlePrev} />
        <div className="carousel">
          {products.slice(currentIndex, currentIndex + 4).map((product, idx) => (
            <div key={idx} className="product-item">
              <img src={product.productSrc} alt={product.productName} />
              <h3 style={{fontSize:"20px"}}>{product.productName}</h3>
              <p>{product.productPrice}</p>
            </div>
          ))}
        </div>
        <FaChevronRight className="carousel-icon right" onClick={handleNext} />
      </div>
    </section>
  );
}

export default TopPicks;
