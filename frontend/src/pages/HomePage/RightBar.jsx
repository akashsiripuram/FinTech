import { SlOptionsVertical } from "react-icons/sl";
import { FaUserAlt } from "react-icons/fa";



export default function RightBar({user}) {
  return (
    <div className="right-bar h-screen w-full p-2 flex flex-col">
      <div className="profile flex flex-col w-full h-1/3">
        <div className="profile-headline flex flex-row items-center justify-between mb-3">
          <span className="flex-grow text-sm font-semibold">Profile</span>
          <SlOptionsVertical className="text-lg cursor-pointer" />
        </div>

        <div className="profile-container flex flex-col items-center text-center mt-4">
          <div
            className="rounded-full border-[1px] h-16 w-16 p-1 bg-gray-100"
            style={{ background: "conic-gradient(#702DFF 35%, #CCCCCC 0)" }}
          >
            <FaUserAlt className="text-xl rounded-full border-[1px] h-full w-full p-3 bg-white" />
          </div>

          
              <div className="font-medium text-xs mt-2">{user.fullName}</div>
              <div className="font-light text-[0.5rem] text-gray-500">{user.email}</div>
           
        </div>
      </div>
    </div>
  );
}
