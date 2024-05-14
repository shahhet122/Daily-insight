import React, {  useContext, useState } from "react";
import { createContext } from "react";

const AppContext = createContext();

// export this context to use across React component tree
export const useAppContext = () => {  
  const context = useContext(AppContext);
  
  if (context === undefined) {
    throw new Error("AppContext must be within appConetextProvider");
  } else {
    return context;
  }
};

function AppContextProvider( props ) {
  const [readingList, setreadingList] = useState([]);

  // add to readling List
  const addToReadingList = (data) => {
    // const oldNews = [...readingList];
    const newNews = data;
    const newnew = [...readingList , newNews]
    setreadingList(newnew);
   

  };

  // remove from the list
  const removefromReadingList = (title) => {
    const oldNewsList = [...readingList];
    // console.log(oldNewsList,"old")
    const newNewsList = oldNewsList.filter((data) => data.title !== title)
    // console.log(newNewsList,"new")
    setreadingList(newNewsList);

  };

  
  return (
    <div>
      <AppContext.Provider
        value={{ readingList, addToReadingList, removefromReadingList }}>
        {props.children}
      </AppContext.Provider>
    </div>
  );
}

export default AppContextProvider;
