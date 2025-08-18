import React from 'react';

interface MapProps {
  address?: string;
}

const Map: React.FC<MapProps> = ({ 
  address = 'Hans-Böckler Str. 100, 65199 Wiesbaden' 
}) => {
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-xl bg-white/80 backdrop-blur-sm border border-white/40 relative">
      {/* Map Iframe */}
      <iframe
        title={`Standortkarte ${address}`}
        src={embedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full border-0"
      />

      {/* Subtle overlay for better visual integration */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-background/5" />
    </div>
  );
};

export default Map;