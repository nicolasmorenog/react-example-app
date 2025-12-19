'use client';

import { APIProvider, Map } from '@vis.gl/react-google-maps';

const center = {
  // coordenadas de Madrid
  lat: 40.416775,
  lng: -3.70379,
};

const MapView = ({ isDarkMode }) => {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="map-frame">
        <Map
          mapId={import.meta.env.VITE_MAP_ID}
          defaultZoom={10}
          defaultCenter={center}
          colorScheme={isDarkMode ? 'DARK' : 'LIGHT'}
        ></Map>
      </div>
    </APIProvider>
  );
};

export default MapView;
