import React from 'react'
import './HeroSection.css'
import hero from '../../assets/genWeb.webp'
import PrimaryBtn from './PrimaryBtn'
import SecondaryBtn from './SecondaryBtn'
import cog from '../../assets/cog.png'

function HeroSection() {
  return (
    <div>
      <div className="section">
        <div className="left">
          <div className="mainHeading">
            <h1 className='gradient actionHeading'>Business Buddy</h1>
            <p>Set up your online presence in minutes 
              with our user-friendly platform. No coding 
              skills required, just a few clicks and 
              you're live. Focus on growing your business 
              while we handle the tech!</p>
            <div className="btnz">
              <PrimaryBtn/>
              <SecondaryBtn/>
            </div>
          </div>
        </div>
        <div className="right">
          <img className='laptop' src={hero} alt="Laptop" />
        </div>
      </div>
    </div>
  )
}

export default HeroSection