import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    
    <div className="flex flex-row justify-between items-center py-4 px-6 bg-[#702DFF] w-screen">
      <div className="flex items-center space-x-2">
        <span className="text-white text-2xl font-bold">FinTech</span>
      </div>

      <div className="flex space-x-7 items-center">
        <Link to="/" className="list-none cursor-pointer font-semibold text-white py-1">
          Home
        </Link>
        <Link to="/auth/login" className="list-none cursor-pointer font-semibold text-white py-1">
          Login
        </Link>
        <Link
          to="/auth/register"
          className="list-none cursor-pointer font-semibold py-1 bg-white text-[#702DFF] rounded-3xl px-4"
        >
          Signup
        </Link>
      </div>
    </div>
  
  );
}
