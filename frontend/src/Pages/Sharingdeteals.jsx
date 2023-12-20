import Load from "../Animations/Load";
import Messagebugs from "../Animations/Messagebugs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import SwiperCore from "swiper";
import { format } from 'date-fns';
import {FaShare, FaPhoneAlt , FaRegCalendarAlt} from 'react-icons/fa';
import Contact from "./Contact";

export default function Sharingdeteals() {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [sharing, setSharing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);

  useEffect(() => {
    const fetchSharing = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:5000/api/sharing/getsharingideas/${params.sharingId}`
        );
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setSharing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchSharing();
  }, [params.sharingId]);

  const getMycopid = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  const handleContactButtonClick = () => {
    setContact(true);
  }

  return (
    <main className="">
      {loading && (
        <h1 className="LoadingpageContainer">
          <Load />
        </h1>
      )}
      {error && (
        <h1 className="LoadingpageContainer">
          <Messagebugs />
        </h1>
      )}

      {sharing && !loading && !error && (
        <div>
          <Swiper navigation>
            {sharing.imageUrls.map((imagurl) => (
              <SwiperSlide key={imagurl}>
                <div className="h-[550px] relative object-cover" style={{background: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0)), url(${imagurl}) center no-repeat`, backgroundSize: "cover",}}>
                  <div className="text-white text-4xl absolute bottom-10 right-0 left-0 px-5 font-bold">
                     <h1>{sharing.publicrole}</h1>
                     <h3 className="text-xs text-gray-500">{sharing.email}</h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Liknks sharing */}
        <div className="flex items-center justify-center fixed top-[13%] right-[3%] z-10 tex gap-6">  
        
        <div className="flex items-center ">
              <h1 className="text-white">{sharing.name}</h1>
           </div>

             <div className="w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer hover:rounded-full">
             <FaShare className="text-base" onClick={getMycopid}/>
             </div>
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-xl bg-slate-100 p-2'>
              Success copied!
            </p>
          )}
          <div className="flex flex-col max-w-6xl mx-auto p-3 my-7 gap-4">
             <div className="flex items-center gap-5">

             <div className="flex items-center gap-2 text-green-700">
             <FaPhoneAlt />
              <span className="text-slate-950 text-sm">{sharing.phonenumber}</span>
             </div>

          <div className="flex items-center gap-2 text-green-700">
            <FaRegCalendarAlt />
            <span className="text-slate-950 text-sm">
            {format(new Date(sharing.dateinstert), 'dd/MM/yyyy')}
           </span>
          </div>
             </div>
          <div className="text-slate-700 font-light text-3xl">
            <h1>{sharing.typeofideas}</h1>
          </div>
          <div className="text-slate-950 font-light text-xl">
            <h1>{sharing.description}</h1>
            </div>
        <button
          onClick={handleContactButtonClick}
          className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3 w-1/2'>
         Get in touch
        </button>
        {/* Addign condition rending in the page */}
        {contact && <Contact sharing={sharing}/>}
          </div>
        </div>
      )}
    </main>
  );
}
