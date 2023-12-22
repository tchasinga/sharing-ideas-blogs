import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';


export default function SharingCard({sharinglist}) {
  return (
    <div className='newproductgrid'>
      <div className="">
       <div className="">
         <Link to={`/sharingdeteals/${sharinglist._id}`}>
            <img src={sharinglist.imageUrls[0]} alt={sharinglist.name} className="w-full h-96 object-cover" />
         </Link>
       </div>
      </div>
    </div>
  )
}


SharingCard.propTypes = {
  sharinglist: PropTypes.shape({
    _id : PropTypes.string.isRequired,
    name : PropTypes.string.isRequired,
    email : PropTypes.string.isRequired,
    publicrole : PropTypes.string.isRequired,
    dateinstert : PropTypes.string.isRequired,
    typeofideas : PropTypes.string.isRequired,
    description : PropTypes.string.isRequired,
    imageUrls : PropTypes.arrayOf(PropTypes.string.isRequired),
  })
}