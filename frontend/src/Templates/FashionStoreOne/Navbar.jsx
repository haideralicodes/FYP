import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <header className="navigation-bar">
      <div className="navbarr">
        <div className="brand">
          <Link to="/">BrandName</Link>
        </div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="#">Shop</Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;