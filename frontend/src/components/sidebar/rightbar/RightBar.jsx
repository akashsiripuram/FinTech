import { useEffect, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { FaUserAlt } from "react-icons/fa";
import { fetchProtectedData } from "../../../services/authService";

export default function RightBar() {
  const [data, setData] = useState(null); // Data fetched from the API
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state to handle fetching errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading
        setError(null); // Reset any previous errors
        const result = await fetchProtectedData(); // Fetch the data
        console.log(result)
        localStorage.setItem("user", JSON.stringify(result));
        setData(result); // Set the fetched data
      } catch (error) {
        setError("Error fetching data"); // Handle any errors during fetching
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData(); // Call fetchData on mount
  }, []); // Empty dependency array ensures this runs once when the component mounts

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

          {loading ? (
            <div>Loading...</div> // Show loading state while fetching
          ) : error ? (
            <div className="text-red-500">{error}</div> // Show error message if fetching fails
          ) : data ? (
            <>
              <div className="font-medium text-xs mt-2">{data.user.fullName}</div>
              <div className="font-light text-[0.5rem] text-gray-500">{data.user.email}</div>
            </>
          ) : (
            <div>No user found</div> // Fallback if no data is returned
          )}
        </div>
      </div>
    </div>
  );
}
