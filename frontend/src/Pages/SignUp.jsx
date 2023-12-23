import { TbWorldShare } from "react-icons/tb";
import pageImg from "../Img/cheerful.png";
import { TextField ,Button , Tooltip} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom'
import { useState } from "react";
import Success from "../Tasks/Success";


export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // New state for success popup
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('https://blogs-sharing-ideas-api.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);

      // Show the Success component
      setShowSuccess(true);

      // Set a timeout to hide the Success component after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        // Navigate to '/signin' after hiding the Success component
        navigate('/signin');
      }, 3000);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error.message);
    }
  }

    return (
      <div className="bg-blue-100  mainBody">
         <div className="newproductgrid max-w-7xl mx-auto rounded-3xl">
          <div className="firstDiv p-3 noneget">
            <div className="flex items-center gap-1 pl-3">
            <TbWorldShare className="text-2xl text-white"/>
            <h2 className="text-sm text-indigo-50 font-medium">Welcom in our blogs sharing</h2>
            </div>
            <div className="flex justify-center getBorder items-center">
              <img className="pl-20 pt-14 w-full" src={pageImg} alt="" />
            </div>
            <div className="flex justify-center items-center mt-32">
              <p className="text-xs text-white">Copyright @2023 My creation All good deserved</p>
            </div>
          </div>
  
          {/* Second side in downloading now  */}
           
          <div className="secondDiv w-full">
            <Link to='/signin'>
            <div className="mt-5 flex justify-end pr-5">
            <Tooltip title="Click here to login now" arrow placement='left'>
              <Button variant="contained">Sing in</Button>
              </Tooltip>
            </div>
            </Link>
  
            <form onSubmit={handlerSubmit} className="mt-40 w-full flex flex-col  items-center gap-3">
             <div className="flex pr-24 uppercase text-xl font-bold">
             <h1 className="">create your account here</h1>
             </div>
            <TextField  label="set your username" required className="w-2/3" id='username' onChange={handleChange} variant='outlined' type='text'/>
            <TextField  label="set your email" required className="w-2/3" id='email' onChange={handleChange} variant='outlined' type='text'/>
            <TextField  label="set your password" required helperText="don't share your password" id='password' onChange={handleChange} className="w-2/3" variant='outlined' type='password'/>
            <Button type="submit" disabled={loading} variant="contained">{loading ? 'loading...' : 'Sign up'}</Button>
            </form>
            {showSuccess && <Success />} {/* Show success popup */}
             <div className="flex gap-2 mt-3 text-xs">
              {error && <p className="text-red-500">{error}</p>}
             </div>
          </div>
          </div>
      </div>
    )
  }
