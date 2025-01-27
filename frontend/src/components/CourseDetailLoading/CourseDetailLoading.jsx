import React from 'react';
import "./CourseDetailLoading.css";

function CourseDetailLoading() {
    return (
        <>
            <section className="course-detail-header">
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-subtitle"></div>
                <div className="skeleton skeleton-creator"></div>
                <div className="info-icon">
                    <div className="skeleton skeleton-info"></div>
                </div>
            </section>

            <section className="buy-course-details">
                <div className="left-description">
                    <div className="skeleton skeleton-description"></div>
                    <div className="skeleton skeleton-description"></div>
                    <div className="course-content-box">
                        <h3 className="skeleton skeleton-title"></h3>
                        <div className="skeleton skeleton-lecture">
                            <div className="skeleton skeleton-icon"></div>
                            <div className="skeleton skeleton-text"></div>
                        </div>
                        <div className="skeleton skeleton-lecture">
                            <div className="skeleton skeleton-icon"></div>
                            <div className="skeleton skeleton-text"></div>
                        </div>
                        <div className="skeleton skeleton-lecture">
                            <div className="skeleton skeleton-icon"></div>
                            <div className="skeleton skeleton-text"></div>
                        </div>
                    </div>
                </div>

                <div className="rigt-lecture">
                    <div className="skeleton skeleton-video"></div>
                    <div className="skeleton skeleton-title"></div>
                    <div className="skeleton skeleton-price"></div>
                    <div className="skeleton skeleton-button"></div>
                </div>
            </section>
        </>
    )
}

export default CourseDetailLoading;