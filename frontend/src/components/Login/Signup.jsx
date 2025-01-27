import React, { useContext, useEffect, useState } from 'react';
import "./Login.css"
import { NavLink } from 'react-router-dom';
import { userContext } from '../../store/userContext';
import BtnLoader from '../BtnLoader/BtnLoader';


function Signup() {
    const { signUp, loading } = useContext(userContext);

    const [signupDetails, setSignUpDetails] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    });

    const onchangehandler = (e) => {
        let { name, value } = e.target;
        setSignUpDetails((prevdetails) => ({
            ...prevdetails, [name]: value
        }))
    }

    useEffect(() => {
        window.scroll(0, 0)
    }, []);


    return (
        <section className='login-wrapper'>
            <div className='login-container'>
                <div className='login-signup-link'>
                    <div style={{ width: "100%" }}>
                        <NavLink
                            className={({ isActive }) =>
                                `${isActive ? 'active' : ''} signup-link`
                            }
                            to="/signup">Signup</NavLink>
                    </div>
                    <div style={{ width: "100%" }}>
                        <NavLink
                            className={({ isActive }) =>
                                `${isActive ? 'active' : ''} login-link`
                            }
                            to="/login">Login</NavLink>
                    </div>
                </div>

                {/* signup form */}

                <h3>Signup</h3>
                <p>Create your Account.</p>
                <label htmlFor="name">Full Name</label>
                <input
                    value={signupDetails.name}
                    name='name'
                    type="text"
                    placeholder='Full Name'
                    onChange={onchangehandler}
                    id='name' />

                <label htmlFor="email">Email</label>
                <input
                    value={signupDetails.email}
                    type="email"
                    name='email'
                    placeholder='Email'
                    onChange={onchangehandler}
                    id='email' />

                <label htmlFor="role">Role</label>
                <select name='role' value={signupDetails.role} onChange={onchangehandler} id="role">
                    <option value="">Select Role</option>
                    <option value="instructor">Intstructor</option>
                    <option value="student">Student</option>
                </select>

                <label htmlFor="email">Password</label>
                <input
                    value={signupDetails.password}
                    type="password"
                    name='password'
                    placeholder='Password'
                    onChange={onchangehandler}
                    id='password' />

                {loading ? <BtnLoader /> : <button onClick={() => signUp(signupDetails)} className='signup-btn'>
                    Signup
                </button>}
            </div>
        </section>
    )
}

export default Signup