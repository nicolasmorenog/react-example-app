'use client';

import { useState, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useMap } from '@vis.gl/react-google-maps';

const MapHandler = ({ selectedLocation }) => {
  const map = useMap();

  useEffect(() => {
    if (map && selectedLocation) {
      map.setZoom(14);
      setTimeout(() => {
        map.panTo({ lat: selectedLocation.lat, lng: selectedLocation.lng });
        map.setZoom(15.5);
      }, 400);
    }
  }, [map, selectedLocation]);
};

const MapView = ({ isDarkMode, locations, selectedLocation }) => {
  const defaultCenter = {
    // coordenadas de Madrid
    lat: 40.416775,
    lng: -3.70379,
  };

  const [selected, setSelected] = useState(null);

  // const [openInfo, setOpenInfo] = useState(null);

  // useEffect(() => {
  //   if (selectedLocation) {
  //     setOpenInfo(selectedLocation);
  //   }
  // }, [selectedLocation]);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="map-frame">
        <Map
          mapId={import.meta.env.VITE_MAP_ID}
          defaultZoom={14}
          defaultCenter={defaultCenter}
          colorScheme={isDarkMode ? 'DARK' : 'LIGHT'}
          gestureHandling={'greedy'}
        >
          <MapHandler selectedLocation={selectedLocation} />
          {locations.map((loc) => (
            <AdvancedMarker key={loc.id} position={{ lat: loc.lat, lng: loc.lng }} onClick={() => setSelected(loc)}>
              <Pin
                background={loc.status === 'active' ? '#F44336' : '#f443367c'}
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
                <p>{selected.address}</p>
                {selected.status === 'inactive' && (
                  <div className="status-badge-inactive">
                    <strong>
                      <p>⚠️ Temporalmente fuera de servicio.</p>
                    </strong>
                  </div>
                )}
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
};

export default MapView;
