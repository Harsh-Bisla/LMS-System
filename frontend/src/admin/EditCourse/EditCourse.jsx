import React, { useContext, useEffect, useState } from 'react';
import "./EditCourse.css";
import { useNavigate, useParams } from "react-router-dom";
import { adminContext } from '../store/adminContext';
import BtnLoader from '../../components/BtnLoader/BtnLoader';


function EditCourse() {

    const navigate = useNavigate();
    const { getSingleCourse, course, updateCourse, loading, removeCourse, publishCourse, unpublishCourse } = useContext(adminContext);
    const { courseId } = useParams();

    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [level, setlevel] = useState("");
    const [price, setPrice] = useState("");
    const [thumbnail, setThumbnail] = useState("");

    useEffect(() => {
        getSingleCourse(courseId);
    }, [courseId])

    useEffect(() => {
        if (course) {
            setTitle(course.title || "");
            setSubtitle(course.subtitle || "");
            setDescription(course.description || "");
            setCategory(course.category || "");
            setlevel(course.level || "");
            setPrice(course.price || "");
        }
    }, [course]);


    return (
        <>
            {!loading ? <section className='edit-course-section'>
                <div className='course-heading'>
                    <h3>Add detail information regarding course</h3>
                    <p onClick={() => navigate(`/admin/course/${course._id}/create-lecture`)} id='lecture-page-link'>Go to lectures page</p>
                </div>

                <div className='edit-form'>
                    <div className='form-header'>
                        <div className='basic-info-tag'>
                            <h4>Basic Information</h4>
                            <p>Make changes to your courses here. Click save when you're done.</p>
                        </div>

                        {loading ? <BtnLoader /> :
                            <div className='course-btns'>
                                {course?.isPublished && <button onClick={() => unpublishCourse(course?._id)} className='publish-btn'>Unpublish</button>}

                                {!course?.isPublished && <button onClick={() => publishCourse(course?._id)} className='publish-btn'>Publish</button>}

                                <button onClick={() => removeCourse(course?._id)} className='remove-course-btn'>Remove Course</button>
                            </div>
                        }
                    </div>

                    {/* edit form */}
                    <section className='form-section'>
                        <label htmlFor="title">Title</label>
                        <input
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            type="text"
                            placeholder='Ex- MERN Stack Course' id='title'
                        />

                        <label htmlFor="subtitle">Subtitle</label>
                        <input
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)} type="text"
                            placeholder='Ex- learn how to build mern stack websites.'
                        />

                        <label htmlFor="description">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={10} id="description"
                            placeholder='Write more about the course.'
                        />

                        <div className='other-info'>
                            <div className='info'>
                                <p>Category</p>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
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
                            </div>

                            <div className='info'>
                                <p>Course Level</p>
                                <select
                                    value={level}
                                    onChange={(e) => setlevel(e.target.value)}
                                    id="course-level">

                                    <option value="">Select Course Level</option>
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced">Advanced</option>
                                </select>
                            </div>

                            <div className='info'>
                                <p>Price in (INR)</p>
                                <input
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    type="text" placeholder='499' />
                            </div>
                        </div>

                        <label htmlFor="thumbnail">Course Thumbnail</label>
                        <input onChange={(e) => setThumbnail(e.target.files[0])} type="file" id='thumbnail' />

                        <img width={250} src={thumbnail ? URL.createObjectURL(thumbnail) : course?.thumbnail} alt="course-thumbnail" />

                        <div style={{ margin: "20px 0px" }} className='course-btns'>

                            <button
                                onClick={() => navigate("/admin/courses")}
                                className='publish-btn cancel-btn'>Back to Courses</button>

                            {loading ? <BtnLoader /> : <button onClick={() => updateCourse(course._id, {
                                title, subtitle, description, level, price, category, thumbnail,
                            })} className='remove-course-btn save-btn'>
                                Save
                            </button>}

                        </div>
                    </section>
                </div>
            </section> :

                // skeleton loading
                <section className="skeleton-edit-course-section">
                    <div className="skeleton-course-heading">
                        <div className="skeleton skeleton-heading"></div>
                        <div className="skeleton skeleton-link"></div>
                    </div>

                    <div className="skeleton-edit-form">
                        <div className="skeleton-form-header">
                            <div className="skeleton-info">
                                <div className="skeleton skeleton-basic-info"></div>
                                <div className="skeleton skeleton-info-desc"></div>
                            </div>
                            <div className="skeleton-btn-group">
                                <div className="skeleton skeleton-btn"></div>
                                <div className="skeleton skeleton-btn"></div>
                            </div>
                        </div>

                        <div className="skeleton-form-section">
                            <div className="skeleton skeleton-input"></div>
                            <div className="skeleton skeleton-input"></div>
                            <div className="skeleton skeleton-textarea"></div>
                            <div className="skeleton skeleton-select"></div>
                            <div className="skeleton skeleton-thumbnail"></div>
                        </div>

                        <div className="skeleton-footer">
                            <div className="skeleton skeleton-cancel-btn"></div>
                            <div className="skeleton skeleton-save-btn"></div>
                        </div>
                    </div>
                </section>

            }

        </>
    )
}

export default EditCourse