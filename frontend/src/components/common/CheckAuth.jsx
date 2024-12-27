import { Navigate, useLocation } from "react-router-dom";
import {toast} from "react-hot-toast";

// eslint-disable-next-line react/prop-types
function CheckAuth({ isAuthenticated, isLoading, children }) {
  const location = useLocation();

  // Do not process logic until loading is completed
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  // Allow public access to the homepage
  if (location.pathname === "/") {
    return <>{children}</>;
  }

  // Handle authentication routes
  if (location.pathname.startsWith("/auth")) {
    return isAuthenticated ? <Navigate to="/user/dashboard" /> : <>{children}</>;
  }

  // Handle protected routes
  if (location.pathname.startsWith("/user")) {
    if(isAuthenticated){
return <>{children}</>
    }
    else{
      toast.error("You are not authenticated");
      return <Navigate to="/auth/login" />;
    }
    
  }

  // Default fallback
  return <Navigate to="/" />;
}

export default CheckAuth;
