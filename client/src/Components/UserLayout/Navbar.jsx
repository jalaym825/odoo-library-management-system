import React from 'react'
import books from '../../assets/Books.png'
import bell from '../../assets/bell.png'

import { Link, useNavigate } from 'react-router-dom';
import Global from '../../Utils/Global';


const Navbar = () => {

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
                        {Global.user ? (
                            <>
                                <img src={bell} alt="" className='w-5 h-5' />
                                <button className="inline-block p-3 w-24 cursor-pointer rounded-md bg-green-400 text-center text-md font-semibold font-poppins text-white transition duration-200 ease-in-out hover:bg-green-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 border-2 border-green-800 focus-visible:ring-offset-2 active:scale-95" >Signout</button>
                            </>
                        ) : (
                            <Link to="/login" className="inline-block p-3 w-24 cursor-pointer rounded-md bg-red-400 text-center text-md font-semibold font-poppins text-white transition duration-200 ease-in-out hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 border-2 border-red-800 focus-visible:ring-offset-2 active:scale-95" >Login</Link>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
