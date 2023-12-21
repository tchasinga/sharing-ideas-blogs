import { MdScreenShare } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Load from "../Animations/Load";
import Messagebugs from "../Animations/Messagebugs";
 // Assuming NewErrors is the correct component to import

export default function Header() {
  const currentUser = useSelector((state) => state.user && state.user.user.currentUser);
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [sharing, setSharingIdeas] = useState([]);

  useEffect(() => {
    const fetchingListings = async () => {
      try {
        setLoading(true);
        const urlParams = new URLSearchParams(location.search);
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
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${encodeURIComponent(searchQuery)}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <div className="px-32 p-2 w-full">
      <div className="flex justify-between items-center flex-wrap">
        <Link to="/">
          <div className="flex items-center cursor-pointer gap-2">
            <MdScreenShare className="text-3xl" />
            <h3 className="text-1xl font-bold cursor-pointer">Shar<span className='text-blue-400'>ing</span></h3>
          </div>
        </Link>

        <form onSubmit={handleSubmit} className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="focus:outline-none bg-transparent"
            placeholder="Search"
          />
          <button type="submit" className="w-full">
            <FaSearch />
          </button>
        </form>

        <div className="">
          <ul className="flex gap-3 items-center">
            <Link to="/">
              <li className="hover:font-semibold">Home</li>
            </Link>

            <Link to="/about">
              <li className="hover:font-semibold">About</li>
            </Link>

            <Link to="/profile">
              {currentUser ? (
                <li>
                  <img src={currentUser.user.avatar} alt="avatar" className="w-7 h-7 rounded-full object-cover" />
                </li>
              ) : (
                <li>Sign in</li>
              )}
            </Link>
          </ul>
        </div>
      </div>
      <div>
        {loading && <div className='LoadingpageContainer'><Load/></div>}
        {error && <div className='LoadingpageContainer'><Messagebugs/></div>}
        <div className="">
          {!loading && sharing.length === 0 && (
            <div className="flex flex-col gap-7 LoadingpageContainer">
              <h1 className="text-3xl font-semibold text-slate-800">No Listing found...</h1>
            </div>
          )}
        </div>
        <div className="mt-7 justify-center flex gap-5 flex-wrap w-full">
          {sharing.map((sharingList) => (
            <SharingCard key={sharingList._id} sharing={sharingList} />
          ))}
        </div>
      </div>
    </div>
  );
}
