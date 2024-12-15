import { SlOptionsVertical } from "react-icons/sl";
import { FaUserAlt } from "react-icons/fa";


export default function RightBar() {
    return (
        <div className="right-bar h-screen w-full p-2 flex flex-col h-screen">
            <div className="profile flex flex-col w-full h-1/3">
                {/* Profile Header */}
                <div className="profile-headline flex flex-row items-center justify-between mb-3">
                    <span className="flex-grow text-sm font-semibold">Profile</span>
                    <SlOptionsVertical className="text-lg cursor-pointer" />
                </div>

                {/* Profile Section */}
                <div className="profile-container flex flex-col items-center text-center mt-4">
                    <div
                        className="rounded-full border-[1px] h-16 w-16 p-1 bg-gray-100"
                        style={{
                            background: "conic-gradient(#702DFF 35%, #CCCCCC 0)",
                        }}
                    >
                        <FaUserAlt className="text-xl rounded-full border-[1px] h-full w-full p-3 bg-white" />
                    </div>
                    <div className="font-medium text-xs mt-2">John Doe</div>
                    <div className="font-light text-[0.5rem] text-gray-500">Save today, secure tomorrow.</div>
                    <div className="mt-2">
                        <button className="text-xs text-[#702DFF]">Edit Profile &gt;</button>
                    </div>
                </div>

                {/* Stacked Bar Chart */}
                
                <div className="recent-transactions h-1/3">
                
                </div>
            </div>
        </div>
    );
}
