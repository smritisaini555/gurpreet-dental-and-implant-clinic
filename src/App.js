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

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const HomePageContent = () => (
    <>
        <IntroSection />
        <About />
        <Services />
        <TestimonialsSection />
        <Location />
    </>
);

const AppointmentWrapper = () => {
    const navigate = useNavigate();
    
    const handleHeaderNavigation = (path) => {
        navigate(path);
    };
    
    const handleBookingHome = () => {
        navigate('/');
    }

    return (
        <>
            <Header onNavigate={handleHeaderNavigation} /> 
            
            <BookingPage onGoHome={handleBookingHome} /> 
            
            <Footer />
        </>
    );
};


function App() {
    return (
        <div className="App">
            <BrowserRouter> 
                <ScrollToTop />
                
                <Routes>
                    <Route 
                        path="/" 
                        element={
                            <>
                                <Header /> 
                                <HomePageContent />
                                <Footer />
                            </>
                        } 
                    />

                    <Route 
                        path="/appointments" 
                        element={<AppointmentWrapper />} 
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
