import { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';

export default function PortfolioSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const portfolioItems = [
    {
      title: "Peachtree FEC Exterior",
      subtitle: "Modern family entertainment center design",
      image: "/src/assets/portfolio/fec-exterior.jpg",
    },
    {
      title: "Arcade Game Layout",
      subtitle: "Revenue-optimized game placement strategy",
      image: "/src/assets/portfolio/arcade-layout.jpg",
    },
    {
      title: "Bowl & Social Lanes",
      subtitle: "Premium bowling experience design",
      image: "/src/assets/portfolio/bowling-lanes.jpg",
    },
    {
      title: "The Tinman Social",
      subtitle: "Upscale social venue with bowling and entertainment",
      image: "/src/assets/portfolio/tinman-exterior.jpg",
    },
    {
      title: "Entertainment Venue at Night",
      subtitle: "Evening ambiance at a premium entertainment center",
      image: "/src/assets/portfolio/social-venue.jpg",
    }
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === portfolioItems.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? portfolioItems.length - 1 : prev - 1));
  };

  return (
    <section id="portfolio" className="py-24 bg-white overflow-hidden">
      <ScrollReveal>
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-secondary font-semibold tracking-wide uppercase">Our Portfolio</h2>
            <h3 className="section-heading">
              Success Stories We've Built
            </h3>
            <p className="section-subheading">
              Browse through our portfolio of Family Entertainment Centers we've helped launch, redesign, or optimize.
            </p>
          </div>
          
          <div className="relative">
            {/* Portfolio Carousel */}
            <div className="overflow-hidden rounded-xl shadow-xl">
              <div 
                className="flex transition-transform duration-500" 
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {portfolioItems.map((item, index) => (
                  <div key={index} className="min-w-full">
                    <div className="relative h-[500px] md:h-[600px]">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <h4 className="text-2xl md:text-3xl font-bold mb-2">{item.title}</h4>
                        <p className="text-lg text-gray-200">{item.subtitle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Controls */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white h-12 w-12 rounded-full flex items-center justify-center transition-all"
              aria-label="Previous project"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white h-12 w-12 rounded-full flex items-center justify-center transition-all"
              aria-label="Next project"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
            
            {/* Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {portfolioItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-3 w-3 rounded-full transition-all ${
                    index === activeIndex ? 'bg-primary w-8' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <a href="#contact" className="btn-secondary inline-flex items-center">
              <span>Discuss Your Project</span>
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}