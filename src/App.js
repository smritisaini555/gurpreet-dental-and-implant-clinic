import './App.css';
import Header from './components/Header/Header';
import IntroSection from './components/IntroSection/IntroSection';
import About from './components/About/About';
import Services from './components/Services/Services';
import Location from './components/Location/Location';
import Footer from './components/Footer/Footer';
import TestimonialsSection from './components/Testimonials/Testimonials';

function App() {
  return (
    <div className="App">
      <Header />
      <IntroSection />
      <About />
      <Services />
      <TestimonialsSection />
      <Location />
      <Footer />
    </div>
  );
}

export default App;
