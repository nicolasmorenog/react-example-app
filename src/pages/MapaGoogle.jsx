import { useState } from 'react';
import Sidebar from '@/components/mapa-google/Sidebar';
import MapView from '@/components/mapa-google/MapView';

import { locations } from '@/components/mapa-google/locations';

import '@/styles/mapa-google/layout.css';

const MapaGoogle = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <div className="map-container">
      <MapView
        isDarkMode={isDarkMode}
        selectedLocation={selectedLocation}
        locations={locations}
        onSelect={(loc) => setSelectedLocation(loc)}
      />
      <Sidebar
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
        onSearch={(loc) => setSelectedLocation(loc)}
        locations={locations}
        selectedLocation={selectedLocation}
      />
    </div>
  );
};

export default MapaGoogle;
