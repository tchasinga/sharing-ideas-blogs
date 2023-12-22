
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function SharingCard({ sharinglist }) {
  return (
    <div className="flex flex-col justify-center  items-center  bg-gray-100 rounded-lg p-3">
      <div className="flex flex-col justify-between relative items-center">
        <img src={sharinglist.imageUrls[0]} className="h-[250px] w-full relative object-cover" alt="" />
        <h1 className="absolute text-white font-semibold bottom-10 right-0 left-0 px-5 text-sm">{sharinglist.name}</h1>
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
