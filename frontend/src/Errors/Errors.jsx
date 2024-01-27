import { useState } from "react";
import Looser from "../Tasks/Looser";
import { MdCancel } from "react-icons/md";

export default function Errors() {

  const [cancelErrorsWindows,  setCancelErrorsWindows] = useState(false)

  const handlerCancleScreeen = () => {
    setCancelErrorsWindows(false)
  }

  return (
    <div>
      {cancelErrorsWindows && (
        <div className="flex max-w-xs mx-auto items-center justify-center flex-col gap-2 Successigner bg-red-100">
          <MdCancel  className="text-black text-xl" onClick={handlerCancleScreeen}/>
          <div className="">
            <Looser/>
          </div>
          <div>
            <p className="text-slate-950 text-xs">Please check your Password or email</p>
          </div>
        </div>
      )}
    </div>
  )
}