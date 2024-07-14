import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Global from '../../Utils/Global';
import IssueBook from './IssueBook';
const Librarian = () => {
  const [activePage, setActivePage] = useState('profile');
  const [isbn, setIsbn] = useState('');
  const [email, setEmail] = useState('');
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [bookDetails, setBookDetails] = useState(null); // State for book details

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };


  const handleFetchDetails = () => {
    // Simulated API call to fetch borrowed books based on email
    // Replace with actual API integration in your application
    const fetchedBooks = [
      { bookId: '5521575', name: 'Background to Indian Law', issueDate: '2023-07-15', returnDate: '2023-08-15', status: 'Issued' },
      { bookId: '384765', name: 'Computer Fundamentals', issueDate: '2023-07-10', returnDate: '2023-08-10', status: 'Issued' },
      { bookId: '9095646', name: 'Fin Accounting (Du Bcom) 2E', issueDate: '2023-07-05', returnDate: '2023-08-05', status: 'Issued' },
    ];

    setBorrowedBooks(fetchedBooks);
  };

  const handleGetDetails = () => {
    // Simulated API call to fetch book details based on ISBN
    // Replace with actual API integration in your application
    const fetchedBookDetails = {
      bookId: '5521575',
      name: 'Background to Indian Law',
      author: 'Author Name',
      publisher: 'Publisher Name',
      year: '2020',
      genre: 'Law',
      availableCopies: 5,
    };

    setBookDetails(fetchedBookDetails);
  };

  const renderContent = () => {
    switch (activePage) {
      case 'profile':
        return (
          <div>
            <h1 className="text-3xl font-bold mb-4">My Profile</h1>
            <p>User profile settings and information.</p>
          </div>
        );
      case 'dashboard':
        return <Dashboard />;
      case 'issue':
        return (
          <IssueBook />
        );
      case 'return':
        return (
          <div>
            <h1 className="text-3xl font-bold mb-4">Return Books</h1>
            <div className="mb-4">
              <label className="block text-gray-700">Enter User Email:</label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                placeholder="Enter Email"
              />
            </div>
            <button
              onClick={handleFetchDetails}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Fetch Details
            </button>
            {borrowedBooks.length > 0 && (
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Borrowed Books:</h2>
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border">Book ID</th>
                      <th className="px-4 py-2 border">Name of Book</th>
                      <th className="px-4 py-2 border">Date of Issue</th>
                      <th className="px-4 py-2 border">Date of Return</th>
                      <th className="px-4 py-2 border">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {borrowedBooks.map((book, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 border">{book.bookId}</td>
                        <td className="px-4 py-2 border">{book.name}</td>
                        <td className="px-4 py-2 border">{book.issueDate}</td>
                        <td className="px-4 py-2 border">{book.returnDate}</td>
                        <td className="px-4 py-2 border">{book.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      default:
        return (
          <div>
            <h1 className="text-3xl font-bold mb-4">My Profile</h1>
            <p>User profile settings and information.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex">
      <nav className="w-1/4 bg-gray-800 text-white h-screen p-4">
        <div className="flex items-center mb-6">
          <img className="h-12 w-12 rounded-full mr-4" src="https://via.placeholder.com/150" alt="Profile" />
          <div>
            <h2 className="text-lg font-semibold">{Global.user.name}</h2>
            <p className="text-sm text-gray-400">Online</p>
          </div>
        </div>
        <ul>
          <li className="mb-4">
            <button onClick={() => setActivePage('profile')} className={`w-full text-left py-2 px-3 rounded ${activePage === 'profile' ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'}`}>My Profile</button>
          </li>
          <li className="mb-4">
            <button onClick={() => setActivePage('dashboard')} className={`w-full text-left py-2 px-3 rounded ${activePage === 'dashboard' ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'}`}>Dashboard</button>
          </li>
          <li className="mb-4">
            <button onClick={() => setActivePage('issue')} className={`w-full text-left py-2 px-3 rounded ${activePage === 'issue' ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'}`}>Issue Books</button>
          </li>
          <li className="mb-4">
            <button onClick={() => setActivePage('return')} className={`w-full text-left py-2 px-3 rounded ${activePage === 'return' ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'}`}>Return Books</button>
          </li>
        </ul>
      </nav>
      <main className="w-3/4 p-4">
        {renderContent()}
      </main>
    </div>
  );
};

export default Librarian;