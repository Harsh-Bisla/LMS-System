const express = require('express');
const { handleRegister, handleLogin, getUserProfile, updateUserProfile, buyCourse, verifyPayment, markLecturesCompleted, searchCourses, filterCourse, getdashboardData } = require('../controllers/userController');
const upload = require('../utils/multer');
const isUserAuth = require('../middlewares/userAuth');
const userRouter = express.Router();


userRouter.post("/register", handleRegister);
userRouter.post("/login", handleLogin);
userRouter.get("/user-profile", isUserAuth, getUserProfile);
userRouter.post("/update-profile", isUserAuth, upload.single("profileImage"), updateUserProfile);
userRouter.post("/buy-course/:courseId", isUserAuth, buyCourse);
userRouter.post("/course-payment/:courseId", isUserAuth, buyCourse);
userRouter.post("/mark-lecture-completed", isUserAuth, markLecturesCompleted);
userRouter.post("/verify-payment", isUserAuth, verifyPayment);
userRouter.post("/get-searched-courses", isUserAuth, searchCourses);
userRouter.get("/get-dashboard-data", isUserAuth, getdashboardData);


module.exports = userRouter;