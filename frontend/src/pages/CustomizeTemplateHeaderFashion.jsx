import React from 'react';
import Navbar from '../Templates/FashionStoreOne/Navbar';
import HeroSection from '../Templates/FashionStoreOne/HeroSection';
import TopPicks from '../Templates/FashionStoreOne/TopPicks';
import SpecialOffers from '../Templates/FashionStoreOne/SpecialOffers';
import OurStory from '../Templates/FashionStoreOne/OurStory';
import Footer from '../Templates/FashionStoreOne/Footer';
import PreviewScreen from '../pages/CustomizeWebsite/PreviewScreen'

function CustomizeTemplateHeaderFashion() {
  return (
    <div>
      <PreviewScreen hidden={false}/>
      <div style={{width:"var(--viewport-width, 100%)", 
        display:"flex", flexDirection:"column", 
        justifyContent:"center", margin:"auto"}}>
        <Navbar />
        <HeroSection />
        <TopPicks />
        <SpecialOffers />
        <Footer />
      </div>
    </div>
  );
}

export default CustomizeTemplateHeaderFashion