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

  return null;
};

const MapView = ({ isDarkMode, locations, selectedLocation, onSelect }) => {
  const defaultCenter = {
    // coordenadas de Madrid
    lat: 40.416775,
    lng: -3.70379,
  };

  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    setShowInfo(false);

    if (selectedLocation) {
      setTimeout(() => {
        setShowInfo(true);
      }, 600);
    }
  }, [selectedLocation]);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="map-frame">
        <Map
          mapId={import.meta.env.VITE_MAP_ID}
          defaultZoom={14}
          defaultCenter={defaultCenter}
          colorScheme={isDarkMode ? 'DARK' : 'LIGHT'}
        >
          <MapHandler selectedLocation={selectedLocation} />
          {locations.map((loc) => (
            <AdvancedMarker key={loc.id} position={{ lat: loc.lat, lng: loc.lng }} onClick={() => onSelect(loc)}>
              <Pin
                background={loc.status === 'active' ? '#F44336' : '#f443367c'}
                borderColor={'white'}
                glyphColor={'white'}
              />
            </AdvancedMarker>
          ))}
          ;
          {selectedLocation && showInfo && (
            <InfoWindow
              position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
              onCloseClick={() => onSelect(null)}
            >
              <div className="infowindow-content">
                <h3>{selectedLocation.name}</h3>
                <p>{selectedLocation.address}</p>
                {selectedLocation.status === 'inactive' && (
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
