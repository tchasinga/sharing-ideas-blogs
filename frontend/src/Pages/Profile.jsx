import {useSelector, useDispatch} from 'react-redux';
import { CiEdit } from "react-icons/ci";
import {Tooltip} from '@mui/material';
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import {signOutUserFailure, signOutUserStart, signOutUserSuccess , deleteUserStart,deleteUserSuccess,deleteUserFailure, } from '../redux/user/userSlice.js'
import { MdCreateNewFolder } from "react-icons/md";
import { BiShowAlt } from "react-icons/bi";
import { useState } from 'react';

export default function Profile() {
  const dispatch = useDispatch();
const currentUser = useSelector((state) => state.user && state.user.user.currentUser)
const [showSharingiErrors, setshowSharingErrors] = useState(false);
const [userSharing, setUserSharings] = useState([]);
// const [setFormData] = useState({});



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
// Showing all data which was created by the specic user
const handlerShowSharing = async() => {
  try {
    setshowSharingErrors(false);
    const res = await fetch(`http://localhost:5000/api/user/getsharing/${currentUser.user._id}`);
    const data = await res.json();
    if(data.success === true) {

      setshowSharingErrors(true);
      return;
    }
    setUserSharings(data);
    setshowSharingErrors(false);
    console.log(data);
    
    
  } catch (error) {
    showSharingiErrors(true);
  }
}

// Deleting the Sharing Information
const handlerListingDelete = async(sharingId) => {
  try {
    const res = await fetch(`http://localhost:5000/api/sharing/deleteideas/${sharingId}`, {
      method: 'DELETE',
    })
    const data = await res.json();
    if(data.success === true) {
      console.log(data.success);
      return;
    }
    setUserSharings((prev) => prev.filter((item) => item._id !== sharingId));
  } catch (error) {
    console.error(error);
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
              
              <div className="flex flex-wrap gap-5 items-center border-b-2 pb-3">
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

               <div className="w-full flex gap-3">
               <Link to='/createSharing'>
               <div className='flex items-center justify-center cursor-pointer newpadding bg-green-300 p-3 gap-1 mt-3 rounded-2xl'>
                <MdCreateNewFolder className='text-3xl'/>
                 <h1 className='cursor-pointer'>Create an idea</h1> 
               </div>
              </Link>
              <div onClick={handlerShowSharing} className='flex items-center  cursor-pointer bg-yellow-100 hover:bg-green-950 hover:text-white p-3 gap-1 mt-3 mypading rounded-2xl'>
                <BiShowAlt className='text-3xl'/>
                 <h1 className='cursor-pointer'>Show all your ideas</h1> 
               </div>
               </div>
           </div>
        </div>

        {/* get all  the user listings */}

        {userSharing && userSharing.map((sharing) => {
      return (
         <div key={sharing._id} className="border rounded-lg p-3 flex justify-between items-center gap-3 mb-2">
           <Link  to={`/sharingdeteals/${sharing._id}`}>
         <img className="h-16 w-16 object-contain rounded" src={sharing.imageUrls[0]} alt="listImg" />
       </Link>
       <Link className="text-slate-700 text-sm font-medium truncate flex-1" to={`/sharingdeteals/${sharing._id}`}>
         <p className="">{sharing.name}</p>
       </Link>

          <div className="flex flex-col items-center">
            <button onClick={()=>handlerListingDelete(sharing._id)} className="text-red-700 uppercase">Delete</button>
           <Link to={`/updating-sharing/${sharing._id}`}>
           <button className="text-blue-700 uppercase">Edit...</button>
           </Link>
          </div>
       </div>
      );
    })}
    </div>
  )
}
