import React, { useContext, useEffect, useState } from 'react';
import "./createLecture.css";
import { FaRegEdit, FaTruckLoading } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import { adminContext } from '../store/adminContext';
import BtnLoader from "../../components/BtnLoader/BtnLoader";

function CreteLecture() {
  const { getSingleCourse, course, createLecture, loading } = useContext(adminContext);

  const navigate = useNavigate();
  const { courseId } = useParams();

  const [lectureTitle, setLectureTitle] = useState("");

  useEffect(() => {
    getSingleCourse(courseId);
  }, [courseId]);


  return (
    <section className='create-lecture-section'>
      <h1>Let's add lectures, add some basic details for your new lecture</h1>
      <p>Add the details for your new lecture</p>

      <label htmlFor="lecture-title">Title</label>
      <br />

      <input
        value={lectureTitle}
        onChange={(e) => setLectureTitle(e.target.value)}
        type="text"
        placeholder='Your lecture title here.'
        id='lecture-title' />

      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }} >
        <button onClick={() => navigate(`/admin/courses`)} className='cancel-btn'>Back to Course</button>

        {loading ? <BtnLoader /> : <button onClick={() => createLecture(lectureTitle, course._id)} className='create-course-btn'>Create Lecture</button>}

      </div>

      {/* lectures container */}
      <div className='lectures-container'>
        {course?.lectures?.map((lecture, idx) => (
          <div key={idx} className='lecture'>
            <h4>Lecture - {idx + 1} : {lecture.lectureTitle}</h4>
            <FaRegEdit onClick={() => navigate(`/admin/course/${courseId}/edit-lecture/${lecture._id}`)} size={20} />
          </div>
        ))}

        {/* skeleton loading */}
        {loading && <div className="skeleton skeleton-lecture">
          <div className="skeleton skeleton-lecture-title"></div>
          <div className="skeleton skeleton-lecture-icon"></div>
        </div>}
      </div>
    </section>
  )
}

export default CreteLecture