"use client";
import { columns } from "@/app/users/columns";
import { DataTable } from "@/components/data-table";
import { useState, useEffect } from "react";
import StatusDropdown from "./status";
import { DatePickerWithRange } from "./DateRangePicker";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";

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

    const matchesStatus = selectedStatus ? item.status === selectedStatus : true;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto py-10">
      <div className="mb-4">
          <Button
            onClick={() => handleStatusChange('active')}
            className={`mr-2 ${selectedStatus === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}
          >
            Active
          </Button>
          <Button
            onClick={() => handleStatusChange('pending')}
            className={`mr-2 ${selectedStatus === 'pending' ? 'bg-yellow-500' : 'bg-gray-400'}`}
          >
            Pending
          </Button>
          <Button
            onClick={() => handleStatusChange('inactive')}
            className={`mr-2 ${selectedStatus === 'inactive' ? 'bg-red-500' : 'bg-gray-400'}`}
          >
            Inactive
          </Button>
        </div>
      

      <DataTable columns={columns} data={filteredData} />
    </div>
  );
};

export default DisplayDetails;
