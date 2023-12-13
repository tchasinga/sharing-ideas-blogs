import { MdScreenShare } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Hearder() {
  
  const currentUser = useSelector((state) => state.user && state.user.user.currentUser);

  return (
    <div className="px-32  p-2 w-full">
       <div className="flex justify-between items-center flex-wrap">
       <Link to="/">
           <div className="flex items-center cursor-pointer gap-2">
             <MdScreenShare className="text-3xl"/>
             <h3 className="text-1xl font-bold cursor-pointer">Shar<span className='text-blue-400'>ing</span></h3>
           </div>
       </Link>

           <form className="bg-slate-100 p-3 rounded-lg flex items-center">
             <input type="text" className="focus:outline-none bg-transparent" placeholder="Search" />
            <button className="w-full">
              <FaSearch />
            </button>
           </form>

           <div className="">
            <ul className="flex gap-3 items-center">

             <Link to="/">
             <li className="hover:font-semibold">Home</li>
             </Link>

            <Link to="/about">
            <li className="hover:font-semibold">About</li>
            </Link>

            <Link to="/signin">
            {currentUser ? (
            <li>
             <img src={currentUser.user.avatar} alt="avatar" className="w-7 h-7 rounded-full object-cover" />
            </li>
            ) : (
              <li>Sign in</li>
            )}
            </Link>
            </ul>
           </div>

       </div>
    </div>
  )
}
