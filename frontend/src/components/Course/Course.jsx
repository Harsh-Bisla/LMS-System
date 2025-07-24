import "./Course.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import dummyUser from "../../assets/dummy-user.jpg";

function Course({ course, variants }) {
  const navigate = useNavigate();

  return (
    <motion.div variants={variants} className="course">
      <div className="course-img">
        <img src={course?.thumbnail} alt="course-image" />
      </div>
      <h4 onClick={() => navigate(`/course-detail/${course?._id}`)}>
        {course?.title.slice(0, 25)}...
      </h4>
      <div className="course-maker-info">
        <div className="img-name">
          <img
            src={course?.creator?.profileImage || dummyUser}
            alt="course-image"
          />
          <p>{course?.creator?.name} </p>
        </div>
        <p id="category">{course?.level.toUpperCase()}</p>
      </div>
      <h3>&#x20b9;{course?.price}</h3>
    </motion.div>
  );
}

export default Course;
