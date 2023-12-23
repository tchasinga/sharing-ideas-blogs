import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function SharingCard({ sharinglist }) {

  return (
    <div className="flex flex-col justify-center  items-center maxWidth bg-gray-100 rounded-lg p-3">
    <Link to={`/sharingdeteals/${sharinglist._id}`}>
    <div className="flex flex-col justify-between relative items-center">
        <img src={sharinglist.imageUrls[0]} className="h-[250px] w-full relative object-cover rounded-2xl" alt="" />
        <div className="absolute text-white font-semibold bottom-0 right-0 left-0 px-5 text-sm bg-slate-300 p-2">
          <h1>{sharinglist.name}</h1>
          <h3 className={`text-xs font-normal text-gray-300`}>{sharinglist.email}</h3>
        </div>
      </div>
    </Link>
      <div className="flex flex-col w-full">
        <div className="flex flex-col justify-between w-full mb-3 px-3">
          <h1 className="text-xl font-semibold text-slate-950">{sharinglist.publicrole}</h1>
          <h3 className="text-xs font-normal text-gray-500">{sharinglist.typeofideas}</h3>
        </div>
        <div className="flex flex-col justify-center  px-3">
          <p className="text-slate-950 text-sm font-normal line-clamp-3">{sharinglist.description}</p>
        </div>
    </div>
    </div>
  );
}

SharingCard.propTypes = {
  sharinglist: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    publicrole: PropTypes.string.isRequired,
    dateinsert: PropTypes.string.isRequired,
    typeofideas: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
};