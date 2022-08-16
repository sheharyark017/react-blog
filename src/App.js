import React from "react";
import { Suspense } from "react";

import { Routes, Route } from "react-router-dom";

import "./App.css";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AuthPageProtection from "./components/auth/AuthPageProtection";
import Layout from "./components/layout/Layout";
import { AuthContextProvider } from "./context/AuthContext";
import AddBlogPage from "./pages/AddBlogPage";
import BlogDetailsPage from "./pages/BlogDetailPage";
import Home from "./pages/Home";
import SignInPage from "./pages/SignInPage";

function App() {
  return (
    <AuthContextProvider>
      <Layout>
        <Suspense
          fallback={<div className="centered">{/* <LoadingSpinner /> */}</div>}
        ></Suspense>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:blogID" element={<BlogDetailsPage />} />
          <Route
            path="/signin"
            element={
              <AuthPageProtection>
                <SignInPage />
              </AuthPageProtection>
            }
          />
          <Route
            path="/add-blog"
            element={
              <ProtectedRoute>
                <AddBlogPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </AuthContextProvider>
  );
}

export default App;

// "start": "react-scripts --openssl-legacy-provider start",
// "build": "react-scripts --openssl-legacy-provider build",
