import Looser from "../Tasks/Looser";

export default function Errors() {
  return (
    <div className="flex items-center justify-center flex-col gap-2 Successigner bg-red-100">
      <div className="">
          <Looser/>
      </div>
     <div>
     <p className="text-slate-950 text-xs">Please check your Password or email</p>
     </div>
  </div>
  )
}
