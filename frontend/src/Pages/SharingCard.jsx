import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';


export default function SharingCard({sharinglist}) {
      return (
        <div className='max-w-7xl mx-auto p-1 bg-gray-100'>

          <div className='newproductgriding flex'>
            <div className="">
             <img src={sharinglist.imageUrls} alt="" />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className='text-lg font-semibold'>{sharinglist.name}</h2>
              <p className='text-sm text-gray-500'>{sharinglist.email}</p>
              <p className='text-sm text-gray-500'>{sharinglist.publicrole}</p>
              <p className='text-sm text-gray-500'>{sharinglist.dateinstert}</p>
              <p className='text-sm text-gray-500'>{sharinglist.typeofideas}</p>
              <p className='text-sm text-gray-500'>{sharinglist.description}</p>
              <Link to={`/sharing/${sharinglist._id}`}>
              <button className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600'>View</button>
              </Link>
              </div>  
          </div>

        </div>
      );

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