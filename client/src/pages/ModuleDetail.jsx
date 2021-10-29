import React, { useCallback, useEffect, useState } from "react";
import Header from "../components/Header";
import { useRoute } from "../hooks/useRoute";
import { deleteLesson, getLessonsById } from "../services/api";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import Lessons from "../components/Lessons";

function ModuleDetail() {
  const [lessons, setLessons] = useState([]);
  const router = useRoute();
  const token = JSON.parse(localStorage.getItem("token"));
  const module = useSelector((state) => state.module);
  const { id } = useParams();

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
      <main className="container">
        <div className="edit-title">
          <h1>{module.name}</h1>
          <em
            className="fas fa-edit edit"
            onClick={() => router(`/admin/module/${id}/edit`)}
          ></em>
        </div>
        <Lessons lessons={lessons} deleteLesson={handleDelete} />
      </main>
      <div className="btn-container">
        <button onClick={() => router("/admin/modules")}>Go back</button>
        <button onClick={() => router(`/admin/module/${module.id}/lesson/new`)}>
          New lesson
        </button>
      </div>
    </div>
  );
}

export default ModuleDetail;
