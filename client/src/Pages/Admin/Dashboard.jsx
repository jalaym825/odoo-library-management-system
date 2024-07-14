import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

const Dashboard = () => {
  // Dummy data for the table
  const books = [
    { isbn: '9783161484100', title: 'Book Title 1', status: 'Available' },
    { isbn: '9783161484101', title: 'Book Title 2', status: 'Issued' },
    { isbn: '9783161484102', title: 'Book Title 3', status: 'Available' },
    { isbn: '9783161484103', title: 'Book Title 4', status: 'Issued' },
    { isbn: '9783161484104', title: 'Book Title 5', status: 'Available' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Book ISBN</th>
              <th className="px-4 py-2 border">Title of Book</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{book.isbn}</td>
                <td className="px-4 py-2 border">{book.title}</td>
                <td className="px-4 py-2 border">{book.status}</td>
                <td className="px-4 py-2 border">
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                  <button className="ml-2 text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
