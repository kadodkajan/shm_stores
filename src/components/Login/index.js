// src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [user_id, setUserid] = useState("");
  const [user_auth, setUserauth] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://apiforshm-production.up.railway.app/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id, user_auth }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (data.status === "success") {
          Cookies.set("user", JSON.stringify(data.user));

          if (data.user.user_location === "Railside") {
            navigate("/commisary");
          } else {
            navigate("/stores");
          }
        } else {
          setError(data.message);
        }
      } else {
        setError("An error occurred during login.");
      }
    } catch (error) {
      setError("An error occurred during login.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card">
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="user_id" className="form-label">
                User ID:
              </label>
              <input
                type="text"
                id="user_id"
                className="form-control"
                value={user_id}
                onChange={(e) => setUserid(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="user_auth" className="form-label">
                Password:
              </label>
              <input
                type="password"
                id="user_auth"
                className="form-control"
                value={user_auth}
                onChange={(e) => setUserauth(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={handleLogin}
            >
              Login
            </button>
            {error && <p className="mt-3 text-danger text-center">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
