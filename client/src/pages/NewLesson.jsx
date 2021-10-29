import React, { useState } from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { addLesson } from "../services/api";
import { useRoute } from "../hooks/useRoute";
import { useParams } from "react-router";

function NewLesson() {
  const module = useSelector((state) => state.module);
  const [lessonDetails, setLessonDetails] = useState({
    name: "",
    date: "",
    module: module.id,
  });
  const router = useRoute();
  const token = JSON.parse(localStorage.getItem("token"));
  const { id } = useParams();

  const handleLessonDetails = ({ target }) => {
    const { value, name } = target;

    if (name === "date") {
      let d = new Date(value);
      return setLessonDetails((state) => ({ ...state, [name]: d }));
    }

    setLessonDetails((state) => ({ ...state, [name]: value }));
    console.log(lessonDetails);
  };

  const handleRequest = async (e) => {
    e.preventDefault();

    const { data } = await addLesson(lessonDetails, token);
    if (data.status === "success") {
      router(`/admin/module/${module.id}`);
    }
  };

  const handleRouter = (e, route) => {
    e.preventDefault();
    router(route);
  };

  return (
    <div>
      <Header />
      <main>
        <form className="form" onSubmit={(e) => handleRequest(e)}>
          <br />
          <h2>New lesson</h2>
          <input
            type="text"
            placeholder="module"
            value={id}
            readOnly
            className="readonly"
          />
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={(e) => handleLessonDetails(e)}
          />
          <input
            type="datetime-local"
            name="date"
            onChange={(e) => handleLessonDetails(e)}
          />
          <div className="btn-container">
            <button
              className="generic-btn"
              onClick={(e) => handleRouter(e, `/admin/module/${module.id}`)}
            >
              Go back
            </button>
            <button className="generic-btn">Add lesson</button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default NewLesson;
