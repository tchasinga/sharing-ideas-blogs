import { TbWorldShare } from "react-icons/tb";
import pageImg from "../Img/cheerful.png";
import { TextField ,Button , Tooltip} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {signInStart,singInSuccess,signInFailure} from '../redux/user/userSlice.js'
import { useState, } from 'react';
import Success from '../Tasks/Success.jsx'




export default function SignIn() {
   
 const [formData, setFormData] = useState({})
 const {loading , error} = useSelector(state => state.user)
 const [showSuccess, setShowSuccess] = useState(false); // New state for success popup
 const dispatch = useDispatch()
 const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({...formData , [e.target.id] : e.target.value})
  }

  const handlerSubmit = async (e) => {
    e.preventDefault()
    try {
       dispatch(signInStart())
       const res = await fetch('http://localhost:5000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
       })
       const data = await res.json()
       if(data.success === false){
        dispatch(signInFailure(data.message || "Failed to sign in. Please try again."))
        return
       }
        dispatch(singInSuccess(data))
         // Show the Success component
      setShowSuccess(true);

      // Set a timeout to hide the Success component after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        // Navigate to '/signin' after hiding the Success component
        navigate('/');
      }, 5000);
    } catch (error) {
      dispatch(signInFailure(error.message || "Failed to sign in. Please try again."))
    }
  }


  return (
    <div className="bg-blue-100  mainBody">
       <div className="newproductgrid max-w-7xl mx-auto rounded-3xl">
        <div className="firstDiv p-3">
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
          
          <Link to='/signup'>
          <div className="mt-5 flex justify-end pr-5">
          <Tooltip title="Click here to create an account" arrow placement='left'>
            <Button variant="contained">Sing up</Button>
            </Tooltip>
          </div>
          </Link>

          <form onSubmit={handlerSubmit} className="mt-44 w-full flex flex-col  items-center gap-3">
           <div className="flex pr-80 uppercase text-xl font-bold">
           <h1 className="">Sing in here</h1>
           </div>
          <TextField  label="set your email" required className="w-2/3" id="email" onChange={handleChange} variant='outlined' type='email'/>
          <TextField  label="set your password" id="password" onChange={handleChange} helperText="don't share your password" className="w-2/3" variant='outlined' type='password'/>
          <Button type="submit" variant="contained" disabled={loading}>{loading ? 'loading...' : 'Sing-in'}</Button>
          </form>
          {showSuccess && <Success />} {/* Show success popup */}
        </div>
        {error && <p className='text-red-500 text-center mt-3'>{error}</p>}
        </div>
    </div>
  )
}
