import React, { useState } from 'react';
import Table from '../../../components/table/table';
import { Box } from '@mui/material';

interface UserData {
  id: number;
  name: string;
  email: string;
  age: number;
  city: string;
}

interface FilterOption {
  value: string;
  label: string;
}


interface TableColumn<T, K extends keyof T> {
  id: K;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: T[K]) => string; 
  filterable?: boolean;
  filterOptions?: FilterOption[];
}


const sampleColumns: TableColumn<UserData, keyof UserData>[] = [
  { id: 'id', label: 'ID', minWidth: 50, align: 'center' },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 200 },
  {
    id: 'age',
    label: 'Age',
    minWidth: 100,
    align: 'right',
 
    format: (value) => value.toLocaleString(),
    filterable: true,

    filterOptions: [
      { value: '24', label: 'Age 24' },
      { value: '27', label: 'Age 27' },
      { value: '29', label: 'Age 29' },
      { value: '30', label: 'Age 30' },
      { value: '38', label: 'Age 38' },
      { value: '50', label: 'Age 50' },
    ],
  },
  {
    id: 'city',
    label: 'City',
    minWidth: 150,
    filterable: true,

    filterOptions: [
      { value: 'New York', label: 'New York' },
      { value: 'Los Angeles', label: 'Los Angeles' },
      { value: 'Houston', label: 'Houston' },
      { value: 'Phoenix', label: 'Phoenix' },
      { value: 'San Diego', label: 'San Diego' },
      { value: 'Chicago', label: 'Chicago' },
    ],
  },
];

const sampleData: UserData[] = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', age: 30, city: 'New York' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', age: 24, city: 'Los Angeles' },
  { id: 3, name: 'Alice Brown', email: 'alice.brown@example.com', age: 29, city: 'Houston' },
  { id: 4, name: 'Bob White', email: 'bob.white@example.com', age: 38, city: 'Phoenix' },
  { id: 5, name: 'Eve Adams', email: 'eve.adams@example.com', age: 50, city: 'San Diego' },
  { id: 6, name: 'Tom Green', email: 'tom.green@example.com', age: 27, city: 'Chicago' },
  { id: 7, name: 'Alice Brown', email: 'alice.brown@example.com', age: 29, city: 'Houston' },
  { id: 8, name: 'Bob White', email: 'bob.white@example.com', age: 38, city: 'Phoenix' },
  { id: 9, name: 'Eve Adams', email: 'eve.adams@example.com', age: 50, city: 'San Diego' },
  { id: 10, name: 'Tom Green', email: 'tom.green@example.com', age: 27, city: 'Chicago' },
];

export default function App() {
  const [tableData] = useState(sampleData);

  return (
    <Box className=" flex flex-col items-center justify-center p-6 h-full bg-transparent " >
      <Table
        columns={sampleColumns}
        data={tableData}
        title="New Users"
        showFilterButton={true}
        initialRowsPerPage={5}
      />
    </Box>
  );
}