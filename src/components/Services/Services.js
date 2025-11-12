import React from 'react';
import Slider from 'react-slick'; 
import './Services.css'; 
import conservativeImage from '../../assests/images/conservative.jpg'; 
import aestheticsImage from '../../assests/images/aesthetics.jpg';
import orthodonticsImage from '../../assests/images/orthodontics.jpg'; 
import service4Image from '../../assests/images/conservative.jpg'; 
import service5Image from '../../assests/images/aesthetics.jpg'; 


const Services = () => {
  const settings = {
    dots: true, 
    infinite: true, 
    speed: 500, 
    slidesToShow: 3, 
    slidesToScroll: 1, 
    autoplay: true, 
    autoplaySpeed: 3000, 
    cssEase: "linear", 
    arrows: false, 
    responsive: [ 
       {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1 
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
  };

  const serviceCards = [
    {
      id: 1,
      image: conservativeImage,
      title: 'CONSERVATIVE & ENDODONTICS',
      subtitle: 'Dental composite',
      descriptionPoints: [
        { term: 'CONSERVATIVE:', text: 'treatment of caries, malformed, discolored, unesthetic, or fractured teeth.' },
        { term: 'ENDODONTICS:', text: 'deals with treatment of pulpal and periapical diseases and dental pain management.' },
      ]
    },
    {
      id: 2,
      image: aestheticsImage,
      title: 'AESTHETICS & PROSTHESIS',
      subtitle: 'retainer & partial denture',
      descriptionPoints: [
        { term: 'Crowns:', text: 'Porcelain, Ceramic, PFM, Zirconia' },
        { term: 'Dentures:', text: 'Acrylic Resin, porcelain.' },
        { term: 'Implants:', text: 'Titanium and titanium alloys, ceramic, zirconia.' },
        { term: 'Bridges:', text: 'Porcelain, ceramic, metal alloys, gold, and acrylic.' },
        { term: 'Partial Dentures:', text: 'Acrylic resin, porcelain, metal.' },
        { term: 'Flippers:', text: 'Acrylic resin.' },
      ]
    },
    {
      id: 3,
      image: orthodonticsImage,
      title: 'ORTHODONTICS & PAEDIATRIC DENTISTRY',
      subtitle: 'BRACES',
      descriptionPoints: [
        { term: '', text: 'A dental specialty focused on aligning your bite and straightening your teeth.' },
      ]
    },
    {
      id: 4,
      image: service4Image,
      title: 'PERIODONTICS & ORAL SURGERY',
      subtitle: 'Gum Health & Extractions',
      descriptionPoints: [
        { term: 'PERIODONTICS:', text: 'Treatment of gum diseases, scaling, root planing, and gum surgeries.' },
        { term: 'ORAL SURGERY:', text: 'Wisdom tooth extraction, minor surgical procedures, and dental implants.' },
      ]
    },
    {
      id: 5,
      image: service5Image,
      title: 'PREVENTIVE DENTISTRY',
      subtitle: 'Keeping Your Smile Healthy',
      descriptionPoints: [
        { term: 'CLEANING:', text: 'Routine dental cleanings and polishing to remove plaque and tartar.' },
        { term: 'FLUORIDE:', text: 'Fluoride treatments to strengthen enamel and prevent cavities.' },
        { term: 'SEALANTS:', text: 'Application of dental sealants to protect molars from decay.' },
      ]
    }
  ];

  return (
    <div className='services-section'>
      <h2 className='services-main-title'>Our Services</h2>
      <div className='services-carousel-container'>
        <Slider {...settings}>
          {serviceCards.map(service => (
            <div key={service.id} className='service-card-wrapper'>
              <div className='service-card'>
                <div className='service-image-container'>
                  <img src={service.image} alt={service.title} className='service-card-image' />
                </div>
                <h3 className='service-card-title'>{service.title}</h3>
                <p className='service-card-subtitle'>{service.subtitle}</p>
                <div className='service-card-description'>
                  {service.descriptionPoints.map((point, index) => (
                    <p key={index}>
                      {point.term && <strong>{point.term}</strong>} {point.text}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Services;