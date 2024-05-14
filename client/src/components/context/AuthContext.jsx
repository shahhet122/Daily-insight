import axios from "axios";
import React, { useState, useEffect } from "react";
import api from "../Api";

const AuthContext = React.createContext({
  isSignIn: null,
  bookmarkArr: [],
  onFetch: () => {},
});

export const AuthContextProvider = (props) => {
  const [isSignIn, setIsSignIn] = useState();
  const [bookmarkArr, setBookmarkArr] = useState([]);

  // loading spinner
  const [loading, setLoading] = useState(false);

  const cookieHandler = async () => {
    const response = await axios.post(api + "/auth/cookieCheck");
    console.log(response);
    if (response.data === true) {
      // console.log('not working' )
      setIsSignIn(1);
      // console.log(isLoggedIn);
    } else {
      // console.log(isLoggedIn);
      setIsSignIn(0);
    }
    // console.log(isLoggedIn);
  };
  console.log(isSignIn);

  const fetchBookmark = async () => {
    await axios
      .get(api + "/articles/view")
      .then((list) => setBookmarkArr(list.data))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    cookieHandler();
    fetchBookmark();
    console.log("q3");
  }, []);

  console.log(bookmarkArr);

  return (
    <AuthContext.Provider
      value={{
        isSignIn: isSignIn,
        onFetch: cookieHandler,
        bookmarkArr: bookmarkArr,
        loading,
        setLoading
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
