import Load from '../Animations/Load';
import Messagebugs from '../Animations/Messagebugs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import SwiperCore from 'swiper';

export default function Sharingdeteals() {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [sharing, setSharing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  // const [contact, setContact] = useState(false);

  useEffect(() => {
    const fetchingSharing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/sharing/getsharingideas/${params.sharingId}`);
        const data = await res.json();

        if(data.success === false){
          setError(data.message || true);
          setLoading(false);
          return;
        }
        setSharing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        console.error(error);
        setError(error.message || true);
        setLoading(false);
        
      }
    };
    fetchingSharing();
  }, [params.sharingId]);

  
  
  return (
    <main className="">
        {loading && <h1 className='LoadingpageContainer'><Load/></h1>}
      {error && <h1 className='LoadingpageContainer'><Messagebugs/></h1>}
    
       {sharing && !loading && !error && (
        <div>
          <div className="max-w-4xl mx-auto mt-10 ">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-semibold text-gray-700">
                {sharing.title}
              </h1>
              <button
                className="px-4 py-2 bg-gray-800 text-white rounded-lg"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `http://localhost:3000/sharingdeteals/${sharing._id}`
                  );
                  setCopied(true);
                }}
              >
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <img
                  src={sharing.avatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <p className="text-gray-700 ml-2">{sharing.name}</p>
              </div>
              <p className="text-gray-600">{sharing.updatedAt}</p>
            </div>
            <div className="mt-8">
              <Swiper
                modules={[Navigation]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
              >
                {sharing.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt="sharing"
                      className="w-full h-80 object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="mt-8">
              <p className="text-gray-700">{sharing.description}</p>
            </div>
          </div>
        </div>
       )}
    </main>
  )
}
