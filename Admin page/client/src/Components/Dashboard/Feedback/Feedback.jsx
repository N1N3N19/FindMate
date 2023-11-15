import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const rows = [
  { id: 1, Feedback: 'Hi test test'},

];

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'Feedback',
    headerName: 'Feedback',
    width: 1500,
    editable: true,
  },
];

export default function Feedback() {
  return (
    <div>
      <DataGrid
        rows={rows}
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