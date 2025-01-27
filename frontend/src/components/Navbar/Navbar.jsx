import React, { useContext, useState } from 'react';
import "./Navbar.css";
import { PiBuildings } from "react-icons/pi";
import { Link, useNavigate } from 'react-router-dom';
import dummyImage from "../../assets/dummy-user.jpg";
import { MdOutlineLogout } from "react-icons/md";
import { userContext } from '../../store/userContext';
import { MdOutlineLightMode } from "react-icons/md";

function Navbar() {
  const navigate = useNavigate();
  const { loggedIn, handleLogout, userProfile } = useContext(userContext);


  return (
    <div className='navbar'>
      <div className='logo'>
        <Link className='logo' to="/">
          <PiBuildings size={25} />
          <h2>E-Learning</h2></Link>
      </div>

      {loggedIn ?
        <div className='user-options-box'>
          {/* <div className='mode-btn'><MdOutlineLightMode /></div> */}
          <img src={userProfile?.profileImage || dummyImage} alt="use-profile-image" />
          <div
            className='user-options'>
            <h5>My Account</h5>
            <p onClick={() => navigate("/my-learning")}>My Learning</p>
            <p onClick={() => { navigate("/profile"), setOpenProfile(false) }}>Edit Profile</p>
            <div onClick={handleLogout} className='logout-btn-box'>
              <button className='logout-btn'>Log out</button>
              <MdOutlineLogout size={20} />
            </div>
            {userProfile?.role === "instructor" && <button onClick={() => { navigate("/admin/dashboard"), setOpenProfile(false) }} className='dashboard-btn'>Dashboard</button>}
          </div>
        </div>
        :
        <div className='login-signup-btns'>
          <button onClick={() => navigate("/signup")} className='signup-btn'>Signup</button>
          <button onClick={() => navigate("/login")} className='login-btn'>Login</button>
        </div>
      }
    </div>
  )
}

export default Navbar