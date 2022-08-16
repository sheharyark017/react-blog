import React from "react";
import classes from "./BlogDetail.module.css";

import dummyImage from "../../assets/images/dummy-image.jpg";
import Spinner from "../layout/Spinner";
import { UserAuth } from "../../context/AuthContext";

import avatar from "../../assets/images/avatar.webp";

const BlogDetail = ({ blog }) => {
  const date = blog?.timestamp?.toDate()?.toLocaleDateString("en-UK");

  const { loading } = UserAuth();

  return (
    <div className={classes["blog-detail"]}>
      <div className={classes.image}>
        <img src={blog?.image ? blog?.image : dummyImage} alt="" />
      </div>
      {loading && (
        <div className={classes.spinner}>
          <Spinner />
        </div>
      )}
      <div className={classes["user"]}>
        <div className={classes["user-image"]}>
          <img src={blog?.photoURL} referrerPolicy="no-referrer" />
        </div>
        <div className={classes["user-info"]}>
          <p className={classes.name}>{blog?.displayName}</p>
          <p className={classes.date}>{date}</p>
        </div>
      </div>

      <div className={classes.title}>
        <p>{blog?.title}</p>
      </div>
      <div className={classes.desc}>
        <p>{blog?.desc}</p>
      </div>
    </div>
  );
};

export default BlogDetail;
