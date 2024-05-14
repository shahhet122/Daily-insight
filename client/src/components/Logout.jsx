import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../components/context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "./Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./context/LoadingSpinner";
function Logout({ setLoad }) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    await axios.post(api + "/auth/logout");
    setLoading(true);
    setLoad(true);
    setTimeout(() => {
      auth.onFetch();
      setLoading(false);
      setLoad(false);
      toast("Logged out!..Login again!");
    }, 1000);
  };

  return (
    <>
      <div className="logout-container">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <button
              className="logout"
              onClick={() => {
                {
                  logout();
                }
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>

    </>
  );
}

export default Logout;
