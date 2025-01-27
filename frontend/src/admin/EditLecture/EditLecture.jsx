import React, { useContext, useEffect, useState } from 'react';
import "./Editlecture.css";
import { IoArrowBackOutline } from "react-icons/io5";
import { adminContext } from '../store/adminContext';
import { useParams } from 'react-router-dom';
import BtnLoader from "../../components/BtnLoader/BtnLoader";

function EditLecture() {
    const [toogle, setToogle] = useState(false);
    const { getSingleLecture, Lecture, uploadVideo, updatelecture, removeLecture, loading } = useContext(adminContext);
    const { courseId, lectureId } = useParams();

    const [lectureTitle, setLectureTitle] = useState("");
    const [lectureVideo, setLectureVideo] = useState("");

    useEffect(() => {
        if (lectureId) {
            getSingleLecture(lectureId);
        }
    }, [lectureId]);


    useEffect(() => {
        if (Lecture) {
            setLectureTitle(Lecture?.lectureTitle || "");
            setToogle(Lecture?.isVideoFree ? true : false);
        }
    }, [Lecture])



    const handleToogle = () => {
        setToogle(toogle ? false : true);
    }

    return (
        <section className='edit-lecture-section'>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <IoArrowBackOutline size={20} />
                <h3>Update Your Lecture</h3>
            </div>

            <section className='edit-lecture-box'>
                <h3>Edit Lecture</h3>
                <p>Make chages and click on save when done.</p>
                <button onClick={() => removeLecture({ lectureId, courseId })} className='remove-lecture-btn'>Remove Lecture</button>

                <label htmlFor="lecture-title">Title</label>
                <input
                    value={lectureTitle}
                    onChange={(e) => setLectureTitle(e.target.value)}
                    type="text"
                    placeholder='Your Lecture Title here'
                    id="lecture-title" />

                <label htmlFor="video">Video</label>
                <input type="file" onChange={(e) => setLectureVideo(e.target.files[0])} />

                {loading ? <BtnLoader /> : <button
                    onClick={() => uploadVideo(Lecture?._id, lectureVideo)}
                    className='upload-lecture-btn'>
                    Upload Video</button>}

                <div className='toogle-btn-box'>
                    <div onClick={handleToogle}
                        style={{ backgroundColor: toogle ? "black" : "white" }}
                        className='toogle-btn'>
                        <div style={{ left: !toogle ? "3px" : "20px", backgroundColor: toogle ? "white" : "" }} className='dot'></div>
                    </div>
                    <p>Is this video FREE?</p>
                </div>

                {loading ? <BtnLoader /> : <button onClick={() => updatelecture(lectureTitle, toogle, Lecture?._id)} disabled={!Lecture?.lectureVideo} className='update-lecture-btn'>Update Lecture</button>}
            </section>
        </section>
    )
}

export default EditLecture