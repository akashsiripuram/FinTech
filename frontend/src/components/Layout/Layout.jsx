import { Outlet } from "react-router-dom";
import LeftBar from "../sidebar/leftbar/LeftBar";
import RightBar from "../sidebar/rightbar/RightBar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();

  async function populateQuote() {
    try {
      const req = await fetch("http://localhost:3000/api/quote", {
        headers: { "x-access-token": localStorage.getItem("token") },
      });

      if (req.status === 401) {
        // Access token expired
        await refreshAccessToken();
      } else {
        const data = await req.json();
        console.log(data);
      }
    } catch (error) {
      console.error("Failed to fetch quote:", error);
    }
  }

  async function refreshAccessToken() {
    try {
      const req = await fetch("http://localhost:3000/api/refresh", {
        method: "POST",
        credentials: "include", // Sends refresh token cookie
      });

      const data = await req.json();
      if (data.newAccessToken) {
        localStorage.setItem("token", data.newAccessToken);
      } else {
        console.error("Failed to refresh access token");
        navigate("/login");
      }
    } catch (error) {
      console.error("Refresh token failed:", error);
      navigate("/login");
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Allow access to register/login pages without checking for token
    if (!token) {
      if (window.location.pathname !== "/register" && window.location.pathname !== "/login") {
        navigate("/login");  // Redirect to login if trying to access a protected page
      }
      return; // Exit early to avoid further checks
    }

    // Token exists, verify it
    fetch("http://localhost:3000/api/verifyToken", {
      method: "GET",
      headers: {
        "x-access-token": token, // Send the token for verification
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          console.log("Decoded User Info:", data.user); // Use the decoded user info
          localStorage.setItem("user", JSON.stringify(data.user));
          populateQuote();
        } else {
          localStorage.removeItem("token");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Token verification failed:", error);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  return (
    <div className="HomePage flex flex-row w-screen h-screen overflow-y-scroll">
      <div className="w-2/12 shadow-md">
        <LeftBar />
      </div>
      <main className="flex-grow overflow-y-auto max-h-screen">
        {/* This is where the child routes (login/register) will be rendered */}
        <Outlet />
      </main>
      <div className="w-2/12 shadow-md">
        <RightBar />
      </div>
    </div>
  );
}
