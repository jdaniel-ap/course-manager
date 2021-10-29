import React from "react";
import { useRoute } from "../hooks/useRoute";

import "../App.css";
import Header from "../components/Header";

function Dashboard() {
  const router = useRoute();

  const logout = () => {
    localStorage.removeItem("token");
    router("/");
  };

  return (
    <div className="content">
      <Header />
      <main className="dashboard-main-box">
        <div
          className="dashboard-option"
          onClick={() => router("/admin/modules")}
        >
          <em className="fas fa-box-open"></em>
          <span>Modules</span>
        </div>
        <div
          className="dashboard-option"
          onClick={() => router("/admin/lessons")}
        >
          <em className="fas fa-file-alt"></em>
          <span>Lessons</span>
        </div>
        <div
          className="dashboard-option"
          onClick={() => router("/admin/create/new-admin")}
        >
          <em className="fas fa-users"></em>
          <span>Users</span>
        </div>
        <div className="dashboard-option" onClick={logout}>
          <em className="fas fa-sign-out-alt"></em>
          <span>Exit</span>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
