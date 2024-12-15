import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaMoneyBillWave, FaQuestionCircle } from "react-icons/fa";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { BiTargetLock } from "react-icons/bi";
import { RiWallet3Line, RiLogoutBoxRLine } from "react-icons/ri";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function LeftBar() {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    document.cookie = "refreshToken=; Max-Age=0"; // Clear refresh token if stored in cookies
    navigate("/login"); // Redirect to login
  };

  return (
    <div className="left-bar flex flex-col h-screen shadow-lg">
      <div className="title text-2xl font-bold text-[#702DFF] p-4 text-center">
        FinTech
      </div>

      <div className="overview flex flex-col space-y-2 px-4 mt-4">
        <div className="text-gray-500 text-xs">OVERVIEW</div>
        <ul className="space-y-2">
          <NavLink to="/dashboard" className="flex items-center space-x-2 text-sm cursor-pointer p-2">
            <MdDashboard />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/expenses" className="flex items-center space-x-2 text-sm cursor-pointer p-2">
            <FaMoneyBillWave />
            <span>Expenses</span>
          </NavLink>

          <NavLink to="/income" className="flex items-center space-x-2 text-sm cursor-pointer p-2">
            <AiOutlineDollarCircle />
            <span>Income</span>
          </NavLink>

          <NavLink to="/savings" className="flex items-center space-x-2 text-sm cursor-pointer p-2">
            <BiTargetLock />
            <span>Savings</span>
          </NavLink>

          <NavLink to="/budgets" className="flex items-center space-x-2 text-sm cursor-pointer p-2">
            <RiWallet3Line />
            <span>Budgets</span>
          </NavLink>

          <NavLink to="/reports" className="flex items-center space-x-2 text-sm cursor-pointer p-2">
            <HiOutlineDocumentReport />
            <span>Reports</span>
          </NavLink>
        </ul>
      </div>

      <div className="notifications flex flex-col space-y-2 px-4 mt-6">
        <div className="text-gray-500 text-xs">SETTINGS</div>
        <ul className="space-y-2">
          <NavLink to="/notifications" className="flex items-center space-x-2 text-sm cursor-pointer p-2">
            <IoNotificationsOutline />
            <span>Notifications</span>
          </NavLink>

          <NavLink to="/settings" className="flex items-center space-x-2 text-sm cursor-pointer p-2">
            <FiSettings />
            <span>Settings</span>
          </NavLink>

          <NavLink to="/help" className="flex items-center space-x-2 text-sm cursor-pointer p-2">
            <FaQuestionCircle />
            <span>Help & Support</span>
          </NavLink>
        </ul>
      </div>

      <div className="logout mt-auto px-4 mb-6">
        <ul className="space-y-2">
          <li className="flex items-center space-x-2 text-sm cursor-pointer p-2" onClick={handleLogout}>
            <RiLogoutBoxRLine />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
