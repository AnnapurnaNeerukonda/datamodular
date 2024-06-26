// DisplayDetails.tsx
'use client'
import React, { useEffect, useState } from 'react';
import StatusDropdown from './status';
import { Table, TableHead, TableBody, TableRow, TableCell } from '../../components/ui/table';
interface DataItem {
  [key: string]: any;
}
const DisplayDetails: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/displaydetails');
        const data: DataItem[] = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
  };

  const filteredData = data.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase());

    if (!selectedStatus) {
      return matchesSearch;
    } else {
      return matchesSearch && item.status === selectedStatus;
    }
  });

  if (data.length === 0) return <div>Loading...</div>;

  const columns = Object.keys(data[0]);
  return (
    <div>
      <div className="flex items-center mb-4">
        <div>
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchQuery}
        onChange={handleSearchChange}
        className=" p-4 border border-gray-300 rounded-md mr-2"
      />
    </div>
      <div className='mr-5 mt-4'>
      <StatusDropdown  selectedStatus={selectedStatus} onStatusChange={handleStatusChange} />
      </div>
    </div>
      <Table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid' }}>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column} className="font-bold border border-gray-300 px-5 py-5" style={{ width: '20%' }}>
                {column.charAt(0).toUpperCase() + column.slice(1)}
              </TableCell>
            ))}
          </TableRow>
        <TableBody>
          {filteredData.map((item, index) => (
            <TableRow key={index}>
              {columns.map((column, columnIndex) => (
                <TableCell key={columnIndex} className="border border-gray-300 px-4 py-2" style={{ width: '20%' }}>
                  {column === 'status' ? (
                    <>
                      {item[column] === 'active' && <button style={{ backgroundColor: '#90EE90', borderRadius: '5px' }}>Active</button>}
                      {item[column] === 'inactive' && <button style={{ backgroundColor: '#DC143C', borderRadius: '5px' }}>Inactive</button>}
                      {item[column] === 'pending' && <button style={{ backgroundColor: '#FFD700', borderRadius: '5px' }}>Pending</button>}
                    </>
                  ) : (
                    item[column]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DisplayDetails;
