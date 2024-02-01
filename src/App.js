import { Route, Routes } from "react-router-dom";
import "./App.css";
import Mockman from "mockman-js";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import UserList from "./components/UserList/UserList";
import SearchBar from "./components/SearchBar/SearchBar";
import Footer from "./components/Footer/Footer";
import SignUp from "./pages/Signup/SignUp";
import Landing from "./pages/LandingPage/Landing";
import Explore from "./pages/Explore/Explore";
import Bookmark from "./pages/Bookmark/Bookmark";
import { ToastContainer } from "react-toastify";
import React, { useEffect, useContext, lazy, Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";
import LikePage from "./pages/LikePage/LikePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { DataContext } from "./contexts/DataContext";
import Modal from "./components/Modal/Modal";
import axios from "axios";
import { AsideDataContext } from "./contexts/AsideDataContext";
import ProfileModal from "./components/Modal/ProfileModal";
import AuthWrapper from "./components/Authenticate/AuthWrapper";
import { Discuss } from "react-loader-spinner";
import SinglePost from "./pages/SinglePost.jsx/SinglePost";
import UserModal from "./components/Modal/UserModal";
import CommentModal from "./components/Modal/CommentModal";
import SearchPage from "./pages/SearchPage/SearchPage";
import NotificationComponent from "./components/NotificationComponent/NotificationComponent";

// const UserModal = lazy(() => import("./components/Modal/UserModal"));
// const LikePage = lazy(() => import("./pages/LikePage/LikePage"));
// const Bookmark = lazy(() => import("./pages/Bookmark/Bookmark"));
// const Explore = lazy(() => import("./pages/Explore/Explore"));
// const CommentModal = lazy(() => import("./components/Modal/CommentModal"));
// const SearchPage = lazy(() => import("./pages/SearchPage/SearchPage"));
// const SinglePost = lazy(() => import("./pages/SinglePost.jsx/SinglePost"));
// // const ProfileModal = lazy(() => import("./components/Modal/ProfileModal"));
// const ProfilePage = lazy(() => import("./pages/ProfilePage/ProfilePage"));
// const Modal = lazy(() => import("./components/Modal/Modal"));
// const UserList = lazy(() => import("./components/UserList/UserList"));
// const SearchBar = lazy(() => import("./components/SearchBar/SearchBar"));
// const SignUp = lazy(() => import("./pages/Signup/SignUp"));
// // const Landing = lazy(() => import("./pages/LandingPage/Landing"));

function App() {
  const {
    setEncodedToken,
    setLoading,
    state,
    dispatch,
    openModal,
    setOpenModal,
    loading,
    encodedToken,
  } = useContext(DataContext);

  const {
    editPost,
    setEditPost,
    editProfile,
    setEditProfile,
    userModal,
    setUserModal,
    addComment,
    setAddComment,
  } = useContext(AsideDataContext);

  useEffect(() => {
    const encodedToken = localStorage.getItem("token");
    setEncodedToken(encodedToken ?? "");
  }, []);

  useEffect(() => {
    (async () => {
      try {
        console.log(encodedToken + " PRATIMO")
        if(!encodedToken) return;

        const response = await axios.get("http://localhost:3000/api/v1/profile/get-all-users",{
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });

        console.log(response.data)

        dispatch({ type: "GET_USERS", payload: response.data });
        dispatch({ type: "GET_FOLLOWING" });
        dispatch({ type: "USER_TO_FOLLOW" });
      } catch (e) {
        console.log(e);
      }
    })();
  }, [encodedToken]);

  useEffect(() => {
    (async () => {
      try {
       // if(!localStorage.getItem("token"))return;
        if(!encodedToken) return;
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/v1/post/get-user-feed?page=1&pageSize=100`,{
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });

        const responseData = response.data.rows.length ? response.data.rows : [];
        dispatch({ type: "GET_POSTS", payload: responseData });
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    })();
  }, [encodedToken]);

  window.onbeforeunload = () => {
    localStorage.removeItem("token");
  };

  return (
    <div className="App">
      {/* <Suspense
        fallback={
          <Discuss
            height="200"
            width="200"
            ariaLabel="tail-spin-loading"
            radius="1"
            color="#FF7E95"
          />
        }
      > */}
      {loading && (
        <div className="loader">
          <Discuss
            height="200"
            width="200"
            ariaLabel="tail-spin-loading"
            radius="1"
            color="#FF7E95"
          />
        </div>
      )}
      {editPost && <Modal open={setEditPost} />}
      {openModal && <Modal open={setOpenModal} />}
      {editProfile && <ProfileModal open={setEditProfile} />}
      {userModal.show && <UserModal open={setUserModal} />}
      {addComment.show && <CommentModal open={setAddComment} />}
      {/* {followingModal && <UserModal open={setFollowingModal} />} */}
      <div className="main">
        {encodedToken && <Navbar />}
        <div className="section">
          {/* <Suspense fallback={<div>Loading...</div>}> */}
          <Routes>
            <Route path="/mockman" element={<Mockman />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/landing"
              element={
                <AuthWrapper>
                  <Landing />
                </AuthWrapper>
              }
            ></Route>
            <Route
              path="/explore"
              element={
                <AuthWrapper>
                  <Explore />
                </AuthWrapper>
              }
            ></Route>
            <Route
              path="/bookmark"
              element={
                <AuthWrapper>
                  <Bookmark />
                </AuthWrapper>
              }
            ></Route>
            <Route
              path="/likepage"
              element={
                <AuthWrapper>
                  <LikePage />
                </AuthWrapper>
              }
            ></Route>
            <Route
              path="/profilepage/:username"
              element={
                <AuthWrapper>
                  <ProfilePage />
                </AuthWrapper>
              }
            ></Route>
            <Route
              path="/postpage/:postId"
              element={
                <AuthWrapper>
                  <SinglePost />
                </AuthWrapper>
              }
            ></Route>
            <Route
              path="/search"
              element={
                <AuthWrapper>
                  <SearchPage />
                </AuthWrapper>
              }
            ></Route>
          </Routes>
          {/* </Suspense> */}
        </div>
        {encodedToken && (
          <div>
            <div className="side-search-bar">
              <div className="user-container">
                <NotificationComponent />
              </div>
            </div>

            <div className="side-search-bar">

              <SearchBar />
              <div className="user-container">
                <h2>You might Like</h2>
                {/* Displaying suggestions to whom user can follow*/}
                {state?.userToFollow?.map((user) => (
                  <div key={user._id}>
                    {" "}
                    <UserList user={user} />{" "}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
      <ToastContainer />
      {/* </Suspense> */}
    </div>
  );
}

export default App;
