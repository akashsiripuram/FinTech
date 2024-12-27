import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export default function AuthLayout() {
  return (
    <div className="flex flex-col h-full">
      <Navbar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
} 
