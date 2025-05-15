import { useEffect, useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
  once?: boolean;
}

export default function ScrollReveal({ 
  children, 
  className = '', 
  threshold = 0.1,
  delay = 0,
  once = true
}: ScrollRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Ensure consistent behavior by adding a base class immediately
    if (sectionRef.current) {
      sectionRef.current.classList.add('opacity-0');
      // Add a slight initial delay to ensure we don't see a flash
      setTimeout(() => {
        // Fallback for browsers that don't support IntersectionObserver
        if (!('IntersectionObserver' in window)) {
          if (sectionRef.current) {
            sectionRef.current.classList.remove('opacity-0');
            sectionRef.current.classList.add('fade-in');
          }
          return;
        }
        
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                // Delay the animation if specified
                if (delay > 0) {
                  setTimeout(() => {
                    if (sectionRef.current) {
                      sectionRef.current.classList.remove('opacity-0');
                      sectionRef.current.classList.add('fade-in');
                    }
                  }, delay);
                } else {
                  if (sectionRef.current) {
                    sectionRef.current.classList.remove('opacity-0');
                    sectionRef.current.classList.add('fade-in');
                  }
                }
                
                // Unobserve after animation if once is true
                if (once && sectionRef.current) {
                  observer.unobserve(sectionRef.current);
                }
              } else if (!once) {
                // If not once, revert animation when out of view
                if (sectionRef.current) {
                  sectionRef.current.classList.add('opacity-0');
                  sectionRef.current.classList.remove('fade-in');
                }
              }
            });
          },
          { 
            threshold,
            // Add root margin to trigger slightly before the element is in view
            rootMargin: '0px 0px -10% 0px'
          }
        );
        
        if (sectionRef.current) {
          observer.observe(sectionRef.current);
        }
        
        return () => {
          if (sectionRef.current && 'IntersectionObserver' in window) {
            observer.unobserve(sectionRef.current);
          }
        };
      }, 100);
    }
  }, [delay, once, threshold]);

  return (
    <div ref={sectionRef} className={`transition-opacity duration-1000 ${className}`}>
      {children}
    </div>
  );
}