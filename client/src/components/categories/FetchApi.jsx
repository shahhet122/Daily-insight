import React, { useContext, useEffect, useState } from "react";
import Layout from "../../Layout/layout";
import axios from "axios";
// require('dotenv').config();
import AuthContext from "../context/AuthContext";
import NewsModal from "../NewsModal";
import api from "../Api";
import LoadingSpinner from "../context/LoadingSpinner";

const MainPage = ({ cat }) => {
  const auth = useContext(AuthContext);
  const [News, setNews] = useState([]);
  // console.log(News)

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

  const openModal = (data) => {
    setSelectedNews(data);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedNews(null);
    setModalOpen(false);
  };

  // const { readingList, addToReadingList, removefromReadingList } = useAppContext();
  // const readingListCheck = (title) => {
  //   const Check = readingList.some((data) => data.title == title);
  //   return Check;
  // };

  const sendData = async (book) => {
    const { title, description, image } = book;
    const articleData = { title, description, image: image };

    await axios
      .post(api + "/articles/bookmark", articleData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const ApiFetch = async () => {
    // const apiKey = process.env.REACT_APP_NEWSAPI_KEY;
    // const apiKey = "eeb3f83533614b9da181eb5904c9666c";
    const apiKey="e7de534700ec6f93ba2c69c2c0caf64f";
    // const apiKey = "011a4bb168875ebd5c3bc441672271d1";
    console.log(apiKey);
    var url = cat
      ? `https://gnews.io/api/v4/top-headlines?category=${cat}&lang=en&country=us&max=10&apikey=${apiKey}`
      : `https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=10&apikey=${apiKey}`;
    console.log(url);
    await fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var articles = data.articles;
        setNews(articles);
      });
  };
  useEffect(() => {
    ApiFetch();
  }, [cat]);

  return (
    <div>
      <Layout>
        <div className="news-section">
          {News ? (
            News.map((data, index) => {
              //  <NewsCard key={index}  news={data} onButtonCLick={openModal} />
              return (
                <figure key={index} className="snip1216">
                  <div className="image">
                    <img src={data.image} alt="sample58" />
                  </div>
                  <figcaption>
                    <div className="date">
                      <span className="day">
                        {data.publishedAt.split("-")[0]}
                      </span>
                      <span className="month">
                        {data.publishedAt.split("-")[1]}
                      </span>
                    </div>
                    <h3>{data.title}</h3>
                  </figcaption>
                  <footer>
                    <button
                      className="open-button"
                      onClick={() => openModal(data)}
                    >
                      Read more
                    </button>
                  </footer>
                </figure>
              );
            })
          ) : (<>
            <LoadingSpinner/>
          </>
          )}

          {modalOpen && (
            <NewsModal
              isOpen={openModal}
              isClose={closeModal}
              news={selectedNews}
            />
          )}
        </div>
      </Layout>
    </div>
  );
};
export default MainPage;

{
  /* <div className="news-section">
{News.map((data, key) => {
  return (
    <div key={key} className="news-card">
      <img src={data.urlToImage} alt="News 1" />
      <div className="news-card-content">
        <h3>{data.title}</h3>
        <p>{data.description}</p>
        {readingListCheck(data.title) ? <button className="add-list"  onClick={() => removefromReadingList(data.title)}>Remove from reading list</button> :                  <button
              className="add-list"
              onClick={() => addToReadingList(data)}>
              Add to reading list
            </button>}
        <button onClick={() => sendData(data)}>SEND DATA</button>
      </div>
    </div>
  );
})}
</div> */

  {
    /* <div class="views">
<i class="ion-eye"></i>928
</div>
<div class="love">
  <i class="ion-heart"></i>198
</div>
<div class="comments">
  <i class="ion-chatboxes"></i>23
</div> */
  }
}
