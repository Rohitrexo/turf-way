import { useState, useEffect, useRef } from 'react';
import ScrollReveal from '@/components/ScrollReveal';

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Michael Johnson",
    role: "Owner, FunZone Family Entertainment",
    quote: "TurfWay's consulting services helped us increase our revenue by 40% in just six months. Their team brought fresh ideas and operational insights that transformed our business.",
    rating: 5,
    image: "/src/assets/testimonial-1.jpg",
    featured: true
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "General Manager, Adventure Land FEC",
    quote: "Working with TurfWay Entertainment was the best decision we made for our new FEC. Their expertise in attraction selection and layout optimization has made us the most popular entertainment venue in our area.",
    rating: 5,
    image: "/src/assets/testimonial-2.jpg",
    featured: false
  },
  {
    id: 3,
    name: "David Garcia",
    role: "CEO, GameTime Entertainment",
    quote: "The team at TurfWay Entertainment truly understands what makes an FEC successful. Their guidance on our redemption strategy alone doubled our arcade revenue.",
    rating: 5,
    image: "/src/assets/testimonial-3.jpg",
    featured: false
  },
  {
    id: 4,
    name: "Jennifer Lee",
    role: "Marketing Director, PlayVille",
    quote: "TurfWay helped us transform our marketing approach and create targeted promotions that significantly increased both foot traffic and per-customer spending.",
    rating: 4,
    image: "/src/assets/testimonial-4.jpg",
    featured: false
  },
  {
    id: 5,
    name: "Robert Wilson",
    role: "Owner, Family Fun Center",
    quote: "As a new FEC owner, I was overwhelmed with all the decisions. TurfWay's step-by-step consulting approach made opening our center smooth and successful from day one.",
    rating: 5,
    image: "/src/assets/testimonial-5.jpg",
    featured: false
  }
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [animating, setAnimating] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval>>();
  
  // Find the featured testimonial index, or default to 0
  const featuredIndex = testimonials.findIndex(t => t.featured) || 0;
  
  // Setup auto-scroll functionality
  useEffect(() => {
    if (isAutoPlaying && !isHovering) {
      autoPlayRef.current = setInterval(() => {
        if (!animating) {
          goToNext();
        }
      }, 5000); // Change testimonial every 5 seconds
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, isHovering, animating]);
  
  // Navigation functions
  const goToNext = () => {
    if (animating) return;
    setAnimating(true);
    setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length);
    setTimeout(() => setAnimating(false), 600); // Match the transition duration
  };
  
  const goToPrev = () => {
    if (animating) return;
    setAnimating(true);
    setCurrentIndex(prevIndex => (prevIndex - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setAnimating(false), 600); // Match the transition duration
  };
  
  const goToSlide = (index: number) => {
    if (animating || index === currentIndex) return;
    setAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setAnimating(false), 600); // Match the transition duration
  };
  
  // Handle mouse interactions
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-gray-900 text-white">
      <ScrollReveal>
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent font-semibold tracking-wide uppercase">Success Stories</span>
            <h2 className="section-heading text-white relative">
              What Our Clients Say
              <span className="absolute -bottom-2 left-1/2 w-20 h-1 bg-accent transform -translate-x-1/2"></span>
            </h2>
            <p className="text-gray-300 text-lg mt-6">
              We've helped FEC owners across North America transform their venues and exceed their business goals.
            </p>
          </div>
          
          {/* Featured client callout */}
          <div className="mb-12 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg p-4 text-center">
            <div className="animate-pulse inline-block">
              <span className="font-semibold text-white">
                <i className="fas fa-medal text-yellow-400 mr-2"></i> 
                Featured Client of the Month
              </span>
            </div>
          </div>
          
          {/* Testimonials carousel */}
          <div 
            ref={carouselRef}
            className="testimonials-carousel relative overflow-hidden rounded-xl shadow-2xl"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Testimonial slides */}
            <div 
              className="flex transition-transform duration-600 ease-in-out" 
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="testimonial-slide min-w-full">
                  <div className={`bg-gray-800 p-8 md:p-12 rounded-xl ${
                    testimonial.featured ? 'border-2 border-yellow-400' : ''
                  }`}>
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      {/* Client image */}
                      <div className={`flex-shrink-0 w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-full border-4 ${
                        testimonial.featured ? 'border-yellow-400' : 'border-accent'
                      } ${index === currentIndex ? 'animate-bounce-in' : ''}`}>
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback for missing images
                            const target = e.target as HTMLImageElement;
                            target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(testimonial.name) + "&background=random";
                          }}
                        />
                      </div>
                      
                      {/* Testimonial content */}
                      <div className="flex-1">
                        <div className="mb-4">
                          {/* Star rating */}
                          <div className={`flex space-x-1 mb-4 ${index === currentIndex ? 'animate-rating' : ''}`}>
                            {[...Array(5)].map((_, i) => (
                              <span 
                                key={i} 
                                className={`text-${i < testimonial.rating ? 'yellow-400' : 'gray-600'} transition-all duration-300`}
                                style={{ animationDelay: `${i * 100}ms` }}
                              >
                                <i className="fas fa-star"></i>
                              </span>
                            ))}
                          </div>
                          
                          {/* Quote */}
                          <blockquote className="text-xl italic text-gray-200 mb-4 relative">
                            <span className="absolute -top-4 -left-2 text-4xl text-accent/30">"</span>
                            <p className="relative z-10">{testimonial.quote}</p>
                            <span className="absolute -bottom-4 -right-2 text-4xl text-accent/30">"</span>
                          </blockquote>
                        </div>
                        
                        {/* Author info */}
                        <div className="flex items-center">
                          <div>
                            <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                            <p className="text-accent">{testimonial.role}</p>
                          </div>
                          
                          {testimonial.featured && (
                            <span className="ml-auto bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold uppercase">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation arrows */}
            <button 
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-900/60 hover:bg-gray-900/80 text-white h-12 w-12 rounded-full flex items-center justify-center transition-all"
              onClick={goToPrev}
              aria-label="Previous testimonial"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            
            <button 
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-900/60 hover:bg-gray-900/80 text-white h-12 w-12 rounded-full flex items-center justify-center transition-all"
              onClick={goToNext}
              aria-label="Next testimonial"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
            
            {/* Dots indicator */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex ? 'w-8 bg-accent' : 'w-2 bg-gray-400 hover:bg-gray-300'
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
          
          {/* Auto-play toggle */}
          <div className="mt-6 text-center">
            <button 
              className={`text-sm text-gray-400 hover:text-white flex items-center mx-auto transition-colors duration-300`}
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            >
              <i className={`fas ${isAutoPlaying ? 'fa-pause' : 'fa-play'} mr-2`}></i>
              {isAutoPlaying ? 'Pause' : 'Play'} Slideshow
            </button>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}