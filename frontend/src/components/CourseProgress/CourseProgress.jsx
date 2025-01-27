import React, { useContext, useEffect, useState } from 'react';
import "./CourseProgress.css";
import { FaRegPlayCircle } from "react-icons/fa";
import { userContext } from '../../store/userContext';
import { useParams } from 'react-router-dom';
import { MdOutlinePauseCircle } from "react-icons/md";
import CourseProgressLoading from '../CourseProgressLoading/CourseProgressLoading';


function Courseprogress() {
    const { getPurchasedCourse, course, markCourseCompleted, userProfile, loading } = useContext(userContext);
    const { courseId } = useParams();
    const [lectureIndex, setLectureIndex] = useState("");
    const [initialLecture, setInitialLecture] = useState({});


    const changeLecture = (lecture, idx) => {
        setInitialLecture(lecture);
        setLectureIndex(idx + 1)
    }

    const currCourse = userProfile?.enrolledCourses?.filter((enrollment) => {
        return enrollment.course._id === courseId
    })

    const endedVideoHandler = () => {
        if (markCourseCompleted) {
            if (!currCourse?.[0].completedLectures?.includes(lectureIndex)) {
                markCourseCompleted(courseId, lectureIndex);
            }
        }
    }


    useEffect(() => {
        getPurchasedCourse(courseId);
        window.scrollTo(0, 0);
    }, []);




    useEffect(() => {
        if (course?.lectures?.length > 0) {
            setInitialLecture(course?.lectures[0]);
            setLectureIndex(1);
        }
    }, [course]);


    return (
        <>
            {loading ? <CourseProgressLoading /> :

                <section className='course-progress-section'>
                    <div className='progress-heading'>
                        <h1>{course?.title}</h1>
                        <button className='mark-completed-btn'>Mark as Completed</button>
                    </div>

                    <div className='course-progress-container'>
                        <div className='video-box'>
                            <div className='video'>
                                <video
                                    autoPlay
                                    muted
                                    controls
                                    src={initialLecture.lectureVideo}
                                    alt="course-progress"
                                    onEnded={endedVideoHandler}
                                />
                            </div>
                            <h2>Lecture {lectureIndex}: {initialLecture.lectureTitle}</h2>
                        </div>

                        <div className='line'></div>

                        <div className='course-lectures-container'>
                            <h2>Course Lecture</h2>

                            {course?.lectures?.map((lecture, idx) => (

                                <div onClick={() => changeLecture(lecture, idx)} key={idx} className={`course-lecture-box ${lectureIndex === idx + 1 ? "lecture-active" : ""}`}>
                                    {lectureIndex === idx + 1 ? <MdOutlinePauseCircle /> : <FaRegPlayCircle />}
                                    <p>{lecture.lectureTitle}</p>

                                    {currCourse?.[0]?.completedLectures?.includes(idx + 1) ? <button className='completed-mark'>Completed</button> : null}
                                </div>
                            ))}

                        </div>
                    </div>
                </section >
            }
        </>

    )
}

export default Courseprogress
