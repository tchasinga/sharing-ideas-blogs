import {useSelector} from 'react-redux'
import { CiEdit } from "react-icons/ci";
import {Tooltip} from '@mui/material';
import { MdDelete } from "react-icons/md";


export default function Profile() {
const currentUser = useSelector((state) => state.user && state.user.user.currentUser)



  return (
    <div className="max-w-4xl mx-auto mt-10 border">
        <div className="flex w-full p-2 gap-9">
        <div className="flex flex-col gap-0 border ">
          <div className="">
            <div className="flex flex-col">
              <img src={currentUser.user.avatar} alt="avatar" className="w-20  rounded-full object-cover" />
              <div className="flex flex-col gap-2">
               <h2 className='bg-blue-800 px-5  p-2 rounded-full font-normal text-sm text-white'>Connect to linkedIn</h2>

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

              </div>
            </div>
          </div>
        </div>

           <div className="flex flex-col flex-1">
              <div className="mb-5 flex justify-between">
            <h1 className='text-2xl flex font-light '>My Profile</h1>
               <div className="flex gap-5 text-sm items-center">
                <h1 className='text-green-800'>Singout</h1>
                <Tooltip title="click here to delete your account" arrow placement="bottom">
                <button className="bg-red-500 p-2 rounded-full text-black"><MdDelete /></button>
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

                   <div className="">
                    <h1 className='text-sm font-light'>Name</h1>
                    <h2 className='text-sm bg-gray-200 p-2 pr-10  font-medium'>{currentUser.user.username}</h2>
                  </div>           
               </div>
           </div>
        </div>
    </div>
  )
}
