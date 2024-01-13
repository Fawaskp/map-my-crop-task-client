"use client";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = ({ markers, setViewDetail }) => {
  return (
    <>
      <MapContainer
        className="rounded-xl mx-auto w-full"
        style={{ height: "500px" }}
        center={[0, 0]}
        zoom={2}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {markers.map(({ name, latitude, longitude, username }) => (
          <Marker
            eventHandlers={{ click: () => setViewDetail({ name, username }) }}
            key={name + username}
            position={[latitude, longitude]}
          >
            <Popup>{name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default Map;
