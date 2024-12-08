import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


function Navbar() {

  const [brandName, setBrandName] = useState('');

  useEffect(() => {
    const storedBrandName = localStorage.getItem('businessName');
    setBrandName(storedBrandName || 'BrandName');
  }, []);


  return (
    <header className="navigation-bar">
      <div className="navbarr">
        <div className="brand">
          <Link to="/">{brandName}</Link>
        </div>
        <nav>
          <Link to="/customize-website-screen">Home</Link>
          <Link to="/customize-website-screen/products">Products</Link>
          <Link to="/customize-website-screen/cart">
            <AddShoppingCartIcon/>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;