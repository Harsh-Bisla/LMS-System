import React, { useState } from 'react';
import "./Dashboard.css"
import Sidebar from '../Sidebar/Sidebar';
import DashHome from '../DashHome';
import { Outlet } from 'react-router-dom';

function Dashboard() {
 
  return (
    <section className='dashboard-wrapper'>
      <div className='left-sidbar'>
        <Sidebar/>
      </div>
      <div className='right-content'>
        <Outlet />
      </div>
    </section>
  )
}

export default Dashboard