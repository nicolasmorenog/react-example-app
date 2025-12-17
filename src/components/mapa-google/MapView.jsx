//import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const center = {
  lat: 40.416775,
  lng: -3.70379,
};

const MapView = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div className="map">Cargando mapa...</div>;

  return (
    <GoogleMap
      mapContainerClassName="map"
      center={center}
      zoom={10}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
      }}
    >
      <Marker position={center} />
    </GoogleMap>
  );
};

export default MapView;
