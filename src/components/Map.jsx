"use client";
import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = ({ markerPosition,setMarkerPosition,markers, isDragable,handleSubmit,nameRef }) => {
  const mapRef = useRef(null);
  const draggableMarkerIcon = new L.Icon({
    iconUrl: "/location.png",
    iconSize: [23, 35],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  useEffect(() => {
    const map = mapRef.current;

    if (map) {
      map.on("click", handleMapClick);
    }

    return () => {
      if (map) {
        map.off("click", handleMapClick);
      }
    };
  }, []);

  const handleMapClick = (event) => {
    const { lat, lng } = event.latlng;
    setMarkerPosition([lat, lng]);
  };

  const handleMarkerDragEnd = (event) => {
    const { lat, lng } = event.target.getLatLng();
    setMarkerPosition([lat, lng]);
  };

  return (
    <>
      <MapContainer
        className="rounded-xl w-full"
        style={{height:'400px'}}
        center={[0, 0]}
        zoom={2}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {markers.map(({ name, latitude,longitude, username }) => (
          <Marker key={name} position={[longitude, latitude]}>
            <Popup>{name} {!isDragable&&username}</Popup>
          </Marker>
        ))}
        {isDragable && (
          <Marker
            icon={draggableMarkerIcon}
            position={markerPosition}
            eventHandlers={{
              dragend: handleMarkerDragEnd
            }}
            draggable={true}
            zIndexOffset={1}
          >
            <Popup>Drag</Popup>
          </Marker>
        )}
      </MapContainer>
      {isDragable && (
        <div className="flex flex-col">
          <p className="text-center p-2 bg-slate-500 dark:bg-slate-700 text-sm m-2 rounded-md text-white flex justify-around">
            <>
              <span>
                <span>Lat:</span> {markerPosition[0]}
              </span>
              <span>
                <span>Lon:</span>
                {markerPosition[1]}
              </span>
            </>
          </p>
          <div className="flex justify-center items-center">
            <input
              name="place"
              placeholder="Enter Place name"
              className="w-1/2 m-2 dark:bg-black rounded-md p-2 border border-main-green"
              ref={nameRef}
            />
            <button
              onClick={handleSubmit}
              type="submit"
              className="w-1/5 py-2 mx-2 bg-main-orange hover:bg-main-orange-dark transition-all duration-300 text-white rounded-lg"
              style={{ fontWeight: "bold" }}
            >
              Add POI
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Map;
