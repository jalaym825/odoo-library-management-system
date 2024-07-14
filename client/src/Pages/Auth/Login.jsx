import React, { useState } from 'react';
import { toast } from 'sonner';
import Global from '../../Utils/Global';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError('');
        setPasswordError('');

        // Basic validation
        let isValid = true;
        if (!email) {
            setEmailError('Email is required');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Email is not valid');
            isValid = false;
        }
        if (!password) {
            setPasswordError('Password is required');
            isValid = false;
        }

        if (!isValid) return;

        setLoading(true);

        try {
            const res = await Global.httpPost('/auth/login', { email, password });
            Global.user = res.user;
            toast.success('Login successful');
            if(Global.user.role === 'ADMIN') {
                navigate('/admin-dashboard');
            } else if(Global.user.role === 'LIBRARIAN') {
                navigate('/librarian-dashboard');
            } else {
                navigate('/');
            }
        } catch (err) {
            toast.error(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-[100%] h-[100vh] flex justify-center items-center bg-transparent">
            <div className="w-4/12 p-6 h-auto bg-transparent">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
                    Login
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium flex justify-start">
                            Email
                        </label>
                        <input
                            className={`border bg-[#fff9ee] border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${emailError ? 'border-red-500' : ''}`}
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium flex justify-start">
                            Password
                        </label>
                        <input
                            className={`border bg-[#fff9ee] border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${passwordError ? 'border-red-500' : ''}`}
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                    </div>
                    <div className="flex justify-start">
                        <button
                            className={`w-[100%] h-10 ${loading ? 'bg-gray-300' : 'bg-transparent'} text-green-500 hover:bg-green-600 hover:text-yellow-50 rounded-lg font-semibold transition duration-300 border mt-2 border-green-600`}
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>
                <div className="text-center text-gray-600 mt-4">
                    <a
                        href="#"
                        className=" hover:text-green-500 transition duration-300"
                    >
                        Sign in using Google
                    </a>
                </div>
                <div className="text-center text-gray-600 mt-1">
                    <a
                        href="/signup"
                        className=" hover:text-green-500 transition duration-300"
                    >
                        Don&apos;t have an account? Sign Up
                    </a>
                </div>
            </div>
        </div>
    );
};
