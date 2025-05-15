import { useState, useEffect } from "react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container-custom">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <a href="#home" className="flex items-center">
                <img src="/src/assets/turfway-logo-lowres.webp" alt="TurfWay Entertainment" className="h-10 w-auto" />
                <span className={`ml-2 text-xl font-bold ${scrolled ? 'text-primary' : 'text-white'}`}>TurfWay Entertainment</span>
              </a>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-baseline space-x-6">
              <a href="#home" className={`${scrolled ? 'text-primary' : 'text-white'} hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-all duration-300`}>Home</a>
              <a href="#about" className={`${scrolled ? 'text-gray-700' : 'text-white'} hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-all duration-300`}>About</a>
              <a href="#services" className={`${scrolled ? 'text-gray-700' : 'text-white'} hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-all duration-300`}>Services</a>
              <a href="#portfolio" className={`${scrolled ? 'text-gray-700' : 'text-white'} hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-all duration-300`}>Portfolio</a>
              <a href="#testimonials" className={`${scrolled ? 'text-gray-700' : 'text-white'} hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-all duration-300`}>Testimonials</a>
              <a href="#contact" className="bowling-cursor bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">Get a Consultation</a>
            </div>
          </div>
          <div className="flex items-center md:hidden">
            <button 
              onClick={toggleMenu}
              className={`${scrolled ? 'text-gray-600' : 'text-white'} hover:text-accent focus:outline-none`}
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-white shadow-lg absolute w-full top-full left-0`}>
        <div className="px-4 pt-4 pb-4 space-y-2">
          <a onClick={closeMenu} href="#home" className="text-primary block px-3 py-2 rounded-md text-base font-medium border-l-4 border-primary">Home</a>
          <a onClick={closeMenu} href="#about" className="text-gray-700 hover:text-primary block px-3 py-2 rounded-md text-base font-medium hover:border-l-4 hover:border-primary transition-all duration-200">About</a>
          <a onClick={closeMenu} href="#services" className="text-gray-700 hover:text-primary block px-3 py-2 rounded-md text-base font-medium hover:border-l-4 hover:border-primary transition-all duration-200">Services</a>
          <a onClick={closeMenu} href="#portfolio" className="text-gray-700 hover:text-primary block px-3 py-2 rounded-md text-base font-medium hover:border-l-4 hover:border-primary transition-all duration-200">Portfolio</a>
          <a onClick={closeMenu} href="#testimonials" className="text-gray-700 hover:text-primary block px-3 py-2 rounded-md text-base font-medium hover:border-l-4 hover:border-primary transition-all duration-200">Testimonials</a>
          <a onClick={closeMenu} href="#contact" className="bg-accent text-white block px-3 py-2 rounded-md text-base font-medium mt-3 text-center">Get a Consultation</a>
        </div>
      </div>
    </nav>
  );
}
