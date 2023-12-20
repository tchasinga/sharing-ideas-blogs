import Load from "../Animations/Load";
import Messagebugs from "../Animations/Messagebugs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import SwiperCore from "swiper";

export default function Sharingdeteals() {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [sharing, setSharing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // const [copied, setCopied] = useState(false);
  // const [contact, setContact] = useState(false);

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
                <div className="h-[550px]" style={{background: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0)), url(${imagurl}) center no-repeat`, backgroundSize: "cover",}}>
                  
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </main>
  );
}
