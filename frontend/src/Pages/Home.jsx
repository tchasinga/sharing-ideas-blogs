import Oneimg from '../Img/pexels-christina-morillo-1181259.jpg'

export default function Home() {
  return (
    <div className='px-10'>
      <div className="h-[750px] relative object-cover w-full rounded-3xl mb-6" style={{background: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0)), url(${Oneimg}) center no-repeat`, backgroundSize: "cover",}}>
      <div className="text-white  absolute bottom-12 right-0 left-0 px-10 font-normal">
           <p className='text-sm text-gray-400'>The fucture live in communication</p>
           <h1 className='font-normal text-4xl'>Welcom to our global ideas sharing</h1>
           <h3 className="text-xs text-gray-500 flex justify-start mt-2 bg-black">Share your knowledge in different domain</h3>
        </div>
      </div>
    </div>
  )
}
