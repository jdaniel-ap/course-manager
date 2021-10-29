import React, { useEffect, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Header from "../components/Header";
import Lessons from "../components/Lessons";
import { deleteLesson, getLessonsById } from "../services/api";
import { useRoute } from "../hooks/useRoute";

function UserLessonView() {
  const module = useSelector((state) => state.module);
  const [lessons, setLessons] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  const { id } = useParams();
  const router = useRoute();

  const getLessons = useCallback(async () => {
    const request = await getLessonsById(id, token);
    setLessons(request.data.info);
  }, [id, token]);

  const handleDelete = async (lessonId) => {
    await deleteLesson(lessonId, token);

    getLessons();
  };

  useEffect(() => {
    getLessons();
  }, [getLessons]);

  return (
    <div>
      <Header />
      <main className="content">
        <div className="edit-title">
          <h1>{module.name}</h1>
        </div>
        <Lessons lessons={lessons} deleteLesson={handleDelete} user />
      </main>
      <div className="btn-container">
        <button onClick={() => router("/modules")}>Go back</button>
      </div>
    </div>
  );
}

export default UserLessonView;
