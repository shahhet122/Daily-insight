import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FetchApi from "./components/categories/FetchApi";
import MainSignIn from "./components/auth/MainSignIn";
import Login from "./components/auth/Login";
import Bookmark from "./components/Bookmark";
import AuthContext from "./components/context/AuthContext";


import axios from "axios"
axios.defaults.withCredentials='include';

function App() {
  const auth = useContext(AuthContext)
  console.log(auth.isSignIn, "YESSSSSSSS")
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<FetchApi />} />
        <Route path="/Sports" element={<FetchApi cat="sports" />} />
        <Route path="/technology" element={<FetchApi cat="technology" />} />
        <Route path="/business" element={<FetchApi cat="business" />} />
        <Route path="/health" element={<FetchApi cat="health" />} />
        <Route path="/readingList" element={(auth.isSignIn) ? <Bookmark /> : <Login />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/signup" element={<MainSignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
