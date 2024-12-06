import React from 'react';
import Navbar from '../Templates/GadgetsStore/Navbar';
import HeroSection from '../Templates/GadgetsStore/HeroSection';
import TopPicks from '../Templates/GadgetsStore/TopPicks';
import SpecialOffers from '../Templates/GadgetsStore/SpecialOffers';
import OurStory from '../Templates/GadgetsStore/OurStory';
import Footer from '../Templates/GadgetsStore/Footer';
import PreviewScreen from '../pages/CustomizeWebsite/PreviewScreen'

function CustomizeTemplateHeaderGadget() {
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

export default CustomizeTemplateHeaderGadget;