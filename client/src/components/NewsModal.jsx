import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "../components/context/AuthContext";
// import { Navigate } from "react-router-dom";
import MainSignIn from "./auth/MainSignIn";
import api from "./Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./NewsModal.css";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NewsModal = ({ isOpen, isClose, news }) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // You might want to implement a check here to determine if the news is bookmarked
    // and update the state accordingly (setIsBookmarked(true)).
    // For simplicity, I'll assume it's not bookmarked initially.
    setIsBookmarked(false);
  }, []);

  const sendData = async (book) => {
    const { title, description, image } = book;
    const articleData = { title, description, image: image };

    // If the news is already bookmarked, remove it
    if (isBookmarked) {
      await axios
        .delete(api + "/articles/bookmark", {
          data: articleData,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setIsBookmarked(false);
            toast.success("🦄 Article Removed from Bookmarks", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
        })
        .catch((error) => {
          console.error(error);
          // Handle error appropriately
        });
    } else {
      // If the news is not bookmarked, add it
      await axios
        .post(api + "/articles/bookmark", articleData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setIsBookmarked(true);
            toast.success("🦄 Article Bookmarked", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
        })
        .catch((error) => {
          console.error(error);
          toast.success("🦄 Already Bookmarked", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        });
    }
  };

  return auth.isSignIn ? (
    <div className="main-modal">
      <div className="modal-overlay">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="closebtn" onClick={() => isClose()}>
            X
          </button>
          <div className="modal-image">
            <img src={news.image} alt="News" />
          </div>
          <div className="modal-news">
            <h2>{news.title}</h2>
            <p>
              {news.description.length <= 200
                ? news.description
                : `${news.description.slice(0, 150)}...read more`}
            </p>
            <button className="bookmark-btn" onClick={() => sendData(news)}>
              {isBookmarked ? "Remove from Bookmark" : "Add to Bookmark"}
            </button>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  ) : (
    <div className="modal-overlay">
      <MainSignIn close={isClose}/>
    </div>
  );
};

export default NewsModal;
