import React, { useState } from 'react';
import { toast } from 'sonner';
import Global from '../../Utils/Global';

const SearchBook = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchedBooks, setSearchedBooks] = useState([]);
    const [quantities, setQuantities] = useState({}); // State to track quantities for each book

    const handleSearch = async () => {
        try {
            console.log('searchTerm:', searchTerm);
            const res = await Global.httpGet(`/admin/search-isbn-book/${searchTerm}`);
            console.log(res.books);
            setSearchedBooks(res.books);
            setQuantities({}); // Reset quantities when new search results are loaded
        } catch (error) {
            console.log(error);
            toast.error('Failed to search books');
        }
    };

    const handleQuantityChange = (id, value) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [id]: value
        }));
    };

    const handleAddBook = (bookId) => {
        const quantity = quantities[bookId] || 0; // Default to 0 if not set
        if (quantity > 0) {
            // Implement logic to add the book with the specified quantity
            console.log(`Adding book ID ${bookId} with quantity ${quantity}`);
            toast.success(`Added ${quantity} of book ID ${bookId}`);
        } else {
            toast.error('Please enter a valid quantity');
        }
    };

    return (
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
            {
                searchedBooks.length > 0 ? (
                    <div className='w-full mt-5 flex flex-col items-center sm:px-4'>
                        <h1 className='text-xl font-outfit flex justify-center text-yellow-500'>Search Results</h1>
                        <div className='w-full flex flex-col max-w-[400px] justify-start'>
                            {
                                searchedBooks.map((book) => (
                                    <div key={book.id} className='w-full flex gap-x-2 p-1'>
                                        <img src={book.cover} alt="" className='rounded-md h-28' />
                                        <div className='flex flex-col gap-y-1'>
                                            <h1 className='text-xl text-blue-500 font-outfit'>{book.title}</h1>
                                            <input
                                                type="number"
                                                placeholder="Quantity"
                                                min="1"
                                                value={quantities[book.id] || ''}
                                                onChange={(e) => handleQuantityChange(book.id, e.target.value)}
                                                className="border border-gray-300 rounded px-2"
                                            />
                                            <button
                                                onClick={() => handleAddBook(book.id)}
                                                className="bg-green-500 text-white py-1 px-2 rounded mt-1"
                                            >
                                                Add Book
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ) : (
                    <div className='w-full h-[100vh]'>
                        <div className='w-full mt-5 flex flex-col items-center sm:px-4'>
                            <h1 className='text-3xl font-outfit flex justify-center text-yellow-500'>Search for a book</h1>
                            <img src='/images/search.svg' alt='search' className='w-1/2' />
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default SearchBook;