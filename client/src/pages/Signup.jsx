import React, { useState } from "react";
import Alert from "../components/Alert";
import { useRoute } from "../hooks/useRoute";
import { signup } from "../services/api";

const defaultCredentials = { username: "", password: "", email: "" };

function Signup() {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState(defaultCredentials);
  const [alert, setAlert] = useState("warning");
  const router = useRoute();

  const handleCredentials = ({ target }) => {
    const { value, name } = target;

    setCredentials((state) => ({ ...state, [name]: value }));
  };

  const verifyData = () => {
    const re = /\S+@\S+\.\S+/;

    if (!re.test(credentials.email)) throw new Error("Invalid email format");

    if (credentials.username.length <= 5)
      throw new Error("Username must contain at least 6 characters");

    if (credentials.password.length <= 5)
      throw new Error("Password must contain at least 6 characters");
  };

  const handleError = (message) => {
    setError(message);
    setTimeout(() => {
      setError("");
    }, 8000);
  };

  const handleRequest = async (e) => {
    try {
      e.preventDefault();
      verifyData();

      const { data } = await signup(credentials);

      if (data.status === "success") {
        setCredentials(defaultCredentials);

        setAlert(data.status);

        handleError(data.message);
      }

      if (data.status === "error") throw new Error(data.message);
    } catch (e) {
      handleError(e.message);
    }
  };

  return (
    <div className="login-wrap">
      <main>
        <div className="login-box">
          <Alert className={error ? alert : ""}>{error}</Alert>
          <span>
            Master<span className="logo">mind</span>
          </span>
          <form className="form" onSubmit={handleRequest}>
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
            <div>
              <button>Sign-up</button>
            </div>
          </form>
          <span className="sign-up-signal" onClick={() => router("/")}>
            Já tenho conta
          </span>
        </div>
      </main>
    </div>
  );
}

export default Signup;
