import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";

const UserContext = createContext();

export function AuthContextProvider({ children }) {
  // signIn with email and password
  const [user, setUser] = useState({});
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // end SignIn with email and password

  // signIn with google

  const googleSignIn = () => {
    const Provider = new GoogleAuthProvider();
    signInWithPopup(auth, Provider);
  };

  // end signIn with google

  // signOut

  const logout = () => {
    return signOut(auth);
  };

  // end signOut

  // fetching blogs

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setBlogs(list);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  // end fetching blogs

  // getting single blog

  // const [singleBlog, setSingleBlog] = useState();

  const getSingleBlog = async (id) => {
    setLoading(true);
    const docRef = doc(db, "blogs", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setLoading(false);
      return snapshot.data();
      // return singleBlog;
    }
    return "no such blog";
  };

  // end getting single blog

  // fetching comments

  const [comments, setComments] = useState([]);

  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(
      collection(db, "comments"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setComments(list);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  // end fetching comments

  return (
    <UserContext.Provider
      value={{
        createUser,
        user,
        logout,
        signIn,
        googleSignIn,
        blogs,
        loading,
        getSingleBlog,
        comments,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const UserAuth = () => {
  return useContext(UserContext);
};
