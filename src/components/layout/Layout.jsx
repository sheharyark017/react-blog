import React from "react";
import Navbar from "./Navbar";

import classes from "./Layout.module.css";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className={classes.main}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
