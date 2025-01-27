const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: ""
    },
    profileImage: {
        type: String,
        default: ""
    },
    enrolledCourses: [
        {
            course: { type: mongoose.Schema.Types.ObjectId, ref: "course" },
            completedLectures: [{ type: Number }]
        }
    ]
});

const User = mongoose.model("user", userSchema);
module.exports = User;