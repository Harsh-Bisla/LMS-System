import React, { useContext, useEffect } from "react";
import "./CourseDetail.css";
import { CiCircleInfo } from "react-icons/ci";
import { FaRegPlayCircle } from "react-icons/fa";
import lectureImage from "../../assets/docker-course.jpg";
import { userContext } from "../../store/userContext";
import { useNavigate, useParams } from "react-router-dom";
import { LuLockKeyhole } from "react-icons/lu";
import CourseDetailLoading from "../../components/CourseDetailLoading/CourseDetailLoading";

function CourseDetail() {
  const { getCourseDetails, course, buyCourse, userProfile, loading } =
    useContext(userContext);
  const { courseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getCourseDetails(courseId);
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {loading ? (
        <CourseDetailLoading />
      ) : (
        <>
          <section className="course-detail-header">
            <h1>{course?.title}</h1>
            <p>{course?.subtitle}</p>
            <p id="created-detail">
              Created By : <span> {course.creator?.name}</span>
            </p>
            {/* <div className='info-icon'>
                            <CiCircleInfo />
                            <p>Last Updated {course?.createdAt}</p>
                        </div> */}
            <p style={{ fontSize: "13px" }}>
              Students Enrolled : {course?.enrolledStudents?.length}
            </p>
          </section>

          {/* buy-course-details */}
          <section className="buy-course-details">
            <div className="left-description">
              <h2>Description</h2>
              <p>{course?.description}</p>
              <div className="course-content-box">
                <h3>Course Content</h3>
                <p style={{ marginBottom: "20px" }}>
                  {course?.lectures?.length} Lectures
                </p>

                {course?.lectures?.map((lecture, idx) => (
                  <div key={idx} className="lecture-">
                    {lecture.isVideoFree ? (
                      <FaRegPlayCircle />
                    ) : (
                      <LuLockKeyhole />
                    )}

                    <p>{lecture.lectureTitle}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rigt-lecture">
              <div className="lecture-video-box">
                <video
                  controls
                  autoPlay
                  muted
                  src={
                    course?.lectures?.find(
                      (lecture) => lecture.isVideoFree === true
                    )?.lectureVideo || ""
                  }
                ></video>
              </div>

              <h3>
                {
                  course?.lectures?.find(
                    (lecture) => lecture.isVideoFree === true
                  )?.lectureTitle
                }
              </h3>

              <h4>&#x20b9;{course?.price}</h4>

              <div style={{ textAlign: "center" }}>
                {userProfile?.enrolledCourses?.some(
                  ({ course }) => course._id === courseId
                ) ? (
                  <button
                    onClick={() => navigate(`/course-progress/${courseId}`)}
                    className="continue-course-btn"
                  >
                    Continue Course
                  </button>
                ) : (
                  <button
                    onClick={() => buyCourse(course?._id)}
                    className="buy-course-btn"
                  >
                    Buy Course Now
                  </button>
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default CourseDetail;
