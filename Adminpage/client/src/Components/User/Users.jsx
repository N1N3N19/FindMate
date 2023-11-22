import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Axios from 'axios';
import { FaBan } from "react-icons/fa";

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
   
    { field: 'user_ID', headerName: 'ID', width: 100 },
    { field: 'Name', headerName: 'Name', width: 400 },
    { field: 'Gender', headerName: 'Gender', width: 200 },
    { field: 'email', headerName: 'Email', width: 450 },
    {
      field: 'delete',
      headerName: '',
      sortable: false,
      width: 50,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = () => {
          const idToDelete = params.row.user_ID;
          deleteRow(idToDelete);
        };
        return <FaBan onClick={onClick}/>
      }
    }
  
    
   
  ];

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={10} />
    </div>
  );
};



