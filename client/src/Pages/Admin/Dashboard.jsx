import React, { useEffect } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Global from '../../Utils/Global';

const Dashboard = () => {
  const [books, setBooks] = React.useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await Global.httpGet('/books');
        setBooks(res.books);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const deleteBook = async (isbn) => {
    try {
      await Global.httpDelete(`/admin/books/${isbn}`);
      // Update state to remove the deleted book
      setBooks((prevBooks) => prevBooks.filter(book => book.isbn !== isbn));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

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
              <th className="px-4 py-2 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border text-center">{book.isbn}</td>
                <td className="px-4 py-2 border text-center">{book.title}</td>
                <td className="px-4 py-2 border text-center">{book.current_quantity > 0 ? "Available" : "Unavailable"} ({book.quantity - book.current_quantity}/{book.quantity})</td>
                <td className="px-4 py-2 border text-center">
                  <button className="text-red-500 hover:text-red-700" onClick={() => deleteBook(book.isbn)}>
                    <FaTrash />
                  </button>
                  {/* <button className="ml-2 text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button> */}
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
