import "./login.css";

export default function Login() {
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
                        <form className="input-grp flex flex-col space-y-1 ">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" className="bg-transparent border-[1px] rounded-md focus:outline-none px-3 py-1" name="email" placeholder="Email" required />
                            <div className="error-msg"></div>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" className="bg-transparent border-[1px] rounded-md focus:outline-none px-3 py-1" name="password" placeholder="Password" required />
                            <div className="error-msg"></div>
                            
                            
                        </form>
                        <div className="flex flex-col space-y-3">
                        <button className="bg-[#702DFF] rounded-md py-1 text-white">Login</button>
                            <div className="text-center text-xs ">Don&apos;t have an account? <a href="#" className="text-red-500">Sign Up</a></div>
                            <div className="text-center text-xs text-red-500">Forgot Password? </div>
                        </div>

                    </div>
                    {/* imagecontainer */}
                    <div className="image-container w-1/2 ">
                        <img src="/login-vector.png" className="rounded-3xl h-[inherit] p-2" alt="login-image" />
                      

                    </div>

                </div>
            </div>
        </div>
    );
}
