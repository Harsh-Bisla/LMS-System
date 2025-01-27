const Course = require('../models/courseModel');
const Lecture = require('../models/lectureModel');
const User = require('../models/userModel');
const uploadCloudinary = require('../utils/cloudinary');

// create course
const createCourse = async (req, res) => {
    const { title, category } = req.body;
    if (!title || !category) return res.send({ message: "title and category is required", success: false });

    try {
        await Course.create({
            title, category, creator: req.user.id
        });

        return res.send({ message: "Course created", success: true });
    } catch (error) {
        return res.send({ message: "Failed to create course", success: false });
    }
}

// get course details
const singleCourse = async (req, res) => {
    const { courseId } = req.params;
    if (!courseId) return res.send({ message: "courseId is empty", success: false });
    try {
        const course = await Course.findById(courseId).populate("creator").populate("lectures");
        if (!course) return res.send({ message: "course not found", success: false });

        return res.send({ success: true, course });;

    } catch (error) {
        return res.send({ message: "failed to load course", success: false, error: error.message });
    }
}

// get purchased course
const getPurchasedCourse = async (req, res) => {
    const { courseId } = req.params;
    try {
        if (!courseId) return res.send({ message: "course id is required", success: false });

        const user = await User.findById(req.user.id);
        if (!user) return res.send({ message: "User not found", success: false });

        if (user.enrolledCourses?.some((enrollment) => enrollment.course.toString() === courseId)) {
            const course = await Course.findById(courseId).populate("creator").populate("lectures");
            if (!course) return res.send({ message: "Course not found", success: false });
            return res.send({ success: true, course });
        } else {
            return res.send({ message: "You haven't purchased the course", success: false });
        }



    } catch (error) {
        console.log(error)
        return res.send({ message: "Internal server error", success: false });
    }
}

// update course
const updateCourse = async (req, res) => {
    const { courseId } = req.params;
    let thumbnail;
    if (!courseId) return res.send({ message: "courseId is empty", success: false });

    try {
        const { title, subtitle, description, category, level, price } = req.body;
        if (!title || !subtitle || !description || !category || !level || !price) {
            return res.send({ message: "all fields are required", success: false });
        }

        if (req.file) {
            const response = await uploadCloudinary(req.file.path);
            thumbnail = response.url;
        }
        else {
            return res.send({ message: "thumbnail is required", success: false })
        }

        const updatedCourse = await Course.findByIdAndUpdate(courseId, {
            title, subtitle, category, description, level, price, thumbnail
        }, { new: true });

        return res.send({ message: "Course updated", success: true, updatedCourse })
    } catch (error) {
        return res.send({ message: "failed to update course", success: false });
    }
}

// get all admin courses
const getAdminCourses = async (req, res) => {
    try {
        const courses = await Course.find({ creator: req.user.id });
        if (!courses) return res.send({ message: "You have not created any courrse yet!", success: false });

        return res.send({ success: true, courses });

    } catch (error) {
        return res.send({ message: "failed to fetch courses", success: false });
    }
}

// get all courses
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({ isPublished: true }).populate("creator");
        if (!courses) return res.send({ message: "No courses available!", success: false });

        return res.send({ success: true, courses });
    } catch (error) {
        return res.send({ message: "Internal Server error", success: false });
    }
}

// create lecture
const createLecture = async (req, res) => {
    const { courseId } = req.params;
    try {
        const { lectureTitle } = req.body;
        if (!lectureTitle) return res.send({ message: "title is required", success: false });

        const course = await Course.findById(courseId);
        if (!course) return res.send({ message: "no course found!", success: false })

        const lecture = await Lecture.create({
            lectureTitle
        });

        course.lectures.push(lecture._id);
        await course.save();

        return res.send({ message: "Lecture created", success: true });
    } catch (error) {
        console.log(error)
        return res.send({ message: "failed to add lecture", success: false })
    }
}

