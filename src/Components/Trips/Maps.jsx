import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import carLogo from "../../assets/car (2).png";
import startlogo from "../../assets/pin.png";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Custom Icons
const startIcon = new L.Icon({
  iconUrl: startlogo,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  className: "start-icon",
});

const currentIcon = new L.Icon({
  iconUrl: carLogo,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  className: "current-icon",
});

const destinationIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  className: "destination-icon",
});

// Haversine distance function
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

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
      console.log("maps det", res?.data?.data);
      return res?.data?.data;
    } catch (err) {
      console.log(err);
      return null; // Return null on error to trigger fallback
    }
  }

  const { data: locationData, isLoading } = useQuery({
    queryFn: getCurrentLocation,
    queryKey: ["LocationData", id],
  });

  // Validate location data
  const isValidLocationData =
    locationData &&
    [
      locationData.startLat,
      locationData.startLng,
      locationData.lat,
      locationData.lng,
      locationData.destinationLat,
      locationData.destinationLng,
    ].every((val) => typeof val === "number" && !isNaN(val));

  // Fallback coordinates (e.g., center of Cairo, Egypt)
const defaultCoordinates = {
  startLat: 30.0444, // Cairo, Egypt
  startLng: 31.2357,
  lat: 30.5825, // Ismailia, Egypt
  lng: 31.2653,
  destinationLat: 31.2565, // Port Said, Egypt
  destinationLng: 32.2902,
};

  // Use locationData if valid, otherwise use default coordinates
  const { startLat, startLng, lat, lng, destinationLat, destinationLng } = isValidLocationData
    ? locationData
    : defaultCoordinates;

  // Render loading state until valid data is available
  if (isLoading) {
    return (
      <div className="p-4">
        <p>Loading map...</p>
      </div>
    );
  }

  const pathCoordinates = [
    [startLat, startLng],
    [lat, lng],
    [destinationLat, destinationLng],
  ];

  // Calculate distance
  const originalDistance = haversineDistance(startLat, startLng, destinationLat, destinationLng).toFixed(2);
  const distance = 60; // Example static distance
  const tripPercentage = (100 - (distance / originalDistance) * 100).toFixed(2);

  return (
    <>
      <div className="bg-white rounded-xl w-[100%] mt-14 mb-9 shadow-lg h-9">
        <div
          className="bg-blue-500 h-full rounded-xl relative"
          style={{ width: `${tripPercentage}%` }}
        >
          <span className="text-blue-950 p-3 whitespace-nowrap w-[100%]">
            Trip Progress
          </span>
          <span className="absolute -top-8 px-1 right-0 rounded-lg bg-white border border-blue-500 whitespace-nowrap">
            {tripPercentage} %
          </span>
        </div>
      </div>
      <div className="p-4 rounded-lg shadow-lg border border-stone-300 gap-4">
        <div className="font-bold text-lg mb-3">Current Location</div>
        <MapContainer
          center={[lat, lng]}
          zoom={8.2}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            attribution="© OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Start Marker */}
          <Marker position={[startLat, startLng]} icon={startIcon}>
            <Popup>Start Location (Cairo)</Popup>
          </Marker>

          {/* Current Location Marker */}
          <Marker position={[lat, lng]} icon={currentIcon}>
            <Popup>Current Location (Mansoura)</Popup>
          </Marker>

          {/* Destination Marker */}
          <Marker position={[destinationLat, destinationLng]} icon={destinationIcon}>
            <Popup>Destination (Damietta)</Popup>
          </Marker>

          {/* Route Line */}
          <Polyline positions={pathCoordinates} color="blue" weight={7} />
        </MapContainer>
      </div>
    </>
  );
}