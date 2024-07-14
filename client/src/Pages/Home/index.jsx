import React, { useState } from 'react';
import { toast } from 'sonner';
import Global from '../../Utils/Global';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedBooks, setSearchedBooks] = useState([]);

  const handleSearch = async () => {
    try {
      console.log('searchTerm:', searchTerm);
      const res = await Global.httpGet(`/books/search?query=${searchTerm}`);
      console.log(res)
      setSearchedBooks(res.books);
    } catch (error) {
      toast.error('Failed to search books');
    }
  };

  return (
    <>
      {
        searchedBooks.length > 0 ? (
          <>
            <div className='w-[90%] md:w-[70%] mt-4 gap-x-3 flex'>
              <input
                placeholder="Search..."
                className="input w-full md:w-[85%] font-dm-sans shadow-lg focus:border-2 border-gray-300 px-5 py-3 rounded-xl transition-all focus:w-full outline-none"
                name="search"
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="inline-block w-20 cursor-pointer rounded-md bg-blue-400 text-center text-md font-semibold font-poppins text-white transition duration-200 ease-in-out hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 border-2 border-blue-600 focus-visible:ring-offset-2 active:scale-95"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
            <div className='w-full mt-5 flex flex-col items-center sm:px-4'>
              <h1 className='text-xl font-outfit flex justify-center text-yellow-500'>Search Results</h1>
              <div className='w-full flex flex-col max-w-[400px] justify-start'>
                {
                  searchedBooks.map((book) => (
                    <div key={book.sys_id} className='w-full flex gap-x-2 p-1'>
                      <img src={book.cover} alt="" className='rounded-md h-28' />
                      <div className='flex flex-col gap-y-1'>
                        <h1 className='text-xl text-blue-500 font-outfit'>{book.title}</h1>
                        <p className='text-sm font-poppins'>{book.description}</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </>
        ) : (
          <div className='w-full h-[100vh]'>
            <div className='w-full mt-5 flex flex-col items-center sm:px-4'>
              <h1 className='text-xl font-outfit flex justify-center text-yellow-500'>Search Books available in library</h1>
              <div className='w-[90%] md:w-[70%] mt-4 gap-x-3 flex'>
                <input
                  placeholder="Search..."
                  className="input w-full md:w-[85%] font-dm-sans shadow-lg focus:border-2 border-gray-300 px-5 py-3 rounded-xl transition-all focus:w-full outline-none"
                  name="search"
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  className="inline-block w-20 cursor-pointer rounded-md bg-blue-400 text-center text-md font-semibold font-poppins text-white transition duration-200 ease-in-out hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 border-2 border-blue-600 focus-visible:ring-offset-2 active:scale-95"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
            <div className='w-full mt-7 flex flex-col lg:flex-row gap-x-3 justify-center sm:px-4'>
              <div className='w-full lg:w-[40%] mt-4 lg:mt-0'>
                <h1 className='text-2xl font-semibold font-montserrat'>New Arrivals</h1>
                <div className='w-full flex flex-col'>
                  {/* Example of a book item */}
                  <div className='w-full flex gap-x-2 p-1'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw51g1gMBrZN3FbN17flaY_YSYmTMGuudh3Q&s' alt="" className='rounded-md h-28' />
                    <div className='flex flex-col gap-y-1'>
                      <h1 className='text-xl text-blue-500 font-outfit'>The Design of Books</h1>
                      <p className='text-sm font-poppins'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod, maiores? Dolorum provident non delectus illum sunt? Quisquam in vero ut commodi, sint, amet delectus magni ipsum, ea iure vel doloremque.</p>
                    </div>
                  </div>
                  {/* Additional book items can go here */}
                </div>
              </div>
              <div className='w-full lg:w-[40%] mt-4 lg:mt-0'>
                <h1 className='text-2xl font-semibold font-montserrat'>Trendings</h1>
                <div className='w-full flex flex-col'>
                  {/* Example of a trending book item */}
                  <div className='w-full flex gap-x-2 p-1'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw51g1gMBrZN3FbN17flaY_YSYmTMGuudh3Q&s' alt="" className='rounded-md h-28' />
                    <div className='flex flex-col gap-y-1'>
                      <h1 className='text-xl text-blue-500 font-outfit'>The Design of Books</h1>
                      <p className='text-sm font-poppins'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod, maiores? Dolorum provident non delectus illum sunt? Quisquam in vero ut commodi, sint, amet delectus magni ipsum, ea iure vel doloremque.</p>
                    </div>
                  </div>
                  {/* Additional trending book items can go here */}
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

export default Home;
