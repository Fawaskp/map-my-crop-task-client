'use client'
import React, { useEffect, useRef, useState } from 'react'
import { userBaseAxiosInstance, userAxiosInstance } from '../../utils/axiosUtils';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import dynamic from "next/dynamic";
import { jwtDecode } from 'jwt-decode';
import Alert from '@/components/Alert';
import { getToken } from '@/utils/serverCookie';

const Map = dynamic(() => {
  return import('../../components/maps/UserMap');
}, { ssr: false });

export default function Home() {
  const nameRef = useRef(null);
  const router = useRouter()
  const [markerPosition, setMarkerPosition] = useState([0, 0]);
  const [username, setUsername] = useState(['User']);
  const [isOpen, setIsOpen] = useState(false);
  const [poidata, setPoiData] = useState([])

  const fetchUserPois = () => {
    getToken('userJwt').then((token) => {
      const decoded = jwtDecode(token)
      setUsername(decoded.username)
      userAxiosInstance.get(`pois/${decoded.user_id}/`).then((res) => {
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

  const handleModalToggle = () =>{
    setIsOpen(!isOpen)
  }

  const createPOI = () => {
    const name = nameRef.current.value;
    getToken('userJwt').then((accessToken) => {
      userBaseAxiosInstance
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
    <>
    <Alert isModalOpen={isOpen} action={logout} handleModalToggle={handleModalToggle} message={'Are you sure you want to logout?'} />
      <div className='max-h-screen mx-auto flex 2xl:max-w-7xl flex-col p-10' >
        <div className='py-3 flex justify-between items-center' >
          <div>
            <h1 className='sm:text-xl md:text-3xl w-full font-bold text-left' >Hi, {username}</h1>
            <p className='text-xs font-light py-1 text-gray-500' >Your POI (Place of Interest)</p>
          </div>
          <span onClick={handleModalToggle} className='cursor-pointer font-bold md:text-xl p-3' >
            Logout
          </span>
        </div>
        <div>
          <p className='text-sm text-gray-400 text-end p-2' >Total POI: {poidata.length}</p>
          <Map markerPosition={markerPosition} setMarkerPosition={setMarkerPosition} nameRef={nameRef} markers={poidata} fetchUserPois={fetchUserPois} handleSubmit={createPOI} />
        </div>
      </div>
    </>
  )
}
