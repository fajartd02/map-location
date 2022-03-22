import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./App.css";
import teslaData from "./data/tesla-sites.json";

function App() {

  const filteredStantions = teslaData.filter(tesla => tesla.address.country === "Italy");

  return (
    <div className="App">
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {filteredStantions.map((tesla) => (
          <Marker 
          key= {tesla.id}
          position={[tesla.gps.latitude, tesla.gps.longitude]}></Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
