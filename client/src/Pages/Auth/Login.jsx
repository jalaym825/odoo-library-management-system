export const Login = () => {
    return (
        <div className="w-[100%] h-[100vh] flex justify-center items-center bg-transparent">
            <div className="w-4/12 p-6 h-auto bg-transparent">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
                    Login
                </h1>
                <div className="flex flex-col space-y-4">
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium flex justify-start">
                            Email
                        </label>
                        <input
                            className="border bg-[#fff9ee] border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            type="email"
                            placeholder="Email"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium flex justify-start">
                            Password
                        </label>
                        <input
                            className="border bg-[#fff9ee] border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            type="password"
                            placeholder="Password"
                        />
                    </div>
                    <div className="flex justify-start">
                        <button
                            className="w-[100%] h-10 bg-transparent text-green-500 hover:bg-green-600 hover:text-yellow-50 rounded-lg font-semibold transition duration-300 border mt-2 border-green-600"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                </div>
                <div className="text-center text-gray-600 mt-4">
                    <a
                        href="#"
                        className=" hover:text-green-500 transition duration-300"
                    >
                        Signin using Google
                    </a>
                </div>
                <div className="text-center text-gray-600 mt-1">
                    <a
                        href="/signup"
                        className=" hover:text-green-500 transition duration-300"
                    >
                        Don&apos;t have an account? SignUp
                    </a>
                </div>
            </div>
        </div>
    )
}