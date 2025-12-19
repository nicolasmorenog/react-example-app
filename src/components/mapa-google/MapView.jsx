'use client';

import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

const center = {
  // coordenadas de Madrid
  lat: 40.416775,
  lng: -3.70379,
};

const airport = {
  // coordenadas del Aeropuerto de Adolfo Suárez Madrid-Barajas
  lat: 40.4719,
  lng: -3.5526,
};

const MapView = ({ isDarkMode }) => {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="map-frame">
        <Map
          mapId={import.meta.env.VITE_MAP_ID}
          defaultZoom={11}
          defaultCenter={center}
          colorScheme={isDarkMode ? 'DARK' : 'LIGHT'}
        >
          <AdvancedMarker position={airport}>
            <Pin background={'black'} borderColor={'white'} glyphColor={'white'} />
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
};

export default MapView;
