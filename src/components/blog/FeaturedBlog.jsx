import React from "react";
import { Link } from "react-router-dom";

import classes from "./FeaturedBlog.module.css";
import { UserAuth } from "../../context/AuthContext";
import Spinner from "../layout/Spinner";
import dummyImage from "../../assets/images/dummy-image.jpg";

const FeaturedBlog = () => {
  const { blogs } = UserAuth();

  const sortedBlogs = blogs.sort((a, b) => {
    return b.timestamp - a.timestamp;
  });

  const [featuredBlog] = sortedBlogs.slice(0, 1);

  const date = featuredBlog?.timestamp
    ?.toDate()
    ?.toDateString()
    ?.toLocaleString("en-UK");

  const { loading } = UserAuth();

  if (loading)
    return (
      <div>
        <Spinner />
      </div>
    );

  return (
    <Link to={`/blog/${featuredBlog?.id}`}>
      <div
        className={classes.featured}
        style={{
          backgroundImage: `url(${
            featuredBlog?.image ? featuredBlog?.image : dummyImage
          })`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className={classes.overlay}></div>

        <div className={classes["featured-Text"]}>
          <div className={classes["user"]}>
            <div className={classes["user-image"]}>
              <img src={featuredBlog?.photoURL} referrerPolicy="no-referrer" />
            </div>
            <div className={classes["user-info"]}>
              <p className={classes.name}>{featuredBlog?.displayName}</p>
              <p className={classes.date}>{date}</p>
            </div>
          </div>
          <p className={classes.title}>{featuredBlog?.title}</p>
          <p className={classes.desc}>
            {featuredBlog?.desc?.length > 100
              ? `${featuredBlog?.desc.substring(0, 100)}...`
              : featuredBlog?.desc}
          </p>
          <p className={classes.link}>continue reading...</p>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedBlog;
