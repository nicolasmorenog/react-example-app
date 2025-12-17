import Sidebar from '@/components/mapa-google/Sidebar';
import MapView from '@/components/mapa-google/MapView';

import '@/styles/mapa-google/layout.css';

const MapaGoogle = () => {
  return (
    <div className="map-container">
      <MapView />
      <Sidebar />
    </div>
  );
};

export default MapaGoogle;
