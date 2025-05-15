import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import StatsSection from "@/components/sections/StatsSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import TestimonialsCarousel from "@/components/sections/TestimonialsCarousel";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import FloatingElements from "@/components/FloatingElements";
import QuizLeadMagnet from "@/components/QuizLeadMagnet";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulated loading process
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Add smooth scrolling for anchor links
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href');
        document.querySelector(id!)?.scrollIntoView({
          behavior: 'smooth'
        });
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  // Page loading animation
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
        <div className="relative">
          <img 
            src="/src/assets/turfway-logo-lowres.webp" 
            alt="TurfWay Entertainment" 
            className="h-24 animate-pulse"
          />
          <div className="mt-8 w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
              style={{
                width: '100%',
                animation: 'loading 1.5s ease-in-out'
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans antialiased text-gray-800 bg-gray-50 relative">
      {/* Custom animated cursor */}
      <CustomCursor />
      
      {/* Main content */}
      <Navigation />
      {/* Floating decorative elements in background */}
      <FloatingElements />

      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <StatsSection />
      <PortfolioSection />
      <TestimonialsCarousel />
      <ContactSection />

      {/* Quiz-based lead magnet */}
      <div className="fixed bottom-6 left-6 z-50">
        <QuizLeadMagnet />
      </div>
      <Footer />
      
      {/* Automatic scroll-to-top button */}
      <ScrollToTop />
    </div>
  );
}

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 p-3 rounded-full bg-primary text-white shadow-lg z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      aria-label="Scroll to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
