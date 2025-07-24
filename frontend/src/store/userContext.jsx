import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export const userContext = createContext();

function UserProvider({ children }) {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)
    const [userProfile, setUserProfile] = useState({});
    const [allCourses, setAllCourses] = useState([]);
    const [course, setCourse] = useState({});
    const [searchedCourses, setsearchedCourses] = useState([]);

    const successMsg = (msg) => toast.success(msg);
    const errorMsg = (msg) => toast.warning(msg);

    const loggedIn = localStorage.getItem("token");
    // singUp function
    const signUp = (signUpDetails) => {
        try {
            setLoading(true);
            fetch(`${import.meta.env.VITE_BACKEND_URL}/user/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signUpDetails)
            })
                .then((res) => {
                    res.json().then((data) => {
                        setLoading(false);
                        if (data.success) {
                            successMsg(data.message);
                            navigate("/login");
                        }
                        else {
                            errorMsg(data.message)
                        }
                    })
                })
        } catch (error) {
            errorMsg(error.message)
        }
    }

    // login function
    const handleLogin = (loginDetails) => {
        try {
            setLoading(true);
            fetch(`${import.meta.env.VITE_BACKEND_URL}/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginDetails)
            })
                .then((res) => {
                    res.json().then((data) => {
                        setLoading(false);
                        if (data.success) {
                            localStorage.setItem("token", data.token)
                            successMsg(data.message);
                            navigate("/");
                        }
                        else {
                            errorMsg(data.message);
                        }
                    })
                })
        } catch (error) {
            errorMsg(error.message);
        }
    }

    // logout function
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    // get user profile
    const getUserProfile = () => {
        try {
            setLoading(true);
            fetch(`${import.meta.env.VITE_BACKEND_URL}/user/user-profile`, {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            })
                .then((res) => {
                    res.json().then((data) => {
                        setLoading(false);
                        if (data.success) {
                            localStorage.setItem("role", data.userProfile.role);
                            setUserProfile(data.userProfile);
                        }
                    })
                })
        } catch (error) {
            console.log(error)
            errorMsg(error.message);
        }
    }

    // update profile
    const updateProfile = (profileInfo, setEditProfile) => {
        const formData = new FormData();

        if (profileInfo) {
            formData.append("name", profileInfo.name);
            formData.append("profileImage", profileInfo.profileImage)
        }

        try {
            setLoading(true);
            fetch(`${import.meta.env.VITE_BACKEND_URL}/user/update-profile`, {
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
                            setEditProfile(false);
                            successMsg(data.message);
                            getUserProfile();
                        }
                        else {
                            errorMsg(data.message)
                        }
                    })
                })
        } catch (error) {
            errorMsg(error.message)
        }
    }

    // get available courses
    const getAvailableCourses = () => {
        try {
            setLoading(true);
            fetch(`${import.meta.env.VITE_BACKEND_URL}/course/get-all-courses`, {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            })
                .then((res) => {
                    setLoading(false);
                    res.json().then((data) => {
                        if (data.success) {
                            setAllCourses(data.courses)
                        }
                    })
                })
        } catch (error) {
            errorMsg(error.message);
        }
    }

    // get single course details
    const getCourseDetails = (courseId) => {
        try {
            setLoading(true);
            fetch(`${import.meta.env.VITE_BACKEND_URL}/course/get-courses/${courseId}`, {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            })
                .then((res) => {
                    res.json().then((data) => {
                        setLoading(false);
                        if (data.success) {
                            setCourse(data.course);
                        }
                    })
                })
        } catch (error) {
            errorMsg(error.message);
        }
    }
    // get getPurchased Course
    const getPurchasedCourse = (courseId) => {
        try {
            setLoading(true);
            fetch(`${import.meta.env.VITE_BACKEND_URL}/course/get-purchased-course/${courseId}`, {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            })
                .then((res) => {
                    res.json().then((data) => {
                        setLoading(false);
                        if (data.success) {
                            setCourse(data.course);
                        }
                        else {
                            navigate(`/course-detail/${courseId}`);
                        }
                    })
                })
        } catch (error) {
            errorMsg(error.message);
        }
    }

    // mark course completed
    const markCourseCompleted = (courseId, lectureIndex) => {
        try {
            setLoading(true);
            fetch(`${import.meta.env.VITE_BACKEND_URL}/user/mark-lecture-completed`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("token")
                },
                body: JSON.stringify({ courseId, lectureIndex })
            })
                .then((res) => {
                    res.json().then((data) => {
                        setLoading(false);
                        if (data.success) {
                            getPurchasedCourse(courseId);
                        }

                    })
                })
        } catch (error) {
            errorMsg(error.message);
        }
    }

    // init payment
    const initPayment = (order) => {
        console.log(import.meta.env.VITE_KEY_ID)
        try {
            const options = {
                key: import.meta.env.VITE_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                description: "Course Payment",
                order_id: order.id,
                receipt: order.receipt,
                handler: async (response) => {
                    fetch(`${import.meta.env.VITE_BACKEND_URL}/user/verify-payment`, {
                        method: "POST",
                        headers: {
                            authorization: localStorage.getItem("token"),
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(response)
                    })
                        .then((res) => {
                            res.json().then((data) => {
                                if (data.success) {
                                    successMsg(data.message);
                                    navigate(`/course-progress/${order.receipt}`)
                                }

                                else {
                                    errorMsg(data.message)
                                }
                            })
                        })
                }
            }
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            errorMsg(error.message);
        }
    }

    // buy course
    const buyCourse = (courseId) => {
        try {
            fetch(`${import.meta.env.VITE_BACKEND_URL}/user/course-payment/${courseId}`, {
                method: "POST",
                headers: {
                    authorization: localStorage.getItem("token"),
                }
            })
                .then((res) => {
                    res.json().then((data) => {
                        if (data.success) {
                            initPayment(data.order);
                        }
                        else {
                            errorMsg(data.message);
                            navigate("/login")
                        }
                    })
                })
        } catch (error) {
            errorMsg(error.message);
        }
    }

    // search course
    const searchCourse = (query, categories) => {
        try {
            fetch(`${import.meta.env.VITE_BACKEND_URL}/user/get-searched-courses?query=${encodeURIComponent(query)}`, {
                method: "POST",
                headers: {
                    authorization: localStorage.getItem("token"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ categories })
            })
                .then((res) => {
                    res.json().then((data) => {
                        console.log(data)
                        if (data.success) {
                            setsearchedCourses(data.courses);
                        }
                        else {
                            navigate("/login")
                        }
                    })
                })
        } catch (error) {
            errorMsg(error.message);
        }
    }


    useEffect(() => {
        if (localStorage.getItem("token")) {
            getUserProfile();
        }
    }, [localStorage.getItem("token")])



    return (
        <userContext.Provider value={{ signUp, loading, handleLogin, loggedIn, handleLogout, getUserProfile, userProfile, updateProfile, getAvailableCourses, allCourses, getCourseDetails, course, buyCourse, markCourseCompleted, searchCourse, searchedCourses, setsearchedCourses, getPurchasedCourse }}>
            {children}
        </userContext.Provider>
    )
}

export default UserProvider;
