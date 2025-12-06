import React, { useState, useEffect } from 'react'; 
import './Header.scss'; 
import Logo from '../../assests/icons/Logo.jpeg';

const Header = () => {
    const [activeLink, setActiveLink] = useState('home');

    useEffect(() => {
        const scrollToTop = () => {
            window.scrollTo(0, 0); 
            
            setActiveLink('home');
        };

        const timer = setTimeout(scrollToTop, 50); 
        
        return () => clearTimeout(timer); 

    }, []);

    const handleLinkClick = (e, linkId) => {
        e.preventDefault(); 
        
        setActiveLink(linkId);

        const targetElement = document.getElementById(linkId);

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const links = [
        { id: 'home', text: 'Home' },
        { id: 'about', text: 'About' },
        { id: 'services', text: 'Services' },
        { id: 'contact', text: 'Contact' },
    ];

    return (
        <header className="site-header">
            <div className="header-container">
                <div className="logo-section">
                    <div className="logo-box">
                        <img src={Logo} alt='logo' className='logo' />
                    </div> 
                    <span className="clinic-name">GURPREET DENTAL & IMPLANT CENTRE</span>
                </div>

                <nav className="main-nav">
                    <ul>
                        {links.map((link) => (
                            <li key={link.id}>
                                <a 
                                    href={`#${link.id}`} 
                                    onClick={(e) => handleLinkClick(e, link.id)}
                                    className={activeLink === link.id ? 'active' : ''}
                                >
                                    {link.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;