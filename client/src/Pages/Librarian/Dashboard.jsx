import React, { useEffect, useState } from 'react';
import Global from '../../Utils/Global';
import { toast } from 'sonner';

const Dashboard = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);

  useEffect(() => {
    Global.httpGet('/librarian/issued-books').then((res) => {
      console.log(res);
      setIssuedBooks(Array.isArray(res) ? res : [res]);
    }).catch((error) => {
      console.error(error);
      toast.error(error.message || 'Failed to fetch issued books');
    })
  }, [])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="py-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="overflow-x-auto bg-white p-4 rounded shadow">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Book ID</th>
              <th className="px-4 py-2 border">Name of Book</th>
              <th className="px-4 py-2 border">User Email</th>
              <th className="px-4 py-2 border">Date of Issue</th>
              <th className="px-4 py-2 border">Due Date</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {issuedBooks.map((item) => (
              <tr key={item.sys_id}>
                <td className="px-4 py-2 border">{item.book.isbn}</td>
                <td className="px-4 py-2 border">{item.book.title}</td>
                <td className="px-4 py-2 border">{item.user.email}</td>
                <td className="px-4 py-2 border">{formatDate(item.issuedAt)}</td>
                <td className="px-4 py-2 border">{formatDate(item.dueDate)}</td>
                <td className="px-4 py-2 border">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;