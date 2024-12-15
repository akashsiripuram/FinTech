import { MdDashboard } from "react-icons/md";
import { FaMoneyBillWave, FaQuestionCircle } from "react-icons/fa";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { BiTargetLock } from "react-icons/bi";
import { RiWallet3Line, RiLogoutBoxRLine } from "react-icons/ri";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";

export default function LeftBar() {
  return (
    <div className="left-bar flex flex-col h-screen  shadow-lg ">
      {/* Title */}
      <div className="title text-2xl font-bold text-[#702DFF] p-4 text-center">
        FinTech
      </div>

      {/* Overview Section */}
      <div className="overview flex flex-col space-y-2 px-4 mt-4">
        <div className="text-gray-500 text-xs">OVERVIEW</div>
        <ul className="space-y-2">
          <li className="flex items-center space-x-2 text-sm cursor-pointer p-2 hover:text-[#702DFF]">
            <MdDashboard />
            <span>Dashboard</span>
          </li>
          <li className="flex items-center space-x-2 text-sm cursor-pointer p-2 hover:text-[#702DFF]">
            <FaMoneyBillWave />
            <span>Expenses</span>
          </li>
          <li className="flex items-center space-x-2 text-sm cursor-pointer p-2 hover:text-[#702DFF]">
            <AiOutlineDollarCircle />
            <span>Income</span>
          </li>
          <li className="flex items-center space-x-2 text-sm cursor-pointer p-2 hover:text-[#702DFF]">
            <BiTargetLock />
            <span>Savings</span>
          </li>
          <li className="flex items-center space-x-2 text-sm cursor-pointer p-2 hover:text-[#702DFF]">
            <RiWallet3Line />
            <span>Budgets</span>
          </li>
          <li className="flex items-center space-x-2 text-sm cursor-pointer p-2 hover:text-[#702DFF]">
            <HiOutlineDocumentReport />
            <span>Reports</span>
          </li>
        </ul>
      </div>

      <div className="notifications flex flex-col space-y-2 px-4 mt-6">
        <div className="text-gray-500 text-xs">SETTINGS</div>
        <ul className="space-y-2">
          <li className="flex items-center space-x-2 text-sm cursor-pointer p-2 hover:text-[#702DFF]">
            <IoNotificationsOutline />
            <span>Notifications</span>
          </li>
          <li className="flex items-center space-x-2 text-sm cursor-pointer p-2 hover:text-[#702DFF]">
            <FiSettings />
            <span>Settings</span>
          </li>
          <li className="flex items-center space-x-2 text-sm cursor-pointer p-2 hover:text-[#702DFF]">
            <FaQuestionCircle />
            <span>Help & Support</span>
          </li>
        </ul>
      </div>

      {/* Logout Section */}
      <div className="logout mt-auto px-4 mb-6">
        <ul className="space-y-2">
          <li className="flex items-center space-x-2 text-sm cursor-pointer p-2 hover:text-[#702DFF]">
            <RiLogoutBoxRLine />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
