import {useSelector, useDispatch} from 'react-redux';
import { CiEdit } from "react-icons/ci";
import {Tooltip} from '@mui/material';
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import {signOutUserFailure, signOutUserStart, signOutUserSuccess , deleteUserStart,deleteUserSuccess,deleteUserFailure, } from '../redux/user/userSlice.js'



export default function Profile() {
  const dispatch = useDispatch();
const currentUser = useSelector((state) => state.user && state.user.user.currentUser)


// Adding singout functionality (this function are used to singout the user...)
const handlerSingout = async() => {
  try {
    dispatch(signOutUserStart());
    const res = await fetch('http://localhost:5000/api/auth/signout')
    const data = await res.json();

    if(data.success === false) {
      dispatch(signOutUserFailure(data.message));
      return;
    }
    dispatch(signOutUserSuccess(data));
  } catch (error) {
    console.error(error);
    dispatch(signOutUserFailure(error.message));
  }
}

// Adding delete functionality (this function are used to delete the user...)
const handlerdeleleAccount = async() => {
  try {
    const  res = await fetch(`http://localhost:5000/api/user/delete/${currentUser.user._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentUser),
    })
    const data = await res.json();
    if(data.success === true) {
      dispatch(deleteUserStart(data.message));
      return;
    }
    dispatch(deleteUserSuccess(data));
    deleteUserSuccess(true);
  } catch (error) {
    console.error(error);
    dispatch(deleteUserFailure(error.message)); 
  }
}




  return (
    <div className="max-w-4xl mx-auto mt-10 ">
        <div className="flex w-full p-2 gap-9">
        <div className="flex flex-col gap-0  ">
          <div className="">
            <div className="flex flex-col">
            <Link to='/editprofile'>
            <Tooltip title="click here to edit your profile" arrow placement="left">
               <img src={currentUser.user.avatar} alt="avatar"  className="w-24 h-24 rounded-full object-cover cursor-pointer self-center my-2 " />
              </Tooltip>
              </Link>
              <div className="flex flex-col gap-2">
               <h2 className='bg-blue-800 px-5  p-2 rounded-full font-normal text-sm text-white'>Connect to linkedIn</h2>

             <Link to='/editprofile'>
             <Tooltip title="click here to edit your profile" arrow placement="bottom">
             <ul className="flex items-center gap-2 text-gray-500 ">
                <li className='cursor-pointer'>
                <CiEdit/>
                </li>
                <li>
                  <p className='text-xs cursor-pointer'>Update your profile</p>
                </li>
               </ul>
              </Tooltip>
              </Link>

              </div>
            </div>
          </div>
        </div>

           <div className="flex flex-col flex-1">
              <div className="mb-5 flex justify-between">
            <h1 className='text-2xl flex font-light '>My Profile</h1>
               <div className="flex gap-5 text-sm items-center">
                <h1 onClick={handlerSingout} className='text-green-800 cursor-pointer'>Singout</h1>
                <Tooltip title="click here to delete your account" arrow placement="bottom">
                <button onClick={handlerdeleleAccount} className="bg-red-500 p-2 rounded-full text-black"><MdDelete /></button>
                </Tooltip>
               </div>
              </div>
              
              <div className="flex flex-wrap gap-5 items-center">
                  <div className="">
                    <h1 className='text-sm font-light'>Name</h1>
                    <h2 className='text-sm bg-gray-200 p-2 pr-10  font-medium'>{currentUser.user.username}</h2>
                  </div>   

                   <div className="">
                    <h1 className='text-sm font-light'>Email</h1>
                    <h2 className='text-sm bg-gray-200 p-2 pr-10  font-medium'>{currentUser.user.email}</h2>
                  </div>   

                   <div className="truncate">
                    <h1 className='text-sm font-light'>Github</h1>
                    <h2 className='text-sm bg-gray-200 p-2 pr-10 font-medium truncate'>Github account</h2>
                  </div>     
               </div>
           </div>
        </div>
    </div>
  )
}
