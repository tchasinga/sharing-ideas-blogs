import { useSelector } from "react-redux";

export default function NoFound() {

    const currentUser = useSelector((state) => state.user && state.user.user.currentUser);
  return (
    <div className="centeringDiv text-5xl font-bold">
        <h1>404 Page Not Found</h1>
        <h2 className="text-xs text-gray-600 mt-3">Sorry, this page does not exist, <span className="text-red-900">{currentUser.user.username}</span></h2>
    </div>
  )
}
