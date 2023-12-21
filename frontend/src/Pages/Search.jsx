import Load from "../Animations/Load";
import Messagebugs from "../Animations/Messagebugs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Search() {
    const navigation = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [sharing, setSharingIdeas] = useState([]);
    const [sidebarData, setSidebarData] = useState({
        name: '',
        phonenumber: '',
        email: '',
        publicrole: '',
        dateinstert: '',
        typeofideas: '',
      });

    useEffect(() =>{
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const nameFromUrl = urlParams.get('name');
        const phonenumberFromUrl = urlParams.get('phonenumber');
        const emailFromUrl = urlParams.get('email');
        const publicroleFromUrl = urlParams.get('publicrole');
        const dateinstertFromUrl = urlParams.get('dateinstert');
   
      const fetchingListings = async () => {
        try {
          setLoading(true);
          const searchQuery = urlParams.toString();
          const res = await fetch(`http://localhost:5000/api/sharing/getallsharingideas?${searchQuery}`);
          const data = await res.json();
    
      
          if (data.success === false) {
            setError(true);
            setLoading(false);
            return;
          }
      
          setSharingIdeas(data);
          setLoading(false);
          setError(false);
        } catch (error) {
          setError(true);
          setLoading(false);
        }
      };
      fetchingListings();
      
       }, [location.search])




  return (
    <div>
       {loading && <h1 className='LoadingpageContainer'><Loadtwo/></h1>}
          {error && <h1 className='LoadingpageContainer'><Errors/></h1>}
          <div className="">
             {!loading && listing.length === 0 && (
              <div className="flex flex-col gap-7 LoadingpageContainer">
                  <NewErrors/>
                <h1 className="text-xs font-semibold text-slate-600">No Listing found...</h1>
              </div>
             )}
          </div>
          <div className="mt-7 justify-center flex gap-5 flex-wrap w-full">
            {listing.map((list) => (
              <ListingCard key={list._id} listing={list} />
            ))}
            
            {showMore && (
          <div className="flex justify-center w-full">
         <button onClick={onShowManyClick} className="uppercase bg-zinc-800 p-3 text-center text-white rounded-3xl font-medium text-xs hover:bg-green-900 hover:scale-95 cursor-pointer">
                show-more
         </button>
         </div>
          )}
    </div>
  )
}
