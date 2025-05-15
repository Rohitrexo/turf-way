import ScrollReveal from '@/components/ScrollReveal';

export default function ServicesSection() {
  const services = [
    {
      icon: "fas fa-search-dollar",
      title: "Feasibility Studies",
      description: "A third-party opinion is essential to ensure your business will be healthy and have long-term prosperity. Location, demographics, competition, and pricing all play significant parts in determining success.",
      image: "/src/assets/services/feasibility.jpg",
      color: "primary"
    },
    {
      icon: "fas fa-lightbulb",
      title: "Concept Development",
      description: "We'll work with you to craft a unique vision for your FEC that stands out from the competition. Our concepts incorporate the latest trends while ensuring a perfect fit for your market's demographics and preferences.",
      image: "/src/assets/services/concept.jpg",
      color: "secondary"
    },
    {
      icon: "fas fa-drafting-compass",
      title: "Layout Design",
      description: "An effective layout is crucial for an FEC's success. Our designs maximize revenue potential through strategic placement of attractions, efficient traffic flow, and thoughtful management of square footage.",
      image: "/src/assets/services/layout.jpg",
      color: "accent"
    },
    {
      icon: "fas fa-chart-line",
      title: "Revenue Optimization",
      description: "Boost your existing FEC's performance with our proven revenue optimization strategies. Our team will analyze your current operations and implement targeted improvements across attractions, pricing, and customer flow.",
      image: "/src/assets/services/revenue.jpg",
      color: "primary"
    },
    {
      icon: "fas fa-cogs",
      title: "Operational Excellence",
      description: "From staffing plans to standard operating procedures, we'll develop systems that ensure your FEC runs efficiently while delivering exceptional customer experiences. Our operational frameworks reduce costs and maximize profitability.",
      image: "/src/assets/services/operations.jpg",
      color: "accent"
    },
    {
      icon: "fas fa-bullhorn",
      title: "Marketing Strategy",
      description: "Even the best FEC needs effective marketing to succeed. We'll develop multi-channel marketing strategies specifically designed for entertainment venues, driving foot traffic and maximizing customer retention.",
      image: "/src/assets/services/marketing.jpg",
      color: "secondary"
    }
  ];

  return (
    <section id="services" className="py-24 bg-gray-50">
      <ScrollReveal>
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-primary font-semibold tracking-wide uppercase">Our Services</h2>
            <h3 className="section-heading">
              How We Can Help Your Entertainment Center
            </h3>
            <p className="section-subheading">
              TurfWay Entertainment offers a comprehensive suite of services to help Family Entertainment Centers launch, grow, and optimize their operations.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="service-card group perspective-1000"
              >
                {/* Flip Card Container */}
                <div className="relative transition-all duration-700 transform-style-3d h-[480px] group-hover:rotate-y-180">
                  {/* Front of Card */}
                  <div className="absolute inset-0 backface-hidden">
                    <div className="h-56 overflow-hidden rounded-t-lg">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                      <div className={`absolute inset-0 bg-${service.color}/20 group-hover:bg-${service.color}/40 transition-all duration-300`}></div>
                      <div className={`absolute top-4 right-4 h-12 w-12 rounded-full bg-${service.color} text-white flex items-center justify-center shadow-lg`}>
                        <i className={`${service.icon} text-xl`}></i>
                      </div>
                    </div>
                    <div className="bg-white p-6 shadow-xl transition-all duration-300 rounded-b-lg border-t-4 border-primary h-[240px]">
                      <h3 className={`text-xl font-bold text-gray-900 mb-3`}>{service.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-4">
                        {service.description}
                      </p>
                      
                      {/* Hover indicator */}
                      <div className="absolute bottom-4 right-4 text-gray-400 group-hover:text-primary transition-all">
                        <span className="text-sm mr-1">Flip for more</span>
                        <i className="fas fa-sync-alt animate-spin-slow"></i>
                      </div>
                    </div>
                  </div>
                  
                  {/* Back of Card */}
                  <div className="absolute inset-0 rounded-lg backface-hidden rotate-y-180 bg-gradient-to-b from-primary/90 to-accent/90 text-white p-8 flex flex-col">
                    <div className="flex items-center justify-center mb-4">
                      <span className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
                        <i className={`${service.icon} text-2xl`}></i>
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-center">{service.title}</h3>
                    <p className="text-white/90 mb-auto">
                      {service.description}
                    </p>
                    
                    {/* Key Benefits */}
                    <div className="mt-4 mb-6">
                      <h4 className="text-lg font-semibold mb-2">Key Benefits:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <i className="fas fa-check-circle mt-1 mr-2"></i>
                          <span>Enhanced guest experience</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check-circle mt-1 mr-2"></i>
                          <span>Increased revenue potential</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check-circle mt-1 mr-2"></i>
                          <span>Expert industry implementation</span>
                        </li>
                      </ul>
                    </div>
                    
                    <a 
                      href="#contact" 
                      className="mt-auto text-center bg-white/20 hover:bg-white/30 border border-white/40 rounded-md py-2 px-4 transition-all duration-300"
                    >
                      Request Consultation
                      <i className="fas fa-arrow-right ml-2"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <a href="#contact" className="btn-primary inline-flex items-center">
              <span>Schedule Your Consultation</span>
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}