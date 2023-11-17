import React, { useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Axios from 'axios';

export default function UserProfile() {
  const [rows, setRows] = useState([]);

  const users = () => {
    Axios.get('http://localhost:3003/users')
      .then((response) => {
        console.log(response.data); // Log the response data
        setRows(response.data.map((user, index) => ({ id: index, ...user })));
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }

  const columns = [
    { field: 'Name', headerName: 'Name', width: 150 },
    { field: 'Gender', headerName: 'Gender', width: 150 },
    { field: 'Email', headerName: 'Email', width: 250 },
    { field: 'About_user', headerName: 'About User', width: 300 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  
  );
}