const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subtitle: {
        type: String
    },
    price: {
        type: Number,
        default: 0
    },
    level: {
        type: String,
        enum: ["begineer", "intermediate", "advanced"]
    },
    thumbnail: {
        type: String,
        default: ""
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    description: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    salesCount: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    lectures: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "lecture"
        }
    ],
    enrolledStudents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ]
});

const Course = mongoose.model("course", courseSchema);
module.exports = Course;