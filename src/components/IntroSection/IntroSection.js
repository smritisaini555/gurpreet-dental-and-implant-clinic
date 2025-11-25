import React from 'react';
import './IntroSection.css';

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
        <h1 className='intro-title'>Gurpreet Dental & Implants Clinic</h1>
        <div className='intro-buttons'>
          <button className='button primary-button'>AESTHETICS</button>
          <button className='button secondary-button' onClick={handleScrollToContact}
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  )
}

export default IntroSection;