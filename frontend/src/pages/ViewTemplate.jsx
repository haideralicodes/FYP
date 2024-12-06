import React from 'react';
import Navbar from '../Templates/BuetyStore/Navbar';
import HeroSection from '../Templates/BuetyStore/HeroSection';
import TopPicks from '../Templates/BuetyStore/TopPicks';
import SpecialOffers from '../Templates/BuetyStore/SpecialOffers';
import OurStory from '../Templates/BuetyStore/OurStory';
import Footer from '../Templates/BuetyStore/Footer';
import PreviewScreen from '../pages/CustomizeWebsite/PreviewScreen'

function ViewTemplate() {
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

export default ViewTemplate;