// get single lecture
const getSingleLecture = async (req, res) => {
    const { lectureId } = req.params;
    if (lectureId) {
        try {

            const lecture = await Lecture.findById(lectureId);
            if (!lecture) return res.send({ message: "No lecture were found", success: false });
            return res.send({ success: true, lecture });

        } catch (error) {
            return res.sedn({ message: "Internal Server error", success: false });
        }
    }
}

// get all lectures
const getAllLectures = async (req, res) => {
    const { lectureId } = req.params;
    try {
        const lectures = await Lecture.findById(lectureId);
        if (!lectures) return res.send({ message: "No lectures found", success: false });

        return res.send({ success: true, lectures });
    } catch (error) {
        return res.send({ message: "Internal Server error", success: false });
    }
}

// remove lecture
const removeLecture = async (req, res) => {
    const { courseId, lectureId } = req.params;
    if (lectureId && courseId) {
        try {
            const lecture = await Lecture.findOneAndDelete({ _id: lectureId });
            if (!lecture) return res.send({ message: "lecture already deleted", success: false });

            const course = await Course.findOneAndUpdate({ _id: courseId }, { $pull: { lectures: lectureId } });

            if (!course) return res.send({ message: "course not found", success: false });
            return res.send({ message: "Lecture Deleted", success: true });

        } catch (error) {
            console.log(error)
            return res.send({ message: "failed to remove lecture", success: false });
        }
    }
}

// upload lecture video
const uploadlectureVideo = async (req, res) => {
    const { lectureId } = req.params;
    if (req.file) {
        try {
            const response = await uploadCloudinary(req.file.path);

            if (response) {
                const lecture = await Lecture.findOneAndUpdate({ _id: lectureId }, { lectureVideo: response.url });

                if (!lecture) return res.send({ message: "No lecture found", success: false });
                return res.send({ message: "Video uploaded successfully", success: true });

            }
        } catch (error) {
            return res.send({ message: "failed to upload video", success: false });
        }
    }
    else {
        return res.send({ message: "Please select the lectue video", success: false });
    }
}

// update lecture
const updateLecture = async (req, res) => {
    const { lectureId } = req.params;
    const { isVideoFree, lectureTitle } = req.body;
    try {
        const lecture = await Lecture.findOneAndUpdate({ _id: lectureId }, { isVideoFree: isVideoFree, lectureTitle: lectureTitle });

        if (!lecture) return res.send({ message: "lecture not found", success: false });
        return res.send({ message: "lecture updated", success: true });

    } catch (error) {
        return res.send({ message: "failed to update lecture", success: false })
    }
}

// remove course
const removeCourse = async (req, res) => {
    const { courseId } = req.params;
    try {
        const course = await Course.findByIdAndDelete(courseId);
        if (!course) return res.send({ message: "Course not found", success: false });

        await Lecture.deleteMany({ _id: { $in: course.lectures } });

        return res.send({ message: "Course Deleted", success: true });

    } catch (error) {
        return res.send({ message: "failed to remove course", success: false });
    }
}

// publish course
const publishCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId);
        if (!course) return res.send({ message: "course not found", success: false });

        if (course.title && course.subtitle && course.description && course.category && course.level && course.thumbnail && course.price) {

            if (course.lectures.length === 0) return res.send({ message: "Add lectures to publish the course", success: false });

            course.isPublished = true;
            course.save();

            return res.send({ message: "Course Published", success: true })
        }
        else {
            return res.send({ message: "All course details are nedded.", success: false });
        }

    } catch (error) {
        return res.send({ message: "Failed to publish course", success: false });
    }
}

// unpublish course
const unPublishCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findByIdAndUpdate(courseId, { isPublished: false });
        if (!course) return res.send({ message: "course not found", success: false });

        return res.send({ message: "Course Unpublished", success: true })
    } catch (error) {
        return res.send({ message: "Failed to publish course", success: false });
    }
}


module.exports = {
    createCourse,
    singleCourse,
    updateCourse,
    getAdminCourses,
    getAllCourses,
    createLecture,
    getAllLectures,
    removeLecture,
    updateLecture,
    uploadlectureVideo,
    getSingleLecture,
    removeCourse,
    publishCourse,
    unPublishCourse,
    getPurchasedCourse
}