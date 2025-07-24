import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import profiileImage from "../../assets/dummy-user.jpg";
import { IoCloseOutline } from "react-icons/io5";
import Course from "../../components/Course/Course";
import { userContext } from "../../store/userContext";
import Loader from "../../components/Loader/Loader";
import BtnLoader from "../../components/BtnLoader/BtnLoader";
import {
  motion,
  AnimatePresence,
  spring,
  easeInOut,
  easeIn,
} from "motion/react";

function Profile() {
  const [editProfile, setEditProfile] = useState(false);
  const { userProfile, updateProfile, loading } = useContext(userContext);
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState("");

  // handle popup
  const handleProfilePopUp = () => {
    setEditProfile(editProfile ? false : true);
  };

  useEffect(() => {
    if (userProfile) {
      setName(userProfile?.name || "");
    }
  }, [userProfile]);

  return (
    <>
      {/* profile-section */}
      <motion.section
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.3,
          ease: easeIn,
          delay: 0.5,
        }}
        className="profile-section"
      >
        <h1>PROFILE</h1>
        <div className="profile-box">
          <img
            src={userProfile?.profileImage || profiileImage}
            alt="user-profile-image"
          />
          <div className="user-info">
            <p>
              Name: <span> {userProfile?.name}</span>
            </p>
            <p>
              Email: <span> {userProfile?.email}</span>
            </p>
            <p>
              Role: <span> {userProfile?.role?.toUpperCase()}</span>
            </p>
            <button onClick={handleProfilePopUp} className="edit-profile-btn">
              Edit Profile
            </button>
          </div>
        </div>
      </motion.section>

      {/* enrolled courses */}
      <section className="enrolled-courrses-section">
        <p>Courses you're enrolled in.</p>
        <div className="enrolled-course-container">
          {userProfile?.enrolledCourses?.length === 0 && (
            <h3>You have not enrolled in any course</h3>
          )}
          {userProfile?.enrolledCourses?.map(({ course }, idx) => (
            <Course key={idx} course={course} />
          ))}
        </div>
      </section>

      {/* pop up */}
      <AnimatePresence>
        {editProfile && (
          <motion.section className="pop-up-section">
            <motion.div
              className="pop-up"
              initial={{
                scale: [0, 7, 1.2, 1],
                opacity: 0,
                filter: "blur(10px)",
              }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: easeInOut }}
            >
              <div className="edit-profile">
                <h4>Edit Profile</h4>
                <IoCloseOutline onClick={handleProfilePopUp} size={20} />
              </div>
              <p>
                Make changes to your profile here. Click save when you're done.
              </p>

              <div className="name-img-input">
                <p>Name</p>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Name"
                />
              </div>

              <div className="name-img-input">
                <p>Profile Photo</p>
                <input
                  onChange={(e) => setProfileImage(e.target.files[0])}
                  type="file"
                />
              </div>

              <div className="btn-box">
                {loading ? (
                  <BtnLoader />
                ) : (
                  <button
                    onClick={() =>
                      updateProfile({ name, profileImage }, setEditProfile)
                    }
                    className="updat-profile-btn"
                  >
                    Save Changes
                  </button>
                )}
              </div>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* loading */}
      {loading && <Loader />}
    </>
  );
}

export default Profile;
