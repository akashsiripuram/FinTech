import { NavLink, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaMoneyBillWave, FaQuestionCircle } from "react-icons/fa";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { BiTargetLock } from "react-icons/bi";
import { RiWallet3Line, RiLogoutBoxRLine } from "react-icons/ri";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/authSlice";
import { toast } from "react-hot-toast";

export default function LeftBar() {
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logoutUser())
      .then((data) => {
        if (data?.payload?.success) {
          toast.success(data.payload.message || "Logout successful!");
          navigate("/");
        } else {
          toast.error(
            data?.payload?.message || "Error."
          ); 
        }
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message ||
            "Something went wrong. Please try again."
        ); // Handle unexpected errors
      });
  };

  return (
    <div className="left-bar flex flex-col h-screen shadow-lg">
      <div className="title text-2xl font-bold text-[#702DFF] p-4 text-center">
        FinTech
      </div>

      <div className="overview flex flex-col space-y-2 px-4 mt-4">
        <div className="text-gray-500 text-xs">OVERVIEW</div>
        <ul className="space-y-2">
          <NavLink
            to="/user/dashboard"
            className={({ isActive }) =>
              `flex items-center space-x-2 text-sm cursor-pointer p-2 ${
                isActive ? "text-[#702DFF]" : "text-gray-600"
              }`
            }>
            <MdDashboard />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/user/expenses"
            className={({ isActive }) =>
              `flex items-center space-x-2 text-sm cursor-pointer p-2 ${
                isActive ? "text-[#702DFF]" : "text-gray-600"
              }`
            }>
            <FaMoneyBillWave />
            <span>Expenses</span>
          </NavLink>

          <NavLink
            to="/user/income"
            className={({ isActive }) =>
              `flex items-center space-x-2 text-sm cursor-pointer p-2 ${
                isActive ? "text-[#702DFF]" : "text-gray-600"
              }`
            }>
            <AiOutlineDollarCircle />
            <span>Income</span>
          </NavLink>

          <NavLink
            to="/user/savings"
            className={({ isActive }) =>
              `flex items-center space-x-2 text-sm cursor-pointer p-2 ${
                isActive ? "text-[#702DFF]" : "text-gray-600"
              }`
            }>
            <BiTargetLock />
            <span>Savings</span>
          </NavLink>

          <NavLink
            to="/user/budgets"
            className={({ isActive }) =>
              `flex items-center space-x-2 text-sm cursor-pointer p-2 ${
                isActive ? "text-[#702DFF]" : "text-gray-600"
              }`
            }>
            <RiWallet3Line />
            <span>Budgets</span>
          </NavLink>

          <NavLink
            to="/user/reports"
            className={({ isActive }) =>
              `flex items-center space-x-2 text-sm cursor-pointer p-2 ${
                isActive ? "text-[#702DFF]" : "text-gray-600"
              }`
            }>
            <HiOutlineDocumentReport />
            <span>Reports</span>
          </NavLink>
        </ul>
      </div>

      <div className="notifications flex flex-col space-y-2 px-4 mt-6">
        <div className="text-gray-500 text-xs">SETTINGS</div>
        <ul className="space-y-2">
          <NavLink
            to="/user/notifications"
            className={({ isActive }) =>
              `flex items-center space-x-2 text-sm cursor-pointer p-2 ${
                isActive ? "text-[#702DFF]" : "text-gray-600"
              }`
            }>
            <IoNotificationsOutline />
            <span>Notifications</span>
          </NavLink>

          <NavLink
            to="/user/settings"
            className={({ isActive }) =>
              `flex items-center space-x-2 text-sm cursor-pointer p-2 ${
                isActive ? "text-[#702DFF]" : "text-gray-600"
              }`
            }>
            <FiSettings />
            <span>Settings</span>
          </NavLink>

          <NavLink
            to="/user/help"
            className={({ isActive }) =>
              `flex items-center space-x-2 text-sm cursor-pointer p-2 ${
                isActive ? "text-[#702DFF]" : "text-gray-600"
              }`
            }>
            <FaQuestionCircle />
            <span>Help & Support</span>
          </NavLink>
        </ul>
      </div>

      <div className="logout mt-auto px-4 mb-6">
        <ul className="space-y-2">
          <li
            className="flex items-center space-x-2 text-sm cursor-pointer p-2"
            onClick={handleLogout}>
            <RiLogoutBoxRLine />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
