import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService"; // Import the login function from authService
import "./login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await login({ username, password }); // Pass credentials to login function
      localStorage.setItem("token", data.token); // Save token to localStorage
      setInterval(()=>{
        if(localStorage.getItem("token")){
          navigate("/dashboard");
        }
      })
       // Redirect to dashboard or another page
    } catch (err) {
      setError(err.message); // Handle any errors during login
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login flex items-center justify-center h-screen w-screen bg-gray-100">
      <div className="login-container border-2 rounded-3xl shadow-lg h-[80vh] w-[60vw] flex flex-col p-4">
        <div className="project-name text-[#702DFF] font-bold m-2 text-3xl">FinTech</div>
        <div className="flex flex-row justify-around space-x-2 p-6">
          {/* Login form */}
          <div className="login-form flex flex-col justify-between space-y-4 w-1/2">
            <div className="flex flex-col space-y-1">
              <h1 className="text-2xl font-semibold">Login</h1>
              <h3 className="text-sm text-gray-700">
                Login to access your expenses
              </h3>
            </div>
            <form onSubmit={handleLogin} className="input-grp flex flex-col space-y-1">
              <label htmlFor="username" className="text-sm">Username</label>
              <input
                type="text"
                id="username"
                className="bg-transparent border-[1px] rounded-md focus:outline-none px-3 py-2 text-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
              <label htmlFor="password" className="text-sm">Password</label>
              <input
                type="password"
                id="password"
                className="bg-transparent border-[1px] rounded-md focus:outline-none px-3 py-2 text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <button
                type="submit"
                className={`bg-[#702DFF] rounded-md py-2 text-white font-medium ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>
            {error && (
              <div className="text-red-500 text-xs text-center mt-2">
                {error}
              </div>
            )}
            <div className="text-center text-xs mt-2">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="text-blue-500 underline">
                Sign Up
              </a>
            </div>
            <div className="text-center text-xs text-blue-500 underline mt-1">
              <a href="/forgot-password">Forgot Password?</a>
            </div>
          </div>
          {/* Image container */}
          <div className="image-container w-1/2 flex justify-center items-center">
            <img
              src="/login-vector.png"
              className="rounded-3xl max-h-full p-2"
              alt="Login illustration"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
