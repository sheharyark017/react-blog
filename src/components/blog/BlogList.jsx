import React from "react";
import Blog from "./Blog";

import { BLOG_DATA } from "../../data/blogData";

import { UserAuth } from "../../context/AuthContext";

import classes from "./BlogList.module.css";
import Spinner from "../layout/Spinner";

const BlogList = () => {
  const { blogs } = UserAuth();

  const sortedBlogs = blogs.sort((a, b) => {
    return b.timestamp - a.timestamp;
  });

  const blogList = sortedBlogs.slice(1);

  const { loading } = UserAuth();

  if (loading) return <Spinner />;

  return (
    <div className={classes["blog-list"]}>
      {blogList.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
