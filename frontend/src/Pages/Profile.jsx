import {useSelector} from 'react-redux'


export default function Profile() {
const currentUser = useSelector((state) => state.user && state.user.user.currentUser)



  return (
    <div className="max-w-4xl mx-auto mt-10">
        <div className="">
        <div className="flex flex-col gap-0">
          <div className="">
            <div className="flex flex-col gap-3">
              <img src={currentUser.user.avatar} alt="avatar" className="w-20 h-20 rounded-full object-cover" />
              <div className="">
                <h3 className="text-2xl font-semibold">{currentUser.user.username}</h3>
                <p className="text-gray-500">{currentUser.user.email}</p>
              </div>
            </div>
          </div>
        </div>

           <div className=""></div>
        </div>
    </div>
  )
}
