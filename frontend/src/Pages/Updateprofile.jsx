import { TextField } from "@mui/material";
import { MdWavingHand } from "react-icons/md";
import { useSelector , useDispatch} from "react-redux";
import "animate.css";
import {getDownloadURL, getStorage , ref , uploadBytesResumable} from "firebase/storage";
import {app} from "../firebase.js";
import { updateUserSuccess, updateUserFailure, updateUserStart} from '../redux/user/userSlice.js'
import { useRef, useState , useEffect} from "react";



export default function UpdateProfile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const currentUser = useSelector((state) => state.user?.user?.currentUser); // Updated selector usage
  const loading = useSelector((state) => state.user?.user?.loading); // Updated selector usage
  const error = useSelector((state) => state.user?.user?.error); // Updated selector usage

   
  const handleFileUpload = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.error(error);
        setFileUploadError(true);
      },
      () => {
        console.log("Upload is complete");
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };
  useEffect(() => {
    if (file) {
      handleFileUpload();
    }
  }, [file]);
  // Updating User Information....
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Submitted Changes from different form
  const handlerSubmit = async(e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const  res = await fetch(`https://blogs-sharing-ideas-api.onrender.com/api/user/update/${currentUser.user._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json();
      if(data.success === true) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      console.error(error);
      dispatch(updateUserFailure(error.message)); 
    }
  };



//  Always keep and pay attention to the order of the id values in the form....
  return (
    <div className="max-w-3xl mx-auto mt-20">
      <div className="flex flex-wrap items-center gap-3 w-full">
        <h1 className="text-2xl font-light">Hello</h1>
        <MdWavingHand className="text-2xl text-yellow-600 animate__tada animate__animated" />
        <h1 className="text-2xl font-light">{currentUser.user.username}</h1>,
        <h1 className="text-2xl font-light">Update your Profile here...</h1>
      </div>

      <div className="mt-10">
        <form onSubmit={handlerSubmit} className="space-y-5">
          <div className="flex flex-col space-y-1">
          <img
          src={formData.avatar || currentUser.user.avatar}
          alt="avatar"
          onClick={() => fileRef.current.click()}
          className="w-24 h-24 rounded-full object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
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
        
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileRef}
          hidden
          accept="image/*"
        />
          </div>

          <div className="flex flex-col space-y-1">
            <TextField
              type="text"
              name="name"
              id="username"
              className="border border-gray-300 p-2 rounded-md"
              defaultValue={currentUser.user.username}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <TextField
              type="email"
              name="email"
              id="email"
              className="border border-gray-300 p-2 rounded-md"
              defaultValue={currentUser.user.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <TextField
              type="password"
              name="password"
              id="password"
              className="border border-gray-300 p-2 rounded-md"
              label="Enter your password"
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center">
            <button className="bg-blue-500 text-white px-5 py-2 rounded-md">
            {loading ? 'Loading...' : 'Update'}
            </button>
          </div>
        </form>
        <p className="text-sm text-red">{error ? error : ''}</p>
      <p className="text-sm text-green-500">{updateSuccess ? 'Update Success ! ' : ''}</p>
      </div>
    </div>
  );
}
