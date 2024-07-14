import React from 'react'
import books from '../../assets/Books.png'
import bell from '../../assets/bell.png'

import { useNavigate } from 'react-router-dom';


const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();
    const handlelogin = () => {
        setIsLoggedIn(true)
        console.log("logged in")
        navigate('/home')
    }
    return (
        <div className='w-full'>
            {/* <nav className='w-full h-16 flex items-center border-b-[0.5px] border-color-black'>
                <div className='w-full h-full flex'>
                    <div className='flex w-[50%] gap-x-2 h-full items-center ml-6'>
                        <img src={books} alt="" className='w-10 h-10' />
                        <h1 className='text-2xl font-montserrat font-semibold'>Public Library</h1>
                    </div>
                    <div className='flex w-[50%] gap-x-2 h-full items-center justify-end mr-6'>
                        <button class="inline-block p-3 w-24 cursor-pointer rounded-md bg-green-400 text-center text-md font-semibold font-poppins text-white transition duration-200 ease-in-out hover:bg-green-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 border-2 border-green-800 focus-visible:ring-offset-2 active:scale-95">Home</button>
                        <button class="inline-block p-3 w-24 cursor-pointer rounded-md bg-green-400 text-center text-md font-semibold font-poppins text-white transition duration-200 ease-in-out hover:bg-green-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 border-2 border-green-800 focus-visible:ring-offset-2 active:scale-95">Signout</button>
                    </div>
                </div>
            </nav> */}
            <nav className='w-full h-16 flex items-center border-b-[0.5px] border-color-black'>
                <div className='w-full h-full flex'>
                    <div className='flex w-[50%] gap-x-2 h-full items-center ml-6'>
                        <img src={books} alt="" className='w-10 h-10' />
                        <h1 className='text-2xl font-montserrat font-semibold'>Public Library</h1>
                    </div>
                    <div className='flex w-[50%] gap-x-6 h-full items-center justify-end mr-6'>
                        {isLoggedIn ? (
                            <>
                                <img src={bell} alt="" className='w-5 h-5' />
                                <button className="inline-block p-3 w-24 cursor-pointer rounded-md bg-green-400 text-center text-md font-semibold font-poppins text-white transition duration-200 ease-in-out hover:bg-green-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 border-2 border-green-800 focus-visible:ring-offset-2 active:scale-95" >Signout</button>
                            </>
                        ) : (
                            <button className="inline-block p-3 w-24 cursor-pointer rounded-md bg-red-400 text-center text-md font-semibold font-poppins text-white transition duration-200 ease-in-out hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 border-2 border-red-800 focus-visible:ring-offset-2 active:scale-95" onClick={handlelogin}>Login</button>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
