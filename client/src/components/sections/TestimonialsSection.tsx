import { useEffect, useRef } from 'react';

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          
          // Add staggered animation to testimonial cards
          const cards = entry.target.querySelectorAll('.testimonial-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('fade-in');
            }, 200 * index);
          });
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const testimonials = [
    {
      text: "Working with TurfWay Entertainment transformed our family entertainment center. Their strategic guidance and concept development helped us increase guest satisfaction by 40% and grow our repeat visits significantly.",
      author: "John Smith",
      role: "Owner, BowlMore Lanes",
      initials: "JS",
      stars: 5,
      color: "primary"
    },
    {
      text: "The modernization project executed by TurfWay helped us breathe new life into our aging facility. Their team is responsive and truly cares about creating a unique experience that resonates with our local market.",
      author: "Rebecca Lee",
      role: "Director, FunZone Entertainment",
      initials: "RL",
      stars: 5,
      color: "accent"
    },
    {
      text: "TurfWay provided invaluable guidance during our FEC development journey. Their feasibility study and operational insights helped us avoid costly mistakes and develop a venue that exceeded our financial projections.",
      author: "Michael Johnson",
      role: "Operations Manager, GameTime Family Center",
      initials: "MJ",
      stars: 5,
      color: "secondary"
    }
  ];

  return (
    <section id="testimonials" ref={sectionRef} className="py-24 bg-gray-100 opacity-0 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-secondary/5 rounded-full"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-secondary font-semibold tracking-wide uppercase">Testimonials</h2>
          <h3 className="section-heading">
            What Our Clients Say
          </h3>
          <p className="section-subheading">
            Don't just take our word for it - hear from the owners and operators of successful entertainment venues we've helped develop.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={`testimonial-card opacity-0 bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-${testimonial.color} relative overflow-hidden bowling-cursor`}
            >
              {/* Quote icon */}
              <div className="absolute -top-4 -right-4 text-6xl text-gray-100 pointer-events-none">
                <i className="fas fa-quote-right"></i>
              </div>
              
              <div className="flex items-center mb-6">
                <div className="text-yellow-400 flex">
                  {[...Array(Math.floor(testimonial.stars))].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                  {testimonial.stars % 1 !== 0 && (
                    <i className="fas fa-star-half-alt"></i>
                  )}
                </div>
              </div>
              
              <p className="text-gray-700 mb-6 relative z-10">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`h-12 w-12 rounded-full bg-${testimonial.color} flex items-center justify-center shadow-md`}>
                    <span className="text-white font-bold">{testimonial.initials}</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-900">{testimonial.author}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a href="#contact" className="btn-primary bg-primary inline-block">
            Join Our Success Stories
          </a>
        </div>
      </div>
    </section>
  );
}
