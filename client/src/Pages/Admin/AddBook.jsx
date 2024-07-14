// src/AddBookPage.js
import React, { useState } from 'react';

const AddBook = () => {
  const [activeTab, setActiveTab] = useState('isbn');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderForm = () => {
    if (activeTab === 'isbn') {
      return (
        <form className="space-y-4">
          <div className="flex">
            <div className="w-1/4 pr-2">
              <label className="block text-gray-700">ISBN</label>
              <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded" />
            </div>
          </div>
          <div className="flex">
            <div className="w-1/2 pr-2">
              <label className="block text-gray-700">Title</label>
              <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded" readOnly />
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-gray-700">Author</label>
              <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded" readOnly />
            </div>
          </div>
          <div className="flex">
            <div className="w-1/2 pr-2">
              <label className="block text-gray-700">Publisher</label>
              <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded" readOnly />
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-gray-700">Year</label>
              <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded" readOnly />
            </div>
          </div>
          <div className="flex">
            <div className="w-1/2 pr-2">
              <label className="block text-gray-700">Genre</label>
              <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded" readOnly />
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-gray-700">Quantity</label>
              <input type="number" className="w-full mt-1 p-2 border border-gray-300 rounded" />
            </div>
          </div>
          <div className="text-right">
            <button type="button" className="bg-blue-500 text-white py-2 px-4 rounded">Edit</button>
          </div>
        </form>
      );
    } else if (activeTab === 'custom') {
      return (
        <form className="space-y-4">
          <div className="flex">
            <div className="w-1/4 pr-2">
              <label className="block text-gray-700">ISBN</label>
              <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded" />
            </div>
          </div>
          <div className="flex">
            <div className="w-1/2 pr-2">
              <label className="block text-gray-700">Title</label>
              <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded" />
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-gray-700">Author</label>
              <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded" />
            </div>
          </div>
          <div className="flex">
            <div className="w-1/2 pr-2">
              <label className="block text-gray-700">Publisher</label>
              <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded" />
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-gray-700">Year</label>
              <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded" />
            </div>
          </div>
          <div className="flex">
            <div className="w-1/2 pr-2">
              <label className="block text-gray-700">Genre</label>
              <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded" />
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-gray-700">Quantity</label>
              <input type="number" className="w-full mt-1 p-2 border border-gray-300 rounded" />
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded">Add Book</button>
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
