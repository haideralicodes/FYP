import React from 'react';
import './Benefit.css';
import schedulePost from '../../assets/schedulePost.png';
import pyramid from '../../assets/pyramid.png';
import tube from '../../assets/tube.png';

function Benefit() {
  return (
    <div>
      <div className='box2'>
        <h1 className='gradient actionHeading'>Seamless scheduling</h1>
        <h1 className='gradient actionHeading'>on your social-media</h1>
        <br />
        <p>Never miss a Beat! Schedule your Social-Media Posts</p>
        <p>and Keep Your Audience Engaged 24/7!</p>
        <br /><br />
        <div className='schedulePost-container'>
          <img src={schedulePost} alt='Schedule Post' className='schedulePost' />
          <img src={pyramid} alt='Pyramid' className='pyramid' />
          <img src={tube} alt='Tube' className='tube' />
        </div>
      </div>
    </div>
  );
}

export default Benefit;
