import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup,  Polygon } from "react-leaflet";
import "./App.css";
import teslaData from "./data/tesla-sites.json";
import statesData from "./data/indonesia-data.json";

function App() {
  const [id, setId] = useState(0);
  const filteredStantions = teslaData.filter(
    (tesla) => tesla.address.country === "Italy"
  );

  return (
    <div className="App">
      <MapContainer
        center={[-0.789275, 113.921326]}
        zoom={4}
        scrollWheelZoom={true}
        style={{width:'50vw', height: '50vh', margin: "10% auto"}}
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

         {statesData.features.map((state) => {
           const coordinates = state.geometry.coordinates[0].map((item) => [item[1], item[0]]);
           
           return (
             <Polygon 
              pathOptions={{
                fillColor: "#FD8D3C",
                fillOpacity: 0.7,
                weight: 2,
                opacity: 1,
                dashArray: 3,
                color: "white"
              }}
              positions={coordinates}
              eventHandlers={{
                mouseover: (e) => {
                    const layer = e.target;
                    layer.setStyle({
                      fillOpacity: 0.7,
                      weight: 5,
                      dashArray: "",
                      color: '#666',
                      fillColor: "#D45962"
                    })
                },
                mouseout: (e) => {
                    const layer = e.target;
                    layer.setStyle({
                      fillOpacity: 5,
                      weight: 2,
                      dashArray: "3",
                      color: 'white',
                      fillColor: "#FD8D3C"
                    })
                },
                click: (e) => {

                }
              }}
             />
           )
         })}


      </MapContainer>
    </div>
  );
}

export default App;
