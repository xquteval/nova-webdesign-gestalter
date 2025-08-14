import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  prevZ: number;
}

const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      }
    };

    const initStars = () => {
      starsRef.current = [];
      for (let i = 0; i < 800; i++) {
        starsRef.current.push({
          x: (Math.random() - 0.5) * 1000,
          y: (Math.random() - 0.5) * 1000,
          z: Math.random() * 1000,
          prevZ: Math.random() * 1000
        });
      }
    };

    const animateStars = () => {
      if (!ctx || !canvas) return;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      starsRef.current.forEach(star => {
        star.prevZ = star.z;
        star.z -= 2;

        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * 1000;
          star.y = (Math.random() - 0.5) * 1000;
          star.z = 1000;
          star.prevZ = 1000;
        }

        const x = (star.x / star.z) * 200 + centerX;
        const y = (star.y / star.z) * 200 + centerY;
        
        const prevX = (star.x / star.prevZ) * 200 + centerX;
        const prevY = (star.y / star.prevZ) * 200 + centerY;

        const opacity = (1000 - star.z) / 1000;
        const size = (1000 - star.z) / 1000 * 2;

        ctx.strokeStyle = `rgba(100, 200, 255, ${opacity * 0.8})`;
        ctx.lineWidth = size;
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.stroke();

        ctx.fillStyle = `rgba(150, 220, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animateStars);
    };

    resizeCanvas();
    initStars();
    animateStars();

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ 
        background: 'linear-gradient(135deg, #0f1419 0%, #1a2332 100%)',
        width: '100%',
        height: '100%'
      }}
    />
  );
};

export default StarField;