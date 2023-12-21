import { useEffect, useState } from "react";
import Load from "../Animations/Load";
import Messagebugs from "../Animations/Messagebugs";
import SharingCard from "./SharingCard";

export default function Search() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [sharing, setSharing] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTerm = urlParams.get('searchTerm');

    const fetchingListings = async () => {
        try {
          setLoading(true);
          const searchQuery = urlParams.toString(searchTerm);
          const res = await fetch(`http://localhost:5000/api/sharing/getallsharingideas?${searchQuery}`);
          const data = await res.json();
      
      
          if (data.success === false) {
            setError(true);
            setLoading(false);
            return;
          }
      
          console.log(data);
          setSharing(data.data || []);
          setLoading(false);
          setError(false);
        } catch (error) {
          setError(true);
          console.log(error);
          setLoading(false);
        }
      };
      fetchingListings();
      
       }, [location.search])
  return (
    <div>
      {loading && <h1 className='LoadingpageContainer'><Load/></h1>}
      {error && <h1 className='LoadingpageContainer'><Messagebugs/></h1>}
      <div className="">
        {/* {!loading && sharing.length === 0 && (
          <div className="flex flex-col gap-7 LoadingpageContainer">
            <h1 className="text-xs font-semibold text-slate-600">No Listing found...</h1>
          </div>
        )} */}
      </div>
      <div className="mt-7 justify-center flex gap-5 flex-wrap w-full">
        {sharing.map((list) => (
          <SharingCard key={list._id} listing={list} />
        ))}
      </div>
    </div>
  );
}
