import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'feedback_ID', headerName: 'Feedback ID', width: 150 },
  { field: 'user_ID', headerName: 'User ID', width: 150 },
  { field: 'report_ID', headerName: 'Report ID', width: 150 },
  { field: 'detail', headerName: 'Detail', width: 500 },
  { field: 'add_photo', headerName: 'Photo', width: 200 },
];

export default function Feedback() {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3003/feedback')
      .then(response => {
        setFeedbackData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <div>
      <DataGrid
        rows={feedbackData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
}