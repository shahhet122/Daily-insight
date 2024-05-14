import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../Api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../context/LoadingSpinner";

export default function MainSignIn({ close }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [switchLogin, setSwitchLogin] = useState(false);

  const [loading, setLoading] = useState(false);

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  // signup
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      if (username.trim() !== "" && password.trim() !== "") {
        const UserData = {
          username: username,
          password: password,
        };
        // post request for user signup
        await axios.post(api + "/auth/signup", UserData, {
          withCredentials: "include",
        });
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          toast("Registered Successfully!");
        }, 150);

        handleLogin(e);
      } else {
        alert("Please enter a valid username and password.");
      }
    } catch (error) {
      toast("Please enter a valid username and password.");
    }
  };

  //   singin
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (username.trim() !== "" && password.trim() !== "") {
        const UserData = { username: username, password: password };
        await axios.post(api + "/auth/login", UserData, {
          withCredentials: "include",
        });
        setLoading(true);
        close();
        setTimeout(() => {
          auth.onFetch();
          setLoading(false);
          toast("Welcome to DailyInsight!");
          navigate("/home");
        }, 650);
      } else {
        toast("Please enter a valid username and password.");
      }
    } catch (error) {
      toast("Please enter a valid username and password.");
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="modal-overlay">
            <div className="login-container gradient-border">
              <div onClick={() => close()} className="close_login">
                X
              </div>
              <h2 className="login-title">Welcome to DailyInsight</h2>
              <div className="switch">
                <button
                  className="switchbtn"
                  onClick={() => setSwitchLogin(true)}
                  style={{ background: switchLogin ? "#c0392b" : "#2c3e50" }}
                >
                  SignIn
                </button>
                <div className="line"></div>
                <button
                  style={{ background: switchLogin ? "#2c3e50" : "#c0392b" }}
                  className="switchbtn"
                  onClick={() => setSwitchLogin(false)}
                >
                  SiginUp
                </button>
              </div>
              <div className="banner">
                {switchLogin ? (
                  <i
                    style={{
                      color: "#c0392b",
                      textDecoration: "underline",
                      fontWeight: 500,
                      fontFamily: "monospace",
                    }}
                  >
                    Please login to access News articles
                  </i>
                ) : (
                  <i
                    style={{
                      color: "#c0392b",
                      textDecoration: "underline",
                      fontWeight: 500,
                      fontFamily: "monospace",
                    }}
                  >
                    Join DailyInsight and start your journey!
                  </i>
                )}
              </div>
              <form className="login-form">
                {/* <label htmlFor="username">Username:</label> */}
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                {/* <label htmlFor="password">Password:</label> */}
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {switchLogin ? (
                  <button
                    type="submit"
                    className="submitbtn"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                ) : (
                  <button
                    className="submitbtn"
                    type="submit"
                    onClick={handleSignup}
                  >
                    Register
                  </button>
                )}
                <p
                  style={{
                    fontSize: 12,
                    color: "#2c3e50",
                    fontFamily: "monospace",
                    textAlign: "center",
                  }}
                >
                  Fuel your day with DailyInsight!
                </p>
                {/* <div>
                        or create an new account!...
                        <Link to="/signup">signup page</Link>
                    </div> */}
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
