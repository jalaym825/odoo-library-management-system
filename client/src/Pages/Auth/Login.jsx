export const Login = () =>{
    return (
        <div className="flex flex-col items-center justify-start max-h-screen bg-white p-4">
        <div className="w-full max-w-sm p-8 bg-white mt-10">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Login
            </h1>
            <div className="flex flex-col space-y-4">
            <div className="flex flex-col">
                <label className="text-gray-700 font-medium flex justify-start">
                Email
                </label>
                <input
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                type="email"
                placeholder="Email"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-gray-700 font-medium flex justify-start">
                Password
                </label>
                <input
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                type="password"
                placeholder="Password"
                />
            </div>
            <div className="flex justify-start">
                <button
                className="bg-transparent text-green-500 hover:bg-green-200 hover:text-gray-700 rounded-lg font-semibold py-1 px-2 rounded transition duration-300 border border-green-600 pl-5 pr-5"
                type="submit"
                >
                Login
                </button>
            </div>
            </div>
            <div className="text-center text-gray-600 mt-4">
          <a
            href="#"
            className="underline hover:text-green-500 transition duration-300"
          >
            Signin using Google
          </a>
        </div>
            <div className="text-center text-gray-600 mt-4">
            <a
                href="/signup"  
                className="underline hover:text-green-500 transition duration-300"
            >
                Don't have an account? SignUp
            </a>
            </div>
        </div>
        </div>
    )
}