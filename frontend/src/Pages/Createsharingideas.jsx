import {useSelector} from 'react-redux'
import { MdWavingHand } from "react-icons/md";
import { TextField ,Button } from '@mui/material';
import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

export default function Createsharingideas() {
  const currentUser = useSelector((state) => state.user && state.user.user.currentUser)
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [filePerc, setFilePerc] = useState(0);
  const [imageUploadImageError,  setImageUploadError] = useState(false);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phonenumber: '',
    email: '',
    description: '',
    publicrole: '',
    dateinstert: '',
    typeofideas: '',
    imageUrls: [],
  });


  // Adding image to the database
  const handlerImageSubmit = () => {
    if(files.length > 0 && files.length + formData.imageUrls.length < 10){
        setUploading(true)
        setImageUploadError(false)
        const promise = []
        for (let i = 0; i < files.length; i++){
            promise.push(storeImage(files[i]))
        }
        Promise.all(promise).then((urls) => {
            setFormData({
                ...formData,
                imageUrls: formData.imageUrls.concat(urls),
            });
            setImageUploadError(false)
            setUploading(false)
        }).catch((err) =>{
            console.error(err)
            setImageUploadError("Image upload error (2 mb per image)")
        });
       
    }else{
        setImageUploadError(`You can upload max 10 images maximum (2 mb per image) and please select at least one image to upload ${currentUser.user.username}`)
        setUploading(false)
    }
   }
   const storeImage = async (file)=> {
    return new Promise((resolve, reject) => {
         const storage = getStorage(app)
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                    setFilePerc(Math.round(progress));
                },
                (error) => {
                    reject(error);
                    setFileUploadError(true);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );  
    })
   }

  // Adding idea to the database
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  //  Adding Handler Submit to submit the form data to the database of MongoDB and Firebase Storage
  const handlerSubmitForm = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      setError(false);
  
      const res = await fetch(`http://localhost:5000/api/sharing/creatignsharingideas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id || currentUser.user._id || currentUser.user.currentUser._id,
        }),
      });
  
      const data = await res.json();
  
      setLoading(false);
  
      if (data.success === true) {
        setError(data.message);
        console.log('Registration Successful:', data)
        // Navigate inside the .then block
        navigate(`/sharingdeteals/${data.data._id}`);
        return;
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  
  
  

  return (
    <main className="max-w-7xl mx-auto">
     <div className="flex items-center gap-3 w-full mt-10">
        <h1 className="text-2xl font-light">Hello</h1>
        <MdWavingHand className="text-2xl text-yellow-600 animate__tada animate__animated" />
        <h1 className="text-2xl font-light">{currentUser.user.username}</h1>,
        <h1 className="text-2xl font-light">Create a new Idea heres</h1>
       
      </div>
      {/* Form side will be design with grid... system*/}
      <form onSubmit={handlerSubmitForm} className="mt-11">
      <div className='flex justify-end mb-4'>
        <div className="flex flex-col">
        <Button type='submit' variant='contained'>{loading ? 'Creating...' : 'Create'}</Button>
           {error &&<p className='text-red-700 text-xs'>{error}</p>}
        </div>
        </div>
        <div className="gridsystem">
        <div className=' text-black '>
          <TextField type="text" variant='outlined' onChange={handleChange} value={formData.name}  label="Enter your name here" name="name" id="name" className="border p-2 w-full rounded-md"/>
        </div>
        <div className='text-black'>
          <TextField type="tel"  variant='outlined'  onChange={handleChange} value={formData.phonenumber}  label="Enter your phone number here" name="phonenumber" id="phonenumber" className="border p-2 w-full rounded-md"/>
        </div>
        <div className='text-black'>
          <TextField type="text" variant='outlined'  onChange={handleChange} value={formData.email}  label="Enter your email here" name="email" id="email" className="border p-2 w-full rounded-md"/>
        </div>
        <div className='text-black input-group mt-3'>
          <textarea type="text"  required name='description'  onChange={handleChange} value={formData.description}  id='description' autoComplete='off' className='input w-full'/>
          <label className='user-label'>Write the full details of your idea</label>
        </div>
        <div className='text-black'>
          <TextField type="text" variant='outlined'  onChange={handleChange} value={formData.publicrole}  label="Enter your public function" helperText="Your public function ex : programmer etc.... " name="publicrole" id="publicrole" className="border p-2 w-full rounded-md"/>
        </div>
        <div className='text-black'>
          <TextField type="date"  onChange={handleChange} value={formData.dateinstert}  variant='outlined' name="dateinstert" id="dateinstert" className="border p-2 w-full rounded-md"/>
        </div>
        <div className='text-black'>
          <select name="typeofideas" id="typeofideas" value={formData.typeofideas} onChange={handleChange} className="p-2 w-full rounded-md">
            <option disabled>Select your country</option>
            <option value="TypeofIdeas">Choose your kind of idea here {currentUser.user.username}</option>
            <option value="Travel">Travel</option>
            <option value="HealthandWellness">Health and Wellness</option>
            <option value="Finance">Finance</option>
            <option value="Career-and-Professional-Development">Career and Professional Development</option>
            <option value="Creativity">Creativity</option>
            <option value="Education">Education</option>
            <option value="Family">Family</option>
            <option value="FoodandDrink">Food and Drink</option>
            <option value="HomeandGarden">Home and Garden</option>
            <option value="Programmign">Programmign</option>
            <option value="Music">Music</option>
            <option value="Pets">Pets</option>
            <option value="SportsandFitness">Sports and Fitness</option>
            <option value="StyleandFashion">Style and Fashion</option>
            <option value="Writing">Writing</option>
            <option value="Parenting">Parenting</option>
            <option value="Arts">Arts</option>
            <option value="SocialMedia">Social Media</option>
            <option value="Science">Science</option>
            <option value="Business">Business</option>
            <option value="Marketing">Marketing</option>
            <option value="Photography">Photography</option>
            <option value="Film">Film</option>
            <option value="Games">Games</option>
            <option value="Technology">Technology</option>
            <option value="Design">Design</option>
            <option value="Comics">Comics</option>
            <option value="Dance">Dance</option>
            <option value="Theater">Theater</option>
            <option value="Podcasting">Podcasting</option>
            <option value="Language">Language</option>
            <option value="History">History</option>
            <option value="EnvironmentandSustainability">Environment and Sustainability</option>
            <option value="Politics">Politics</option>
          </select>
        </div>
        <div className="flex gap-3">
            <input onChange={(e) => setFiles(e.target.files)} type="file" className='p-2 border w-full border-gray-300 rounded-lg' id='images' accept='image/*' multiple/>
                <button disabled={uploading} type='button' onClick={handlerImageSubmit} className='font-medium w-full text-xs  text-green-700 border rounded-xl p-3'>{uploading ? 'Uploading...' : 'Upload data'}</button>
            </div>
            <p className='text-red-700 text-xs'>{imageUploadImageError &&  imageUploadImageError}</p>
        </div>
      </form>
     <div className="flex flex-col w-full">
     <p className="text-sm">
          {fileUploadError ? (
            <span className="text-red-500">
              Failed to upload image. Please try again. {currentUser?.user.username} (Your image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-green-950">Uploading image...{filePerc}%</span>
          ) : filePerc === 100 ? (
            <span className="text-green-500">Image uploaded successfully.</span>
          ) : null}
        </p>
     </div>
    </main>
  )
}
