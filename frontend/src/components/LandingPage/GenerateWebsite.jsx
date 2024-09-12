import React from 'react'
import './GenerateWebsite.css'
import Scrolldesign from './ScrollDesign'
import ScrollWeb from './ScrollWeb'

function GenerateWebsite() {
  return (
    <div className='Clr'>
      <div className='boxs'>
        <h1 className='gradient actionHeading'>Website Generation</h1>
        <h1 className='gradient actionHeading'>in just a few clicks</h1>
        <br />
        <p>Get your own website by providing your business</p>
        <p>details in just a flew clicks</p>
        <ScrollWeb/>
      </div>
    </div>
  )
}

export default GenerateWebsite