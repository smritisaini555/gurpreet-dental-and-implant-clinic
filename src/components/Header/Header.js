import React from 'react';
import './Header.css'; // Make sure to link the CSS file

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-container">
        <div className="logo-section">
          <div className="logo-box"></div> 
          <span className="clinic-name">GURPREET DENTAL & Implants CLINIC</span>
        </div>

        <nav className="main-nav">
          <ul>
            <li><a href="#home" className="active">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;