import React from 'react';

function Report() {
  const totalBooks = 22589;
  const issuedBooks = 15;
  const dueBooks = 250;
  const pendingFees = [
    { name: 'Aiony Haust', date: 'May 25, 2023', amount: 31.48, status: 'Pending' },
    { name: 'Jimmy Fermin', date: 'May 31, 2023', amount: 50.18, status: 'Pending' },
  ];
  const bookReports = [
    { name: 'Floyd Miles', book: 'The Journey Within', issued: 'May 22, 2023', return: 'July 20, 2023', status: 'Paid' },
    { name: 'Robert Fox', book: 'Hidden Secrets', issued: 'May 21, 2023', return: 'Aug 10, 2023', status: 'Pending' },
    { name: 'Guy Hawkins', book: 'Beyond Boundaries', issued: 'April 10, 2023', return: 'Nov 20, 2023', status: 'Paid' },
    { name: 'Jenny Wilson', book: 'Serenity Found', issued: 'April 30, 2023', return: 'Dec 10, 2023', status: 'Paid' },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Library Report</h1>
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-indigo-600 p-6 shadow-lg rounded-lg text-white hover:bg-indigo-700 transition duration-300">
          <p className="text-lg font-semibold">Total Books</p>
          <p className="text-2xl">{totalBooks}</p>
        </div>
        <div className="bg-green-600 p-6 shadow-lg rounded-lg text-white hover:bg-green-700 transition duration-300">
          <p className="text-lg font-semibold">Issued Books</p>
          <p className="text-2xl">{issuedBooks}</p>
        </div>
        <div className="bg-red-600 p-6 shadow-lg rounded-lg text-white hover:bg-red-700 transition duration-300">
          <p className="text-lg font-semibold">Due Books</p>
          <p className="text-2xl">{dueBooks}</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Pending Fees</h2>
      <table className="min-w-full bg-white shadow-lg rounded-lg mb-6">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-2 px-4">Student</th>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Amount</th>
            <th className="py-2 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {pendingFees.map((fee, index) => (
            <tr key={index} className="hover:bg-gray-100 transition duration-300">
              <td className="border-t py-2 px-4">{fee.name}</td>
              <td className="border-t py-2 px-4">{fee.date}</td>
              <td className="border-t py-2 px-4">${fee.amount.toFixed(2)}</td>
              <td className={`border-t py-2 px-4 ${fee.status === 'Pending' ? 'text-red-600' : 'text-green-600'}`}>{fee.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Book Issued / Returned</h2>
      <table className="min-w-full bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-2 px-4">Student Name</th>
            <th className="py-2 px-4">Book Name</th>
            <th className="py-2 px-4">Issued Date</th>
            <th className="py-2 px-4">Return Date</th>
            <th className="py-2 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookReports.map((report, index) => (
            <tr key={index} className="hover:bg-gray-100 transition duration-300">
              <td className="border-t py-2 px-4">{report.name}</td>
              <td className="border-t py-2 px-4">{report.book}</td>
              <td className="border-t py-2 px-4">{report.issued}</td>
              <td className="border-t py-2 px-4">{report.return}</td>
              <td className={`border-t py-2 px-4 ${report.status === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>{report.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Report;
