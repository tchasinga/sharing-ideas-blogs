import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';


export default function SharingCard({sharinglist}) {
      return (
        <div className='gridOneGeneral'>
          
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