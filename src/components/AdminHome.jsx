"use client";
import React, { useEffect, useState } from "react";
import { adminAxiosInstance } from "@/utils/axiosUtils";
import dynamic from "next/dynamic";

const Map = dynamic(
  () => {
    return import("@/components/maps/AdminMap");
  },
  { ssr: false }
);

export default function AdminHome() {
  const [poindata, setPoiData] = useState([]);
  const [viewdetail, setViewDetail] = useState(null);

  const fetchAllPois = () => {
    adminAxiosInstance.get("list-pois/").then((res) => {
      setPoiData(res.data);
      console.log(res.data);
    });
  };

  useEffect(() => {
    fetchAllPois();
  }, []);

  return (
    <div className="mx-auto max-h-screen flex max-w-6xl flex-col p-10">
      <div>
        <h1 className="text-2xl w-full font-bold text-left my-4">Hi, Admin</h1>
      </div>
      <div>
        <Map markers={poindata} setViewDetail={setViewDetail} />
        <div className="flex justify-center">
          {viewdetail && (
            <div className="w-full dark:bg-gray-900 flex flex-col items-center md:w-1/2 mx-2 border shadow-xl rounded-lg my-2 p-3">
              <span>
                <span className="font-semibold">User:</span>{" "}
                <span>{viewdetail.username}</span>
              </span>
              <span>
                <span className="font-semibold">Place:</span>{" "}
                <span>{viewdetail.name}</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
