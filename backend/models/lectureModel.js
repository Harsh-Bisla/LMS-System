const mognoose = require('mongoose');

const lectureSchema = mognoose.Schema({
    lectureTitle: {
        type: String,
        required: true
    },
    lectureVideo: {
        type: String,
        default: ""
    },
    isVideoFree: {
        type: Boolean,
        default: false
    }
});

const Lecture = mognoose.model("lecture", lectureSchema);
module.exports = Lecture;