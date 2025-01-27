import React, { useContext } from 'react';
import "./MyLearning.css";
import Course from "../../components/Course/Course"
import { userContext } from "../../store/userContext";
import SkeletonLoading from "../../components/SkeletonLoading/SkeletonLoading";

function MyLearning() {
    const { userProfile, loading } = useContext(userContext);

    return (
        <section className='my-learinng-section'>
            <h1>MY LEARNINIG</h1>
            <div className='my-learning-container'>
                {userProfile?.enrolledCourses?.length == 0 && <h2 style={{ textAlign: "center" }}>You have't enrolled in any course.</h2>}

                {userProfile?.enrolledCourses?.map(({ course }, idx) => (
                    <Course key={idx} course={course} />
                ))}
                {/* loading */}
                {loading && Array.from({ length: 6 }, (_, index) => (
                    <SkeletonLoading />
                ))}
            </div>
        </section>
    )
}

export default MyLearning