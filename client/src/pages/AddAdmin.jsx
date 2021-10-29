import React, { useState } from "react";
import Header from "../components/Header";
import { createAdmin } from "../services/api";
import { useRoute } from "../hooks/useRoute";

function AddAdmin() {
  const [credentials, setCredentials] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));
  const [message, setMessage] = useState("");
  const router = useRoute();

  const handleCredentials = ({ target }) => {
    const { value, name } = target;

    setCredentials((state) => ({ ...state, [name]: value }));
  };

  const handleRequest = async (e) => {
    e.preventDefault();
    const request = await createAdmin(credentials, token);

    if (request.data.status === "success") {
      setCredentials({ password: "", username: "", email: "" });
      setMessage(request.data.message);
    }
  };

  return (
    <div>
      <Header />
      <form className="form" onSubmit={(e) => handleRequest(e)}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={credentials.username}
          onChange={(e) => handleCredentials(e)}
        />
        <input
          type="text"
          name="email"
          placeholder="email"
          value={credentials.email}
          onChange={(e) => handleCredentials(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={credentials.password}
          onChange={(e) => handleCredentials(e)}
        />
        <div className="btn-container">
          <button onClick={() => router("/admin/dashboard")}>Go back</button>
          <button>Create admin</button>
        </div>
      </form>
      <em className={message && "message"} onClick={() => setMessage("")}>
        {message}
      </em>
    </div>
  );
}

export default AddAdmin;
