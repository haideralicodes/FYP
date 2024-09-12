import React from 'react'
import Navbar from '../components/LandingPage/Navbar'
import HeroSection from '../components/LandingPage/HeroSection'
// import Hero from '../components/LandingPage/Hero'
import GenerateWebsite from '../components/LandingPage/GenerateWebsite'
import Benefit from '../components/LandingPage/Benefit'
import Pricing from '../components/LandingPage/Pricing'
import Testimonials from '../components/LandingPage/Testimonials'
import CallAction from '../components/LandingPage/CallAction'
import Footer from '../components/LandingPage/Footer'

function HomePage() {
  return (
    <>
      <div style={{background: 'radial-gradient(circle, #FFFFFF 0%, #D2DCFF 100%)'}}>
        <Navbar/>
        <HeroSection/>
      </div>
      <Benefit/>
      <GenerateWebsite/>
      <Pricing/>
      <Testimonials/>
      <CallAction/>
      <Footer/>
    </>
  )
}

export default HomePage