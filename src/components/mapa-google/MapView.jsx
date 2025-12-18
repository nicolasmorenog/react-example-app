import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const center = {
  // coordenadas de Madrid
  lat: 40.416775,
  lng: -3.70379,
};

const MY_MAP_ID = 'e3e91f42e60dbb148da20095';

const MapView = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    mapIds: [MY_MAP_ID],
  });

  if (!isLoaded) return <div className="map">Cargando mapa...</div>;

  return (
    <GoogleMap
      mapContainerClassName="map"
      center={center}
      zoom={10}
      mapId={MY_MAP_ID}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
      }}
    ></GoogleMap>
  );
};

export default MapView;
