import React, { useContext, useState } from "react";
import "./PostCard.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { DataContext } from "../../contexts/DataContext";
import { useEffect } from "react";
import axios from "axios";
import OutsideClickHandler from "react-outside-click-handler";
import { AsideDataContext } from "../../contexts/AsideDataContext";
import { NavLink } from "react-router-dom";
import toastNotify from "../../utils/toastNotify";

const PostCard = ({ data }) => {
  const { state, likePost, bookMarkPost, userLoggedIn, postType } =
    useContext(DataContext);
  const { deletePost, setEditPost, getPostData, setAddComment, addComment } =
    useContext(AsideDataContext);
  const [userData, setUserData] = useState([]); //to show the user details in individual post in landing page
  const [modifyPost, setModifyPost] = useState(false); //to open the dropdow for edit option

  //get like count of a post
  const likedCount = state.posts.find(({ _id }) => _id === data?._id)?.likes
    ?.likeCount;

  //check if post is already liked and preent in likedPosts Array
 // const postLiked = state?.likedPosts?.find((id) => id === data?._id);

  const postLiked = state.posts.find(({ _id }) => _id === data?._id)?.likes
      ?.likedBy.find(user=>user.username === data.username);

  //check if post is already bookmarked
  const postBookmarked = state?.bookmarkedPosts?.find((id) => id === data?._id);

  //get user profile pic
  const picOfUser = state?.users?.find(
    (user) => user?.username === data?.username
  );

  useEffect(() => {
    const user = state?.users?.find((usr) => usr?.username === data?.username);
    if(!user) return;

    (async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/profile/user/${user?._id}`,{
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setUserData(response.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [state.users]);

  //get the date in format
  const d = new Date(data?.createdAt);

  //copy to clipboard
  async function copyToClip() {
    await navigator.clipboard.writeText(
      `https://localhost:3001/postpage/${data._id}`
    );
    toastNotify("success", "Link copied!");
  }

  return (
    <div>
      <div className="post-container">
        <div>
          <div className="post-heading">
            <NavLink
              className="not-a-link"
              to={`/profilepage/${data?.username}`}
            >
              {" "}
              <div className="post-title">
                <img
                  src={picOfUser?.avatarUrl}
                  alt=""
                  className="nav-profile-pic"
                />

                <div className="post-date">
                  <p>
                    <span className="post-user-details">
                      {userData?.firstname} {userData?.lastname}
                    </span>{" "}
                    {d.toDateString()}
                  </p>
                  <p>@{data?.username}</p>
                </div>
              </div>
            </NavLink>
            <div className="three-dots-container">
              <div id="three-dots" onClick={() => setModifyPost(!modifyPost)}>
                {data?.username === userLoggedIn && <MoreVertIcon />}{" "}
              </div>
              {modifyPost && (
                <div className="post-popup">
                  <OutsideClickHandler
                    onOutsideClick={() => setModifyPost(false)}
                  >
                    <div
                      className="post-dropdown"
                      onClick={() => {
                        setEditPost(true);
                        getPostData(data?._id);
                      }}
                    >
                      Edit
                    </div>
                    <div
                      className="post-dropdown"
                      onClick={() => deletePost(data?._id)}
                    >
                      Delete
                    </div>
                  </OutsideClickHandler>
                </div>
              )}
            </div>
          </div>
        </div>
        <NavLink className="not-a-link" to={`/postpage/${data?._id}`}>
          <div className="post-content">
            {data?.content}
            {data?.image && (
              <img
                className="post-img"
                src={data?.image}
                alt=""
                id="posted-img"
              />
            )}
            {postType.current && data?.image && (
              <video width="320" height="240" controls autoplay muted>
                <source src={data?.image} alt=""></source>
              </video>
            )}
          </div>
        </NavLink>
        <hr />
        <div className="post-actions">
         {/* <div
            className="post-icons"
            onClick={() => {
              likePost(data._id, postLiked);
            }}
          >
            <div className="liked-counter-div">
              {" "}
              {postLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              {likedCount}
            </div>
          </div>*/}
          <div
            className="post-icons"
            onClick={() =>
              setAddComment({ ...addComment, show: true, post: data })
            }
          >
            <div className="liked-counter-div">
              <ChatBubbleOutlineIcon />{" "}
              {state?.posts.find(({ _id }) => _id === data?._id)?.comments
                ?.length === 0 ? (
                <></>
              ) : (
                state?.posts.find(({ _id }) => _id === data?._id)?.comments
                  ?.length
              )}
            </div>
          </div>
          <div
            className="post-icons"
            onClick={() => {
              bookMarkPost(data._id, postBookmarked);
            }}
          >
            {/*{postBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}*/}
          </div>
          <div className="post-icons" onClick={() => copyToClip()}>
            <ShareIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
