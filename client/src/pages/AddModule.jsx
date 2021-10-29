import React, { useState } from "react";
import { useRoute } from "../hooks/useRoute";
import Header from "../components/Header";
import { addNewModule } from "../services/api";

function AddModule() {
  const [name, setName] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));
  const router = useRoute();
  const route = "/admin/modules";

  const handleName = ({ target }) => {
    setName(target.value);
  };

  const handleRequest = async (e) => {
    e.preventDefault();

    const { data } = await addNewModule(name, token);

    if (data.status === "success") {
      setName("");
      router(route);
    }
  };

  const handleRoute = (e) => {
    e.preventDefault();
    router(route);
  };

  return (
    <div>
      <Header />
      <form className="form" onSubmit={(e) => handleRequest(e)}>
        <span className="new-module-title">Module name</span>
        <input
          type="text"
          name="Module name"
          value={name}
          onChange={(e) => handleName(e)}
        />
        <div className="btn-container">
          <button onClick={(e) => handleRoute(e)}>Go back</button>
          <button>Add module</button>
        </div>
      </form>
    </div>
  );
}

export default AddModule;
