// import React, { useEffect, useState } from "react";
import Layout from "../Layout/layout";
// import axios from "axios";
// import api from "./Api";
// function Bookmark() {
//   const [readingList, setReadingList] = useState([""]);

//   const LoadBookmarkArticle = async () => {
//     await axios.get(api+"/articles/view")
//       .then((list) => {console.log(list)
//         setReadingList(list.data)})
//       .catch((error) => console.log(error));
//   };

//   useEffect(() => {
//     LoadBookmarkArticle();
//   }, []);

//   return (
//     <div>
//
//         <div className="news-section">

//             {readingList.map((data, key) => {
//               return (
//                 <div key={key} className="news-card">
//                   <img src={data.image} alt="News 1" />
//                   <div clasName="news-card-content">
//                     <h3>{data.title}</h3>
//                     <p>{data.description}</p>
//                     {/* {readingListCheck(data.title) ? (
//                       <button
//                         className="add-list"
//                         onClick={() => removefromReadingList(data.title)}
//                       >
//                         Remove from reading list
//                       </button>
//                     ) : (
//                       <button
//                         className="add-list"
//                         onClick={() => addToReadingList(data)}
//                       >
//                         Add to reading list
//                       </button>
//                     )} */}
//                   </div>
//                 </div>
//               );
//             })
//           }
//         </div>
//
//     </div>
//   );
// }

// export default Bookmark;

import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "./Api";
import NewsModal from "./NewsModal";
import LoadingSpinner from "./context/LoadingSpinner";
const Bookmark = () => {
  const [Articles, setArticles] = useState([]);
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
  const bookmarkShow = () => {
    axios
      .get(api + "/articles/view", {
        withCredentials: true,
      })
      .then((data) => {
        setArticles(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    bookmarkShow();
    console.log(Articles);
  }, []);

  console.log(Articles[7])
  return (
    <>
      {!Articles && <LoadingSpinner />}
      <div className="container">
        <Layout>
          <div className="news-section">
            {Articles.map((data, index) => {
              return (
                <>
                  <figure key={index} className="snip1216">
                    <div className="image">
                      {!data.image ? (
                        <>
                          <div className="spinner"></div>
                          <p
                            style={{
                              textAlign: "center",
                              color: "#ffffff8c",
                              fontSize: 11,
                            }}
                          >
                            loading..
                          </p>
                        </>
                      ) : (
                        <img src={data.image} alt="" />
                      )}
                    </div>
                    <figcaption>
                      {/* <div className="date">
                      <span className="day">
                        {data.publishedAt.split("-")[0]}
                      </span>
                      <span className="month">
                        {data.publishedAt.split("-")[1]}
                      </span>
                    </div> */}
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
                </>
              );
            })}
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
    </>
  );
};

export default Bookmark;
