import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    async function loginUser(e) {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
    
        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
    
            // Check if the response status is ok
            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            // Parse the JSON response
            const data = await response.json();
            console.log(data); // Check the response data
    
            if (data.token) {
                alert("Login successful");
                localStorage.setItem("token", data.token); // Store token in localStorage
                navigate("/dashboard");
            } else {
                throw new Error(data.message || "Login failed");
            }
        } catch (err) {
            console.error(err); // Log the error for debugging
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }
    

    

    return (
        <div className="login flex items-center justify-center h-screen bg-gray-100">
            <div className="login-container border-2 rounded-3xl shadow-lg h-[80vh] w-[60vw] flex flex-col p-4">
                <div className="project-name text-[#702DFF] font-bold m-2 text-3xl">FinTech</div>
                <div className="flex flex-row justify-around space-x-2 p-6">
                    {/* Login form */}
                    <div className="login-form flex flex-col justify-between space-y-4 w-1/2">
                        <div className="flex flex-col space-y-1">
                            <h1 className="text-2xl font-semibold">Login</h1>
                            <h3 className="text-[0.6rem] text-gray-700">
                                Login to access your expenses
                            </h3>
                        </div>
                        <form onSubmit={loginUser} className="input-grp flex flex-col space-y-1">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                id="email"
                                className="bg-transparent border-[1px] rounded-md focus:outline-none px-3 py-1"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                                required
                            />
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="bg-transparent border-[1px] rounded-md focus:outline-none px-3 py-1"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />
                            <button
                                type="submit"
                                className={`bg-[#702DFF] rounded-md py-1 text-white ${
                                    isLoading ? "opacity-50" : ""
                                }`}
                                disabled={isLoading}
                            >
                                {isLoading ? "Loading..." : "Login"}
                            </button>
                        </form>
                        {error && (
                            <div className="text-red-500 text-xs text-center mt-2">
                                {error}
                            </div>
                        )}
                        <div className="text-center text-xs">
                            Don&apos;t have an account?{" "}
                            <a href="#" className="text-red-500">
                                Sign Up
                            </a>
                        </div>
                        <div className="text-center text-xs text-red-500">Forgot Password?</div>
                    </div>
                    {/* Image container */}
                    <div className="image-container w-1/2">
                        <img
                            src="/login-vector.png"
                            className="rounded-3xl h-[inherit] p-2"
                            alt="login-image"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
