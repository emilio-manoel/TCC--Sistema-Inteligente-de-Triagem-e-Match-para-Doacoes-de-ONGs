import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Correção para o bug dos ícones do Leaflet com builders modernos (Vite/Webpack)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import type { MapData, OngUpcoming } from "../types/apiResposte";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

export default function MapLeaflet({ ongs, userCoordinates }: MapData) {
  return (
    <div className="w-full max-w-full sm:max-w-md h-64 sm:h-80 rounded-xl overflow-hidden shadow-md border border-border mt-3">
      <MapContainer
        key={userCoordinates.join(",")}
        center={userCoordinates}
        zoom={13}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {ongs.map((ong: OngUpcoming) => (
          <Marker
            key={ong._id ?? ong.razao_social}
            position={[ong.latitude, ong.longitude]}
          >
            <Popup>
              <div className="font-sans flex flex-col gap-1 min-w-45">
                <span className="font-semibold text-sm">
                  {ong.razao_social}
                </span>
                {ong.endereco_completo && (
                  <span className="text-xs text-gray-600">
                    {ong.endereco_completo}
                  </span>
                )}
                <a
                  href={`https://www.google.com/maps?q=${ong.latitude},${ong.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 underline mt-1"
                >
                  Ver no Google Maps
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
