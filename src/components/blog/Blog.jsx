import React from "react";
import { Link } from "react-router-dom";
import dummyImage from "../../assets/images/dummy-image.jpg";

import classes from "./Blog.module.css";

const Blog = ({ blog }) => {
  const date = blog?.timestamp?.toDate()?.toLocaleDateString("en-UK");

  return (
    <div className={classes["blog-main"]}>
      <Link to={`/blog/${blog?.id}`}>
        <div className={classes.blog}>
          <div className={classes.image}>
            <img src={blog?.image ? blog?.image : dummyImage} alt="" />
          </div>
          <div className={classes["user"]}>
            <div className={classes["user-image"]}>
              <img src={blog?.photoURL} referrerPolicy="no-referrer" />
            </div>
            <div className={classes["user-info"]}>
              <p className={classes.name}>{blog?.displayName}</p>
              <p className={classes.date}>{date}</p>
            </div>
          </div>
          <div className={classes.text}>
            <p className={classes.title}>{blog?.title}</p>
            <p className={classes.desc}>
              {blog?.desc && blog?.desc.length > 150
                ? `${blog?.desc.substring(0, 150)}...`
                : blog?.desc}
            </p>
            <p className={classes.link}>Continue reading...</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Blog;
