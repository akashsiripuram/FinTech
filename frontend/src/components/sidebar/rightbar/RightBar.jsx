import { useEffect, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { FaUserAlt } from "react-icons/fa";

export default function RightBar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set the user from localStorage
      setLoading(false);
      return;
    }

    // Fetch the decoded user data from backend
    fetch("http://localhost:3000/api/verifyToken", {
      method: "GET",
      headers: {
        "x-access-token": token, // Send the token for verification
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user)); // Store the user in localStorage
        } else {
          setUser(null);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching decoded user:", error);
        setUser(null);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    localStorage.removeItem("user");  // Remove user from localStorage
    setUser(null); // Clear the user state
    setLoading(false); // Set loading state after logout
  };

  return (
    <div className="right-bar h-screen w-full p-2 flex flex-col h-screen">
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

          {loading ? (
            <div>Loading...</div> // Show loading state while fetching
          ) : user ? (
            <>
              <div className="font-medium text-xs mt-2">{user.username}</div>
              <div className="font-light text-[0.5rem] text-gray-500">{user.email}</div>
            </>
          ) : (
            <div>No user found</div>
          )}

          <div className="mt-2">
            <button className="text-xs text-[#702DFF]" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
