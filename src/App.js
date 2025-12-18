import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import IntroSection from './components/IntroSection/IntroSection';
import About from './components/About/About';
import Services from './components/Services/Services';
import Location from './components/Location/Location';
import Footer from './components/Footer/Footer';
import TestimonialsSection from './components/Testimonials/Testimonials';
import BookingPage from './components/BookingPage/BookingPage';
import StickyContactBar from './components/StickyContactBar/StickyContactBar'; 
import VideoTestimonials from './components/VideoTestimonials/VideoTestimonials';
import TreatmentDetail from './pages/TreatmentDetail/TreatmentDetail'; // Import your new page

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

const HomePageContent = () => (
    <>
        <Header />
        <IntroSection />
        <About />
        <Services />
        <TestimonialsSection />
        <VideoTestimonials />
        <Location />
        <Footer />
    </>
);

const PageWrapper = ({ children }) => {
    const navigate = useNavigate();
    const handleHeaderNavigation = (path) => navigate(path);

    return (
        <>
            <Header onNavigate={handleHeaderNavigation} /> 
            {children}
            <Footer />
        </>
    );
};

function App() {
    return (
        <div className="App">
            <BrowserRouter> 
                <ScrollToTop />
                <StickyContactBar />

                <Routes>
                    <Route path="/" element={<HomePageContent />} />

                    <Route 
                        path="/appointments" 
                        element={
                            <PageWrapper>
                                <BookingPage />
                            </PageWrapper>
                        } 
                    />

                    <Route 
                        path="/treatments/:treatmentSlug" 
                        element={
                            <PageWrapper>
                                <TreatmentDetail />
                            </PageWrapper>
                        } 
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;