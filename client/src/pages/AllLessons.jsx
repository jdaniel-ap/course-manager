import React, { useEffect, useCallback, useState } from "react";
import Header from "../components/Header";
import useFormat from "../hooks/useFormat";
import { useRoute } from "../hooks/useRoute";
import { deleteLesson, getAllLessons } from "../services/api";

function AllLessons() {
  const token = JSON.parse(localStorage.getItem("token"));
  const [lessons, setLessons] = useState([]);
  const formatDate = useFormat();
  const router = useRoute();

  const handleLessons = useCallback(async () => {
    const { data } = await getAllLessons(token);
    setLessons(data.info);
  }, [token]);

  const handleDelete = async (lessonId) => {
    await deleteLesson(lessonId, token);

    handleLessons();
  };

  useEffect(() => {
    handleLessons();
  }, [handleLessons]);

  return (
    <div>
      <Header />
      <main className="lesson-container">
        <div className="lessons">
          {lessons.map((lesson) => (
            <div className="lesson-box" key={lesson.id}>
              <h2>Module: {lesson.module.name}</h2>
              <h3>Lesson: {lesson.name}</h3>
              <span>{formatDate(lesson.date)}</span>
              <button
                className="delete-lesson-btn"
                onClick={() => handleDelete(lesson.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </main>
      <div className="btn-container">
        <button onClick={() => router("/admin/dashboard")}>Go back</button>
      </div>
    </div>
  );
}

export default AllLessons;
