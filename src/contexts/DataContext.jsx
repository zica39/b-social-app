import { createContext, useReducer } from "react";
import { initialValue, reducerFun } from "../reducers/dataReducer";
import { useState } from "react";
import axios from "axios";
import { useRef } from "react";
import toastNotify from "../utils/toastNotify";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const localData = localStorage.getItem("token");
  const [state, dispatch] = useReducer(reducerFun, initialValue);
  const [loading, setLoading] = useState(false);
  const [encodedToken, setEncodedToken] = useState(localData); //gloabally access the local storage token
  const [userLoggedIn, setUserLoggedIn] = useState(""); //gloabally access the local storage token
  const [userPost, setUserPost] = useState([]);
  const [userLoginData, setUserLoginData] = useState({});
  const [openModal, setOpenModal] = useState(false); //create post modal
  const [createPost, setCreatePost] = useState({ text: "", media: "" }); //to create ans post the data
  const editPostId = useRef("");
  const postType = useRef("");

  const likePost = async (postId, value) => {
    if (!value) {
      try {
        const response = await axios.post(
          `http://localhost:3000/api/v1/like/like/${postId}`,
          {},
          {
            headers: {
              authorization: "Bearer " + encodedToken,
            },
          }
        );
        console.log(response.data.data)
        dispatch({ type: "UPDATE_POSTS", payload: response.data.data }); //render all post
        dispatch({ type: "LIKED_POST", payload: response.data.data });
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const response = await axios.post(
            `http://localhost:3000/api/v1/like/like/${postId}`,
          {},
          {
            headers: {
                authorization: "Bearer " + encodedToken,
            },
          }
        );
        dispatch({ type: "UPDATE_POSTS", payload: response.data.data  });
        dispatch({ type: "DISLIKE_POST", payload: response.data.data });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const bookMarkPost = async (postId, value) => {
    if (!value) {
      try {
        const response = await axios.post(
          `/api/users/bookmark/${postId}`,
          {},
          {
            headers: {
              authorization: encodedToken,
            },
          }
        );
        dispatch({ type: "BOOKMARK_POST", payload: response.data.bookmarks });
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const response = await axios.post(
          `/api/users/remove-bookmark/${postId}`,
          {},
          {
            headers: {
              authorization: encodedToken,
            },
          }
        );
        dispatch({ type: "BOOKMARK_POST", payload: response.data.bookmarks });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const createPostHandler = async (postData) => {
    if (postData.text || postData.media) {
      const findPost = state?.posts?.find(
        ({ _id }) => _id === editPostId.current
      );

      if (findPost) {
        try {
            const response = await axios.put(
                `http://localhost:3000/api/v1/post/update-post/${findPost._id}`,
                {
                    content: postData.text
                },
                {
                    headers: {
                        authorization: "Bearer " + encodedToken
                    },
                }
            );
          //update the posts with the edited content
          dispatch({ type: "UPDATE_POSTS", payload: response.data });
          toastNotify("success", "Updated successfully!");
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          const response = await axios.post(
            "http://localhost:3000/api/v1/post/create-post",
            {
                content: postData.text
            },
            {
              headers: {
                authorization: "Bearer " + encodedToken
              },
            }
          );

          dispatch({ type: "ADD_POST", payload: response.data });
          toastNotify("success", "Posted successfully!");
        } catch (e) {
          console.log(e);
        }
      }
    } else {
      toastNotify("error", "Add content to post");
    }
  };

    const createCommentHandler = async (commentData) => {
        if (commentData.text ) {
            console.log(commentData);
            try {
                const response = await axios.post(
                    `http://localhost:3000/api/v1/comment/comment`,
                    {
                        postId: commentData.postData._id,
                        content: commentData.text
                    },
                    {
                        headers: {
                            authorization: "Bearer " + encodedToken
                        },
                    }
                );
                //update the posts with the edited content

                console.log("Prvi put" + response.data)
                dispatch({type: "SET_COMMENT", payload: response.data});
                toastNotify("success", "Comment added!");
                //toastNotify("success", "Updated successfully!");
            } catch (e) {
                console.log(e);
            }

        }else {
            toastNotify("error", "Add content to post");
        }
    };

  const setFilter = (value) => {
    dispatch({ type: "SET_FILTER", payload: value });
  };

  return (
    <DataContext.Provider
      value={{
        state,
        dispatch,
        likePost,
        bookMarkPost,
        userPost,
        setUserPost,
        userLoginData,
        setUserLoginData,
        createPostHandler,
          createCommentHandler,
        setFilter,
        openModal,
        setOpenModal,
        encodedToken,
        setEncodedToken,
        createPost,
        setCreatePost,
        editPostId,
        userLoggedIn,
        setUserLoggedIn,
        loading,
        setLoading,
        postType,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
