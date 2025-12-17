import React, { useState, useEffect, useRef } from 'react';
import './Header.scss';
import Logo from '../../assests/icons/Logo.jpeg';

const treatmentsData = [
    {
        links: [
            'ORAL EXAMINATION AND CLEANINGS',
            'TOOTH CAVITY TREATMENT',
            'PAINLESS ROOT CANAL TREATMENT',
            'CBCT & OPG',
            'IMPLANTS',
            'LASERS',
        ],
    },
    {
        links: [
            'EXTRACTION & SURGICAL PROCEDURES',
            'KIDS DENTISTRY',
            'VENEERS',
            'BLEACHING',
            'DENTURES & PARTIAL DENTURES',
            'GUM DISEASES',
        ],
    },
    {
        links: [
            'CROWNS & BRIDGES',
            'BRACES',
            'CLEAR ALIGNERS INVISALIGN',
            'SEALANTS',
            'FLUORIDE TREATMENT',
            'TOOTH JEWELLERY',
        ],
    },
];

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
    
    const createTreatmentSlug = (name) => {
        return name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    };
    
    const linksBeforeTreatments = [
        { id: 'home', text: 'HOME' },
        { id: 'about', text: 'About' },
        { id: 'services', text: 'Services' },
        { id: 'testimonials', text: 'Testimonials' },
    ];
    
    const linksAfterTreatments = [
        { id: 'dental-tourism', text: 'DENTAL TOURISM' }, 
        { id: 'in-office-tour', text: 'IN OFFICE TOUR' }, 
        { id: 'gallery', text: 'GALLERY' }, 
        { id: 'contact', text: 'CONTACT US' }, 
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
                                TREATMENTS
                            </a>
                            
                            <div className={`treatments-dropdown ${isDropdownOpen ? 'show' : ''}`}>
                               <div className="dropdown-inner-content">
                                 {treatmentsData.map((column, colIndex) => (
                                    <div key={colIndex} className="dropdown-column">
                                        <ul className="column-links">
                                            {column.links.map((treatmentName, linkIndex) => (
                                                <li key={linkIndex}>
                                                    <a 
                                                        href={`/treatments/${createTreatmentSlug(treatmentName)}`}
                                                        onClick={() => { closeDropdown(); setIsMenuOpen(false); }} 
                                                    >
                                                        {treatmentName}
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
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;