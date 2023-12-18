import {useSelector} from 'react-redux'
import { MdWavingHand } from "react-icons/md";
import {TextField} from '@mui/material'

export default function Createsharingideas() {
  const currentUser = useSelector((state) => state.user && state.user.user.currentUser)


  return (
    <main className="max-w-7xl mx-auto">
     <div className="flex items-center gap-3 w-full mt-10">
        <h1 className="text-2xl font-light">Hello</h1>
        <MdWavingHand className="text-2xl text-yellow-600 animate__tada animate__animated" />
        <h1 className="text-2xl font-light">{currentUser.user.username}</h1>,
        <h1 className="text-2xl font-light">Create a new Idea heres</h1>
      </div>
      {/* Form side will be design with grid... system*/}
      <form className="mt-11 gridsystem">
        <div className=' text-black '>
          <TextField type="text" variant='outlined' label="Enter your name here" name="name" id="name" className="border p-2 w-full rounded-md"/>
        </div>
        <div className='text-black'>
          <TextField type="tel"  variant='outlined' label="Enter your phone number here" name="phonenumber" id="phonenumber" className="border p-2 w-full rounded-md"/>
        </div>
        <div className='text-black'>
          <TextField type="text" variant='outlined' label="Enter your email here" name="email" id="email" className="border p-2 w-full rounded-md"/>
        </div>
        <div className='text-black input-group mt-3'>
          <textarea type="text"  required name='description' id='description' autoComplete='off' className='input w-full'/>
          <label className='user-label'>Write the full details of your idea</label>
        </div>
        <div className='text-black'>
          <TextField type="text" variant='outlined'  label="Enter your public function" helperText="Your public function ex : programmer etc.... " name="publicrole" id="publicrole" className="border p-2 w-full rounded-md"/>
        </div>
        <div className='text-black'>
          <TextField type="datetime-local" variant='outlined' name="dateinstert" id="dateinstert" className="border p-2 w-full rounded-md"/>
        </div>
        <div className='text-black'>7</div>
      </form>
    </main>
  )
}
