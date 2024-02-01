import React from "react";
import Profile from "../../components/Profile/Profile";
import PostCard from "../../components/PostCard/PostCard";
import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
import "./ProfilePage.css";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AsideDataContext } from "../../contexts/AsideDataContext";

const ProfilePage = () => {
  const { scrollToTop } = useContext(AsideDataContext);
  const { setUserPost, state, dispatch } = useContext(DataContext);
  const { username } = useParams();

  useEffect(() => {
    (async () => {
      // console.log(userLoggedIn);
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/post/get-all-user-posts`,{
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
        setUserPost(response.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/profile/get-all-users",{
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
        console.log(response.data)
        dispatch({ type: "GET_USERS", payload: response.data });
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  //to get all the posts of specified user
  const postOfUser = state?.posts?.filter(
    (post) => post.username.toString() === username
  );

  //to get the user detail of specified user
  const userDetail = state?.users?.find(
    (user) => user.username.toString() === username
  );

  //set the scroll bar to top whenever the page loads
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="landing-container">
      <div className="profile-page-content">
        <div className="profile-card">
          <Profile user={userDetail} />
        </div>
        <div>
          {[...postOfUser]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            ?.map((data) => (
              <div key={data._id}>
                <PostCard data={data} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
