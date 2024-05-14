import React, {  useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import api from "../Api";

function Signup() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (username.trim() !== "" && password.trim() !== "") {
     const UserData ={
      username: username,
      password: password,
    }
    // post request for user signup
    await axios.post(api+"/auth/signup" ,UserData ,{
      withCredentials : true,
    } )
    } else {
      alert("Please enter a valid username and password.");
    }
  };

  return (
    <div className="login-container">
      <h2>Signup</h2>
      <form className="login-form" onSubmit={handleSignup}>
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

        <button type="submit">Register</button>
        <div>
          Already having account...
          <Link to="/login">login page</Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
