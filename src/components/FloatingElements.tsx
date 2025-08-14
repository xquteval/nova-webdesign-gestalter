import { useEffect, useState } from 'react';

const FloatingElements = () => {
  const [elements, setElements] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    color: string;
  }>>([]);

  useEffect(() => {
    const generateElements = () => {
      const newElements = [];
      for (let i = 0; i < 15; i++) {
        newElements.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 30 + 10,
          duration: Math.random() * 20 + 10,
          delay: Math.random() * 5,
          color: ['bg-primary/10', 'bg-accent-nova/10', 'bg-white/5'][Math.floor(Math.random() * 3)]
        });
      }
      setElements(newElements);
    };

    generateElements();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden max-w-full max-h-full">
      {elements.map((element) => (
        <div
          key={element.id}
          className={`absolute rounded-full ${element.color} blur-sm animate-pulse`}
          style={{
            left: `${Math.min(element.x, 90)}%`,
            top: `${Math.min(element.y, 90)}%`,
            width: `${Math.min(element.size, 20)}px`,
            height: `${Math.min(element.size, 20)}px`,
            animation: `float-${element.id} ${element.duration}s ease-in-out infinite`,
            animationDelay: `${element.delay}s`
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;