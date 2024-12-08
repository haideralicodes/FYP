import React, { useState, useRef, useEffect } from 'react';
import './TopPicks.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios'; // Import axios for API requests

function TopPicks({ onAddSectionClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const topPicksRef = useRef(null);
  const [heading, setHeading] = useState('Top Picks');
  const [products, setProducts] = useState([]); // State to store fetched products

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/products/getProduct'); // Adjust the endpoint accordingly
        setProducts(response.data); // Update state with fetched products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts(); // Call the function to fetch products
  }, []);

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
            top: '1030px',
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
        onBlur={handleHeadingChange}
        style={{
          border: isSelected ? '1px solid blue' : 'none',
          borderLeft: isSelected ? '1px solid blue' : 'none',
          borderRight: isSelected ? '1px solid blue' : 'none',
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
              <img
                src={product.images?.[0]} 
                alt={product.name}
                style={{ width: '200px', height: '250px', objectFit: 'cover' }}
              />
              <h3>{product.name}</h3>
              <p>Rs {product.price}</p>
            </div>
          ))}
        </div>
        <FaChevronRight className="carousel-icon right" onClick={handleNext} />
      </div>
    </section>
  );
}

export default TopPicks;
