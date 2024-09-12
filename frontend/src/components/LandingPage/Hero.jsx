import React from 'react'
import './Hero.css';
import laptop from '../../assets/laptop.png'

function Hero() {
  return (
    <>
        <div className='hero' id='  hero'>
            <h1>Build <span className='italic-text'> online </span>  Presence</h1>
            <img src={laptop}/>
            <button className='getStarted'>Get Started Now</button>
        </div>
    </>
  )
}

export default Hero