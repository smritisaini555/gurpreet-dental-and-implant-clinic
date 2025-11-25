import React from 'react';
import './IntroSection.css'; // Ensure this CSS file is linked

const IntroSection = () => {
  return (
    <div className='intro-section-container' id='home'>
      <div className='intro-content'>
        <h1 className='intro-title'>Gurpreet Dental & Implants Clinic</h1>
        <div className='intro-buttons'>
          <button className='button primary-button'>AESTHETICS</button>
          <button className='button secondary-button'>Contact Us</button>
        </div>
      </div>
    </div>
  )
}

export default IntroSection;