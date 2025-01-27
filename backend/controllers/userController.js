const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uploadCloudinary = require('../utils/cloudinary');
const Course = require('../models/courseModel');
const razorpay = require("razorpay");
const { default: mongoose } = require('mongoose');

// registering the user
const handleRegister = async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        return res.send({ message: "all fields are required", success: false });
    }

    try {
        const user = await User.findOne({ email });
        if (user) return res.send({ message: "user already exists with this email!", success: false });

        bcrypt.hash(password, 12, async (err, hash) => {
            await User.create({
                name,
                email,
                password: hash,
                role
            });
            return res.send({ message: "Account created", success: true })
        })

    } catch (error) {
        return res.send({ message: "Internal Server error", success: false, err: error.message });
    }
}

// login user
const handleLogin = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.send({ message: "email and password is required", success: false });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) return res.send({ message: "Incorrect email or password", success: false });

        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
                return res.send({ message: `welcome back ${user.name}`, success: true, token });
            }
            else {
                return res.send({ message: "Incorrect email or password" });
            }
        })
    } catch (error) {
        return res.send({ message: "Internal Server error", success: false, err: error.message });
    }
}


// get user profile
const getUserProfile = async (req, res) => {
    const { id } = req.user;
    try {
        const userProfile = await User.findById(id).select("-password").populate({
            path: "enrolledCourses.course", // Populate `course` field in `enrolledCourses`
            populate: {
                path: "creator",
                select: "profileImage name"
            }
        });

        if (!userProfile) return res.send({ message: "user not found", success: false });
        return res.send({ success: true, userProfile });

    } catch (error) {
        return res.send({ message: "Internal Server error", success: false, err: error.message });
    }
}


// update user-profile
const updateUserProfile = async (req, res) => {
    const { name } = req.body;
    if (!name) return res.send({ message: "name is required", success: false });

    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.send({ message: "user not found", success: false });
        user.name = name;

        if (req.file) {
            let profileImage = req.file.path;
            const response = await uploadCloudinary(profileImage);
            user.profileImage = response.url;
        }
        await user.save();
        return res.send({ message: "Profile Updated", success: true });

    } catch (error) {
        return res.send({ message: "Internal Server error", success: false, err: error.message });
    }
}

// razorpay instance
const razorpayInstance = new razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET
})

// buy course
const buyCourse = async (req, res) => {
    const { courseId } = req.params;
    const userId = req.user.id;
    try {
        const user = await User.findById(userId);
        if (!user) return res.send({ message: "user not found", success: false });

        const course = await Course.findById(courseId);
        if (!course) return res.send({ message: "course not found", success: false });

        if (user.enrolledCourses.includes(courseId) && course.enrolledStudents.includes(userId)) {
            return res.send({ message: "You have already enrolled in this course", success: false });
        }

        // payment  options
        const options = {
            amount: course.price * 100,
            currency: process.env.CURRENCY,
            receipt: courseId
        }

        // creating order
        const order = await razorpayInstance.orders.create(options);
        return res.send({ success: true, order });

    } catch (error) {
        return res.send({ message: "failed to buy course", success: false });
    }
}

// mark course lectures completed
const markLecturesCompleted = async (req, res) => {
    const { courseId, lectureIndex } = req.body;
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);
        if (!user) return res.send({ message: "user not found", success: false });

        const enrolledCourse = user.enrolledCourses.find(
            (enrollment) => enrollment.course.equals(courseId)
        );

        if (!enrolledCourse) return res.send({ message: "Course not found", success: false });

        if (!enrolledCourse.completedLectures.includes(lectureIndex)) {
            enrolledCourse.completedLectures.push(lectureIndex);
            await user.save();
            return res.send({ message: "Lecture completed", success: true });
        }
        else {
            return res.send({ message: "Lecture Already completed", success: false });
        }
    } catch (error) {
        console.log(error)
        return res.send({ message: "failed to complete lecture", success: false });
    }

}

// verify course buy payment
const verifyPayment = async (req, res) => {
    const userId = req.user.id;

    try {
        const { razorpay_order_id } = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        const user = await User.findById(userId);
        if (!user) return res.send({ message: "user not found", success: false });

        const existingCourse = await Course.findById(orderInfo.receipt);

        if (orderInfo.status === "paid") {
            user.enrolledCourses.push({ course: orderInfo.receipt, completedLectures: [] });
            existingCourse.enrolledStudents.push(userId);
            existingCourse.salesCount = existingCourse.salesCount + 1;

            await user.save();
            await existingCourse.save();

            return res.send({ message: "You have  successfully enrolled.", success: true });
        }
        else {
            return res.send({ message: "Payment failed", success: false })
        }
    } catch (error) {
        return res.send({ message: "Internal Server error", success: false });
    }
}

// search courses
const searchCourses = async (req, res) => {
    const { query } = req.query;
    const { categories } = req.body;
    try {
        if (categories.length > 0) {
            const courses = await Course.find({
                category: { $in: categories }
            });

            if (!courses) return res.send({ message: "No course found with this category", success: false });
            return res.send({ message: "filtered courses", success: true, courses });
        }
        else if (query === "query") {
            const courses = await Course.find({});
            return res.send({ success: true, courses });
        }
        else {
            const courses = await Course.find({
                $or: [
                    { title: { $regex: query, $options: "i" } }, // Case-insensitive match
                    { category: { $regex: query, $options: "i" } },
                    { subtitle: { $regex: query, $options: "i" } },
                ],
            });
            return res.send({ message: "Courses retrived sucessfully", success: true, courses });
        }

    } catch (error) {
        return res.send({ message: "Error while searching the courses", success: false, error: error.message });
    }
}

// get Dashboard Data
const getdashboardData = async (req, res) => {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    try {
        const courses = await Course.find({ creator: userId });
        if (!courses) return res.send({ message: "You haven't created any course yet", success: false });

        let totalSales = 0;
        let totalPrice = 0;
        courses.forEach((course) => {
            totalSales = totalSales + course.salesCount;
            totalPrice = totalPrice + course.price * totalSales;
        })
        const dashboardData = { totalPrice, totalSales };
        return res.send({ success: true, dashboardData });

    } catch (error) {
        console.log(error)
        return res.send({ message: "Internal Server error", success: false });
    }
}

module.exports = {
    handleRegister,
    handleLogin,
    getUserProfile,
    updateUserProfile,
    buyCourse,
    verifyPayment,
    markLecturesCompleted,
    searchCourses,
    getdashboardData
}
