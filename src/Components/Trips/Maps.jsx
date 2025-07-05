import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Custom Icons
const startIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
});

const currentIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  className: "current-icon",
});

const destinationIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
});

export default function TrackingMap({ id }) {
  async function getCurrentLocation() {
    try {
      const res = await axios.get(
        `https://veemanage.runasp.net/api/TripLocation/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res?.data);
      return res?.data;
    } catch (err) {
      console.log(err);
    }
  }

  const { data: locationData, isLoading } = useQuery({
    queryFn: getCurrentLocation,
    queryKey: ["LocationData", id],
  });

  if (
    isLoading ||
    !locationData ||
    ![
      locationData.startLat = 30.0444,            // القاهرة
      locationData.startLng = 31.2357,
      locationData.lat = 31.0364,                 // المنصورة (كنقطة حالية)
      locationData.lng = 31.3807,
      locationData.destinationLat = 31.4175,      // دمياط
      locationData.destinationLng = 31.8133,
    ].every((val) => typeof val === "number" && !isNaN(val))
  ) {
    return <p>Loading map or invalid coordinates...</p>;
  }
  

  const { startLat, startLng, lat, lng, destinationLat, destinationLng } =
    locationData;

  const pathCoordinates = [
    [startLat, startLng],
    [lat, lng],
    [destinationLat, destinationLng],
  ];

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Start Marker */}
      <Marker position={[startLat, startLng]} icon={startIcon}>
        <Popup>Start Location</Popup>
      </Marker>

      {/* Current Location Marker */}
      <Marker position={[lat, lng]} icon={currentIcon}>
        <Popup>Current Location</Popup>
      </Marker>

      {/* Destination Marker */}
      <Marker
        position={[destinationLat, destinationLng]}
        icon={destinationIcon}
      >
        <Popup>Destination</Popup>
      </Marker>

      {/* Route Line */}
      <Polyline positions={pathCoordinates} color="blue" />
    </MapContainer>
  );
}
