import React from 'react';
import "./SkeletonLoading.css";

function SkeletonLoading() {
    return (
        <div className="course-skeleton">
            <div className="image-placeholder skeleton"></div>
            <div className="title-skeleton skeleton"></div>
            <div className="maker-info-skeleton">
                <div className="image-skeleton skeleton"></div>
                <div className="maker-name-skeleton skeleton"></div>
            </div>
        </div>

    )
}

export default SkeletonLoading