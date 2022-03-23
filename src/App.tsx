import React from "react";
import { MapContainer, TileLayer, Marker, Popup,  Polygon } from "react-leaflet";
import "./App.css";
import teslaData from "./data/tesla-sites.json";
import statesData from "./data/indonesia-data.json";

function App() {
  console.log(statesData);
  const filteredStantions = teslaData.filter(
    (tesla) => tesla.address.country === "Italy"
  );

  return (
    <div className="App">
      <MapContainer
        center={[42.006703, 13.258737]}
        zoom={6}
        scrollWheelZoom={true}
        style={{width:'50vw', height: '50vh'}}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {filteredStantions.map((tesla) => (
          <Marker
            key={tesla.id}
            position={[tesla.gps.latitude, tesla.gps.longitude]}
          >
            <Popup position={[tesla.gps.latitude, tesla.gps.longitude]}>
              <div>
                <h2>{"Name: " + tesla.name}</h2>
                <p>{"Status: " + tesla.status}</p>
                <p>{"Number of Charging Stations: " + tesla.stallCount}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        
      </MapContainer>
    </div>
  );
}

export default App;
