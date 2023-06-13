import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import CustomPopup from "../CustomPopUp";

export default function Map({ stations }) {
  return (
    <MapContainer
      center={[-15.988826153080108, -48.044526246024574]}
      zoom={15}
      style={{
        width: "100%",
        height: "70vh",
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 5,
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {stations &&
        stations?.length >= 1 &&
        stations.map((s: any, index: number) => {
          return (
            <Marker
              position={[s.address.latitude, s.address.longitude]}
              key={index}
            >
              <CustomPopup currentStation={s} />
            </Marker>
          );
        })}
    </MapContainer>
  );
}
