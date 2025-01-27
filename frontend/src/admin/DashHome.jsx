import React, { useContext, useEffect } from 'react';
import { adminContext } from './store/adminContext';

function DashHome() {

    const {getDashboardData, dashboardData} = useContext(adminContext);

    useEffect(()=>{
        getDashboardData();
    }, [])

    return (
        <>
            <div className='sales-container'>
                <div className='total-sales-box'>
                    <p>Total Sales</p>
                    <h2>{dashboardData.totalSales}</h2>
                </div>

                <div className='total-sales-box'>
                    <p>Total Revenue</p>
                    <h2>&#x20b9;{dashboardData.totalPrice}</h2>
                </div>
            </div>
        </>
    )
}

export default DashHome