import React from 'react';
import "./CourseProgressLoading.css";

function CourseProgressLoading() {
    return (
        <section className="course-progress-section">

            <div className="progress-heading">
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-button"></div>
            </div>

            <div className="course-progress-container">

                <div className="video-box">
                    <div className="skeleton skeleton-video"></div>
                    <div className="skeleton skeleton-video-title"></div>
                </div>

                <div className="line"></div>
                <div className="course-lectures-container">
                    <div className="skeleton skeleton-title"></div>

                    <div className="skeleton-lecture">
                        <div className="skeleton skeleton-lecture-icon"></div>
                        <div className="skeleton skeleton-lecture-title"></div>
                        <div className="skeleton skeleton-lecture-button"></div>
                    </div>
                    <div className="skeleton-lecture">
                        <div className="skeleton skeleton-lecture-icon"></div>
                        <div className="skeleton skeleton-lecture-title"></div>
                        <div className="skeleton skeleton-lecture-button"></div>
                    </div>
                    <div className="skeleton-lecture">
                        <div className="skeleton skeleton-lecture-icon"></div>
                        <div className="skeleton skeleton-lecture-title"></div>
                        <div className="skeleton skeleton-lecture-button"></div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default CourseProgressLoading