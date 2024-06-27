import React from 'react';

interface StatusDropdownProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({ selectedStatus, onStatusChange }) => {
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(event.target.value);
  };

  return (
    <div className="flex items-center mb-4">
      <select
        value={selectedStatus}
        onChange={handleStatusChange}
        className="p-4 border border-gray-300 rounded-l-md flex-grow"
      >
        <option value="">All</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="pending">Pending</option>
      </select>
    </div>
  );
};

export default StatusDropdown;
