'use client';

import { APIProvider, Map } from '@vis.gl/react-google-maps';

const center = {
  // coordenadas de Madrid
  lat: 40.416775,
  lng: -3.70379,
};

// const MY_MAP_ID = 'e3e91f42e60dbb148da20095';

const MapView = () => {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="map-frame">
        <Map defaultZoom={10} defaultCenter={center}></Map>
      </div>
    </APIProvider>
  );
};

export default MapView;
