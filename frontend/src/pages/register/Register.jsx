export default function Register(){
    return(
        <div className="register flex items-center justify-center min-h-screen bg-gray-100 overflow-y-scroll">
        <div className="login-container border-2 rounded-3xl shadow-lg h-[fit-content] lg:h-[80vh] w-[60vw] flex flex-col p-4 pt-0">
            <div className="project-name text-[#702DFF] font-bold m-2 text-3xl">FinTech</div>
            <div className="flex flex-row justify-around space-x-2 p-6">
                
                
                {/* image container */}
                <div className="hidden md:block image-container md:w-1/2">
                    <img
                        src="/login-vector.png"
                        className="rounded-3xl h-[inherit] p-2"
                        alt="login-image"
                    />
                </div>
                {/* login form */}
                <div className="login-form flex flex-col justify-between space-y-4 md:w-1/2">
                    <div className="flex flex-col space-y-1">
                        <h1 className="text-2xl font-semibold">Sign up</h1>
                        <h3 className="text-[0.6rem] text-gray-700">Login to access your expenses</h3>
                    </div>
                    <form  className="input-grp flex flex-col space-y-1">
                        <div className="flex flex-col lg:flex-row lg:space-x-2">
                            <div className="flex flex-col">
                            <label htmlFor="firstname" className="text-xs">Firstname</label>
                            <input type="text" id="firstname" className="bg-transparent border-[1px] rounded-md focus:outline-none px-3 py-1 text-xs" name="firstname" placeholder="Firstname" required />
                            </div>
                            <div className="flex flex-col ">
                            <label htmlFor="lastname" className="text-xs ">Lastname</label>
                            <input type="text" id="lastname" className="bg-transparent border-[1px] rounded-md focus:outline-none px-3 py-1 text-xs" name="lastname" placeholder="Lastname" required />
                            </div>

                        </div>
                        <div className="flex flex-col lg:flex-row lg:space-x-2">
                            <div className="flex flex-col">
                            <label htmlFor="email" className="text-xs ">Email</label>
                            <input type="text" id="email" className="bg-transparent border-[1px] rounded-md focus:outline-none px-3 py-1 text-xs" name="email" placeholder="Email" required />
                            </div>
                            <div className="flex flex-col">
                            <label htmlFor="contact" className="text-xs ">Phone</label>
                            <input type="text" id="contact" className="bg-transparent border-[1px] rounded-md focus:outline-none px-3 py-1 text-xs" name="contact" placeholder="Phone" required />
                            </div>
                        </div>


                        <label htmlFor="username" className="text-xs ">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="bg-transparent border-[1px] rounded-md focus:outline-none px-3 py-1 text-xs"
                            name="username"
                            placeholder="Username"
                            required
                            />
                        <label htmlFor="password" className="text-xs ">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="bg-transparent border-[1px] rounded-md focus:outline-none px-3 py-1 text-xs"
                            name="password"
                            placeholder="Password"
                            required
                        />
                        <label htmlFor="confirmPassword" className="text-xs ">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="bg-transparent border-[1px] rounded-md focus:outline-none px-3 py-1 text-xs"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            required
                            />
                        
                        <button
                            type="submit"
                            className="bg-[#702DFF] rounded-md py-1 text-white text-xs"
                            
                        >
                            Create Account
                        </button>
                    </form>
                    
                        <div className="text-red-500 text-xs text-center mt-2">
                            Registration failed. Please try again.
                        </div>
                 
                    
                    
                </div>
            </div>
        </div>
    </div>
    )
}