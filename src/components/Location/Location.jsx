import React from 'react';
import './Location.scss';

const Location = () => {
  const locationDetails = {
    address: 'Gurpreet dental & optical clinic, near civil hospital, bus stand road, Machhiwara sahib [pincode: 141115]',
    contact: {
      tel1: '+91 9876324499',
      email1: 'gdic@gurpreetdentalandimplantcentre.com',
    },
    hours: {
      days: 'Monday-Saturday',
      time: '9:00AM-7:00PM',
      sunday: 'OPEN (only with appointments)' 
    }
  };

  return (
    <div className='location-section' id='contact'>
      <h2 className='location-main-title'>Find Us</h2>

      <div className='map-container'>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3423.060651918445!2d76.1937185752743!3d30.91292877449782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391aa7b1dbaf6cc5%3A0xd238c260782ae369!2sGurpreet%20Dental%20%26%20Implant%20Center%20%7C%7C%20Best%20Dentist%2C%20Dental%20Clinic%20and%20Implant%20Centre%2C%20Orthodontist%20In%20Machhiwara!5e0!3m2!1sen!2sin!4v1762947274152!5m2!1sen!2sin" 
          width="100%" 
          height="450" 
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Clinic Location Map"
        ></iframe>
      </div>
      
      <div className='location-details-container'>
        
        <div className='location-column'>
          <h3 className='column-title'>Location</h3>
          <p className='column-content'>{locationDetails.address}</p>
        </div>

        <div className='location-column'>
          <h3 className='column-title'>Contact</h3>
          <div className='column-content'>
            <p>Tel: {locationDetails.contact.tel1}</p>
            <p>Email: <a href={`mailto:${locationDetails.contact.email1}`}>{locationDetails.contact.email1}</a></p>
          </div>
        </div>

        <div className='location-column'>
          <h3 className='column-title'>Hours</h3>
          <div className='column-content'>
            <p>
              {locationDetails.hours.days}: <span className='hours-time'>{locationDetails.hours.time}</span>
            </p>
            <p>
              Sunday: <span className='hours-closed'>{locationDetails.hours.sunday}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Location;