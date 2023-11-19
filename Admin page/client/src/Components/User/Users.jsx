import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Axios from 'axios';

export default function Users() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3003/getusers')
      .then((response) => {
        console.log(response.data); // Log the response data
        setRows(response.data.map((user) => ({ id: user.user_ID, ...user })));
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const deleteRow = (user_ID) => {
    Axios.delete(`http://localhost:3003/users/${user_ID}`)
      .then(() => {
        setRows(rows.filter((row) => row.user_ID !== user_ID));
      })
      .catch((error) => {
        console.error(`There was an error deleting the user: ${error}`);
      });
  };

  const columns = [
    {
      field: 'delete',
      headerName: 'Ban User',
      sortable: false,
      width: 150,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = () => {
          const idToDelete = params.row.user_ID;
          deleteRow(idToDelete);
        };
    
        return <button className='btn' onClick={onClick}>Ban</button>;
      }
    },
    { field: 'user_ID', headerName: 'ID', width: 100 },
    { field: 'Name', headerName: 'Name', width: 150 },
    { field: 'Gender', headerName: 'Gender', width: 150 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'About_user', headerName: 'About User', width: 1000 }
    
   
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={10} />
    </div>
  );
};



