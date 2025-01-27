import { createContext, useContext, useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export const adminContext = createContext();

function AdminProvider({ children }) {

    const errMsg = (msg) => toast.warning(msg);
    const succMsg = (msg) => toast.success(msg);
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState({});
    const [loading, setLoading] = useState(false);
    const [Lecture, setLecture] = useState({});
    const [dashboardData, setDashbboardData] = useState({});


    // get admin courses
    const getAdminCourses = () => {
        try {
            setLoading(true);
            fetch(`${import.meta.env.VITE_BACKEND_URL}/course/get-admin-courses`, {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            })
                .then((res) => {
                    res.json().then((data) => {
                        setLoading(false);
                        setCourses(data.courses);
                    })
                })
        } catch (error) {
            errMsg(error.message)
        }
    }

    // create new course
    const createCourse = (createCourseDetails) => {
        try {
            setLoading(true);
            fetch(`${import.meta.env.VITE_BACKEND_URL}/course/create-course`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("token")
                },
                body: JSON.stringify(createCourseDetails)
            })
                .then((res) => {
                    res.json().then((data) => {
                        setLoading(false);
                        if (data.success) {
                            succMsg(data.message);
                            navigate("/admin/courses");
                        }
                        else {
                            errMsg(data.message);
                        }
                    })
                })
        } catch (error) {
            errMsg(error.message)
        }
    }

    // get single course for edit
    const getSingleCourse = (courseId) => {
        try {
            setLoading(true);
            if (courseId) {
                fetch(`${import.meta.env.VITE_BACKEND_URL}/course/get-courses/${courseId}`, {
                    headers: {
                        authorization: localStorage.getItem("token")
                    }
                })
                    .then((res) => {
                        res.json().then((data) => {
                            setLoading(false);
                            setCourse(data.course)
                        })
                    })
            }
        } catch (error) {
            errMsg(error.message);
        }
    }

    // update course
    const updateCourse = (courseId, courseDetails) => {
        if (courseId && courseDetails) {
            const formData = new FormData();
            formData.append("title", courseDetails.title);
            formData.append("subtitle", courseDetails.subtitle);
            formData.append("description", courseDetails.description);
            formData.append("price", courseDetails.price);
            formData.append("level", courseDetails.level);
            formData.append("category", courseDetails.category);
            formData.append("thumbnail", courseDetails.thumbnail);
            try {
                setLoading(true);
                fetch(`${import.meta.env.VITE_BACKEND_URL}/course/update-course/${courseId}`, {
                    method: "POST",
                    headers: {
                        authorization: localStorage.getItem("token")
                    },
                    body: formData
                })
                    .then((res) => {
                        res.json().then((data) => {
                            setLoading(false);
                            if (data.success) {
                                succMsg(data.message);
                                getSingleCourse(courseId);
                            }
                            else {
                                errMsg(data.message);
                            }
                        })
                    })
            } catch (error) {
                errMsg(error.message);
            }
        }
    }

    // create new lecture
    const createLecture = (lectureTitle, courseId) => {
        try {
            setLoading(true);
            fetch(`${import.meta.env.VITE_BACKEND_URL}/course/create-lecture/${courseId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("token")
                },
                body: JSON.stringify({ lectureTitle })
            })
                .then((res) => {
                    res.json().then((data) => {
                        setLoading(false);
                        if (data.success) {
                            succMsg(data.message);
                            getSingleCourse(courseId);
                        }
                        else {
                            errMsg(data.message);
                        }
                    })
                })
        } catch (error) {
            errMsg(error.message);
        }
    }

    // get single lecture
    const getSingleLecture = (lectureId) => {
        try {
            setLoading(true);
            fetch(`${import.meta.env.VITE_BACKEND_URL}/course/get-single-lecture/${lectureId}`, {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            })
                .then((res) => {
                    res.json().then((data) => {
                        setLoading(false);
                        setLecture(data.lecture)
                    })
                })
        } catch (error) {

        }
    }

    // upload lecture video
    const uploadVideo = (lectureId, lectureVideo) => {
        if (lectureId) {
            const formData = new FormData();
            formData.append("lectureVideo", lectureVideo);
            try {
                setLoading(true);
                fetch(`${import.meta.env.VITE_BACKEND_URL}/course/upload-lecture-video/${lectureId}`, {
                    method: "POST",
                    headers: {
                        authorization: localStorage.getItem("token")
                    },
                    body: formData
                })
                    .then((res) => {
                        res.json().then((data) => {
                            setLoading(false);
                            if (data.success) {
                                succMsg(data.message);
                            }
                            else {
                                errMsg(data.message);
                            }
                        })
                    })
            } catch (error) {
                errMsg(error.message);
            }
        }
    }

    // update lecture
    const updatelecture = (lectureTitle, isVideoFree, lectureId) => {
        const lectureDetails = {
            isVideoFree,
            lectureTitle
        }
        try {
            setLoading(true);
            fetch(`${import.meta.env.VITE_BACKEND_URL}/course/update-lecture/${lectureId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("token")
                },
                body: JSON.stringify(lectureDetails)
            })
                .then((res) => {
                    res.json().then((data) => {
                        setLoading(false);
                        if (data.success) {
                            succMsg(data.message);
                            getSingleLecture(lectureId);
                        }
                        else {
                            errMsg(data.message);
                        }
                    })
                })
        } catch (error) {
            errMsg(error.message);
        }
    }

    // remove lecture
    const removeLecture = (removeDetail) => {
        if (removeDetail) {
            try {
                setLoading(true);
                fetch(`${import.meta.env.VITE_BACKEND_URL}/course/remove-lecture/${removeDetail.courseId}/${removeDetail.lectureId}`, {
                    method: "POST",
                    headers: {
                        authorization: localStorage.getItem("token"),
                        "Content-Type": "application/json"
                    }
                })
                    .then((res) => {
                        res.json().then((data) => {
                            setLoading(false);
                            if (data.success) {
                                succMsg(data.message);
                                navigate(`/admin/course/${removeDetail.courseId}/create-lecture`)
                            }
                            else {
                                errMsg(data.message)
                            }
                        })
                    })
            } catch (error) {
                errMsg(error.message);
            }
        }
    }

    // delete course
    const removeCourse = (courseId) => {
        if (courseId) {
            try {
                setLoading(true);
                fetch(`${import.meta.env.VITE_BACKEND_URL}/course/remove-course/${courseId}`, {
                    method: "POST",
                    headers: {
                        authorization: localStorage.getItem("token")
                    }
                })
                    .then((res) => {
                        res.json().then((data) => {
                            if (data.success) {
                                setLoading(false);
                                succMsg(data.message);
                                navigate("admin/courses");
                            }
                            else {
                                errMsg(data.message);
                            }
                        })
                    })
            } catch (error) {
                errMsg(error.message);
            }
        }
    }

    // publish course
    const publishCourse = (courseId) => {
        try {
            setLoading(true);
            fetch(`${import.meta.env.VITE_BACKEND_URL}/course/publish-course/${courseId}`, {
                method: "POST",
                headers: {
                    authorization: localStorage.getItem("token")
                }
            })
                .then((res) => {
                    res.json().then((data) => {
                        setLoading(false);
                        if (data.success) {
                            succMsg(data.message);
                            getSingleCourse(courseId);
                        }
                        else {
                            errMsg(data.message);
                        }
                    })
                })
        } catch (error) {
            errMsg(error.message);
        }
    }

    // unpublish course
    const unpublishCourse = (courseId) => {
        try {
            setLoading(true);
            fetch(`${import.meta.env.VITE_BACKEND_URL}/course/unpublish-course/${courseId}`, {
                method: "POST",
                headers: {
                    authorization: localStorage.getItem("token")
                }
            })
                .then((res) => {
                    res.json().then((data) => {
                        setLoading(false);
                        if (data.success) {
                            succMsg(data.message);
                            getSingleCourse(courseId);
                        }
                        else {
                            errMsg(data.message);
                        }
                    })
                })
        } catch (error) {
            errMsg(error.message);
        }
    }

    // get dashboard data
    const getDashboardData = () => {
        try {
            fetch(`${import.meta.env.VITE_BACKEND_URL}/user/get-dashboard-data`, {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            })
                .then((res) => {
                    res.json().then((data) => {
                        if (data.success) {
                            setDashbboardData(data.dashboardData);
                        }
                    })
                })
        } catch (error) {
            errMsg(error.message);
        }
    }

    return (
        <adminContext.Provider value={{ getAdminCourses, courses, createCourse, getSingleCourse, course, updateCourse, loading, createLecture, getSingleLecture, Lecture, uploadVideo, updatelecture, removeLecture, removeCourse, publishCourse, unpublishCourse, getDashboardData, dashboardData }}>
            {children}
        </adminContext.Provider>
    )
}

export default AdminProvider;