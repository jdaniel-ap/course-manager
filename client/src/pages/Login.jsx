import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Alert from "../components/Alert";
import { setUserInfo } from "../redux/slices/user";
import { login } from "../services/api";
import { Link } from "react-router-dom";
import { useRoute } from "../hooks/useRoute";

function Login() {
  const [credentials, setCredentials] = useState({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRoute();

  const handleCredentials = ({ target }) => {
    const { name, value } = target;
    setCredentials((state) => ({ ...state, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(credentials);

      if (data.userInfo) {
        localStorage.setItem("token", JSON.stringify(data.token));

        dispatch(setUserInfo(data.userInfo));

        return data.userInfo.role === "ADMIN"
          ? router("/admin/dashboard")
          : router("/modules/");
      }
      if (data.status === "error") throw new Error("Usuario o senha invalida");
    } catch (e) {
      setError(e.message);
      setTimeout(() => {
        setError("");
      }, 4000);
    }
  };
  return (
    <div className="login-wrap">
      <main>
        <div className="login-box">
          <Alert className={error ? "warning" : ""}>{error}</Alert>
          <span>
            Master<span className="logo">mind</span>
          </span>
          <form className="form" onSubmit={(e) => handleLogin(e)}>
            <input
              type="text"
              name="username"
              placeholder="username"
              onChange={handleCredentials}
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={handleCredentials}
            />
            <div>
              <button>Login</button>
            </div>
          </form>
          <Link to="/sign-up">
            <span className="sign-up-signal">Não tem uma conta?</span>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Login;
