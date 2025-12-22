import React, { useState, useEffect } from 'react';
import './Testimonials.scss';
import userPlaceholder from '../../assests/images/photo-1633332755192-727a05c4013d.jpg';

const testimonialData = [
    { id: 1, image: userPlaceholder, quote: "Gurpreet Dental & Implant Centre gave me a flawless smile. The aesthetic results were far beyond my expectations. Highly professional and caring team!", name: 'Arjun Singh', designation: 'Patient - Aesthetics', rating: 5 },
    { id: 2, image: userPlaceholder, quote: "The root canal procedure was painless and quick. Dr. Gurpreet explained every step clearly. Excellent conservative and endodontic care.", name: 'Priya Sharma', designation: 'Patient - Endodontics', rating: 5 },
    { id: 3, image: userPlaceholder, quote: "My child's orthodontic treatment was managed perfectly. They are amazing with kids. Highly recommend for paediatric dentistry.", name: 'Karan Mehra', designation: 'Patient - Orthodontics', rating: 5 },
    { id: 4, image: userPlaceholder, quote: "I received a dental implant here, right after periodontics advice. The entire surgical process was smooth and hassle-free.", name: 'Harleen Kaur', designation: 'Patient - Oral Surgery', rating: 5 },
    { id: 5, image: userPlaceholder, quote: "Routine cleaning and preventive care were thorough. My teeth feel cleaner than ever, and I appreciate the focus on long-term health.", name: 'Rajesh Verma', designation: 'Patient - Preventive Dentistry', rating: 5 }
];

const CLONES_COUNT = 3;
const AUTO_SCROLL_INTERVAL = 4000;

const getSlidesPerView = (width) => {
    if (width <= 500) return 1;
    if (width <= 1024) return 2;
    return 3;
};

const infiniteData = [
    ...testimonialData,
    ...testimonialData.slice(0, CLONES_COUNT) 
];

const TestimonialsSection = () => {
    const totalActualSlides = testimonialData.length;
    
    const [currentSlide, setCurrentSlide] = useState(0); 
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView(window.innerWidth));

    useEffect(() => {
        const handleResize = () => {
            const newSlidesPerView = getSlidesPerView(window.innerWidth);
            setSlidesPerView(newSlidesPerView);
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
                    // 1. Instantly turn off the transition
                    setIsTransitioning(false); 
                    
                    // 2. Schedule the immediate jump back to the start (index 0)
                    // The transition will be turned ON again by the next useEffect
                    setTimeout(() => {
                        setCurrentSlide(0);
                    }, 0); 

                    // We return 0, but this state is immediately overwritten by the setTimeout (which is fine)
                    return prevSlide + 1; // Return the index of the first clone (5) before reset
                }
                
                // Normal transition to the next slide
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

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={`star ${i <= rating ? 'filled' : ''}`}>
                    ★
                </span>
            );
        }
        return <div className="testimonial-rating-stars">{stars}</div>;
    };


    return (
        <section className="testimonials-section" id="testimonials">
            <h2 className="testimonials-main-title">Our Clients Best Feedbacks</h2>

            <div className="testimonials-carousel-container">
                <div className="carousel-wrapper">

                    <div className="carousel-view-area">
                        <div
                            className="testimonials-track"
                            style={{
                                transform: `translateX(-${translation}%)`,
                                transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none'
                            }}
                        >
                            {infiniteData.map((testimonial, index) => (
                                <div
                                    key={index}
                                    className="testimonial-card-wrapper"
                                >
                                    <div className="testimonial-card">

                                        <div className="testimonial-header">
                                            <div className="profile-image-container">
                                                <img src={testimonial.image} alt={testimonial.name} className="profile-image" />
                                            </div>
                                            <p className="testimonial-name">
                                                {testimonial.name}
                                            </p>
                                            <p className="testimonial-designation">
                                                {testimonial.designation}
                                            </p>
                                        </div>

                                        <p className="testimonial-quote">
                                            <span className="quote-left">❝</span>
                                            {testimonial.quote}
                                            <span className="quote-right">❞</span>
                                        </p>

                                        <div className="testimonial-footer-bar">
                                            <div className="rating-container">
                                                {renderStars(testimonial.rating)}
                                            </div>
                                        </div>

                                        <div className="green-accent-wave"></div>
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

export default TestimonialsSection;