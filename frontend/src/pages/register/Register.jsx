import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.status === "ok") {
        // Save token in localStorage and redirect to the homepage or dashboard
        localStorage.setItem("token", data.token);
        navigate("/dashboard"); // Redirect to the homepage or any other page
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setError(error.message || "An error occurred during registration.");
    } finally {
      setIsLoading(false);
    }
};


  return (
    <div className="register flex items-center justify-center min-h-screen bg-gray-100 overflow-y-scroll">
      <div className="login-container border-2 rounded-3xl shadow-lg h-[fit-content] lg:h-[80vh] w-[60vw] flex flex-col p-4 pt-0">
        <div className="project-name text-[#702DFF] font-bold m-2 text-3xl">FinTech</div>
        <div className="flex flex-row justify-around space-x-2 p-6">
          {/* Image container */}
          <div className="hidden md:block image-container md:w-1/2">
            <img
              src="/login-vector.png"
              className="rounded-3xl h-[inherit] p-2"
              alt="login-image"
            />
          </div>
          {/* Registration form */}
          <div className="login-form flex flex-col justify-between space-y-4 md:w-1/2">
            <div className="flex flex-col space-y-1">
              <h1 className="text-2xl font-semibold">Sign up</h1>
              <h3 className="text-[0.6rem] text-gray-700">Create an account</h3>
            </div>
            <form onSubmit={handleRegister} className="input-grp flex flex-col space-y-1">
              <div className="flex flex-col lg:flex-row lg:space-x-2">
                <div className="flex flex-col">
                  <label htmlFor="firstname" className="text-xs">Firstname</label>
                  <input
                    type="text"
                    className="bg-transparent border-[1px] rounded-md focus:outline-none px-3 py-1 text-xs"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder="Firstname"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="lastname" className="text-xs">Lastname</label>
                  <input
                    type="text"
                    className="bg-transparent border-[1px] rounded-md focus:outline-none px-3 py-1 text-xs"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder="Lastname"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row lg:space-x-2">
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-xs">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="bg-transparent border-[1px] rounded-md focus:outline-none px-3 py-1 text-xs"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="phone" className="text-xs">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    className="bg-transparent border-[1px] rounded-md focus:outline-none px-3 py-1 text-xs"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    required
                  />
                </div>
              </div>

              <label htmlFor="username" className="text-xs">Username</label>
              <input
                type="text"
                name="username"
                className="bg-transparent border-[1px] rounded-md focus:outline-none px-3 py-1 text-xs"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
              />

              <label htmlFor="password" className="text-xs">Password</label>
              <input
                type="password"
                name="password"
                className="bg-transparent border-[1px] rounded-md focus:outline-none px-3 py-1 text-xs"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />

              <label htmlFor="confirmPassword" className="text-xs">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="bg-transparent border-[1px] rounded-md focus:outline-none px-3 py-1 text-xs"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
              />

              <button
                type="submit"
                className={`bg-[#702DFF] rounded-md py-1 text-white text-xs ${isLoading ? "opacity-50" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Create Account"}
              </button>
            </form>

            {error && (
              <div className="text-red-500 text-xs text-center mt-2">{error}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
