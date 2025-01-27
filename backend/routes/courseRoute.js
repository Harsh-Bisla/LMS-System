const express = require('express');
const courseRouter = express.Router();
const isUserAuth = require('../middlewares/userAuth');
const upload = require('../utils/multer');
const { createCourse, singleCourse, updateCourse, getAdminCourses, getAllCourses, createLecture, getAllLectures, removeLecture, updateLecture, uploadlectureVideo, getSingleLecture, removeCourse, publishCourse, unPublishCourse, getPurchasedCourse } = require('../controllers/courseController');


courseRouter.post('/create-course', isUserAuth, createCourse);
courseRouter.post("/remove-course/:courseId", isUserAuth, removeCourse);
courseRouter.get('/get-courses/:courseId', singleCourse);
courseRouter.get('/get-purchased-course/:courseId', isUserAuth, getPurchasedCourse);
courseRouter.post("/update-course/:courseId", upload.single("thumbnail"), updateCourse);
courseRouter.get("/get-admin-courses", isUserAuth, getAdminCourses);
courseRouter.get("/get-all-courses", getAllCourses);
courseRouter.post("/create-lecture/:courseId", isUserAuth, createLecture);
courseRouter.get("/get-all-lectures/:courseId", isUserAuth, getAllLectures);
courseRouter.get("/get-single-lecture/:lectureId", isUserAuth, getSingleLecture);
courseRouter.post("/remove-lecture/:courseId/:lectureId", isUserAuth, removeLecture);
courseRouter.post("/update-lecture/:lectureId", isUserAuth, updateLecture);
courseRouter.post("/upload-lecture-video/:lectureId", upload.single("lectureVideo"), isUserAuth, uploadlectureVideo);
courseRouter.post("/publish-course/:courseId", isUserAuth, publishCourse);
courseRouter.post("/unpublish-course/:courseId", isUserAuth, unPublishCourse);

module.exports = courseRouter;