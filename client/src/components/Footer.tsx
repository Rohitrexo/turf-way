import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing! You will receive our latest updates.');
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 text-white pt-20 pb-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-20 w-72 h-72 bg-accent/20 rounded-full blur-xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        {/* Footer top section with CTA */}
        <div className="mb-16 p-8 bg-primary/10 backdrop-blur-sm rounded-xl border border-primary/20 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Take Your Entertainment Center to the Next Level?</h3>
            <p className="text-white/80 mb-0">Our team of experts is ready to help you create, optimize or modernize your family entertainment center.</p>
          </div>
          <a href="#contact" className="bg-white text-primary hover:bg-primary hover:text-white border border-white px-8 py-4 rounded-md font-bold transition-all duration-300 text-center whitespace-nowrap">
            Get Started Today
          </a>
        </div>
        
        {/* Main footer with columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center mb-6">
              <img src="/src/assets/turfway-logo-lowres.webp" alt="TurfWay Entertainment" className="h-12" />
            </div>
            <p className="text-gray-400 mb-6">
              Expert consulting services for family entertainment centers. With over 90 successful projects across North America, we help FEC owners launch right the first time or take their established business to the next level.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-all duration-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-all duration-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://linkedin.com" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-all duration-300">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://instagram.com" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-all duration-300">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          
          {/* Column 2: Services */}
          <div>
            <h4 className="text-white text-lg font-bold mb-6 relative">
              <span className="relative z-10">Our Services</span>
              <span className="absolute -bottom-2 left-0 h-1 w-12 bg-primary"></span>
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="#services" className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center">
                  <svg className="w-3 h-3 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Feasibility Studies
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center">
                  <svg className="w-3 h-3 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Concept Creation & Development
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center">
                  <svg className="w-3 h-3 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Operational Health Check
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center">
                  <svg className="w-3 h-3 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Food & Beverage Programs
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center">
                  <svg className="w-3 h-3 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Staffing & Training Programs
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center">
                  <svg className="w-3 h-3 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Modernization Projects
                </a>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Contact */}
          <div>
            <h4 className="text-white text-lg font-bold mb-6 relative">
              <span className="relative z-10">Contact Info</span>
              <span className="absolute -bottom-2 left-0 h-1 w-12 bg-primary"></span>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mt-1 flex-shrink-0 text-primary">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="ml-3 text-gray-400">
                  123 Entertainment Avenue<br />
                  Suite 200<br />
                  Orlando, FL 32819
                </div>
              </li>
              <li className="flex items-start">
                <div className="mt-1 flex-shrink-0 text-primary">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="ml-3 text-gray-400">
                  <a href="tel:+15551234567" className="hover:text-primary transition-colors duration-300">(555) 123-4567</a>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mt-1 flex-shrink-0 text-primary">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="ml-3 text-gray-400">
                  <a href="mailto:info@turfwayentertainment.com" className="hover:text-primary transition-colors duration-300">info@turfwayentertainment.com</a>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mt-1 flex-shrink-0 text-primary">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="ml-3 text-gray-400">
                  Mon - Fri: 9:00 AM - 6:00 PM EST<br />
                  Weekends: Closed
                </div>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-white text-lg font-bold mb-6 relative">
              <span className="relative z-10">Newsletter</span>
              <span className="absolute -bottom-2 left-0 h-1 w-12 bg-primary"></span>
            </h4>
            <p className="text-gray-400 mb-6">
              Subscribe to our newsletter to receive the latest updates, industry insights, and exclusive offers for entertainment center owners.
            </p>
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address" 
                  className="bg-white/10 border border-gray-600 text-white rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md transition-colors duration-300 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Footer bottom with copyright */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} TurfWay Entertainment. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <a href="#" className="hover:text-primary transition-colors duration-300">Privacy Policy</a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-primary transition-colors duration-300">Terms of Service</a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-primary transition-colors duration-300">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}