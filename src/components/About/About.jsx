import React from 'react';
import './About.scss'; 
import AboutImage from '../../assests/images/about-us-image.jpg';

const About = () => {
    return (
        <div className='about-section-container' id='about'>
            <div className='about-flex-wrapper'>
                <div className='about-left-column'>
                    <div className='about-content'>
                        <h2 className='about-main-title'>WELCOME TO GDIC</h2>
                        <h3 className='about-subtitle'>ABOUT US</h3>
                        <p className='about-description'>
                            Founded in 1995, GDIC was established to offer simpler solutions for Dental problems & to improve Smile, Aesthetics,
                            Oral health & function through our qualified dentists. Our team includes qualified dentists, dental technicians who are constantly
                            improving their skills and knowledge by participating in numerous courses and seminars both in India & abroad.
                        </p>
                    </div>
                </div>
                <div className='about-right-column'>
                    <div className='about-image-container'>
                        <img src={AboutImage} alt="About GDIC" className="about-side-image" />
                        <div className="accent-border"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;