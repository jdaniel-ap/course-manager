import React from "react";
import useFormat from "../hooks/useFormat";

function Lessons({ lessons, deleteLesson, user }) {
  const formatDate = useFormat();

  return (
    <div className="lessons">
      {lessons.map((lesson) => (
        <div className="lesson-box" key={lesson.id}>
          <h3>{lesson.name}</h3>
          <span>Date: {formatDate(lesson.date)}</span>
          {user ? (
            ""
          ) : (
            <button
              className="delete-lesson-btn"
              onClick={() => deleteLesson(lesson.id)}
            >
              Delete
            </button>
          )}
        </div>
      ))}
      {lessons.length === 0 && <h3>There are no registered lessons yet</h3>}
    </div>
  );
}

export default Lessons;
