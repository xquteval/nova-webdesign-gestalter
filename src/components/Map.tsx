import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Edit3 } from 'lucide-react';

interface MapProps {
  address?: string;
}

const Map: React.FC<MapProps> = ({ address = 'Wiesbaden, Deutschland' }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(address);
  const [editAddress, setEditAddress] = useState(address);

  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    currentAddress
  )}&output=embed`;

  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-xl bg-white/80 backdrop-blur-sm border border-white/40 relative">
      {/* Edit Controls */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="bg-white/90 backdrop-blur-sm"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Standort ändern
          </Button>
        ) : (
          <div className="flex gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-lg">
            <Input
              value={editAddress}
              onChange={(e) => setEditAddress(e.target.value)}
              placeholder="Neue Adresse eingeben..."
              className="w-48"
            />
            <Button
              size="sm"
              onClick={() => {
                setCurrentAddress(editAddress);
                setIsEditing(false);
              }}
              className="bg-gradient-nova"
            >
              <MapPin className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsEditing(false);
                setEditAddress(currentAddress);
              }}
            >
              Abbrechen
            </Button>
          </div>
        )}
      </div>

      {/* Map Iframe (no API key required) */}
      <iframe
        title={`Standortkarte ${currentAddress}`}
        src={embedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full border-0"
      />

      {/* Loading Overlay for better UX (shows briefly on navigation changes) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-background/10" />
    </div>
  );
};

export default Map;
