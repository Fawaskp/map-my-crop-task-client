'use client'
import React, { useEffect, useRef, useState } from 'react'
import Map from '../../components/Map'
import { baseAxiosInstance, userAxiosInstance } from '../../utils/axiosUtils';

export default function Home() {
  const nameRef = useRef(null);
  const [markerPosition, setMarkerPosition] = useState([0, 0]);
  const [poidata,setPoiData] = useState([])

  const fetchUserPois = () =>{
    userAxiosInstance.get('pois/1/').then((res)=>{
      setPoiData(res.data)
      console.log(res.data);
    })
  }

  useEffect(()=>{
    fetchUserPois()
  },[])

  const createPOI = () => {
    const name = nameRef.current.value;
    baseAxiosInstance
      .post("/create-poi/", {
        name,
        user:1,
        latitude: markerPosition[0],
        longitude: markerPosition[1],
      })
      .then((res) => {
        console.log(res);
        fetchUserPois()
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  return (
    <div className='max-h-screen flex max-w-6xl flex-col p-10' >
      <div className='py-10' >
        <h1 className='text-3xl w-full font-bold text-left' >Hi, UserName</h1>
        <p className='text-xs font-light py-1 text-gray-500' >Add your POI (Place of Interest)</p>
      </div>
      <div className='w-5/6 '
      >
        <Map markerPosition={markerPosition} setMarkerPosition={setMarkerPosition} nameRef={nameRef} markers={poidata} isDragable={true} handleSubmit={createPOI} />
      </div>
    </div>
  )
}
