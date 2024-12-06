import React from 'react';
import Navbar from '../FashionStoreOne/Navbar';
import Footer from '../FashionStoreOne/Footer';

function ProductsPage() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Products Page</h1>
        {/* Add products listing here */}
      </div>
      <Footer />
    </div>
  );
}

export default ProductsPage;
