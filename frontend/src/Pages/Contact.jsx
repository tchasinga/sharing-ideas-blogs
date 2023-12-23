import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Load from "../Animations/Load";
import Messagebugs from "../Animations/Messagebugs";

export default function Contact({ sharing }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [landowner, setLandowner] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchLandowner = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://blogs-sharing-ideas-api.onrender.com/api/user/${sharing.userRef}`);
        const data = await res.json();
        setLandowner(data);
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchLandowner();
  }, [sharing.userRef]);

  const Clientmessage = (e) => {
    setMessage(e.target.value);
  }

  return (
    <div>
      {loading && <h1 className='LoadingpageContainer'><Load /></h1>}
      {error && <h1 className='LoadingpageContainer'><Messagebugs /></h1>}
      {landowner && 
         <div className='flex flex-col'>
          <p><span className="font-semibold">Contact : {landowner.username} </span>
          for more information about <span className="font-semibold">{sharing.publicrole.toLowerCase()}</span>
          </p>
          <textarea className="w-full border rounded-xl p-3" name="message" id="message"  rows="5" value={message} onChange={Clientmessage} placeholder="Set your message here...."></textarea>
           <Link className="bg-slate-700 mt-2 text-white text-center p-3 uppercase rounded-lg" to={`mailto:${landowner.email}?subject=Regarding ${sharing.typeofideas}&body=${message}`}>
           Send Message
          </Link>
         </div>
      }
    </div>
  );
}

Contact.propTypes = {
    sharing: PropTypes.shape({
    userRef: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
    publicrole: PropTypes.string.isRequired,
    typeofideas: PropTypes.string.isRequired,
    // Include other required or optional properties of the 'listing' object
  }).isRequired,
};
