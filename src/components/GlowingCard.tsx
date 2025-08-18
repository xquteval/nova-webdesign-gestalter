import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

interface GlowingCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'primary' | 'accent' | 'nova';
}

const GlowingCard = ({ children, className = '', glowColor = 'primary' }: GlowingCardProps) => {
  const glowClasses = {
    primary: 'shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:shadow-[0_0_50px_rgba(79,70,229,0.5)]',
    accent: 'shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:shadow-[0_0_50px_rgba(124,58,237,0.5)]',
    nova: 'shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_rgba(6,182,212,0.5)]'
  };

  return (
    <Card 
      className={`
        relative overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 
        transition-all duration-300 hover:scale-105 hover:bg-white/20 group
        ${glowClasses[glowColor]}
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent-nova/5 opacity-50"></div>
      <div className="relative z-10">
        {children}
      </div>
    </Card>
  );
};

export default GlowingCard;