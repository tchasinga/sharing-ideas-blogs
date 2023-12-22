
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function SharingCard({ sharinglist }) {
  return (
    <div className="p-3 getboding bg-slate-100 ">
      <div className="">
        <img src={sharinglist.imageUrls[0]} className="" alt="" />
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
