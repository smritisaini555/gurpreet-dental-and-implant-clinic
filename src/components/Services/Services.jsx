import React, { useState, useEffect } from "react";
import conservativeImage from '../../assests/images/conservative.jpg';
import aestheticsImage from '../../assests/images/aesthetics.jpg';
import orthodonticsImage from '../../assests/images/orthodontics.jpg';
import service4Image from '../../assests/images/Oral-Surgeon-3.jpg';
import service5Image from '../../assests/images/preventive.jpeg';
import "./Services.scss";

const serviceData = [
  {
    id: 1,
    image: conservativeImage,
    title: 'CONSERVATIVE & ENDODONTICS',
    subtitle: 'DENTAL COMPOSITE',
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

const AUTO_SCROLL_INTERVAL = 3000;
const CLONES_COUNT = 3; // Clone 3 cards for the smoothest desktop loop

const getSlidesPerView = (width) => {
  if (width <= 768) {
    return 1; // Mobile
  } else if (width <= 1024) {
    return 2; // Tablet
  } else {
    return 3; // Desktop
  }
};

const infiniteData = [
  ...serviceData,
  ...serviceData.slice(0, CLONES_COUNT)
];

const ServicesSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const totalActualSlides = serviceData.length;
  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView(window.innerWidth));


  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(getSlidesPerView(window.innerWidth));
      setCurrentSlide(0);
      setIsTransitioning(true);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const autoScroll = () => {
      setCurrentSlide(prevSlide => {
        if (prevSlide === totalActualSlides) {
          setIsTransitioning(false);

          setTimeout(() => {
            setCurrentSlide(0);
          }, 0);

          return 0;
        }

        return prevSlide + 1;
      });
    };

    const intervalId = setInterval(autoScroll, AUTO_SCROLL_INTERVAL);
    return () => clearInterval(intervalId);
  }, [totalActualSlides, slidesPerView]);

  useEffect(() => {
    if (currentSlide === 0 && !isTransitioning) {
      const timeoutId = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [currentSlide, isTransitioning]);

  const translation = (100 / slidesPerView) * currentSlide;


  return (
    <section className="services-section" id="services">
      <h2 className="services-main-title">Our Services</h2>

      <div className="services-carousel-container">
        <div className="carousel-wrapper">

          <div className="carousel-view-area">
            <div
              className="services-track"
              style={{
                transform: `translateX(-${translation}%)`,
                transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none'
              }}
            >
              {infiniteData.map((service, index) => (
                <div key={index} className="service-card-wrapper">
                  <div className="service-card">
                    <div className="service-image-container">
                      <img src={service.image} alt={service.title} className="service-card-image" />
                    </div>
                    <h3 className="service-card-title">{service.title}</h3>
                    <p className="service-card-subtitle">{service.subtitle}</p>

                    <div className="service-card-description">
                      {service.descriptionPoints.map((point, pointIndex) => (
                        <p key={pointIndex} className="description-point">
                          {point.term && <strong>{point.term}</strong>}
                          {point.term && ' '}
                          {point.text}
                        </p>
                      ))}
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServicesSection;