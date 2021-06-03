import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInput, setNewsData } from "../features/userSlice";

import "../styling/news.css";

const News = () => {
  const searchInput = useSelector(selectUserInput);
  const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=ee75abdc63d48f80e795c38dea3d64be`;
  const dispatch = useDispatch();
  const [news, setNews] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(blog_url)
      .then((response) => {
        dispatch(setNewsData(response.data));
        setNews(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchInput]);

  return (
    <div className="blog__page">
      <h1 className="blog__page__header">News</h1>
      {loading ? <h1 className="loading">Loading...</h1> : ""}
      <div className="blogs">
        {news?.articles?.map((blog) => (
          <a className="blog" target="_blank" href={blog.url}>
            <img src={blog.image} />
            <div>
              <h3 className="sourceName">
                <span>{blog.source.name}</span>
                <p>{blog.publishedAt}</p>
              </h3>
              <h1>{blog.title}</h1>
              <p>{blog.description}</p>
            </div>
          </a>
        ))}

        {news?.totalArticles == 0 && (
          <h1 className="no__blogs">
            No News available 😞. Search something else to read News on the
            greatest platform.
          </h1>
        )}
      </div>
    </div>
  );
};

export default News;