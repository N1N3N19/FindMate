import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Axios from 'axios';
import { MdOutlineMarkChatRead } from "react-icons/md";

export default function Feedback() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3003/feedback')
      .then((response) => {
        console.log(response.data); // Log the response data
        setRows(response.data.map((feedback) => ({ id: feedback.feedback_ID, ...feedback })));
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);
  const deleteRow = (feedback_ID) => {
    Axios.delete(`http://localhost:3003/delfeedback/${feedback_ID}`)
      .then(() => {
        setRows(rows.filter((row) => row.feedback_ID !== feedback_ID));
      })
      .catch((error) => {
        console.error(`There was an error deleting the user: ${error}`);
      });
  };

  const columns = [
    { field: 'report_ID', headerName: 'ID', width: 150 },
    { field: 'detail', headerName: 'Detail', width: 1000 },
    { field: 'add_photo', headerName: 'photo'},
    {
      field: 'delete',
      headerName: '',
      sortable: false,
      width: 50,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = () => {
          const idToDelete = params.row.feedback_ID;
          deleteRow(idToDelete);
        };
        return <MdOutlineMarkChatRead onClick={onClick}/>
      }
    }
    
  ];

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={10} />
    </div>
  );
}