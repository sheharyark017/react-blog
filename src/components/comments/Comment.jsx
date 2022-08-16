import React from "react";
import classes from "./Comment.module.css";
import avatar from "../../assets/images/avatar.webp";

const Comment = ({ comment }) => {
  const date = comment?.timestamp?.toDate()?.toLocaleDateString("en-UK");

  return (
    <div className={classes.comment}>
      <div className={classes["comment-image"]}>
        <img
          src={comment?.photoURL ? comment?.photoURL : avatar}
          alt="avatar"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className={classes["comment-info"]}>
        <p className={classes.name}>{comment?.displayName}</p>
        <p className={classes.date}>{date}</p>
        <p className={classes["comment-text"]}>{comment?.enteredValue}</p>
      </div>
    </div>
  );
};

export default Comment;
