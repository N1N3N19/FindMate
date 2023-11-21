import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { PieChart } from '@mui/x-charts/PieChart';

const Analytics = () => {
  const [interests, setInterests] = useState([]);


  useEffect(() => {
    Axios.get('http://localhost:3003/getInterests')
      .then((response) => {
        setInterests(response.data);
      })
      .catch((error) => {
        console.error(`There was an error retrieving the data: ${error}`);
      });
     }, []);

  const pieChartData = [
    { label: 'Interested', value: interests}
  ];


  return (
    <>
      <PieChart
        series={[
          {
            data: pieChartData,
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
        width={400}
        height={300}
      />
      

    </>
  );
};

export default Analytics;