'use client'
import React, { useEffect, useRef, useState } from 'react'
import { baseAxiosInstance, userAxiosInstance } from '../../utils/axiosUtils';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import dynamic from "next/dynamic";
import { jwtDecode } from 'jwt-decode';
import { getToken } from "@/utils/cookie"

const Map = dynamic(() => {
  return import('../../components/maps/UserMap');
}, { ssr: false });

export default function Home() {
  const nameRef = useRef(null);
  const router = useRouter()
  const [markerPosition, setMarkerPosition] = useState([0, 0]);
  const [poidata, setPoiData] = useState([])

  const fetchUserPois = () => {
    getToken('userJwt').then((token) => {
      userAxiosInstance.get(`pois/${jwtDecode(token).user_id}/`).then((res) => {
        setPoiData(res.data)
        console.log(res.data);
      })
    })
  }

  useEffect(() => {
    fetchUserPois()
  }, [])

  const logout = () => {
    document.cookie = "userJwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
    router.push('/login')
  }

  const createPOI = () => {
    const name = nameRef.current.value;
    getToken('userJwt').then((accessToken) => {
      baseAxiosInstance
        .post("/create-poi/", {
          name,
          user: jwtDecode(accessToken).user_id,
          latitude: markerPosition[0],
          longitude: markerPosition[1],
        })
        .then((res) => {
          console.log(res);
          toast.success('POI created Successfully')
          fetchUserPois()
          nameRef.current.value = ""
        })
        .catch((err) => {
          console.log(err);
          toast.error('Something went wrong')
        });
    })
  };

  return (
    <div className='max-h-screen mx-auto flex 2xl:max-w-7xl flex-col p-10' >
      <div className='py-10 flex justify-between items-center' >
        <div>
          <h1 className='sm:text-xl md:text-3xl w-full font-bold text-left' >Hi, UserName</h1>
          <p className='text-xs font-light py-1 text-gray-500' >Add your POI (Place of Interest)</p>
        </div>
        <span onClick={logout} className='cursor-pointer font-bold md:text-xl' >
          Logout
        </span>
      </div>
      <div>
        <Map markerPosition={markerPosition} setMarkerPosition={setMarkerPosition} nameRef={nameRef} markers={poidata} handleSubmit={createPOI} />
      </div>
    </div>
  )
}
