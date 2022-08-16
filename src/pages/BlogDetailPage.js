import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogDetail from "../components/blog/BlogDetail";
import OtherBlogs from "../components/blog/OtherBlogs";
import Comments from "../components/comments/Comments";
import { UserAuth } from "../context/AuthContext";

import classes from "./BlogDetailPage.module.css";

const BlogDetailsPage = () => {
  const params = useParams();
  const { blogID } = params;

  const { getSingleBlog } = UserAuth();
  const [singleBlog, setSingleBlog] = useState("");

  useEffect(() => {
    if (blogID) {
      getSingleBlog(blogID).then((data) => {
        setSingleBlog(data);
      });
    }
  }, [blogID]);

  return (
    <div className={classes["blog-detail-page"]}>
      <div className={classes.left}>
        <BlogDetail blog={singleBlog} blogID={blogID} />
        <Comments blogID={blogID} />
      </div>
      <div className={classes.right}>
        <OtherBlogs blogID={blogID} />
      </div>
    </div>
  );
};

export default BlogDetailsPage;
