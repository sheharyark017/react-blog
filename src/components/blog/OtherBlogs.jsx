import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { BLOG_DATA } from "../../data/blogData";
import Spinner from "../layout/Spinner";

import classes from "./OtherBlogs.module.css";

const OtherBlogs = ({ blogID }) => {
  const { blogs, loading } = UserAuth();

  const sortedBlogs = blogs.sort((a, b) => {
    return b.timestamp - a.timestamp;
  });

  const otherBlogs = sortedBlogs?.filter((blog) => blog.id !== blogID);

  if (loading) return <Spinner />;

  return (
    <div className={classes["other-blog"]}>
      <p className={classes.head}>Other Blogs</p>
      {otherBlogs.map((blog) => (
        <Link to={`/blog/${blog.id}`} key={blog.id}>
          <div className={classes.blog}>
            <p className={classes.title}>
              {blog.title.length > 30
                ? `${blog.title.substring(0, 30)}...`
                : blog.title}
            </p>
            <p className={classes.date}>{blog.date}</p>
            <p className={classes.desc}>
              {blog.desc.length > 150
                ? `${blog.desc.substring(0, 150)}...`
                : blog.desc}
            </p>
            <p className={classes.continue}>Continue Reading...</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default OtherBlogs;
