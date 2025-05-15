import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [interactionType, setInteractionType] = useState('default');
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement>(null);
  const [currentColor, setCurrentColor] = useState('hsl(var(--primary))');
  
  // FEC-themed cursor types with color schemes
  const cursorTypes = {
    default: { icon: '', color: 'hsl(var(--primary))' },
    link: { icon: '✨', color: 'hsl(var(--accent))' },
    button: { icon: '🎮', color: 'hsl(var(--primary))' },
    service: { icon: '🎯', color: 'hsl(var(--secondary))' },
    portfolio: { icon: '🎪', color: 'hsl(var(--accent))' },
    contact: { icon: '📞', color: 'hsl(20 90% 50%)' }
  };

  // Create trailing particles for cursor
  useEffect(() => {
    if (!trailsRef.current) return;
    
    const createParticle = (x: number, y: number) => {
      const trailsElement = trailsRef.current;
      if (!trailsElement || Math.random() > 0.3) return; // Only create particles occasionally
      
      const particle = document.createElement('div');
      particle.classList.add('cursor-trail-particle');
      
      // Randomize particle appearance
      const size = 4 + Math.random() * 8;
      const hue = Math.random() > 0.5 ? 'var(--primary)' : Math.random() > 0.5 ? 'var(--secondary)' : 'var(--accent)';
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.backgroundColor = `hsl(${hue})`;
      particle.style.opacity = '0.8';
      
      trailsElement.appendChild(particle);
      
      setTimeout(() => {
        if (particle && particle.parentNode === trailsElement) {
          particle.style.transform = `translate(${(Math.random() - 0.5) * 40}px, ${-40 - Math.random() * 20}px)`;
          particle.style.opacity = '0';
        }
      }, 10);
      
      setTimeout(() => {
        if (particle && particle.parentNode === trailsElement) {
          trailsElement.removeChild(particle);
        }
      }, 700);
    };
    
    const interval = setInterval(() => {
      if (clicked && !hidden) {
        createParticle(position.x, position.y);
      }
    }, 60);
    
    return () => clearInterval(interval);
  }, [position, clicked, hidden]);

  useEffect(() => {
    // Dynamic color transition with the cursor
    let colorChangeInterval: ReturnType<typeof setInterval>;
    if (interactionType !== 'default') {
      // Use themed color
      setCurrentColor(cursorTypes[interactionType as keyof typeof cursorTypes].color);
    } else {
      // No interaction - cycle through vibrant FEC colors when moving
      const colors = [
        'hsl(var(--primary))',
        'hsl(var(--secondary))',
        'hsl(var(--accent))',
        'hsl(320 70% 50%)', // Neon pink
        'hsl(280 70% 60%)', // Electric purple
        'hsl(190 90% 50%)'  // Bright cyan
      ];
      let colorIndex = 0;
      
      colorChangeInterval = setInterval(() => {
        if (!hidden) {
          colorIndex = (colorIndex + 1) % colors.length;
          setCurrentColor(colors[colorIndex]);
        }
      }, 2000);
    }
    
    return () => {
      if (colorChangeInterval) clearInterval(colorChangeInterval);
    };
  }, [interactionType, hidden]);

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseDown = () => {
      setClicked(true);
      
      // Create ripple effect on click
      if (outlineRef.current) {
        outlineRef.current.classList.add('cursor-ripple');
        setTimeout(() => {
          if (outlineRef.current) {
            outlineRef.current.classList.remove('cursor-ripple');
          }
        }, 500);
      }
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    const handleElementHoverEvents = () => {
      // Different cursor types for different interactive elements
      const elementMappings = [
        { selector: 'a:not(.btn-primary):not(.btn-secondary)', type: 'link' },
        { selector: '.btn-primary, .btn-secondary, button, [role="button"]', type: 'button' },
        { selector: '#services .service-card', type: 'service' },
        { selector: '#portfolio .rounded-xl', type: 'portfolio' },
        { selector: '#contact form, #contact button', type: 'contact' }
      ];
      
      elementMappings.forEach(mapping => {
        document.querySelectorAll(mapping.selector).forEach(el => {
          el.addEventListener('mouseenter', () => setInteractionType(mapping.type));
          el.addEventListener('mouseleave', () => setInteractionType('default'));
        });
      });
    };

    addEventListeners();
    handleElementHoverEvents();

    // Cleanup
    return () => {
      removeEventListeners();
    };
  }, []);

  // Get current cursor icon and prepare classes
  const cursorIcon = interactionType !== 'default' ? cursorTypes[interactionType as keyof typeof cursorTypes].icon : '';
  const cursorSizeClass = interactionType !== 'default' ? 'scale-150' : '';
  const cursorBaseClasses = `${hidden ? 'opacity-0' : 'opacity-100'} ${clicked ? 'scale-75' : ''} ${cursorSizeClass}`;

  return (
    <div className="custom-cursor-container">
      {/* Trailing particles container */}
      <div ref={trailsRef} className="cursor-trails" />
      
      {/* Main cursor elements */}
      <div 
        ref={dotRef}
        className={`cursor-dot ${cursorBaseClasses}`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          backgroundColor: currentColor
        }}
      />
      
      <div 
        ref={outlineRef}
        className={`cursor-outline ${cursorBaseClasses}`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          borderColor: currentColor,
          transitionDuration: interactionType !== 'default' ? '0.2s' : '0.1s'
        }}
      >
        {/* Display the cursor icon if available */}
        {cursorIcon && (
          <span className="cursor-icon">{cursorIcon}</span>
        )}
      </div>
    </div>
  );
}