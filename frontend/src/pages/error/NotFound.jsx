import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col space-y-4 justify-center items-center min-h-screen min-w-screen">
      <div className="text-7xl font-sans font-bold" style={{ fontFamily: "cursive" }}>
        404
      </div>
      <div className="text-2xl" style={{ fontFamily: "cursive" }}>
        Page Not Found
      </div>
      <button
        onClick={() => navigate(-1)} // Go back to the previous page
        className="bg-purple-400 px-4 py-2 rounded-full text-white"
      >
        Go Back
      </button>
    </div>
  );
}
