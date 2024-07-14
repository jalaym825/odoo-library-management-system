import React from 'react';

const Table = () => {
  const data = [
    { bookID: '5521575', bookName: 'Background to Indian Law', status: 'Issued', availableCopies: 0, nextAvailability: '02-01-2018' },
    { bookID: '384765', bookName: 'Computer Fundamentals', status: 'Issued', availableCopies: 2, nextAvailability: '02-01-2018' },
    { bookID: '4321603', bookName: 'Computer Fundamentals', status: 'Available', availableCopies: 5, nextAvailability: '-' },
    { bookID: '9095646', bookName: 'Fin Accounting (Du Bcom) 2E', status: 'Issued', availableCopies: 0, nextAvailability: '31-12-2017' },
  ];

  return (
    <div className="overflow-x-auto bg-white p-4 rounded shadow">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Book ID</th>
            <th className="px-4 py-2 border">Book Name</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Available Copies</th>
            <th className="px-4 py-2 border">Next Availability Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border">{item.bookID}</td>
              <td className="px-4 py-2 border">{item.bookName}</td>
              <td className="px-4 py-2 border">{item.status}</td>
              <td className="px-4 py-2 border">{item.availableCopies}</td>
              <td className="px-4 py-2 border">{item.nextAvailability}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
