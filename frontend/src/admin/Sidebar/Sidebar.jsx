import React, { useContext, useState } from 'react';
import "./Sidebar.css";
import { BsFileBarGraph } from "react-icons/bs";
import { MdMenuBook } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { adminContext } from '../store/adminContext';

function Sidebar() {
    return (
        <div className='sidebar'>
            <NavLink
                className={({ isActive }) =>
                    `${isActive ? 'active' : ''} sidebar-option`
                }
                to="/admin/dashboard">
                <BsFileBarGraph size={22} />
                <p>Dashboard</p>
            </NavLink>

            <NavLink
                className={({ isActive }) =>
                    `${isActive ? "active" : ""} sidebar-option`
                }
                to="/admin/courses">
                <MdMenuBook size={22} />
                <p>Courses</p>
            </NavLink>
        </div>
    )
}

export default Sidebar