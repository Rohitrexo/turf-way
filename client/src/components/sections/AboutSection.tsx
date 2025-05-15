import ScrollReveal from '@/components/ScrollReveal';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white">
      <ScrollReveal>
        <div className="container-custom">
          <div className="lg:text-center mb-16">
            <h2 className="text-accent font-semibold tracking-wide uppercase">About Us</h2>
            <h3 className="section-heading">
              Launching or Running Your FEC Should Be Fun—and Profitable
            </h3>
            <p className="section-subheading">
              At Turfway Entertainment, we believe every Family Entertainment Center should have the opportunity to thrive.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-primary">
                  <div className="flex items-start">
                    <div className="bg-primary rounded-full p-3 mr-4">
                      <i className="fas fa-bullseye text-white text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h3>
                      <p className="text-gray-600">
                        We aim to help Family Entertainment Centers reach their full potential through innovative concepts, strategic guidance, and operational excellence. Our team of industry veterans is dedicated to delivering exceptional results for every client.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-accent">
                  <div className="flex items-start">
                    <div className="bg-accent rounded-full p-3 mr-4">
                      <i className="fas fa-star text-white text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Our Values</h3>
                      <p className="text-gray-600">
                        We believe in integrity, excellence, innovation, and guest satisfaction. These core values guide us in every concept we create, every facility we modernize, and every operational challenge we solve for our clients.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 bowling-cursor">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/20 rounded-full"></div>
                <div className="relative z-10 overflow-hidden rounded-lg shadow-xl">
                  <img 
                    src="/src/assets/hero-image.jpg" 
                    alt="Family Entertainment Center" 
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900">Why Choose Us?</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-center h-14 w-14 rounded-md bg-primary text-white mb-5 mx-auto">
                  <i className="fas fa-users text-xl"></i>
                </div>
                <h3 className="text-lg font-bold text-gray-900 text-center">Industry Experts</h3>
                <p className="mt-3 text-gray-600 text-center">
                  With over 90 successful projects around North America, our team brings decades of specialized experience in the family entertainment industry.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-center h-14 w-14 rounded-md bg-secondary text-white mb-5 mx-auto">
                  <i className="fas fa-trophy text-xl"></i>
                </div>
                <h3 className="text-lg font-bold text-gray-900 text-center">Proven Results</h3>
                <p className="mt-3 text-gray-600 text-center">
                  Our projects consistently deliver exceptional guest experiences and strong financial returns, while avoiding the common pitfalls in the FEC industry.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-center h-14 w-14 rounded-md bg-accent text-white mb-5 mx-auto">
                  <i className="fas fa-handshake text-xl"></i>
                </div>
                <h3 className="text-lg font-bold text-gray-900 text-center">Personalized Service</h3>
                <p className="mt-3 text-gray-600 text-center">
                  We create unique entertainment concepts tailored to your specific market, demographics, and vision. No cookie-cutter solutions here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
