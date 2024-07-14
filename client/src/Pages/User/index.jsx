import React from 'react';
import books from '../../assets/Books.png';
import bell from '../../assets/bell.png';
import { MdLocationOn, MdMailOutline } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { FaPen } from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";

const Home = () => {
  return (
    <div className='w-full h-[100vh]'>
      <div className='w-full mt-5 flex flex-col lg:flex-row sm:px-4'>
        <div className='w-full lg:w-[70%] p-5'>
          <h1 className='w-full h-10 pl-5 border-b-[1px] border-black flex text-2xl font-outfit justify-start'>Search Books</h1>
          <div className='mt-3 w-full flex flex-col lg:flex-row lg:gap-x-3 gap-y-3'>
            <input
              placeholder="Search..."
              className="input w-full lg:w-[85%] font-dm-sans shadow-lg focus:border-2 border-gray-300 px-5 py-3 rounded-xl transition-all outline-none"
              name="search"
              type="search"
            />
            <button className="w-full lg:w-20 sm:w-[80px] md:w-[120px] p-3 cursor-pointer rounded-md bg-blue-400 text-center text-md font-semibold font-poppins text-white transition duration-200 ease-in-out hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 border-2 border-blue-600 focus-visible:ring-offset-2 active:scale-95">Search</button>
          </div>
          <h1 className='w-full h-10 mt-16 pl-5 border-b-[1px] border-black flex text-2xl font-outfit justify-start'>My Books</h1>
          <div className='w-full mt-3 flex flex-col gap-y-1'>
            <div className='w-full flex gap-x-2 p-1'>
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw51g1gMBrZN3FbN17flaY_YSYmTMGuudh3Q&s' alt="" className='rounded-md h-36' />
              <div className='flex flex-col gap-y-1'>
                <h1 className='text-xl font-outfit'>The Design of Books</h1>
                <p className='text-sm font-poppins'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod, maiores? Dolorum provident non delectus illum sunt? Quisquam in vero ut commodi, sint, amet delectus magni ipsum, ea iure vel doloremque.</p>
                <button className="w-40 p-3 flex gap-x-1 cursor-pointer items-center rounded-md bg-yellow-600 text-center text-md font-semibold font-poppins text-white transition duration-200 ease-in-out border-2 border-yellow-800 hover:bg-yellow-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-600 focus-visible:ring-offset-2 active:scale-95">
                  Read Books
                  <FiArrowUpRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full lg:w-[30%] p-5'>
          <h1 className='w-full h-10 border-b-[1px] border-black flex text-2xl font-outfit justify-start'>User Profile</h1>
          <div className="flex items-center mt-3 gap-x-2">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSktK4jzhODqE-okFjhhHyxhvDPmbrrFdpIhg&s" alt="User" className="rounded-full w-full h-full object-cover" />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-poppins ">Mit Monpara</h2>
              <p className="text-gray-500 font-monserrat">Developer</p>
            </div>
          </div>
          <div className='w-full flex flex-col mt-3 gap-y-2 p-3'>
            <p className='flex gap-x-1 items-center'><MdLocationOn size={20} /><span className='text-md font-outfit'>B/2,madhav gurukul,Bakrol,Anand</span></p>
            <p className='flex gap-x-1 items-center'><IoCall size={20} /><span className='text-md font-outfit'>+91 999 999 9999</span></p>
            <p className='flex gap-x-1 items-center'><MdMailOutline size={20} /><span className='text-md font-outfit'>mitmonpra@gmail.com</span></p>
            <p className='flex gap-x-1 items-center'><FaPen size={20} /><span className='text-md font-outfit'>Notes</span></p>
          </div>
          <h1 className='w-full mt-3 h-10 border-b-[1px] border-black flex text-2xl font-outfit justify-start'>Your Contact</h1>
          <div className='mt-1 p-3 flex flex-col gap-y-2'>
            <h1 className='text-md font-poppins font-semibold '>Model Admin</h1>
            <p className='flex gap-x-1 items-center'><MdMailOutline size={20} /><span className='text-md font-outfit'>mitmonpra@gmail.com</span></p>
            <p className='flex gap-x-1 items-center'><IoCall size={20} /><span className='text-md font-outfit'>+91 999 999 9999</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
