import { TbWorldShare } from "react-icons/tb";
import pageImg from "../Img/cheerful.png";
import { TextField, Button, Tooltip } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart, singInSuccess, signInFailure } from '../redux/user/userSlice.js'
import { useState, } from 'react';
import Success from '../Tasks/Success.jsx'
import Errors from "../Errors/Errors.jsx";
import Load from "../Animations/Load.jsx";




export default function SignIn() {

  const [formData, setFormData] = useState({})
  const { loading } = useSelector(state => state.user && state.user.user)
  const [showError, setShowError] = useState(false); // New state for error popup
  const [showSuccess, setShowSuccess] = useState(false); // New state for success popup
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handlerSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(signInStart())

      const res = await fetch('https://blogs-sharing-ideas-api.onrender.com/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(signInFailure(setShowError(true)))
        return
      }
      dispatch(singInSuccess(data))
      // Show the Success component
      setShowSuccess(true);
      setShowError(false); // Hide the Error component

      // Set a timeout to hide the Success component after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        // Navigate to '/signin' after hiding the Success component
        navigate('/');
      }, 5000);
    } catch (error) {
      setShowError(true); // Show the Error component
      dispatch(signInFailure(setShowError(true)))
    }
  }


  return (
    <div className="bg-blue-100  mainBody">
      <div className="newproductgrid max-w-7xl mx-auto rounded-3xl">
        <div className="firstDiv p-3 noneget">
          <div className="flex items-center gap-1 pl-3">
            <TbWorldShare className="text-2xl text-white" />
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
            <div className="flex ml-20 uppercase text-xl font-bold w-full">
              <h1 className="noneget">Sing in here</h1>
            </div>
            <TextField label="set your email" required className="w-2/3" id="email" onChange={handleChange} variant='outlined' type='email' />
            <TextField label="set your password" id="password" onChange={handleChange} helperText="don't share your password" className="w-2/3" variant='outlined' type='password' />
            <Button type="submit" variant="contained" disabled={loading}>{
              loading ?
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xs"><Load/></span>
                  <p>Loading...</p>
                </div> : "Sing-In now"
            }
            </Button>
          </form>
          {showSuccess && <Success />} {/* Show success popup */}
        </div>
        {showError && <Errors />}
      </div>
    </div>
  )
}
