import React, { useState, useEffect, useRef } from 'react';
import './Header.scss';
import Logo from '../../assests/icons/Logo.jpeg';
import { treatmentDetails, treatmentColumns } from '../../data/treatments';

const Header = ({ onNavigate }) => {
    const [activeLink, setActiveLink] = useState('home');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    const closeDropdown = () => setIsDropdownOpen(false);

    // FIX: Lock body scroll when mobile menu is active to enable internal scrolling
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMenuOpen]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDropdown();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    useEffect(() => {
        const scrollToTop = () => {
            window.scrollTo(0, 0);
            if (!onNavigate) {
                setActiveLink('home');
            }
        };
        const timer = setTimeout(scrollToTop, 50);
        return () => clearTimeout(timer);
    }, [onNavigate]);

    const handleLinkClick = (e, linkId) => {
        if (onNavigate) {
            e.preventDefault();
            onNavigate('/');
            return;
        }

        e.preventDefault();
        setActiveLink(linkId);
        closeDropdown();
        setIsMenuOpen(false);

        const targetElement = document.getElementById(linkId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleTreatmentsClick = (e) => {
        e.preventDefault();
        if (!onNavigate) {
            setIsDropdownOpen(prev => !prev);
        } else {
            closeDropdown();
            onNavigate('/treatments');
        }
    };

    const linksBeforeTreatments = [
        { id: 'home', text: 'HOME' },
        { id: 'about', text: 'About' },
        { id: 'services', text: 'Services' },
        { id: 'testimonials', text: 'Testimonials' },
    ];

    const linksAfterTreatments = [
        { id: 'dental-tourism', text: 'Dental Tourism' },
        { id: 'in-office-tour', text: 'In Office Tour' },
        { id: 'contact', text: 'Contact Us' },
    ];

    return (
        <header className="site-header">
            <div className="header-container">
                <div className="mobile-header-row">
                    <div className="logo-section">
                        <div className="logo-box">
                            <img
                                src={Logo}
                                alt='logo'
                                className='logo'
                                onClick={(e) => handleLinkClick(e, 'home')}
                            />
                        </div>
                        <span
                            className="clinic-name"
                            onClick={(e) => handleLinkClick(e, 'home')}
                        >
                            GURPREET DENTAL & IMPLANT CENTRE
                        </span>
                    </div>

                    <div className={`hamburger-icon ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                <nav className={`main-nav ${isMenuOpen ? 'mobile-active' : ''}`}>
                    <ul>
                        {linksBeforeTreatments.map((link) => (
                            <li key={link.id}>
                                <a
                                    href={`#${link.id}`}
                                    onClick={(e) => handleLinkClick(e, link.id)}
                                    className={activeLink === link.id && !onNavigate ? 'active' : ''}
                                >
                                    {link.text}
                                </a>
                            </li>
                        ))}

                        <li
                            className={`dropdown-wrapper ${isDropdownOpen ? 'active' : ''}`}
                            ref={dropdownRef}
                            onMouseEnter={() => window.innerWidth > 1024 && setIsDropdownOpen(true)}
                            onMouseLeave={() => window.innerWidth > 1024 && setIsDropdownOpen(false)}
                        >
                            <a
                                href="/treatments"
                                onClick={handleTreatmentsClick}
                                className={isDropdownOpen ? 'active' : ''}
                            >
                                Treatments
                            </a>

                            <div className={`treatments-dropdown ${isDropdownOpen ? 'show' : ''}`}>
                                <div className="dropdown-inner-content">
                                    {treatmentColumns.map((columnSlugs, colIndex) => (
                                        <div key={colIndex} className="dropdown-column">
                                            <ul className="column-links">
                                                {columnSlugs.map((slug) => (
                                                    <li key={slug}>
                                                        <a
                                                            href={`/treatments/${slug}`}
                                                            onClick={(e) => {
                                                                closeDropdown();
                                                                setIsMenuOpen(false);
                                                            }}
                                                        >
                                                            {treatmentDetails[slug].name}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </li>

                        {linksAfterTreatments.map((link) => (
                            <li key={link.id}>
                                <a
                                    href={`#${link.id}`}
                                    onClick={(e) => handleLinkClick(e, link.id)}
                                    className={activeLink === link.id && !onNavigate ? 'active' : ''}
                                >
                                    {link.text}
                                </a>
                            </li>
                        ))}

                        {/* --- NEW DOCTOR LOGIN LINK --- */}
                        <li className="doctor-login-nav">
                            <a 
                                href="/prescription" 
                                className="doctor-link"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Doctor Login
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;