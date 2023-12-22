import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SharingCard({ sharinglist }) {
  const [color, setColor] = useState('black');

  const toggleColor = () => {
    setColor(prevColor => prevColor === 'black' ? 'white' : 'black');
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 rounded-lg p-3" onClick={toggleColor}>
      <div className="flex flex-col justify-between relative items-center">
        <img src={sharinglist.imageUrls[0]} className="h-[250px] w-full relative object-cover" alt="" />
        <div className="absolute text-white font-semibold bottom-10 right-0 left-0 px-5 text-sm bg-slate-300 p-2">
          <h1>{sharinglist.name}</h1>
          <h3 className={`text-xs changin text-${color}`}>{sharinglist.email}</h3>
        </div>
      </div>
    </div>
  );
}

SharingCard.propTypes = {
  sharinglist: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    publicrole: PropTypes.string.isRequired,
    dateinsert: PropTypes.string.isRequired,
    typeofideas: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
};