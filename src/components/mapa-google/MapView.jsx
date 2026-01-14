'use client';

import { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';

const MapView = ({ isDarkMode, locations }) => {
  const center = {
    // coordenadas de Madrid
    lat: 40.416775,
    lng: -3.70379,
  };

  const [selected, setSelected] = useState(null);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="map-frame">
        <Map
          mapId={import.meta.env.VITE_MAP_ID}
          defaultZoom={11}
          defaultCenter={center}
          colorScheme={isDarkMode ? 'DARK' : 'LIGHT'}
        >
          {locations.map((loc) => (
            <AdvancedMarker key={loc.id} position={{ lat: loc.lat, lng: loc.lng }} onClick={() => setSelected(loc)}>
              <Pin
                background={loc.status === 'active' ? '#4CAF50' : '#F44336'}
                borderColor={'white'}
                glyphColor={'white'}
              />
            </AdvancedMarker>
          ))}
          ;
          {selected && (
            <InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => setSelected(null)}>
              <div className="infowindow-content">
                <h3>{selected.name}</h3>
                <p>
                  Estado: <strong>{selected.status}</strong>
                </p>
                <p>{selected.address}</p>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
};

export default MapView;
