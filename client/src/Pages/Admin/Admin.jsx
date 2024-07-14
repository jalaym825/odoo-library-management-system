// src/Admin.js
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Dashboard from './Dashboard';
import AddBook from './AddBook';
import LibrarianDashboard from './LibrarianDashboard'; // Import LibrarianDashboard component

const Admin = () => {
  const [isBooksMenuOpen, setIsBooksMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');

  const toggleBooksMenu = () => {
    setIsBooksMenuOpen(!isBooksMenuOpen);
  };

  const renderContent = () => {
    switch (activePage) {
      case 'addBook':
        return <AddBook />;
      case 'dashboard':
        return <Dashboard />;
      case 'librarianDashboard':
        return <LibrarianDashboard />;
      case 'profile':
        return (
          <div>
            <h1 className="text-3xl font-bold mb-4">My Profile</h1>
            <p>User profile settings and information.</p>
          </div>
        );
      default:
        return (
          <div>
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <p>Welcome to your admin panel.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex">
      <nav className="w-1/4 bg-gray-800 text-white h-screen p-4">
        <div className="flex items-center mb-6">
          <img
            className="h-12 w-12 rounded-full mr-4"
            src="https://via.placeholder.com/150"
            alt="Profile"
          />
          <div>
            <h2 className="text-lg font-semibold">John Dsouza</h2>
            <p className="text-sm text-gray-400">Online</p>
          </div>
        </div>
        <ul>
          <li className="mb-4">
            <button
              onClick={() => setActivePage('dashboard')}
              className={`w-full text-left py-2 px-3 rounded ${
                activePage === 'dashboard'
                  ? 'bg-gray-700 text-white'
                  : 'hover:bg-gray-700'
              }`}
            >
              Dashboard
            </button>
          </li>
          <li className="mb-4">
            <button
              onClick={() => setActivePage('profile')}
              className={`w-full text-left py-2 px-3 rounded ${
                activePage === 'profile'
                  ? 'bg-gray-700 text-white'
                  : 'hover:bg-gray-700'
              }`}
            >
              My Profile
            </button>
          </li>
          <li className="mb-4">
            <button
              className="w-full flex justify-between items-center text-left hover:bg-gray-700 py-2 px-3 rounded"
              onClick={toggleBooksMenu}
            >
              <span>Manage Books</span>
              {isBooksMenuOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {isBooksMenuOpen && (
              <ul className="pl-4 mt-2 space-y-2">
                <li>
                  <button
                    onClick={() => setActivePage('addBook')}
                    className={`w-full text-left hover:bg-gray-700 py-2 px-3 rounded ${
                      activePage === 'addBook' ? 'bg-gray-700 text-white' : ''
                    }`}
                  >
                    Add Book
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left hover:bg-gray-700 py-2 px-3 rounded ${
                      activePage === 'searchBook' ? 'bg-gray-700 text-white' : ''
                    }`}
                  >
                    Search Book
                  </button>
                </li>
              </ul>
            )}
          </li>
          <li className="mb-4">
            <button
              onClick={() => setActivePage('librarianDashboard')}
              className={`w-full text-left py-2 px-3 rounded ${
                activePage === 'librarianDashboard'
                  ? 'bg-gray-700 text-white'
                  : 'hover:bg-gray-700'
              }`}
            >
              Manage Librarians
            </button>
          </li>
        </ul>
      </nav>
      <main className="w-3/4 p-4">{renderContent()}</main>
    </div>
  );
};

export default Admin;
