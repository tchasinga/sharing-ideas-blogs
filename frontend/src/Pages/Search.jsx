import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Load from "../Animations/Load";
import Messagebugs from "../Animations/Messagebugs";
import SharingCard from "./SharingCard";

function Search() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [sharing, setSharing] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTerm = urlParams.get("searchTerm");

    const fetchingListings = async () => {
      try {
        setLoading(true);
        const searchQuery = urlParams.toString(searchTerm);
        const res = await fetch(
          `http://localhost:5000/api/sharing/getallsharingideas?${searchQuery}`
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
    fetchingListings();
  }, [location.search]);

  return (
    <div>
      {loading && (
        <h1 className="Success">
          <Load />
        </h1>
      )}
      {error && (
        <h1 className="Success">
          <Messagebugs />
        </h1>
      )}

      {/* this part is not require to  */}
        {sharing.map((sharinglist) => (
          <SharingCard key={sharinglist._id} sharinglist={sharinglist} />
        ))}
    </div>
  );
}

export default Search;
