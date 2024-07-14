import React from 'react';

const Result = () => {
    return (
        <div className='w-full h-screen'>
            <div className='w-full mt-5'>
                <h1 className='ml-9 font-semibold text-2xl text-yellow-600 font-montserrat'>Search Result</h1>
                <div className='mt-3 w-full lg:w-[60%] xl:w-[50%] ml-8 flex flex-col lg:flex-row gap-x-3'>
                    <input
                        placeholder="Search..."
                        className="input w-full lg:w-[85%] xl:w-[80%] font-dm-sans shadow-lg focus:border-2 border-gray-300 px-5 py-3 rounded-xl transition-all outline-none"
                        name="search"
                        type="search"
                    />
                    <button className="w-20 lg:w-20 xl:w-24 p-3 mt-3 lg:mt-0 ml-auto mr-auto lg:ml-0 lg:mr-0 cursor-pointer rounded-md bg-blue-400 text-center text-md font-semibold font-poppins text-white transition duration-200 ease-in-out hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 border-2 border-blue-600 focus-visible:ring-offset-2 active:scale-95">Search</button>
                </div>
                <div className='w-full lg:w-[60%] xl:w-[50%] ml-8 flex flex-col gap-y-6 mt-3'>
                    <div className='w-full flex flex-col gap-y-2'>
                        <div className='w-full flex gap-x-2 p-1'>
                            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw51g1gMBrZN3FbN17flaY_YSYmTMGuudh3Q&s' alt="" className='rounded-md h-32 lg:h-36 sm:h-auto' />
                            <div className='flex flex-col gap-y-1'>
                                <h1 className='text-xl font-outfit'>The Design of Books</h1>
                                <p className='text-sm font-poppins'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod, maiores? Dolorum provident non delectus illum sunt? Quisquam in vero ut commodi, sint, amet delectus magni ipsum, ea iure vel doloremque.</p>
                                <button className="w-32 p-2 flex gap-x-1 cursor-pointer items-center rounded-md bg-yellow-600 text-center text-md font-semibold font-poppins text-white transition duration-200 ease-in-out border-2 border-yellow-800 hover:bg-yellow-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-600 focus-visible:ring-offset-2 active:scale-95">Read Books</button>
                            </div>
                        </div>
                        <div className='w-full flex gap-x-2 p-1'>
                            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw51g1gMBrZN3FbN17flaY_YSYmTMGuudh3Q&s' alt="" className='rounded-md h-32 lg:h-36 sm:h-auto' />
                            <div className='flex flex-col gap-y-1'>
                                <h1 className='text-xl font-outfit'>The Design of Books</h1>
                                <p className='text-sm font-poppins'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod, maiores? Dolorum provident non delectus illum sunt? Quisquam in vero ut commodi, sint, amet delectus magni ipsum, ea iure vel doloremque.</p>
                                <button className="w-32 p-2 flex gap-x-1 cursor-pointer items-center rounded-md bg-green-600 text-center text-md font-semibold font-poppins text-white transition duration-200 ease-in-out border-2 border-green-800 hover:bg-green-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 active:scale-95">Read Books</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div aria-label="Page navigation example " className='font-montserrat w-full flex justify-center mt-10'>
                    <ul className="inline-flex -space-x-px text-base h-10">
                        <li>
                            <a href="#" className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                        </li>
                        <li>
                            <a href="#" aria-current="page" className="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Result;
