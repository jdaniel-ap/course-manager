import React, { useEffect, useCallback, useState } from "react";
import Header from "../components/Header";
import { getModules } from "../services/api";
import { useRoute } from "../hooks/useRoute";
import { useDispatch } from "react-redux";
import { setModuleData } from "../redux/slices/module";

function UserModulesView() {
  const [modules, setModules] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  const router = useRoute();
  const dispatch = useDispatch();

  const requestModules = useCallback(async () => {
    const request = await getModules(token);
    setModules(request.data.info);
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    router("/");
  };

  const handleNavigation = (module) => {
    dispatch(setModuleData(module));
    router(`/module/${module.id}`);
  };

  useEffect(() => {
    requestModules();
  }, [requestModules]);

  return (
    <div>
      <Header />
      <main className="container">
        <h2>Modules availables</h2>
        <div className="module-wrapper">
          <div className="dashboard-main-box">
            {modules.map((module) => (
              <div
                key={module.id}
                className="dashboard-option"
                onClick={() => handleNavigation(module)}
              >
                <span>{module.name}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
      <div className="btn-container">
        <button onClick={logout}>Log out</button>
      </div>
    </div>
  );
}

export default UserModulesView;
