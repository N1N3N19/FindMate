import React from 'react'
import './Dashboard.css'
import Sidebar from './Sidebar/Sidebar'
import Body from './Body/Body'
import User from '../User/Users'
const Dashboard = () =>{
    return(
        <div className='dashboard flex'>
            <div className='dashboardContainer flex'>
             
                <Sidebar/>

            </div>
        </div>
    )
}
export default Dashboard
