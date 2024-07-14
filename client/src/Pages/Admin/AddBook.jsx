import React, { useState } from 'react';
import Global from '../../Utils/Global'; // Make sure this path is correct
import { toast } from 'sonner';

const AddBook = () => {
  const [activeTab, setActiveTab] = useState('isbn');
  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [quantity, setQuantity] = useState(1); // Default quantity to 1
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const addBook = async () => {
    setError('');
    setSuccess('');
    setLoading(true); // Set loading to true when starting the request

    const bookData = {
      isbn: activeTab === 'isbn' ? isbn : isbn,
      title: activeTab === 'custom' ? title : undefined,
      author: activeTab === 'custom' ? author : undefined,
      publisher: activeTab === 'custom' ? publisher : undefined,
      year: activeTab === 'custom' ? year : undefined,
      genre: activeTab === 'custom' ? genre : undefined,
      quantity: quantity
    };

    try {
      const response = await Global.httpPost('/admin/books', bookData); // Adjust endpoint as necessary
      setSuccess('Book added successfully!');

      // Clear input fields after successful submission
      if (activeTab === 'isbn') {
        setIsbn('');
        setQuantity(1);
      } else {
        setIsbn('');
        setTitle('');
        setAuthor('');
        setPublisher('');
        setYear('');
        setGenre('');
        setQuantity(1);
      }
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false); // Set loading to false when request is complete
    }
  };

  const renderForm = () => {
    if (activeTab === 'isbn') {
      return (
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); addBook(); }}>
          <div className="flex">
            <div className="w-1/2 pr-2">
              <label className="block text-gray-700">ISBN</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                required
              />
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-gray-700">Quantity</label>
              <input
                type="number"
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
                required
              />
            </div>
          </div>
          <div className="text-right">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded" disabled={loading}>
              {loading ? 'Adding...' : 'Add Book'}
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </form>
      );
    } else if (activeTab === 'custom') {
      return (
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); addBook(); }}>
          <div className="flex">
            <div className="w-1/4 pr-2">
              <label className="block text-gray-700">ISBN</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex">
            <div className="w-1/2 pr-2">
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-gray-700">Author</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex">
            <div className="w-1/2 pr-2">
              <label className="block text-gray-700">Publisher</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                required
              />
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-gray-700">Year</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex">
            <div className="w-1/2 pr-2">
              <label className="block text-gray-700">Genre</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
              />
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-gray-700">Quantity</label>
              <input
                type="number"
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
                required
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded" disabled={loading}>
            {loading ? 'Adding...' : 'Add Book'}
          </button>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </form>
      );
    }
  };

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={() => handleTabChange('isbn')}
          className={`px-4 py-2 ${activeTab === 'isbn' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          Add by ISBN
        </button>
        <button
          onClick={() => handleTabChange('custom')}
          className={`ml-2 px-4 py-2 ${activeTab === 'custom' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          Add Custom Book
        </button>
      </div>
      {renderForm()}
    </div>
  );
};

export default AddBook;
