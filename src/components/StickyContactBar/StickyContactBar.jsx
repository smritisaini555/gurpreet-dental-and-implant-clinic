import React from 'react';
import { Mail, Phone, Facebook, Instagram } from 'lucide-react'; 
import './StickyContactBar.scss';
import { FaWhatsapp } from 'react-icons/fa';

// Set the unified icon size to match the SCSS plan for padding
const ICON_SIZE = 24; 

const SOCIAL_LINKS = [
    { icon: FaWhatsapp, href: 'https://wa.me/YOUR_PHONE_NUMBER', label: 'WhatsApp', key: 'whatsapp' },
    { icon: Instagram, href: 'https://instagram.com/YOUR_HANDLE', label: 'Instagram', key: 'instagram' },
    { icon: Facebook, href: 'https://facebook.com/YOUR_PAGE', label: 'Facebook', key: 'facebook' },
];

const CONTACT_LINKS = [
    { icon: Phone, href: 'tel:+919876324499', label: 'Call', key: 'phone' },
    { icon: Mail, href: 'mailto:gurpreetdentalimplantcentre@gmail.com ', label: 'Email', key: 'email' },
];

const StickyContactBar = () => {
    return (
        <div className="sticky-contact-bar-wrapper left-aligned">
            {SOCIAL_LINKS.map((link) => (
                <a 
                    key={link.key} 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={link.label}
                    className={`contact-link social-link ${link.key}`}
                >
                    <link.icon size={ICON_SIZE} /> 
                </a>
            ))}

            {CONTACT_LINKS.map((link) => (
                <a 
                    key={link.key} 
                    href={link.href} 
                    aria-label={link.label}
                    className={`contact-link utility-link ${link.key}`}
                >
                    <link.icon size={ICON_SIZE} /> 
                </a>
            ))}
        </div>
    );
};

export default StickyContactBar;