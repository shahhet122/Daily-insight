import React, { useContext } from "react";
import { useAppContext } from "./context/AppContext";
import Layout from "../Layout/layout";

function ReadingList() {

  const { readingList, addToReadingList, removefromReadingList } = useAppContext();

  const readingListCheck = (title) => {
    const Check = readingList.some((data) => data.title == title);
    return Check;
  };

  return (
    <div>
      <Layout>
        <div className="news-section">
          {readingList.length <= 0 ? (<div className="middle">"NO ITEMS...Add any Articles!"</div>) : (readingList.map((data, key) => {
            return (
              <div key={key} className="news-card">
                <img src={data.image} alt="News 1" />
                <div clasName="news-card-content">
                  <h3>{data.title}</h3>
                  <p>{data.description}</p>
                  {readingListCheck(data.title) ? <button className="add-list" onClick={() => removefromReadingList(data.title)}>Remove from reading list</button> : <button
                    className="add-list"
                    onClick={() => addToReadingList(data)}>
                    Add to reading list
                  </button>}
                </div>
              </div>
            );
          }))}
        </div>
      </Layout>
   
    </div>
  );
}

export default ReadingList;
