import React, { useState } from 'react';
import Global from '../../Utils/Global';
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true); // Start loading

        // Basic validation
        if (!name || !email || !password || !confirmPassword) {
            setError('All fields are required');
            setLoading(false); // Stop loading
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false); // Stop loading
            return;
        }

        try {
            await Global.httpPost('/auth/register', { name, email, password });
            navigate('/login');
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false); // Stop loading regardless of success or failure
        }
    };

    return (
        <div className="w-[100%] h-[100vh] flex justify-center items-center bg-transparent">
            <div className="w-4/12 p-6 h-auto bg-transparent">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
                    Sign Up
                </h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div className="flex flex-col">
                        <label className="text-gray-700 pl-1 font-medium flex justify-start">
                            Name
                        </label>
                        <input
                            className="bg-[#fff9ee] backdrop-blur-sm border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700 pl-1 font-medium flex justify-start">
                            Email
                        </label>
                        <input
                            className="bg-[#fff9ee] backdrop-blur-sm border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700 pl-1 font-medium flex justify-start">
                            Password
                        </label>
                        <input
                            className="bg-[#fff9ee] backdrop-blur-sm border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700 pl-1 font-medium flex justify-start">
                            Confirm Password
                        </label>
                        <input
                            className="bg-[#fff9ee] backdrop-blur-sm border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-start">
                        <button
                            className="w-[100%] mt-2 h-10 bg-transparent text-green-500 hover:bg-green-600 hover:text-yellow-50 rounded-lg font-semibold transition duration-300 border border-green-600"
                            type="submit"
                            disabled={loading} // Disable button when loading
                        >
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </div>
                </form>
                <div className="text-center text-gray-600 mt-4">
                    <a
                        href="#"
                        className="hover:text-green-500 transition duration-300"
                    >
                        Signup using Google
                    </a>
                </div>
                <div className="text-center text-gray-600 mt-1">
                    <a
                        href="/login"
                        className="hover:text-green-500 transition duration-300"
                    >
                        Existing account? Login
                    </a>
                </div>
            </div>
        </div>
    );
};
