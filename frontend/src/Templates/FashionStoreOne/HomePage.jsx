import React from 'react';
import Navbar from '../FashionStoreOne/Navbar';
import HeroSection from '../FashionStoreOne/HeroSection';
import TopPicks from '../FashionStoreOne/TopPicks';
import SpecialOffers from '../FashionStoreOne/SpecialOffers';
import OurStory from '../FashionStoreOne/OurStory';
import Footer from '../FashionStoreOne/Footer';
import PreviewScreen from '../../pages/CustomizeWebsite/PreviewScreen';

function HomePage({newHeading}) {

  return (
    <div>
      <PreviewScreen hidden={true}/>
      <div>
        <Navbar />
        <HeroSection newHeading={newHeading} />
        <TopPicks />
        <SpecialOffers />
        <OurStory />
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
