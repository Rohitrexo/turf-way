import { useEffect, useState, useRef } from 'react';

interface CounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  separator?: string;
  title?: string;
  description?: string;
  icon?: string;
  color?: string;
}

export default function CounterAnimation({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  decimals = 0,
  separator = ',',
  title,
  description,
  icon = 'fas fa-chart-line',
  color = 'primary'
}: CounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLDivElement | null>(null);
  
  // Format number with commas and decimals
  const formatNumber = (num: number) => {
    const fixedNumber = num.toFixed(decimals);
    const parts = fixedNumber.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return parts.join('.');
  };

  // Create observer to detect when counter is visible in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    const currentRef = counterRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Animate the counter when it becomes visible
  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
      
      // Determine the step size based on counter duration
      const totalFrames = Math.min(end, 100); // Cap at 100 animation frames
      const timePerFrame = duration / totalFrames;
      let frame = 0;
      
      // Use easeOutExpo for smooth animation slowing down at the end
      const easeOutExpo = (t: number) => {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      };
      
      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const easedProgress = easeOutExpo(progress);
        
        const currentCount = Math.min(Math.floor(end * easedProgress), end);
        setCount(currentCount);
        
        if (frame === totalFrames) {
          clearInterval(counter);
        }
      }, timePerFrame);
      
      return () => clearInterval(counter);
    }
    
    // Reset animation if element goes out of view
    if (!isVisible && hasAnimated) {
      setHasAnimated(false);
      setCount(0);
    }
  }, [isVisible, hasAnimated, end, duration]);

  return (
    <div 
      ref={counterRef} 
      className={`counter-card bg-white rounded-lg shadow-lg p-6 border-b-4 border-${color} transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2`}
    >
      <div className="flex items-center mb-4">
        <div className={`h-12 w-12 rounded-full bg-${color}/10 flex items-center justify-center mr-4`}>
          <i className={`${icon} text-${color} text-2xl`}></i>
        </div>
        {title && <h3 className="text-lg font-bold text-gray-800">{title}</h3>}
      </div>
      
      <div className="counter-value text-4xl font-extrabold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        {prefix}{formatNumber(count)}{suffix}
      </div>
      
      {description && (
        <p className="text-gray-600">{description}</p>
      )}
      
      {/* Animated progress bar underneath */}
      <div className="mt-4 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-${color} rounded-full transition-all duration-${duration}ms ease-out`}
          style={{ 
            width: hasAnimated ? '100%' : '0%',
            animation: hasAnimated ? `loading ${duration/1000}s ease-out forwards` : 'none'
          }}
        />
      </div>
    </div>
  );
}