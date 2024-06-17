import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import MeteorCardSmall from "./MeteorCardSmall"

function Map({ results, setPosition, position, selectedMeteorId }) {
  const [resultsWithCoords, setResultsWithCoords] = useState([]);

  useEffect(() => {
    const filteredResults = results.filter(
      (meteor) => meteor.reclong && meteor.reclat
    );
    setResultsWithCoords(filteredResults);
    if (filteredResults.length > 0) {
      setPosition([filteredResults[0].reclat, filteredResults[0].reclong]);
    }
  }, [results, setPosition]);

  // Default icon (Leaflet's default)
  const defaultIcon = new Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const customIcon = new Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    iconSize: [30, 46],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });


  // Component to set map view on click
  function SetViewOnClick({ position }) {
    const map = useMap();
    map.setView(position, map.getZoom());
    return null;
  }

  return (
    <div className="map">
      <MapContainer center={position} zoom={5} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {resultsWithCoords.map((meteor) => (
          <Marker
            key={meteor.id}
            position={[meteor.reclat, meteor.reclong]}
            icon={meteor.id === selectedMeteorId ? customIcon : defaultIcon}
          >
            <Popup>
              <MeteorCardSmall meteor={meteor}></MeteorCardSmall>
            </Popup>
          </Marker>
        ))}
        <SetViewOnClick position={position} />
      </MapContainer>
    </div>
  );
}

export default Map;
