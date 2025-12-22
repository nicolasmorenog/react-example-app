'use client';

import { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';

const MapView = ({ isDarkMode }) => {
  const center = {
    // coordenadas de Madrid
    lat: 40.416775,
    lng: -3.70379,
  };

  const airport = {
    // coordenadas del Aeropuerto Adolfo Suárez Madrid-Barajas
    lat: 40.4719,
    lng: -3.5526,
  };

  const [open, setOpen] = useState(false);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="map-frame">
        <Map
          mapId={import.meta.env.VITE_MAP_ID}
          defaultZoom={11}
          defaultCenter={center}
          colorScheme={isDarkMode ? 'DARK' : 'LIGHT'}
        >
          <AdvancedMarker position={airport} onClick={() => setOpen(true)}>
            <Pin background={'black'} borderColor={'white'} glyphColor={'white'} />
          </AdvancedMarker>

          {open && (
            <InfoWindow className="infowindow-content" position={airport} onCloseClick={() => setOpen(false)}>
              <h3>Aeropuerto Adolfo Suárez Madrid-Barajas</h3>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
};

export default MapView;
