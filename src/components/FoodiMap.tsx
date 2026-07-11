import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

type Restaurant = {
  restaurant: string;
  category: string;
  lat: string;
  lng: string;
};

type Props = {
  restaurants: Restaurant[];
};

export default function FoodiMap({ restaurants }: Props) {
  return (
    <div style={{ height: "400px", marginBottom: "16px" }}>
      <MapContainer
        center={[39.0997, -94.5786]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {restaurants.map((r, i) => {
          const lat = Number(r.lat);
          const lng = Number(r.lng);

          if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
            return null;
          }

          return (
            <Marker key={i} position={[lat, lng]}>
              <Popup>
                <strong>{r.restaurant}</strong>
                <br />
                {r.category}
                <br />
                <br />

                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🚗 Get Directions
                </a>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
