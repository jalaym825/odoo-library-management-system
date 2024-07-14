// src/App.js
import React from 'react';
// import Dashboard from './Dashboard';
import Table from './Table';

const Admin = () => {
  return (
    <div className="flex">
      <nav className="w-1/4 bg-gray-800 text-white h-screen p-4">
        <div className="flex items-center mb-6">
          <img className="h-12 w-12 rounded-full mr-4" src="https://via.placeholder.com/150" alt="Profile" />
          <div>
            <h2 className="text-lg font-semibold">John Dsouza</h2>
            <p className="text-sm text-gray-400">Online</p>
          </div>
        </div>
        <ul>
          <li className="mb-4">
            <button className="w-full text-left hover:bg-gray-700 py-2 px-3 rounded">My Profile</button>
          </li>
          <li className="mb-4">
            <button className="w-full text-left hover:bg-gray-700 py-2 px-3 rounded">Manage Books</button>
          </li>
          <li className="mb-4">
            <button className="w-full text-left hover:bg-gray-700 py-2 px-3 rounded">Manage Librarians</button>
          </li>
        </ul>
      </nav>
      <div className="w-3/4 p-4">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <Table />
      </div>
    </div>
  );
}

export default Admin;
