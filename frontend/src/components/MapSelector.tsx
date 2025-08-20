"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix icon default Leaflet
const icon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapSelectorProps {
  onSelect: (lat: string, lng: string) => void;
  center?: [number, number]; // koordinat untuk auto center
}

function LocationMarker({ onSelect }: { onSelect: (lat: string, lng: string) => void }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng.lat.toString(), e.latlng.lng.toString());
    },
  });
  return null;
}

export default function MapSelector({ onSelect, center }: MapSelectorProps) {
  return (
    <MapContainer
      center={center || [-6.200000, 106.816666]} // Default Jakarta
      zoom={10}
      style={{ height: "300px", width: "100%" }}
      key={center ? center.join(",") : "default"} // agar re-render saat center berubah
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {center && <Marker position={center} icon={icon} />}
      <LocationMarker onSelect={onSelect} />
    </MapContainer>
  );
}
