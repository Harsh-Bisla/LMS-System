import React, { useContext, useEffect, useState } from 'react';
import "./Homepage.css";
import Course from '../../components/Course/Course';
import { userContext } from '../../store/userContext';
import SkeletonLoading from '../../components/SkeletonLoading/SkeletonLoading';
import { useNavigate } from 'react-router-dom';


function Homepage() {
  const { getAvailableCourses, allCourses, loading } = useContext(userContext);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // search function
  const Search = () => {
    if (query) {
      navigate(`/search-courses/${query}`)
    }
  }

  useEffect(() => {
    getAvailableCourses();
  }, []);

  return (
    <>
      {/* home header section */}
      <section className='home-header'>
        <h1>Find the Best Courses  for You.</h1>
        <p>Discover, learn and Upskill with wide range of courses.</p>
        <div className='search-box'>
          <input type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search Courses.'
          />
          <button onClick={Search} className='search-course-btn'>Search</button>
        </div>
        <button onClick={() => navigate("/search-courses/query")} className='explore-courses-btn'>Explore Courses</button>
      </section>

      {/* courses section */}
      <section className='courses-section'>
        <h1>Our Courses</h1>
        <div className='courses-container'>
          {allCourses?.map((course, idx) => (
            <Course key={idx} course={course} />
          ))}

          {/* SkeletonLoading */}
          {loading && Array.from({ length: 6 }, (_, index) => (
            <SkeletonLoading />
          ))}
        </div>

      </section>
    </>
  )
}

export default Homepage