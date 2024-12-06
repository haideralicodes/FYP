import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function Navbar() {

  const [brandName, setBrandName] = useState('');

  useEffect(() => {
    const storedBrandName = localStorage.getItem('businessName');
    setBrandName(storedBrandName)
  },[])

  return (
    <header className="navigation-bar">
      <div className="navbarr">
        <div className="brand">
          <Link to="/template-view">{brandName || 'BrandName'}</Link>
        </div>
        <nav style={{marginTop:"9px"}}>
          <Link to="/customize-website-screen/GadgetStoreProducts">Products</Link>
          <Link to="/customize-website-screen/GadgetStoreCart">
            <AddShoppingCartIcon/>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;