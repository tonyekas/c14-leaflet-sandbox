// LiveLocationMap.jsx
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// Fix for default Leaflet marker icons not showing
// import L from "leaflet";


function LiveLocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by the browser");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const newLatLng = { lat: latitude, lng: longitude };
        setPosition(newLatLng);
        map.flyTo(newLatLng, map.getZoom());
      },
      (err) => {
        console.error("Error watching position:", err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 5000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [map]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

function LiveLocationMap() {
  return (
    <MapContainer
      center={{ lat: 51.134925443637336, lng: -114.02868881313583 } } /* Default location in Calgary Library = 51.134925443637336, -114.02868881313583 */
      // 51.045136986742186, -114.05474883215655
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LiveLocationMarker />
    </MapContainer>
  );
}

export default LiveLocationMap;
