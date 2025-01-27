import React from 'react';
import "./Course.css";
import { useNavigate } from "react-router-dom";
import dockerCourse from "../../assets/docker-course.jpg";

function Course({ course }) {
    const navigate = useNavigate();
    return (
        <div className='course'>
            <div className='course-img'>
                <img src={course?.thumbnail} alt="course-image" />
            </div>
            <h4 onClick={() => navigate(`/course-detail/${course?._id}`)}>{course?.title.slice(0, 25)}...</h4>
            <div className='course-maker-info'>
                <div className='img-name'>
                    <img src={course?.creator?.profileImage} alt="course-image" />
                    <p>{course?.creator?.name} </p>
                </div>
                <p id='category'>{course?.level.toUpperCase()}</p>
            </div>
            <h3>&#x20b9;{course?.price}</h3>
        </div>
    )
}

export default Course;