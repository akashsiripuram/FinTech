import { useState } from "react";
import "./login.css";
import axios from "axios";

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(false);

        const formData = new FormData(e.target);
        const username = formData.get("username");
        const password = formData.get("password");
        
        try {
            const axiosInstance = axios.create({
                baseURL: "http://localhost:3000/api",
                withCredentials: true,
            });
            const response = await axiosInstance.post("/login", { username, password });
            console.log(response.data);
        } catch (e) {
            setError(true);
            console.error(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login flex items-center justify-center h-screen bg-gray-100">
            <div className="login-container border-2 rounded-3xl shadow-lg h-[80vh] w-[60vw] flex flex-col p-4">
                <div className="project-name text-[#702DFF] font-bold m-2 text-3xl">FinTech</div>
                <div className="flex flex-row justify-around space-x-2 p-6">
                    {/* login form */}
                    <div className="login-form flex flex-col justify-between space-y-4 w-1/2">
                        <div className="flex flex-col space-y-1">
                            <h1 className="text-2xl font-semibold">Login</h1>
                            <h3 className="text-[0.6rem] text-gray-700">Login to access your expenses</h3>
                        </div>
                        <form onSubmit={handleSubmit} className="input-grp flex flex-col space-y-1">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                id="email"
                                className="bg-transparent border-[1px] rounded-md focus:outline-none px-3 py-1"
                                name="username"
                                placeholder="username"
                                required
                            />
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="bg-transparent border-[1px] rounded-md focus:outline-none px-3 py-1"
                                name="password"
                                placeholder="Password"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-[#702DFF] rounded-md py-1 text-white"
                                disabled={isLoading}
                            >
                                {isLoading ? "Loading..." : "Login"}
                            </button>
                        </form>
                        {error && (
                            <div className="text-red-500 text-xs text-center mt-2">
                                Login failed. Please try again.
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
                    {/* image container */}
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
