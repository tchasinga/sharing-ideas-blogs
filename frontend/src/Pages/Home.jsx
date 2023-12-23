import Oneimg from '../Img/pexels-christina-morillo-1181259.jpg'
import {useSelector} from 'react-redux';

export default function Home() {
  const currentUser = useSelector((state) => state.user && state.user.user.currentUser)


  return (
    <div className='px-10 w-full'>
     {currentUser ? (
         <div className="h-[750px] relative object-cover w-full rounded-3xl mb-6" style={{background: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0)), url(${Oneimg}) center no-repeat`, backgroundSize: "cover",}}>
         <div className="text-white flex flex-col absolute bottom-12 right-0 left-0 px-10 font-normal">
              <p className='text-sm text-gray-400'>The fucture live in communication</p>
              <h1 className='font-normal text-4xl'>Welcom to global sharing {currentUser.user.username}</h1>
              <h3 className="text-xs text-gray-500 flex justify-start my-2 bg-black">Share your knowledge in different domain</h3>
            <div className="">
            <p className='text-xs text-white flex'>Let&apos;us thing out of way: you dont&apos;t need a fancy Bachelor&apos;s Degree to get into</p>
              <p className='text-xs text-white flex'>Product Design. we sat down franckie to talk about gatekeeping in </p>
              <p className='text-xs text-white flex'>the design industry and how to get started in product design.</p>
            </div>
           </div>
         </div>
     ) : (
      <div className="h-[750px] relative object-cover w-full rounded-3xl mb-6" style={{background: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0)), url(${Oneimg}) center no-repeat`, backgroundSize: "cover",}}>
      <div className="text-white flex flex-col absolute bottom-12 right-0 left-0 px-10 font-normal">
           <p className='text-sm text-gray-400'>The fucture live in communication</p>
           <h1 className='font-normal text-4xl'>Welcom to our global ideas sharing</h1>
           <h3 className="text-xs text-gray-500 flex justify-start my-2 bg-black">Share your knowledge in different domain</h3>
         <div className="">
         <p className='text-xs text-white flex'>Let&apos;us thing out of way: you dont&apos;t need a fancy Bachelor&apos;s Degree to get into</p>
           <p className='text-xs text-white flex'>Product Design. we sat down franckie to talk about gatekeeping in </p>
           <p className='text-xs text-white flex'>the design industry and how to get started in product design.</p>
         </div>
        </div>
      </div>
     )}
     
     
    </div>
  )
}
