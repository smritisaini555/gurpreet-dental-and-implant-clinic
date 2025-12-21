import React from 'react';
import './IntroSection.scss';

const IntroSection = () => {
  const handleScrollToContact = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='intro-section-container' id='home'>
      <div className='intro-content'>
        <h1 className='intro-title'>Gurpreet Dental & Implant Centre</h1>
        <p className='intro-subtitle'>Your Smile, Our Passion</p>
        <div className='intro-buttons'>
          {/* <button className='button primary-button'>AESTHETICS</button> */}
          {/* <button className='button secondary-button' onClick={handleScrollToContact}
          >
            Book an Appointment
          </button> */}
        </div>
      </div>
    </div>
  )
}

export default IntroSection;