import React, { useEffect } from 'react';
import Global from '../../Utils/Global';
import { toast } from 'sonner';

const Dashboard = () => {
  // const data = [
  //   { bookId: '5521575', name: 'Background to Indian Law', issueDate: '2023-05-15', returnDate: '2023-06-15', status: 'Returned' },
  //   { bookId: '384765', name: 'Computer Fundamentals', issueDate: '2023-06-01', returnDate: '2023-07-01', status: 'Issued' },
  //   { bookId: '4321603', name: 'Computer Fundamentals', issueDate: '2023-06-10', returnDate: '-', status: 'Issued' },
  //   { bookId: '9095646', name: 'Fin Accounting (Du Bcom) 2E', issueDate: '2023-06-20', returnDate: '-', status: 'Issued' },
  //   { bookId: '789456', name: 'Data Structures and Algorithms', issueDate: '2023-07-01', returnDate: '-', status: 'Issued' },
  // ];
  const [data, setData] = React.useState([]);
  useEffect(() => {
    Global.httpGet('/librarian/issued-books').then((res) => {
      console.log(res.data);
      setData(res.issuedBooks);
    }).catch((error) => {
      console.error(error);
      toast.error(error.message || 'Failed to fetch issued books');
    })
  }, [])

  return (
    <div className="py-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="overflow-x-auto bg-white p-4 rounded shadow">
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
            {data.length > 0 && data.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{item.bookId}</td>
                <td className="px-4 py-2 border">{item.name}</td>
                <td className="px-4 py-2 border">{item.issueDate}</td>
                <td className="px-4 py-2 border">{item.returnDate}</td>
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
