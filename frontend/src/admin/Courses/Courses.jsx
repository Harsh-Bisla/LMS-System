import React, { useContext, useEffect } from 'react';
import "./Courses.css";
import { Link, useNavigate } from "react-router-dom";
import { adminContext } from '../store/adminContext';
import Loader from "../../components/Loader/Loader";
function Courses() {
  const { courses, getAdminCourses, loading } = useContext(adminContext);
  const navigate = useNavigate();
  useEffect(() => {
    getAdminCourses();
  }, [])
  return (
    <>
      <section className='courses-box'>
        <button className='create-new-course-btn'>
          <Link to="/admin/create-course">Create New Course</Link>
        </button>

        <table>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          {courses?.length == 0 && <h3 style={{margin:"30px 0px"}}>You haven't created any course.</h3>}
          <tbody>
            {courses?.map((course, idx) => (
              <tr key={idx}>
                <td>{course?.title}</td>
                <td>&#x20b9;{course.price || "NA"}</td>
                <td>
                  {course?.isPublished ? <button className="status-button">Published</button>
                    :
                    <button className="draft-button">Draft</button>
                  }
                </td>
                <td><button onClick={() => navigate(`/admin/courses/${course?._id}`)} className="edit-button">Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  )
}

export default Courses