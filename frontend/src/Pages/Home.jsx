import Oneimg from '../Img/pexels-christina-morillo-1181259.jpg'
import {useSelector} from 'react-redux';
import { useEffect, useState } from 'react'
import Load from "../Animations/Load";
import Messagebugs from "../Animations/Messagebugs";
import SharingCard from './SharingCard';

export default function Home() {
  const currentUser = useSelector((state) => state.user && state.user.user.currentUser);
  const [sharing , setSharing] = useState([]);
  const [loading, setLoading] = useState(false)
  const [sharingError, setsharingError] = useState(false) // Corrected this line
  
  useEffect(() => {
    const fetchingSharing = async () => {
      try {
        setLoading(true)
        const res = await fetch('https://blogs-sharing-ideas-api.onrender.com/api/sharing/getallsharingideas');
        const data = await res.json()
        if (data.success === false) {
          setsharingError(true);
          setLoading(false);
          return;
        }
        setSharing(data);
        setLoading(false);
        setsharingError(false);
      } catch (error) {
        setsharingError(true);
        setLoading(false);
      }
    }
    fetchingSharing();
  }, [])


  return (
    <div className='px-10 w-full homeContainer mt-20'>
     {currentUser ? (
         <div className="h-[750px] relative object-cover w-full rounded-3xl mb-6 mynew" style={{background: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0)), url(${Oneimg}) center no-repeat`, backgroundSize: "cover",}}>
         <div className="text-white flex flex-col absolute bottom-12 right-0 left-0 px-10 font-normal">
              <p className='text-sm text-gray-400 bg-blacking'>The fucture live in communication</p>
              <h1 className='font-normal text-4xl bg-blacking'>Welcom to global sharing {currentUser.user.username}</h1>
              <h3 className="text-xs text-gray-500 flex justify-start my-2 bg-black">Share your knowledge in different domain</h3>
            <div className="noneget">
            <p className='text-xs text-white flex'>Let&apos;us thing out of way: you dont&apos;t need a fancy Bachelor&apos;s Degree to get into</p>
              <p className='text-xs text-white flex'>Product Design. we sat down franckie to talk about gatekeeping in </p>
              <p className='text-xs text-white flex'>the design industry and how to get started in product design.</p>
            </div>
           </div>
         </div>
     ) : (
      <div className="h-[750px] relative object-cover w-full rounded-3xl mb-6 mynew" style={{background: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0)), url(${Oneimg}) center no-repeat`, backgroundSize: "cover",}}>
      <div className="text-white flex flex-col absolute bottom-12 right-0 left-0 px-10 font-normal">
           <p className='text-sm text-gray-400 bg-blacking'>The fucture live in communication</p>
           <h1 className='font-normal text-4xl'>Welcom to our global ideas sharing</h1>
           <h3 className="text-xs text-gray-500 flex justify-start my-2 bg-black">Share your knowledge in different domain</h3>
         <div className="noneget">
         <p className='text-xs text-white flex'>Let&apos;us thing out of way: you dont&apos;t need a fancy Bachelor&apos;s Degree to get into</p>
           <p className='text-xs text-white flex'>Product Design. we sat down franckie to talk about gatekeeping in </p>
           <p className='text-xs text-white flex'>the design industry and how to get started in product design.</p>
         </div>
        </div>
      </div>
     )}
       {loading && <h1 className='LoadingpageContainer'><Load/></h1>}
       {sharingError && <h1 className='LoadingpageContainer'><Messagebugs/></h1>}
        <div className="flex flex-wrap gap-4 justify-center max-w-full myhomeget mx-auto">
          {sharing.map((sharinglist) => (
            <div className="" key={sharinglist._id}>     
            <SharingCard key={sharinglist._id} sharinglist={sharinglist} />
            </div>
          ))}
          </div>
    </div>
  )
}
