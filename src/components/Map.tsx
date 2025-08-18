import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Edit3 } from 'lucide-react';

declare global {
  interface Window {
    google: typeof google;
  }
}

interface MapProps {
  address?: string;
}

const Map: React.FC<MapProps> = ({ 
  address = "Wiesbaden, Deutschland" 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(address);
  const [editAddress, setEditAddress] = useState(address);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const initializeMap = async (searchAddress: string) => {
    if (!mapRef.current) return;

    // Create map
    const googleMap = new google.maps.Map(mapRef.current, {
      zoom: 13,
      center: { lat: 50.0826, lng: 8.2417 }, // Default Wiesbaden coordinates
      styles: [
        {
          featureType: "all",
          elementType: "geometry",
          stylers: [{ color: "#f5f5f5" }]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#c9e2f5" }]
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#ffffff" }]
        }
      ]
    });

    setMap(googleMap);

    // Geocode and add marker
    const geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({ address: searchAddress }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const location = results[0].geometry.location;
        
        googleMap.setCenter(location);
        
        // Add custom marker
        new google.maps.Marker({
          position: location,
          map: googleMap,
          title: searchAddress,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#3b82f6',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 3,
            scale: 8
          }
        });
      }
    });
  };

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google) {
        initializeMap(currentAddress);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => initializeMap(currentAddress);
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, [currentAddress]);

  const handleUpdateAddress = () => {
    setCurrentAddress(editAddress);
    setIsEditing(false);
    if (map) {
      initializeMap(editAddress);
    }
  };

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
              onClick={handleUpdateAddress}
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

      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Loading Placeholder */}
      {!map && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-subtle">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-accent-nova mx-auto mb-4 animate-pulse" />
            <p className="text-muted-foreground">Karte wird geladen...</p>
            <p className="text-sm text-muted-foreground mt-2">
              Bitte fügen Sie Ihren Google Maps API-Key hinzu
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;