import { useEffect, useRef, useState } from 'react';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    // Handle video playback
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        console.log('Autoplay prevented by browser - user needs to interact first');
      });
      
      videoRef.current.addEventListener('loadeddata', () => {
        setIsVideoLoaded(true);
      });
    }
    
    // Parallax effect for hero content
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div id="home" className="relative bg-gray-900 h-screen flex items-center overflow-hidden">
      {/* Hero video background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className={`absolute inset-0 min-w-full min-h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src="/src/assets/videos/hero-video.mp4" type="video/mp4" />
        </video>
        
        {/* Fallback image - shown while video loads */}
        {!isVideoLoaded && (
          <img 
            src="/src/assets/hero-image.jpg" 
            alt="Family Entertainment Center" 
            className="absolute inset-0 min-w-full min-h-full object-cover"
          />
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
        
        {/* Mesh pattern overlay for texture */}
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+CjxyZWN0IHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzAwMCI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSI0MCIgY3k9IjQwIiByPSI0MCIgZmlsbD0iIzAwMCI+PC9jaXJjbGU+Cjxwb2x5Z29uIHBvaW50cz0iMCw4MCA4MCwwIDgwLDgwIiBmaWxsPSIjMDAwIj48L3BvbHlnb24+Cjwvc3ZnPg==')]"></div>
      </div>
      
      <div className="relative container-custom z-10">
        <div 
          className="text-center md:text-left lg:max-w-3xl fade-in"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
          }}
        >
          <div className="inline-block bg-primary/20 backdrop-blur-sm px-4 py-1 rounded-full mb-4">
            <span className="text-white/90 text-sm font-medium">Family Entertainment Center Experts</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight mb-6">
            <span className="block">Expert Consulting for</span>
            <span className="bg-gradient-to-r from-primary via-white to-accent bg-clip-text text-transparent">
              Family Entertainment Centers
            </span>
          </h1>
          
          <p className="mt-6 text-xl md:text-2xl text-white/90 font-light leading-relaxed max-w-2xl">
            Launch your FEC right the first time. Take your established business to the next level with our industry-leading expertise.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a 
              href="#services" 
              className="btn-primary bg-primary group relative overflow-hidden"
            >
              <span className="relative z-10">What We Do</span>
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </a>
            <a 
              href="#contact" 
              className="btn-secondary group relative overflow-hidden"
            >
              <span className="relative z-10">Request a Consultation</span>
              <span className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Animated scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <a href="#about" className="flex flex-col items-center text-white/80 hover:text-white transition-colors duration-300">
          <span className="text-sm mb-2">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
          </div>
        </a>
      </div>
      
      {/* Dynamic interactive elements */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-[1]">
        {/* Animated lines across the screen */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
        
        {/* Floating particles */}
        {[...Array(12)].map((_, i) => {
          const size = 2 + Math.random() * 8;
          const speed = 15 + Math.random() * 40;
          const startPosition = Math.random() * 100;
          const delay = Math.random() * 5;
          const color = i % 3 === 0 ? 'bg-primary/40' : i % 3 === 1 ? 'bg-secondary/40' : 'bg-accent/40';
          
          return (
            <div 
              key={i}
              className={`absolute w-${Math.round(size)} h-${Math.round(size)} ${color} rounded-full blur-sm`}
              style={{
                left: `${startPosition}%`,
                top: `${Math.random() * 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                opacity: 0.6,
                animation: `float ${speed}s linear ${delay}s infinite`
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
