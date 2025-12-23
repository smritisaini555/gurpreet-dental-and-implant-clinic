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
                        <div className='about-description'>
                            <p>
                                Founded in 1995, Gurpreet Dental & Implant Centre (GDIC) was established to offer 
                                simpler solutions for dental problems and to improve smile, aesthetics, oral health, 
                                and function through our qualified dentists. Our team includes 
                                skilled dental technicians and visiting specialists who are constantly improving 
                                their skills by participating in numerous courses and seminars both in India and 
                                abroad to bring global standards to Machhiwara Sahib.
                            </p>
                            <br />
                            <p>
                                We specialize in high-precision diagnostics featuring **Digital OPG** for 
                                comprehensive full-mouth panoramic X-rays, ensuring accurate treatment planning 
                                with minimal radiation exposure. Your safety is our 
                                benchmark; we adhere to rigorous infection prevention protocols, including 
                                **Ultrasonic Cleaning** and hospital-grade sterilization to ensure your 
                                peace of mind during every visit.
                            </p>
                        </div>
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