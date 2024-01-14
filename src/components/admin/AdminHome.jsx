"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  adminAxiosInstance,
  adminBaseAxiosInstance,
  userAxiosInstance,
} from "@/utils/axiosUtils";
import dynamic from "next/dynamic";
import debounce from "@/utils/debounce";

const Map = dynamic(
  () => {
    return import("@/components/maps/AdminMap");
  },
  { ssr: false }
);

export default function AdminHome() {
  const [poindata, setPoiData] = useState([]);
  const [searchresults, setSearchResults] = useState(null);
  const [searchuser, setSearchedUser] = useState("");
  const searchRef = useRef();
  const [viewdetail, setViewDetail] = useState(null);

  const fetchAllPois = () => {
    adminAxiosInstance.get("/list-pois/").then((res) => {
      setPoiData(res.data);
    });
  };

  const filterPoisByUser = (id) => {
    adminBaseAxiosInstance.get(`/user/pois/${id}/`).then((res) => {
      setPoiData(res.data);
      setSearchResults(null);
    });
  };

  function performSearch(inputValue) {
    if (inputValue.trim() != "") {
      adminAxiosInstance.get(`search/?name=${inputValue}`).then((response) => {
        setSearchResults(response.data);
        console.log("Result ::>> ", response.data);
      });
    } else {
      setSearchResults(null);
      setSearchedUser(null);
      fetchAllPois();
    }
  }

  const handleSearch = debounce((inputValue) => performSearch(inputValue));

  useEffect(() => {
    fetchAllPois();
  }, []);

  return (
    <div className="mx-auto max-h-screen flex max-w-6xl flex-col p-10">
      <div>
        <h1 className="text-2xl w-full font-bold text-left my-4">Hi, Admin</h1>
      </div>
      <div>
        <div className="w-full flex justify-between items-center">
          {searchuser ? (
            <h1 className="font-normal dark:text-gray-200 text-xl p-2">
              {searchuser}'s POI ({poindata.length})
            </h1>
          ) : (
            <span></span>
          )}

          <div className="relative">
            <input
              ref={searchRef}
              maxLength={30}
              onChange={(e) => handleSearch(e.target.value)}
              type="text"
              className="text-black my-3 dark:bg-black rounded-lg dark:text-white block w-60 px-6 mx-2 py-2 bg-opacity-70 border"
              placeholder="Search user"
            />
            {searchresults && (
              <div
                style={{ zIndex: 9999 }}
                className="absolute max-h-96 overflow-y-scroll rounded-10 w-60 text-black dark:text-white bg-white dark:bg-black p-4 mx-2 shadow-2xl transition-all duration-500"
              >
                <div className="flex w-full flex-col">
                  {searchresults.length > 0 ? (
                    searchresults.map((user) => {
                      return (
                        <div
                          key={user.id}
                          onClick={() => {
                            setSearchedUser(user.username);
                            filterPoisByUser(user.id);
                            searchRef.current.value = user.username;
                          }}
                          className="flex items-center gap-4 my-1 rounded-10 p-2 hover:bg-gray-400 dark:hover:bg-gray-500 cursor-pointer duration-300"
                        >
                          <p className="font-semibold text-sm">
                            {user.username}
                          </p>
                        </div>
                      );
                    })
                  ) : (
                    <h1>No Result found</h1>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

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
