import { TbWorldShare } from "react-icons/tb";
import pageImg from "../Img/cheerful.png";
import { TextField ,Button , Tooltip} from '@mui/material';
import {Link} from 'react-router-dom'




export default function SignIn() {



  
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

          <form action="" className="mt-44 w-full flex flex-col  items-center gap-3">
           <div className="flex pr-80 uppercase text-xl font-bold">
           <h1 className="">Sing in here</h1>
           </div>
          <TextField  label="set your email" className="w-2/3" id="email" variant='outlined' type='email'/>
          <TextField  label="set your password" id="password" helperText="don't share your password" className="w-2/3" variant='outlined' type='password'/>
          <Button type="submit" variant="contained">Sing In now..</Button>
          </form>
        </div>
        </div>
    </div>
  )
}
