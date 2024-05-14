import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../Api";
import Spinner from "../context/LoadingSpinner";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (username.trim() !== "" && password.trim() !== "") {
      const UserData = { username: username, password: password };
      // post request of user using axios
      await axios.post(api + "/auth/login", UserData, {
        withCredentials: true,
      });
      setLoading(true);
      // check token is valid or not
      auth.onFetch();
      console.log(auth.isSignIn);
      setTimeout(() => {
        setLoading(false);
      }, 5000);
      navigate("/home");
    } else {
      alert("Please enter a valid username and password.");
    }
  };

  return (
    <>
      {loading && <Spinner />}
      <div className="modal-overlay">
        <div className="login-container">
          <h2>Please login to continue</h2>
          <form className="login-form" onSubmit={handleLogin}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
            <div>
              or create an new account!...
              <Link to="/signup">signup page</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
