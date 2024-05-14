import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { useContext } from "react";
import AuthContext from "../components/context/AuthContext";
import MainSignIn from "./auth/MainSignIn";
import logo from "../static/logo.png";
import { FiAlignJustify } from "react-icons/fi";
import Spinner from "./context/LoadingSpinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NavBar = () => {
  const auth = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [click, setClick] = useState("");
  const [isClicked, setIsClicked] = useState(null);

  

  const handleNavItemClick = (item) => {
    setIsClicked(item);
  };

  const isOpen = (e) => {
    setModal(true);
  };
  const isClose = (e) => {
    console.log("closed");
    setModal(false);
  };

  console.log(auth.isSignIn);

  const handleSpinner = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 650);
  };
  useEffect(() => {
    handleSpinner();
  }, []);

  console.log(loading)

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div>
            <header>
              <nav>
                <div className="logo">
                  <div>
                    <img src={logo} alt="" onClick={() => handleSpinner()} />
                  </div>
                  <div>
                    {!click ? (
                      <button
                        className="coll"
                        onClick={() => setClick("active")}
                      >
                        X
                      </button>
                    ) : (
                      <button className="coll" onClick={() => setClick("")}>
                        <FiAlignJustify />
                      </button>
                    )}
                  </div>
                </div>

                <div className={`right ${click}`}>
                  <button
                    className="nav-btn"
                    onClick={() => {
                      handleNavItemClick("Home");
                      handleSpinner();
                    }}
                  >
                    <Link
                      style={{
                        color: isClicked === "Home" ? "#c0392b" : "white",
                      }}
                      to="/"
                    >
                      Home
                    </Link>
                  </button>
                  <button
                    className="nav-btn"
                    onClick={() => {
                      handleNavItemClick("Health");
                      handleSpinner();
                    }}
                  >
                    <Link
                      style={{
                        color: isClicked === "Health" ? "#c0392b" : "white",
                      }}
                      to="/Health"
                    >
                      Health
                    </Link>
                  </button>
                  <button
                    className="nav-btn"
                    onClick={() => {
                      handleNavItemClick("Technology");
                      handleSpinner();
                    }}
                  >
                    <Link
                      style={{
                        color: isClicked === "Technology" ? "#c0392b" : "white",
                      }}
                      to="/Technology"
                    >
                      Technology
                    </Link>
                  </button>
                  <button
                    className="nav-btn"
                    onClick={() => {
                      handleNavItemClick("Business");
                      handleSpinner();
                    }}
                  >
                    <Link
                      style={{
                        color: isClicked === "Business" ? "#c0392b" : "white",
                      }}
                      to="/Business"
                    >
                      Business
                    </Link>
                  </button>
                  <button
                    className="nav-btn"
                    onClick={() => {
                      handleNavItemClick("sports");
                      handleSpinner();
                    }}
                  >
                    <Link
                      style={{
                        color: isClicked === "sports" ? "#c0392b" : "white",
                      }}
                      to="/Sports"
                    >
                      Sports
                    </Link>
                  </button>
                  <button
                    className="nav-btn"
                    onClick={() => {
                      handleNavItemClick("Bookmark");
                      handleSpinner();
                    }}
                  >
                    <Link
                      style={{
                        color: isClicked === "Bookmark" ? "#c0392b" : "white",
                      }}
                      to="/readingList"
                    >
                      Bookmark
                    </Link>
                  </button>
                  {auth.isSignIn ? (
                    <Logout setLoad={setLoading} />
                  ) : (
                    <button className="logout" onClick={isOpen}>
                      Login
                    </button>
                  )}
                  {modal && <MainSignIn close={isClose}  />}
                  {auth.isSignIn == true && modal && <MainSignIn />}
                </div>
              </nav>
            </header>
          </div>
        </>
      )}
      <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
    </>
  );
};

export default NavBar;
