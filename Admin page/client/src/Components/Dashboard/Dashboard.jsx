import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { PieChart } from '@mui/x-charts/PieChart';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [matched, setMatched] = useState([]);
  const [interested, setInterested] = useState([]);



  useEffect(() => {
    Axios.get('http://localhost:3003/getusers')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(`There was an error retrieving the data: ${error}`);
      });

    Axios.get('http://localhost:3003/getmatched')
      .then((response) => {
        setMatched(response.data);
      })
      .catch((error) => {
        console.error(`There was an error retrieving the data: ${error}`);
      });

      Axios.get('http://localhost:3003/getInterests')
      .then((response) => {
        const data = response.data;
        const iNameCounts = data.reduce((acc, curr) => {
          acc[curr.i_name] = (acc[curr.i_name] || 0) + 1;
          return acc;
        }, {});
  
        const pieCharD = Object.keys(iNameCounts).map(i_name => ({
          label: i_name,
          value: iNameCounts[i_name]
        }));
  
        setInterested(pieCharD);
      })
      .catch((error) => {
        console.error(`There was an error retrieving the data: ${error}`);
      });


      

    Axios.get('http://localhost:3003/feedback')
      .then((response) => {
        setFeedbacks(response.data);
      })
      .catch((error) => {
        console.error(`There was an error retrieving the data: ${error}`);
      });
     }, []);

  const pieChartData = [
    { label: 'Users', value: users.length },
    { label: 'Feedbacks', value: feedbacks.length },
    { label: 'Matched', value: matched.length },
  ];


  return (
    <>
    <div className="h2">General</div>
    <PieChart
  series={[ {
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
<div className="h2">User interests</div>
<PieChart
  series={[ {
    data: interested,
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
width={600}
height={300}
/>
     
    </>
  );
};

export default Dashboard;