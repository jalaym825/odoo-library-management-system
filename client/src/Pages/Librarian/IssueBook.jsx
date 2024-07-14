import React, { useState } from 'react'
import { toast } from 'sonner';
import Global from '../../Utils/Global';

const IssueBook = () => {
    const [isbn, setIsbn] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleIsbnChange = (event) => {
        setIsbn(event.target.value);
    };

    const handleUserEmailChange = (event) => {
        setUserEmail(event.target.value);
    };

    const issueBook = async () => {
        if (!isbn || !userEmail) {
            toast.error('Please enter both ISBN and user email');
            return;
        }

        setIsLoading(true);
        try {
            await Global.httpPost('/librarian/issue', {
                isbn: isbn,
                email: userEmail
            });

            toast.success('Book issued successfully');
            setIsbn('');
            setUserEmail('');
        } catch (error) {
            console.error('Error issuing book:', error);
            toast.error('An error occurred while issuing the book');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Issue Books</h1>
            <div className="mb-4">
                <label className="block text-gray-700">Enter Book ISBN:</label>
                <input
                    type="text"
                    value={isbn}
                    onChange={handleIsbnChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                    placeholder="Enter ISBN"
                    disabled={isLoading}
                />
                <label className="block text-gray-700 mt-4">Enter User's Email:</label>
                <input
                    type="email"
                    value={userEmail}
                    onChange={handleUserEmailChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                    placeholder="Enter user's email"
                    disabled={isLoading}
                />
            </div>
            <button
                onClick={issueBook}
                className={`bg-blue-500 text-white py-2 px-4 rounded transition-colors ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                }`}
                disabled={isLoading}
            >
                {isLoading ? 'Issuing...' : 'Issue Book'}
            </button>
        </div>
    )
}

export default IssueBook