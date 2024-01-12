'use client'
import React, { useEffect, useState } from 'react'
import Map from '../../components/Map'
import { adminAxiosInstance, baseAxiosInstance } from '../../utils/axiosUtils';

export default function Home() {

  const [poindata,setPoiData] = useState([])

  // const parsePointToMatker = (point) => {
  //   let s = point.split("(")[1].slice(0, -1);
  //   const [lat, lng] = s.split(" ");
  //   return { lat: parseFloat(lat).toFixed(4), lng: parseFloat(lng).toFixed(4) };
  // };

  const fetchAllPois = () =>{
    adminAxiosInstance.get('list-pois/').then((res)=>{
      setPoiData(res.data)
      console.log(res.data);
    })
  }

  useEffect(()=>{
    fetchAllPois()
  },[])
 

  return (
    <div className='max-h-screen flex max-w-6xl flex-col p-10' >
      <div className='py-10' >
        <h1 className='text-2xl w-full font-bold text-left' >Hi, Admin</h1>
      </div>
      <div className='w-5/6 max-h-screen'
      >
        <Map markers={poindata}/>
      </div>
    </div>
  )
}
