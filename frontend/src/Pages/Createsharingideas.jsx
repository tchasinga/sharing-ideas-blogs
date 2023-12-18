import {useSelector} from 'react-redux'
import { MdWavingHand } from "react-icons/md";

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
      <form className="mt-3 gridsystem">
        <div className='bg-blue-950 text-white p-2'>1</div>
        <div className='bg-slate-500 text-white p-2'>2</div>
        <div className='bg-yellow-950 text-white p-2'>3</div>
        <div className='bg-green-950 text-white p-2'>4</div>
        <div className='bg-red-950 text-white p-2'>5</div>
        <div className='bg-blue-200 text-white p-2'>6</div>
        <div className='bg-blue-500 text-white p-2'>7</div>
      </form>
    </main>
  )
}
