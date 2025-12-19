import { useState } from 'react';
import Sidebar from '@/components/mapa-google/Sidebar';
import MapView from '@/components/mapa-google/MapView';

import '@/styles/mapa-google/layout.css';

const MapaGoogle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <div className="map-container">
      <MapView isDarkMode={isDarkMode} />
      <Sidebar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
    </div>
  );
};

export default MapaGoogle;
