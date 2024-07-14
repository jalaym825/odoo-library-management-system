import React, { useState } from 'react';
import { toast } from 'sonner';
import Global from '../../Utils/Global';

const ReturnBook = () => {
    const [email, setEmail] = useState('');
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleFetchDetails = async () => {
        if (!email) {
            toast.error('Please enter a valid email');
            return;
        }

        setIsLoading(true);
        try {
            const response = await Global.httpGet(`/librarian/users-issued-books/${email}`);
            console.log(response);
            setBorrowedBooks(Array.isArray(response) ? response : [response]);
            if (response.length === 0) {
                toast.info('No borrowed books found for this user');
            }
        } catch (error) {
            console.error('Error fetching borrowed books:', error);
            toast.error('Failed to fetch borrowed books');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReturnBook = async (bookId) => {
        try {
            await Global.httpPost('/librarian/return/' + bookId);
            toast.success('Book returned successfully');
            // Refresh the borrowed books list
            handleFetchDetails();
        } catch (error) {
            console.error('Error returning book:', error);
            toast.error('Failed to return book');
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <>
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
                        disabled={isLoading}
                    />
                </div>
                <button
                    onClick={handleFetchDetails}
                    className={`bg-blue-500 text-white py-2 px-4 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Fetching...' : 'Fetch Details'}
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
                                    <th className="px-4 py-2 border">Due Date</th>
                                    <th className="px-4 py-2 border">Status</th>
                                    <th className="px-4 py-2 border">Returned Date</th>
                                    <th className="px-4 py-2 border">Fine</th>
                                    <th className="px-4 py-2 border">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {borrowedBooks.map((book) => (
                                    <tr key={book.sys_id}>
                                        <td className="px-4 py-2 border">{book.book.isbn}</td>
                                        <td className="px-4 py-2 border">{book.book.title}</td>
                                        <td className="px-4 py-2 border">{formatDate(book.issuedAt)}</td>
                                        <td className="px-4 py-2 border">{formatDate(book.dueDate)}</td>
                                        <td className="px-4 py-2 border">{book.status}</td>
                                        <td className="px-4 py-2 border">{book.returned ? formatDate(book.returned) : '-'}</td>
                                        <td className="px-4 py-2 border">{book.fine}</td>
                                        <td className="px-4 py-2 border">
                                            {book.status !== 'issued' && (
                                                <button
                                                    onClick={() => handleReturnBook(book.sys_id)}
                                                    className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
                                                >
                                                    Return
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    )
}

export default ReturnBook;