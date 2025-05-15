import { useEffect, useRef } from 'react';

interface ParallaxProps {
  className?: string;
  children: React.ReactNode;
  speed?: number; // Speed of parallax effect (1 is normal, 0.5 is half, 2 is double)
  direction?: 'up' | 'down' | 'left' | 'right';
}

export default function ParallaxEffect({
  className = '',
  children,
  speed = 0.5,
  direction = 'up'
}: ParallaxProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    // Store original position
    let startPos = 0;
    
    const handleScroll = () => {
      if (!element) return;
      
      // Get scroll position
      const scrollPosition = window.scrollY;
      // Get element's position relative to the viewport
      const rect = element.getBoundingClientRect();
      // Calculate distance from top of the viewport
      const distanceFromTop = rect.top + scrollPosition;
      // Calculate how much the element is visible in the viewport
      const elementHeight = element.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Only apply parallax when element is in view
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate parallax offset based on how far the element is scrolled
        const scrollDistance = scrollPosition - (distanceFromTop - windowHeight);
        const parallaxOffset = scrollDistance * speed;
        
        // Apply transform based on direction
        let transform = '';
        switch (direction) {
          case 'up':
            transform = `translateY(-${parallaxOffset}px)`;
            break;
          case 'down':
            transform = `translateY(${parallaxOffset}px)`;
            break;
          case 'left':
            transform = `translateX(-${parallaxOffset}px)`;
            break;
          case 'right':
            transform = `translateX(${parallaxOffset}px)`;
            break;
        }
        
        element.style.transform = transform;
      }
    };
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial calculation
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, direction]);
  
  return (
    <div
      ref={elementRef}
      className={`parallax-element transition-transform ${className}`}
      style={{ willChange: 'transform' }}
    >
      {children}
    </div>
  );
}