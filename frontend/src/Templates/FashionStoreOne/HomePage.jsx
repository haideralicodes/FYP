import React from 'react';
import Navbar from '../FashionStoreOne/Navbar';
import HeroSection from '../FashionStoreOne/HeroSection';
import TopPicks from '../FashionStoreOne/TopPicks';
import SpecialOffers from '../FashionStoreOne/SpecialOffers';
import OurStory from '../FashionStoreOne/OurStory';
import Footer from '../FashionStoreOne/Footer';

function HomePage({ onAddSectionClick }) {
  return (
    <div>
      <Navbar />


      <HeroSection onAddSectionClick={onAddSectionClick} />
      <TopPicks />
      <SpecialOffers />
      <OurStory />
      <Footer />
    </div>
  );
}

export default HomePage;
