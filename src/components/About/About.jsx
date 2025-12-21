import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './About.scss'; 

const About = () => {
    const navigate = useNavigate();

    const handleBookAppointment = () => {
        navigate('/appointments'); 
    };

    return (
        <div className='about-section-container' id='about'>
            <div className='about-content'>
                <h2 className='about-main-title'>WELCOME TO GDIC</h2>
                <h3 className='about-subtitle'>ABOUT US</h3>
                <p className='about-description'>
                    Founded in 1995, GDIC was established to offer simpler solutions for Dental problems & to improve Smile, Aesthetics,
                    Oral health & function through our qualified dentists. Our team includes qualified dentists, dental technicians who are constantly
                    improving their skills and knowledge by participating in numerous courses and seminars both in India & abroad.
                </p>
                <div className='about-buttons'>
                    <button className='aboutbutton read-more-button'>Read More</button>
                    <button 
                        className='aboutbutton visit-us-button' 
                        onClick={handleBookAppointment} 
                    >
                        Book An Appointment
                    </button>
                </div>
            </div>
        </div>
    );
}

export default About;