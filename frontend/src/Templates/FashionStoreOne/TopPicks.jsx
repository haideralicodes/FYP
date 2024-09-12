import React, { useState } from 'react';
import './TopPicks.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import product1 from './assets/product1.webp';
import product2 from './assets/product2.webp';
import product3 from './assets/product3.webp';
import product4 from './assets/product4.webp';
import product5 from './assets/product5.webp';

function TopPicks() {
  const [currentIndex, setCurrentIndex] = useState(0);

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
    }
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  return (
    <section className="top-picks">
      <h2>Top Picks</h2>
      <div className="carousel-container">
        <FaChevronLeft className="carousel-icon left" onClick={handlePrev} />
        <div className="carousel">
          {products.slice(currentIndex, currentIndex + 4).map((product, idx) => (
            <div key={idx} className="product-item">
              <img src={product.productSrc} alt={product.productName} />
              <h3>{product.productName}</h3>
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
