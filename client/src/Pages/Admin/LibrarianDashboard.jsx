// src/LibrarianDashboard.js
import React, { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

const LibrarianDashboard = () => {
  // Dummy data for initial librarians
  const initialLibrarians = [
    { id: 1, name: 'Jane Doe', email: 'jane@example.com', status: 'Active' },
    { id: 2, name: 'John Smith', email: 'john@example.com', status: 'Inactive' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', status: 'Active' },
    { id: 4, name: 'Bob Brown', email: 'bob@example.com', status: 'Inactive' },
    { id: 5, name: 'Eve Green', email: 'eve@example.com', status: 'Active' },
  ];

  const [librarians, setLibrarians] = useState(initialLibrarians);
  const [newLibrarianName, setNewLibrarianName] = useState('');
  const [newLibrarianEmail, setNewLibrarianEmail] = useState('');

  const handleAddLibrarian = () => {
    // Generate a unique ID for the new librarian (assuming simple incremental ID)
    const newLibrarianId = librarians.length + 1;
    
    // Create a new librarian object
    const newLibrarian = {
      id: newLibrarianId,
      name: newLibrarianName,
      email: newLibrarianEmail,
      status: 'Active', // Assuming new librarians are added as Active by default
    };

    // Update the state with the new librarian added to the list
    setLibrarians([...librarians, newLibrarian]);

    // Clear the input fields after adding
    setNewLibrarianName('');
    setNewLibrarianEmail('');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Manage Librarians</h1>
      
      {/* Form to add a new librarian */}
      <div className="flex mb-4">
        <input
          type="text"
          value={newLibrarianName}
          onChange={(e) => setNewLibrarianName(e.target.value)}
          placeholder="Enter librarian name"
          className="px-3 py-2 mr-2 border border-gray-300 rounded-md"
        />
        <input
          type="email"
          value={newLibrarianEmail}
          onChange={(e) => setNewLibrarianEmail(e.target.value)}
          placeholder="Enter email"
          className="px-3 py-2 mr-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleAddLibrarian}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* Table to display existing librarians */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Librarian ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {librarians.map((librarian, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{librarian.id}</td>
                <td className="px-4 py-2 border">{librarian.name}</td>
                <td className="px-4 py-2 border">{librarian.email}</td>
                <td className="px-4 py-2 border">{librarian.status}</td>
                <td className="px-4 py-2 border">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                  <button className="ml-2 text-red-500 hover:text-red-700">
                    <FaTrash />
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

export default LibrarianDashboard;
