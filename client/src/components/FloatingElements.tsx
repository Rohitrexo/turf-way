import { useState, useEffect } from 'react';

// Define types of decorative elements
const elementTypes = [
  {
    name: 'balloon',
    icon: '🎈',
    size: 'text-3xl',
    animation: 'floating-balloon'
  },
  {
    name: 'joystick',
    icon: '🕹️',
    size: 'text-2xl',
    animation: 'floating-joystick'
  },
  {
    name: 'token',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill="url(#tokenGradient)" stroke="#FFD700" strokeWidth="2" />
        <text x="50" y="65" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="30">FEC</text>
        <defs>
          <linearGradient id="tokenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FFA500" />
          </linearGradient>
        </defs>
      </svg>
    ),
    size: 'w-10 h-10',
    animation: 'floating-token'
  },
  {
    name: 'star',
    svg: (
      <svg viewBox="0 0 51 48" className="w-full h-full">
        <path fill="url(#starGradient)" d="M25.5 0l6.4 19.1H51L32.8 31l6.4 19.1-18.3-11.9-18.3 11.9 6.4-19.1L0 19.1h19.1L25.5 0z" />
        <defs>
          <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffcc00" />
            <stop offset="100%" stopColor="#ff6600" />
          </linearGradient>
        </defs>
      </svg>
    ),
    size: 'w-8 h-8',
    animation: 'floating-star'
  },
  {
    name: 'bowling',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill="#000" />
        <circle cx="35" cy="35" r="5" fill="#f00" />
        <circle cx="65" cy="35" r="5" fill="#f00" />
        <circle cx="50" cy="60" r="5" fill="#f00" />
      </svg>
    ),
    size: 'w-12 h-12',
    animation: 'floating-bowling'
  }
];

// Interface for a single floating element
interface FloatingElement {
  id: number;
  type: typeof elementTypes[number];
  left: number;  // Position from left as percentage
  delay: number; // Animation delay in seconds
  duration: number; // Animation duration in seconds
}

export default function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([]);
  const [clickCount, setClickCount] = useState<{[key: number]: number}>({});
  
  // Initialize floating elements
  useEffect(() => {
    const newElements: FloatingElement[] = [];
    
    // Create 12 random elements at different positions
    for (let i = 0; i < 12; i++) {
      const randomType = elementTypes[Math.floor(Math.random() * elementTypes.length)];
      const randomLeft = Math.random() * 95; // 0-95% from left
      const randomDelay = Math.random() * 8; // 0-8s delay
      const randomDuration = 15 + Math.random() * 20; // 15-35s duration
      
      newElements.push({
        id: i,
        type: randomType,
        left: randomLeft,
        delay: randomDelay,
        duration: randomDuration
      });
    }
    
    setElements(newElements);
  }, []);
  
  // Handle element click - Easter egg
  const handleElementClick = (id: number) => {
    setClickCount(prev => {
      const newCount = (prev[id] || 0) + 1;
      
      // After 3 clicks, create a confetti burst
      if (newCount === 3) {
        // Create confetti burst
        const confettiElement = document.createElement('div');
        confettiElement.className = 'confetti-container fixed pointer-events-none z-[9999]';
        document.body.appendChild(confettiElement);
        
        // Add confetti particles
        for (let i = 0; i < 30; i++) {
          const particle = document.createElement('div');
          const size = Math.random() * 10 + 5;
          const left = Math.random() * 100;
          const color = ['bg-primary', 'bg-secondary', 'bg-accent', 'bg-yellow-400', 'bg-blue-400', 'bg-pink-400'][Math.floor(Math.random() * 6)];
          
          particle.className = `confetti absolute ${color}`;
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;
          particle.style.left = `${left}%`;
          particle.style.top = '-5%';
          particle.style.animationDelay = `${Math.random() * 0.5}s`;
          
          confettiElement.appendChild(particle);
        }
        
        // Remove confetti after animation completes
        setTimeout(() => {
          if (confettiElement.parentNode) {
            document.body.removeChild(confettiElement);
          }
        }, 3000);
        
        // Reset click count
        return {...prev, [id]: 0};
      }
      
      return {...prev, [id]: newCount};
    });
  };

  return (
    <div className="floating-elements fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((element) => (
        <div
          key={element.id}
          className={`absolute pointer-events-auto cursor-pointer ${element.type.size}`}
          style={{
            left: `${element.left}%`,
            bottom: '-50px',
            animation: `${element.type.animation} ${element.duration}s linear ${element.delay}s infinite`,
            opacity: 0.7
          }}
          onClick={() => handleElementClick(element.id)}
        >
          {element.type.svg || (
            <span className={element.type.size}>{element.type.icon}</span>
          )}
        </div>
      ))}
    </div>
  );
}