import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const CoverageMap = () => {
  const zoneData = [
    { name: "Dhaka", lat: 23.8103, lng: 90.4125 },
    { name: "Chattogram", lat: 22.3569, lng: 91.7832 },
    { name: "Sylhet", lat: 24.8949, lng: 91.8687 },
    { name: "Rajshahi", lat: 24.3745, lng: 88.6042 },
    // Add more zones here
  ];
  const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });
  return (
    <MapContainer
      center={[23.685, 90.3563]}
      zoom={7}
      style={{ height: "80vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
      />

      {zoneData.map((zone, idx) => (
        <Marker key={idx} position={[zone.lat, zone.lng]} icon={customIcon}>
          <Popup>{zone.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default CoverageMap;
