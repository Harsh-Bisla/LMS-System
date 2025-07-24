import React, { useContext } from "react";
import "./MyLearning.css";
import Course from "../../components/Course/Course";
import { userContext } from "../../store/userContext";
import SkeletonLoading from "../../components/SkeletonLoading/SkeletonLoading";
import { motion } from "framer-motion";

function MyLearning() {
  const { userProfile, loading } = useContext(userContext);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section className="my-learinng-section">
      <h1>MY LEARNINIG</h1>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="my-learning-container"
      >
        {userProfile?.enrolledCourses?.length == 0 && (
          <h2 style={{ textAlign: "center" }}>
            You have't enrolled in any course.
          </h2>
        )}

        {userProfile?.enrolledCourses?.map(({ course }, idx) => (
          <Course key={idx} course={course} variants={childVariants} />
        ))}
        {/* loading */}
        {loading &&
          Array.from({ length: 6 }, (_, index) => <SkeletonLoading />)}
      </motion.div>
    </section>
  );
}

export default MyLearning;
