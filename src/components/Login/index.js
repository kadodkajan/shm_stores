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


          if (data.user.user_location ==="Railside"){

              navigate("/commisary");

          }
          else{
            navigate("/stores");
          }
        } else {
          setError(data.message);
        }
      } else {
        setError("An error occured during login.");
      }
    } catch (error) {
      setError("An error occurred durings login.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <div>
          <label htmlFor="user_id">User ID:</label>
          <input
            type="text"
            id="user_id"
            value={user_id}
            onChange={(e) => setUserid(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="user_auth"
            value={user_auth}
            onChange={(e) => setUserauth(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
