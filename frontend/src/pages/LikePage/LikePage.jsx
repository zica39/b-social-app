import React from "react";
import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
import PostCard from "../../components/PostCard/PostCard";
import { useEffect } from "react";
import axios from "axios";
import { AsideDataContext } from "../../contexts/AsideDataContext";

const LikePage = () => {
  const { state, dispatch } = useContext(DataContext);
  const { scrollToTop } = useContext(AsideDataContext);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/post/get-all-user-liked-posts",{
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
        dispatch({ type: "ADD_LIKED_POSTS", payload: response.data });
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    dispatch({ type: "USER_TO_FOLLOW" });
  }, []);

  //set the scroll bar to top whenever the page loads
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
      <div className="bookmark-main">
        <div className="bookmark-post">
          {!state.likedPosts.length && <h1>No Liked Posts yet!</h1>}
          {console.log(state.likedPosts)}
          {state.likedPosts.map(data => {

               return (<div key={data._id}><PostCard data={data} /></div>)
              })

             }
        </div>
      </div>
  );
 /* return (
    <div className="bookmark-main">
      <div className="bookmark-post">
        {!state.likedPosts.length && <h1>No Liked Posts yet!</h1>}
        {state?.posts?.map((data) =>
          state.likedPosts.includes(data._id) ? (
            <div key={data._id}>
              <PostCard data={data} />
            </div>
          ) : (
            <></>
          )
        )}
      </div>
    </div>
  );*/
};

export default LikePage;
