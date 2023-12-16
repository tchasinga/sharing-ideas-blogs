import { TextField } from "@mui/material";
import { MdWavingHand } from "react-icons/md";
import { useSelector } from "react-redux";
import "animate.css";

export default function UpdateProfile() {
  const currentUser = useSelector(
    (state) => state.user && state.user.user.currentUser
  );

  return (
    <div className="max-w-3xl mx-auto mt-20">
      <div className="flex items-center gap-3 w-full">
        <h1 className="text-2xl font-light">Hello</h1>
        <MdWavingHand className="text-2xl text-yellow-600 animate__tada animate__animated" />
        <h1 className="text-2xl font-light">{currentUser.user.username}</h1>,
        <h1 className="text-2xl font-light">Update your Profile here...</h1>
      </div>

      <div className="mt-10">
        <form className="space-y-5">
          <div className="flex flex-col space-y-1">
            <TextField
              variant="outlined"
              type="text"
              name="name"
              id="name"
              className="border border-gray-300 p-2 rounded-md"
              label="Enter your name"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <TextField
              variant="outlined"
              type="email"
              name="email"
              id="email"
              className="border border-gray-300 p-2 rounded-md"
              label="Enter your email"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <TextField
              variant="outlined"
              type="password"
              name="password"
              id="password"
              className="border border-gray-300 p-2 rounded-md"
              label="Enter your password"
            />
          </div>
          <div className="flex justify-center">
            <button className="bg-blue-500 text-white px-5 py-2 rounded-md">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
