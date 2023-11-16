import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const Dashboard = () => {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'series A' },
            { id: 1, value: 15, label: 'series B' },
            { id: 2, value: 20, label: 'series C' },
          ],
          innerRadius: 30,
          outerRadius: 100,
          paddingAngle: 1,
          cornerRadius: 3,
          startAngle: -90,
          endAngle: 180,
          cx: 150,
          cy: 150,
        },
      ]}
    />
  );
};

export default Dashboard;