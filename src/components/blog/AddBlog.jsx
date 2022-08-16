import React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import { storage } from "../../firebase";
import { db } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { UserAuth } from "../../context/AuthContext";

import classes from "./AddBlog.module.css";
import dummyImage from "../../assets/images/dummy-image.jpg";
import useInput from "../../hooks/useInput";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const AddBlog = () => {
  // image preview states
  const [image, setImage] = useState();
  const [preview, setPreview] = useState("");
  // end image preview states

  const navigate = useNavigate();

  // user
  const {
    user: { displayName, email, photoURL },
  } = UserAuth();
  // end user

  // input states
  const {
    enteredValue: enteredTitle,
    isValid: titleIsValid,
    valueChangeHandler: titleValueChangeHandler,
    inputBlurHandler: titleInputBlurHanlder,
  } = useInput((value) => value.trim() !== "");

  const {
    enteredValue: enteredDesc,
    isValid: descIsValid,
    valueChangeHandler: descValueChangeHandler,
    inputBlurHandler: descInputBlurHanlder,
  } = useInput((value) => value.trim() !== "");

  const [imageHasError, setImageHasError] = useState(true);
  // end input states

  // data state
  const [data, setData] = useState({});

  //extra states
  const [progress, setProgress] = useState("");

  // image preview logic
  const fileInputRef = useRef();

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
        setImageHasError(false);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
      setImageHasError(true);
    }
  }, [image]);

  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substring(0, 5) === "image") {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  const fileUploadButtonHandler = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };
  //end image preview logic

  // storing data logic
  useEffect(() => {
    setData((prev) => ({ ...prev, title: enteredTitle, desc: enteredDesc }));
  }, [enteredTitle, enteredDesc]);

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + image.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (errors) => {
          console.log(errors);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, image: downloadURL }));
            console.log(data);
          });
        }
      );
    };

    image && uploadFile();
  }, [image]);

  let formIsValid = false;

  if (titleIsValid && descIsValid && !imageHasError) {
    formIsValid = true;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    await addDoc(collection(db, "blogs"), {
      ...data,
      timestamp: serverTimestamp(),
      email,
      photoURL,
      displayName,
    });
    navigate("/");
  };
  // end storing data logic

  return (
    <>
      <div className={classes["add-blog"]}>
        <form onSubmit={submitHandler}>
          <div className={classes.publish}>
            <button
              type="submit"
              disabled={!(formIsValid && progress && progress === 100)}
            >
              Publish
            </button>
          </div>

          {progress && (
            <div
              className={classes.progress}
              style={{ width: `${progress < 100 ? progress : "0"}%` }}
            ></div>
          )}

          <div
            className={`${classes["form-control"]} ${classes["image-input"]}`}
          >
            <button onClick={fileUploadButtonHandler}>+</button>
            <div>
              <img src={!preview ? dummyImage : preview} alt="" />
            </div>
            <input
              type="file"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={fileChangeHandler}
              accept="image/*"
            />
          </div>
          <div className={classes["form-control"]}>
            <input
              type="text"
              placeholder="Title"
              className={classes.title}
              name="title"
              onChange={titleValueChangeHandler}
              value={enteredTitle}
              onBlur={titleInputBlurHanlder}
            />
          </div>
          <div className={classes["form-control"]}>
            <textarea
              name="desc"
              id=""
              cols="70"
              rows="80"
              placeholder="Tell you story..."
              className={classes.desc}
              onChange={descValueChangeHandler}
              value={enteredDesc}
              onBlur={descInputBlurHanlder}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBlog;
