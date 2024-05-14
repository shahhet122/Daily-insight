import React from "react";

const News = ({ key, news, onButtonClick }) => {
  return (
    <div>
      <figure className="snip1216">
        <div className="image">
          <img src={news.image} alt="sample58" />
        </div>
        <figcaption>
          <div className="date">
            <span className="day">{news.publishedAt.split("-")[0]}</span>
            <span className="month">{news.publishedAt.split("-")[1]}</span>
          </div>
          <h3>{news.title}</h3>
        </figcaption>
        <footer>
          <button className="open-button" onClick={() => onButtonClick(news)}>
            Read more
          </button>
        </footer>
      </figure>
    </div>
  );
};

export default News;
