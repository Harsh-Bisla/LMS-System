import React, { useContext, useEffect, useRef, useState } from 'react';
import "./Searchpage.css";
import { PiWarningCircle } from "react-icons/pi";
import { userContext } from '../../store/userContext';
import { useNavigate, useParams } from 'react-router-dom';

function Searchpage() {

    const { searchCourse, searchedCourses, setsearchedCourses } = useContext(userContext);
    const [category, setCategory] = useState([]);
    const { query } = useParams();
    const navigate = useNavigate();

    // 

    const sortedCourses = (value) => {
        if (value === "low to high") {
            const sortedCourse = [...searchedCourses].sort((a, b) => a.price - b.price);
            setsearchedCourses(sortedCourse);
        }
        else if (value === "high to low") {
            const sortedCourse = [...searchedCourses].sort((a, b) => b.price - a.price);
            setsearchedCourses(sortedCourse);
        }
    }

    // changing the catgeory
    const catgeoryChange = (value) => {
        if (category.includes(value)) {
            setCategory(category.filter((val) => val !== value));
        }
        else {
            setCategory([...category, value]);
        }
    }

    const navigateCourse = (courseId) => {
        navigate(`/course-detail/${courseId}`)
    }

    useEffect(() => {
        searchCourse(query, category);
    }, [category]);

    const categories = [
        { label: "Next Js", value: "next js" },
        { label: "Data Science", value: "data science" },
        { label: "Full Stack Development", value: "full stack" },
        { label: "Backend Development", value: "backend" },
        { label: "MERN Stack Development", value: "mern stack" },
        { label: "Javascript", value: "javascript" },
        { label: "Python", value: "python" },
        { label: "Docker", value: "docker" },
        { label: "Mongo DB", value: "mongo db" },
        { label: "HTML", value: "html" }
    ]

    return (
        <section className='search-page'>
            <h1>{searchedCourses?.length} results for "{query}"</h1>
            <p>Showing results for <span>{query}</span></p>

            <div className='filter-course-container'>
                <div className='filters-box'>
                    <div className='filter'>
                        <h3>Filter Options</h3>
                        <select onChange={(e) => sortedCourses(e.target.value)} id="sort">
                            <option value="">Sort by</option>
                            <option value="low to high">low to high</option>
                            <option value="high to low">high to low</option>
                        </select>
                    </div>

                    <h2>CATEGORY</h2>
                    {categories.map((category, idx) => (
                        <div className='checkbox-box' key={idx}>
                            <input onClick={(e) => catgeoryChange(e.target.value)} value={category.value} type="checkbox" id="next-js" />
                            <label >{category.label}</label>
                        </div>
                    ))}

                </div>
                <div className='searched-course-container'>
                    {searchedCourses?.map((course, idx) => (
                        <div onClick={() => navigateCourse(course._id)} key={idx} className='searched-course'>
                            <div className='search-course-img'>
                                <img src={course.thumbnail} alt="course-image" />
                            </div>
                            <div className='searched-course-detail'>
                                <h2>{course.title}</h2>
                                <p>{course.subtitle}</p>
                                <h4>&#x20b9;{course.price}</h4>
                                <button className='level-btn'>{course.level.toUpperCase()}</button>
                            </div>
                        </div>
                    ))}
                    {/* course not found message */}
                    {searchedCourses?.length === 0 &&
                        <div className='course-not-found-box'>
                            <PiWarningCircle />
                            <h1>Course Not Found</h1>
                            <p>Sorry, we couldn't find the course you're looking for.</p>
                            <button className='browse-all-courses-btn'>Browse all courses</button>
                        </div>
                    }
                </div>
            </div>
        </section>
    )
}

export default Searchpage