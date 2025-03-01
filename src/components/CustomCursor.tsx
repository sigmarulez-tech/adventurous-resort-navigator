
import { useEffect, useState, useRef } from "react";

interface Position {
  x: number;
  y: number;
}

const CustomCursor = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  
  // Target position for smoother animation
  const targetPosition = useRef<Position>({ x: 0, y: 0 });
  
  useEffect(() => {
    // Check if it's a touch device
    const checkTouchDevice = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0
      );
    };

    checkTouchDevice();

    if (isTouchDevice) return;

    const updatePosition = (e: MouseEvent) => {
      // Store the target position
      targetPosition.current = { x: e.clientX, y: e.clientY };
      
      if (!visible) setVisible(true);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    // Add hover effect for interactive elements
    const addHoverEffect = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, input, textarea, select, [role="button"], .interactive'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });

      return () => {
        interactiveElements.forEach((el) => {
          el.removeEventListener('mouseenter', () => setIsHovering(true));
          el.removeEventListener('mouseleave', () => setIsHovering(false));
        });
      };
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    const cleanupHover = addHoverEffect();
    
    // Animation loop for smooth liquid movement
    let animationFrameId: number;
    
    const animateCursor = () => {
      if (cursorRef.current && dotRef.current) {
        // Calculate the distance between current position and target
        const dx = targetPosition.current.x - position.x;
        const dy = targetPosition.current.y - position.y;
        
        // Ease the movement (adjust the divisor for faster/slower following)
        const newX = position.x + dx * 0.1;
        const newY = position.y + dy * 0.1;
        
        // Update position state
        setPosition({ x: newX, y: newY });
      }
      
      animationFrameId = requestAnimationFrame(animateCursor);
    };
    
    animationFrameId = requestAnimationFrame(animateCursor);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cleanupHover();
      cancelAnimationFrame(animationFrameId);
    };
  }, [visible, isTouchDevice, position]);

  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? 'hover' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: visible ? 1 : 0,
        }}
      />
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          left: `${targetPosition.current.x}px`,
          top: `${targetPosition.current.y}px`,
          opacity: visible ? 1 : 0,
        }}
      />
      
      {/* Liquid blob elements */}
      <div 
        className="cursor-liquid"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.2 : 1})`,
          opacity: visible ? 0.15 : 0,
        }}
      />
      <div 
        className="cursor-liquid cursor-liquid-secondary"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-60%, -40%) scale(${isHovering ? 0.8 : 0.6})`,
          opacity: visible ? 0.1 : 0,
        }}
      />
    </>
  );
};

export default CustomCursor;
