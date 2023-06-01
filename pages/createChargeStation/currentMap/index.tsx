import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

const initialLat = -15.9831845;
const initialLong = -48.0413209;
const initialZoom = 12;

type currentMapProps = {
  handleLatAndLng: Function;
};

export default function CurrentMap({ handleLatAndLng }: currentMapProps) {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const MyComponent = () => {
    useMapEvents({
      click: (currentEvent) => {
        const { lat, lng } = currentEvent.latlng;
        setPosition({
          latitude: lat,
          longitude: lng,
        });
        handleLatAndLng(lat, lng);
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={[initialLat, initialLong]}
      zoom={initialZoom}
      style={{
        width: "100%",
        height: 280,
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 5,
      }}
    >
      <MyComponent />
      <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {position.latitude !== 0 && (
        <Marker position={[position.latitude, position.longitude]}></Marker>
      )}
    </MapContainer>
  );
}
