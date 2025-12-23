import React, { useState, useEffect, useRef } from 'react';
import './VideoTestimonials.scss';
import { useMediaQuery } from 'react-responsive';

import videoTestimonial1 from '../../assests/videos/videoTestimonial1.mp4';
import videoTestimonial2 from '../../assests/videos/videoTestimonial2.mp4';
import videoTestimonial3 from '../../assests/videos/videoTestimonial3.mp4';
import videoTestimonial4 from '../../assests/videos/videoTestimonial4.mp4';
import videoTestimonial5 from '../../assests/videos/videoTestimonial5.mp4';
import videoTestimonial6 from '../../assests/videos/videoTestimonial6.mp4';

const videoTestimonialData = [
    { id: 1, videoUrl: `${videoTestimonial1}#t=0.1`, name: 'Mandeep Kaur', designation: 'Aesthetics Patient', rating: 5 },
    { id: 2, videoUrl: `${videoTestimonial2}#t=0.1`, name: 'Priya Sharma', designation: 'Endodontics Patient', rating: 5 },
    { id: 3, videoUrl: `${videoTestimonial3}#t=0.1`, name: 'Harpreet Kaur', designation: 'Orthodontics Patient', rating: 5 },
    { id: 4, videoUrl: `${videoTestimonial4}#t=0.1`, name: 'Harleen Kaur', designation: 'Oral Surgery Patient', rating: 5 },
    { id: 5, videoUrl: `${videoTestimonial5}#t=0.1`, name: 'Navpreet Kaur', designation: 'Preventive Patient', rating: 5 },
    { id: 6, videoUrl: `${videoTestimonial6}#t=0.1`, name: 'Ajmer Singh', designation: 'Preventive Patient', rating: 5 }
];

const CLONES_COUNT = 3;
const AUTO_SCROLL_INTERVAL = 4000;

const getSlidesPerView = (isMobile, isTablet) => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
};

const infiniteData = [
    ...videoTestimonialData,
    ...videoTestimonialData.slice(0, CLONES_COUNT)
];

const VideoTestimonialsSection = () => {
    const isMobile = useMediaQuery({ maxWidth: 500 });
    const isTablet = useMediaQuery({ maxWidth: 1024 });
    const totalActualSlides = videoTestimonialData.length;

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView(isMobile, isTablet));
    const [playingVideoId, setPlayingVideoId] = useState(null);

    const intervalRef = useRef(null);

    useEffect(() => {
        setSlidesPerView(getSlidesPerView(isMobile, isTablet));
        setCurrentSlide(0);
        setIsTransitioning(true);
    }, [isMobile, isTablet]);

    useEffect(() => {
        const autoScroll = () => {
            setCurrentSlide(prevSlide => {
                if (prevSlide === totalActualSlides) {
                    setIsTransitioning(false);
                    setTimeout(() => setCurrentSlide(0), 0);
                    return prevSlide + 1;
                }
                return prevSlide + 1;
            });
        };

        if (!playingVideoId) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            intervalRef.current = setInterval(autoScroll, AUTO_SCROLL_INTERVAL);
        } else {
            // Force clear if a video just started
            if (intervalRef.current) clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [totalActualSlides, playingVideoId, slidesPerView]);

    useEffect(() => {
        if (currentSlide === 0 && !isTransitioning) {
            const timeoutId = setTimeout(() => setIsTransitioning(true), 50);
            return () => clearTimeout(timeoutId);
        }
    }, [currentSlide, isTransitioning]);

    const handleVideoStart = (e, id) => {
        // Stop auto-scroll
        if (intervalRef.current) clearInterval(intervalRef.current);

        const currentContainer = e.currentTarget.closest('.video-t-html5-wrapper');
        const currentVideo = currentContainer.querySelector('video');
        const currentOverlay = currentContainer.querySelector('.video-t-thumbnail-overlay');

        // TOGGLE LOGIC: If clicking the same video to pause it
        if (playingVideoId === id && !currentVideo.paused) {
            currentVideo.pause();
            setPlayingVideoId(null);
            currentOverlay.classList.remove('is-hidden');
            currentOverlay.style.display = 'flex';
            return;
        }

        // RESET ALL: Stop every other video and show every other overlay
        const section = e.currentTarget.closest('.video-t-section');
        section.querySelectorAll('video').forEach(v => {
            v.pause();
            v.controls = false;
        });
        section.querySelectorAll('.video-t-thumbnail-overlay').forEach(ov => {
            ov.classList.remove('is-hidden');
            ov.style.display = 'flex'; 
        });

        // PLAY CURRENT: Start the clicked video and hide ITS overlay
        if (currentVideo) {
            setPlayingVideoId(id);
            currentVideo.play();
            currentVideo.controls = true;

            currentOverlay.classList.add('is-hidden');
            currentOverlay.style.display = 'none';
        }
    };

    const handleVideoEnd = () => {
        setPlayingVideoId(null);
    };

    const cardPercentageWidth = 100 / slidesPerView;
    const translation = cardPercentageWidth * currentSlide;

    const renderStars = (rating) => (
        <div className="video-t-rating-stars">
            {[...Array(5)].map((_, i) => (
                <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>★</span>
            ))}
        </div>
    );

    const renderVideoCard = (testimonial, index) => {
        const isCurrentVideoPlaying = playingVideoId === testimonial.id;

        return (
            <div
                key={index}
                className="video-t-card-wrapper"
                style={{ width: `${cardPercentageWidth}%` }}
            >
                <div className="video-t-card video-card">
                    <div className="video-t-player-container">
                        <div className="video-t-html5-wrapper">
                            <video
                                src={testimonial.videoUrl}
                                controls={isCurrentVideoPlaying}
                                playsInline
                                preload="auto"
                                onEnded={handleVideoEnd}
                                onPause={(e) => {
                                    const container = e.currentTarget.closest('.video-t-html5-wrapper');
                                    const overlay = container.querySelector('.video-t-thumbnail-overlay');
                                    if (overlay) {
                                        overlay.classList.remove('is-hidden');
                                        overlay.style.display = 'flex';
                                    }
                                    setPlayingVideoId(null);
                                }}
                                onClick={(e) => {
                                    if (!e.target.paused) {
                                        e.target.pause();
                                        setPlayingVideoId(null);
                                    } else {
                                        e.target.play();
                                        setPlayingVideoId(testimonial.id);
                                    }
                                }}
                                className={`video-element ${isCurrentVideoPlaying ? 'playing' : 'paused'}`}
                            />

                            <div
                                className={`video-t-thumbnail-overlay ${isCurrentVideoPlaying ? 'is-hidden' : ''}`}
                                onClick={(e) => handleVideoStart(e, testimonial.id)}
                            >
                                <span className="video-t-play-button">▶</span>
                            </div>
                        </div>
                    </div>

                    <div className="video-t-card-info">
                        <div className="video-t-header">
                            <p className="video-t-name">{testimonial.name}</p>
                        </div>
                        <div className="video-t-footer-bar">
                            <div className="video-t-rating-container">
                                {renderStars(testimonial.rating)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section className="video-t-section" id="videotestimonials">
            <h2 className="video-t-main-title">Our Clients Best Video Feedbacks</h2>
            <div className="video-t-carousel-container">
                <div className="video-t-carousel-wrapper">
                    <div className="video-t-carousel-view-area">
                        <div
                            className="video-t-track"
                            style={{
                                transform: `translateX(-${translation}%)`,
                                transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none'
                            }}
                        >
                            {infiniteData.map(renderVideoCard)}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoTestimonialsSection;