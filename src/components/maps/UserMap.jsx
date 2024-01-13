"use client";
import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { toast } from "react-toastify";
import Alert from "../Alert";
import { userBaseAxiosInstance } from "@/utils/axiosUtils";

const Map = ({
  markerPosition,
  setMarkerPosition,
  markers,
  handleSubmit,
  fetchUserPois,
  nameRef,
}) => {
  const mapRef = useRef(null);
  const draggableMarkerIcon = new L.Icon({
    iconUrl: "/location.png",
    iconSize: [23, 35],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState("POI");

  const validateAndSubmit = () => {
    if (!nameRef.current.value.trim()) {
      toast.error("please provide place before submit");
      return;
    }
    handleSubmit();
  };

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

  const handleModalToggle = () => {
    setIsOpen(!isOpen);
  };

  const deletePOI = () => {
    userBaseAxiosInstance
      .delete(`/poi-detail/${item.id}`)
      .then((res) => {
        console.log(res);
        toast.success("POI Deleted Successfully");
        handleModalToggle()
        fetchUserPois();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };


  return (
    <>
      <Alert
        isModalOpen={isOpen}
        action={deletePOI}
        handleModalToggle={handleModalToggle}
        message={`Are you sure you want to delete ${item.name} ?`}
      />

      <MapContainer
        className="rounded-xl mx-auto w-full"
        style={{ height: "500px" }}
        center={[0, 0]}
        zoom={2}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {markers.map(({ id, name, latitude, longitude, username }) => (
          <Marker key={name} position={[latitude, longitude]}>
            <Popup>
              {name}
              <br />
              <span
                onClick={() => {
                  setItem({ name, id });
                  handleModalToggle();
                }}
                className="text-xs text-red-600 cursor-pointer"
              >
                delete
              </span>
            </Popup>
          </Marker>
        ))}
        <Marker
          icon={draggableMarkerIcon}
          position={markerPosition}
          eventHandlers={{
            dragend: handleMarkerDragEnd,
          }}
          draggable={true}
          zIndexOffset={1}
        >
          <Popup>Drag and place</Popup>
        </Marker>
      </MapContainer>
      <div className="flex flex-col">
        <p className="text-center p-2 text-xs md:text-sm bg-slate-500 dark:bg-slate-700 m-2 rounded-md text-white flex justify-between md:justify-around">
          <>
            <span className="truncate">
              <span>Lat:</span> {markerPosition[0]}
            </span>
            <span className="truncate">
              <span>Lon:</span>
              {markerPosition[1]}
            </span>
          </>
        </p>
        <div className="flex justify-center items-center ">
          <input
            name="place"
            placeholder="Enter Place name"
            className="md:w-1/2 m-2 dark:bg-black rounded-md text-sm md:text-base p-2 border border-main-green"
            ref={nameRef}
          />
          <button
            onClick={validateAndSubmit}
            type="submit"
            className="w-1/2 md:w-1/5 py-2 md:py-2 md:mx-2 bg-main-orange text-sm md:text-base  hover:bg-main-orange-dark transition-all duration-300 text-white rounded-lg"
            style={{ fontWeight: "bold" }}
          >
            Add POI
          </button>
        </div>
      </div>
    </>
  );
};

export default Map;
