import React from 'react';
import './Footer.scss'; 
import { MapPin, Phone, Mail, Facebook, Instagram, Globe } from 'lucide-react';
import Logo from '../../assests/icons/Logo.jpeg';

const Footer = () => {
    const clinicName = "GURPREET DENTAL & IMPLANT CENTRE";
    const addressLink = "https://www.google.com/maps/place/Gurpreet+dental+and+optical+clinic/@30.9128504,76.1961098,17z/data=!4m6!3m5!1s0x391aa7b1dbaf6cc5:0xd238c260782ae369!8m2!3d30.912882!4d76.196159!16s%2Fg%2F11c2l0r85f?entry=ttu";
    const phone = "+91 9876324499";
    const email = "harmanjotsingh8479@gmail.com";
    const copyrightYear = new Date().getFullYear();

    return (
        <footer className="footer-section">
            <div className="footer-content-wrapper">
                
                <div className="footer-column footer-brand">
                    <div className="footer-logo">
                        <img src={Logo} alt='logo' className='logo' />
                        {/*custom logo svg*/}
                        {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-3.376 0-6.15-2.585-6.5-5.917C5.85 12.083 8.624 9.5 12 9.5s6.15 2.583 6.5 5.583C18.15 17.415 15.376 20 12 20zM12 11c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2s2-.9 2-2v-3c0-1.1-.9-2-2-2z" fill="#00c4cc"/>
                            <path d="M12 9.5c3.376 0 6.15 2.583 6.5 5.583C18.15 17.415 15.376 20 12 20v-8c0-1.1-.9-2-2-2v-1.5z" fill="#ffffff"/>
                        </svg> */}
                    </div>
                    <h3 className="clinic-name">{clinicName}</h3>
                    <p className="tagline">Expert Care, Brighter Smiles</p>
                </div>

                <div className="footer-column footer-social-icons">
                    <h4 className="column-title">Follow Us</h4>
                    <div className="social-links-column">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <Facebook size={28} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <Instagram size={28} />
                        </a>
                    </div>
                </div>

                <div className="footer-column footer-contact-info">
                    <h4 className="column-title">Get In Touch</h4>
                    <p className='contact-item'>
                        <MapPin size={18} className='contact-icon' /> 
                        <a href={addressLink} target="_blank" rel="noopener noreferrer">View on Map</a>
                    </p>
                    <p className='contact-item'>
                        <Phone size={18} className='contact-icon' /> 
                        <a href={`tel:${phone}`}>{phone}</a>
                    </p>
                    <p className='contact-item'>
                        <Mail size={18} className='contact-icon' /> 
                        <a href={`mailto:${email}`}>{email}</a>
                    </p>
                </div>
            </div>

            <div className="footer-bottom-bar">
                <p className="copyright">© {copyrightYear} {clinicName}. All rights reserved.</p>
                <a className="builder-credit" href="https://my-portfolio-zeta-eight-19.vercel.app/" target="_blank" rel="noopener noreferrer">
                    <div className='footer-logo-small'><Globe size={18} /></div> 
                    Built by Smriti Saini
                </a>
            </div>
        </footer>
    );
}

export default Footer;