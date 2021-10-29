import React, { useCallback, useEffect, useState } from "react";
import Header from "../components/Header";
import { getModules } from "../services/api";
import { useRoute } from "../hooks/useRoute";
import { useDispatch } from "react-redux";
import { setModuleData } from "../redux/slices/module";

function Modules() {
  const [modules, setModules] = useState([]);
  const router = useRoute();
  const dispatch = useDispatch();

  const handleModules = useCallback(async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const { data } = await getModules(token);

    if (data.status === "success") {
      const sort = data.info.sort((a, b) => {
        return a.name > b.name;
      });

      setModules(sort);
    }
  }, []);

  useEffect(() => {
    handleModules();
  }, [handleModules]);

  const handleData = (module) => {
    dispatch(setModuleData(module));
    return router(`/admin/module/${module.id}`);
  };

  return (
    <div>
      <Header />
      <div className="module-wrapper">
        <main className="dashboard-main-box">
          {modules.map((module) => (
            <div
              className="dashboard-option"
              key={module.id}
              onClick={() => handleData(module)}
            >
              <span>{module.name}</span>
            </div>
          ))}
        </main>
      </div>
      {modules.length === 0 && (
        <h2 style={{ textAlign: "center", padding: "10px" }}>
          No module has been registered yet
        </h2>
      )}
      <div className="btn-container">
        <button
          className="new-module-btn"
          onClick={() => router("/admin/dashboard")}
        >
          Go back
        </button>
        <button
          className="new-module-btn"
          onClick={() => router("/admin/modules/new")}
        >
          New module
        </button>
      </div>
    </div>
  );
}

export default Modules;
