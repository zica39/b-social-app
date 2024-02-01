import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { useContext } from "react";
import { DataContext } from "./DataContext";
import toastNotify from "../utils/toastNotify";
import { useRef } from "react";

export const AsideDataContext = createContext();

export const AsideDataContextProvider = ({ children }) => {
  const [searchUser, setSearchUser] = useState("");
  const [editPost, setEditPost] = useState(false); //to open the dropdow for edit option
  const [editProfile, setEditProfile] = useState(false);
  const [addComment, setAddComment] = useState({show:false, post:{}}); // if user clicked on comment icons
  const { encodedToken, dispatch, state, setUserLoginData, setCreatePost } =
    useContext(DataContext);
  const [userModal, setUserModal] = useState({
    show: false,
    type: 0,
    userData: {},
  });

  
  const { editPostId } = useContext(DataContext);

  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/v1/post/delete-post/${postId}`, {
        headers: {
          authorization: "Bearer " + encodedToken,
        },
      });
      dispatch({ type: "DELETE_POST", payload: response.data });
      toastNotify("success", "Post Deleted successfully!");
    } catch (e) {
      console.log(e);
    }
  };

  const getPostData = async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/v1/post/post/${id}`,{
          headers: {
              authorization: "Bearer " + encodedToken,
          }
    });

      setCreatePost({ text: data.content, media: data.image });
      editPostId.current = data._id;
    } catch (e) {
      console.log(e);
    }
  };

  const followUser = async (Id) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/follow/follow/${Id}`,
        {},
        {
          headers: {
            authorization: "Bearer " + encodedToken,
          },
        }
      );

      console.log(response.data.data.follower);
      console.log(response.data.data.following );

      setUserLoginData(response.data.data.follower);
        const res = await axios.get("http://localhost:3000/api/v1/profile/get-all-users",{headers:{authorization: "Bearer " + encodedToken}});
        dispatch({ type: "GET_USERS", payload: res.data });

      dispatch({ type: "GET_FOLLOWING", payload: response.data.data.following });
      dispatch({ type: "USER_TO_FOLLOW" });

    } catch (e) {
      console.log(e);
    }
  };

  const unfollowUser = async (Id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/follow/unfollow/${Id}`,
        {
          headers: {
            authorization: "Bearer " + encodedToken,
          },
        }
      );
      setUserLoginData(response.data.data.follower);
        const res = await axios.get("http://localhost:3000/api/v1/profile/get-all-users",{headers:{authorization: "Bearer " + encodedToken}});
        dispatch({ type: "GET_USERS", payload: res.data });

      dispatch({ type: "GET_FOLLOWING" });
      dispatch({ type: "USER_TO_FOLLOW" });

      console.log("unfollow", response);
      console.log("fo/uf", state);
    } catch (e) {
      console.log(e);
    }
  };

  function scrollToTop() {
    window.scroll(0, 0);
  }

  return (
    <AsideDataContext.Provider
      value={{
        searchUser,
        setSearchUser,
        editPost,
        getPostData,
        setEditPost,
        deletePost,
        followUser,
        unfollowUser,
        editProfile,
        setEditProfile,
        userModal,
        setUserModal,
        scrollToTop,
        addComment,
        setAddComment,
      }}
    >
      {children}
    </AsideDataContext.Provider>
  );
};
