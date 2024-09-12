import React from 'react'
import star from '../../assets/star.png'
import spring from '../../assets/spring.png'
import PrimaryBtn from './PrimaryBtn'
import SecondaryBtn from './SecondaryBtn'
import './CallAction.css'

function CallAction() {
  return (
    <div>
        <div className='sec'>
            <div className="b1">
                <img src={star}/>
            </div>
            <div className="b2">
                <h1 className='actionHeading'>Sign up for free today</h1>
                <p>Your business now online. You focus on growing your business while we focus behind the scenes.</p>
                <div className="btns">
                    <button className='btnStyling'>Get Started For Free</button>
                </div>
            </div>
            <div className="b3">
                <img src={spring}/>
            </div>
        </div>
    </div>
  )
}

export default CallAction