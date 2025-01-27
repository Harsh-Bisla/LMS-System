import React, { useContext, useState } from 'react';
import "./CreateCourse.css";
import { useNavigate } from 'react-router-dom';
import { adminContext } from '../store/adminContext';
import BtnLoader from "../../components/BtnLoader/BtnLoader";

function CreateCourse() {
    const navigate = useNavigate();
    const { createCourse, loading } = useContext(adminContext);

    const [createCourseDetails, setCreateCourseDetails] = useState({
        title: "",
        category: ""
    })

    const onChangehandler = (e) => {
        const { name, value } = e.target;
        setCreateCourseDetails((prevDetails) => ({
            ...prevDetails, [name]: value
        }))
    }

    return (
        <section className='create-course-section'>
            <h2>Lets add course, and some basic detail for your new course.</h2>
            <p>Add the title and category of your course.</p>

            <label htmlFor='course'>Title</label>
            <input
                name='title'
                value={createCourseDetails.title}
                onChange={onChangehandler}
                id='course'
                type="text"
                placeholder='Enter course name' />

            <label htmlFor='categ'>Category</label>
            <select
                value={createCourseDetails.category}
                onChange={onChangehandler}
                name="category"
                id="categ">

                <option value="">Select Category</option>
                <option value="mongodbb">Mongo DB</option>
                <option value="mernstack">Mern Stack</option>
                <option value="backend">Backend</option>
                <option value="datascience">Data Science</option>
                <option value="frontend">Frontend</option>
                <option value="appdevelopemnt">App Development</option>
                <option value="hacking">Hacking</option>

            </select>

            <div className='create-cancel-btn'>
                <button onClick={() => navigate("/admin/courses")} className='cancel-btn'>Cancel</button>

                {loading ? <BtnLoader /> : <button
                    onClick={() => createCourse(createCourseDetails)}
                    className='create-btn'
                >Create</button>}
            </div>

        </section>
    )
}

export default CreateCourse