import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Axios from 'axios';

export default function Feedback() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3003/feedback')
      .then((response) => {
        console.log(response.data); // Log the response data
        setRows(response.data.map((feedback, index) => ({ id: index, ...feedback })));
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const columns = [
    { field: 'report_ID', headerName: 'Report_ID', width: 150 },
    { field: 'detail', headerName: 'Detail', width: 1000 },
    { field: 'add_photo', headerName: 'photo'},
    
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={10} />
    </div>
  );
}