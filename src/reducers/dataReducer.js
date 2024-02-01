export const initialValue = {
  posts: [],
  users: [],
  likedPosts: [],
  bookmarkedPosts: [],
  filter: "",
  following: [],
  userToFollow: [],
};

export const reducerFun = (state, action) => {
  switch (action.type) {

    case "UPDATE_POSTS": {
      const findPost = state?.posts.map((post) =>
          post._id === action.payload._id
              ? { ...post, content: action.payload.content }
              : post
      );

      return { ...state, posts: findPost };
    }

    case "DELETE_POST": {
      const updatedPosts = state?.posts.filter((post) =>
          post._id !== action.payload._id
      );

      return { ...state, posts: updatedPosts };
    }

    case "ADD_POST": {
      const updatedPosts = [...state?.posts, action.payload];
      return { ...state, posts: updatedPosts };
    }

    case "GET_POSTS": {
      return { ...state, posts: action.payload };
    }
    case "GET_USERS": {
      console.log("Updating users with new data:", action.payload);
      return { ...state, users: action.payload };
    }


    case "ADD_LIKED_POSTS": {
      if(!action.payload.length) action.payload = [];

      return { ...state, likedPosts: action.payload };
    }

    case "LIKED_POST": {

      if(!state?.likedPosts?.length) state.likedPosts = [];

      if(state.likedPosts.find(post => post._id === action.payload._id)) return state;
      return { ...state, likedPosts: [...state.likedPosts, action.payload] };
    }

    case "DISLIKE_POST": {
      return {
        ...state,
        likedPosts: state.likedPosts.filter((post) => post._id !== action.payload._id),
      };
    }

    case "BOOKMARK_POST": {
      return {
        ...state,
        bookmarkedPosts: action.payload,
      };
    }

    case "RESET_ALL": {
      return { ...initialValue };
    }

    case "SET_FILTER": {
      return { ...state, filter: action.payload };
    }

    case "CLEAR_FILTER": {
      return { ...state, filter: "" };
    }

    case "GET_FOLLOWING": {

      const loggedUser = state?.users?.find(
          ({ username }) => username === localStorage.getItem("loggedUser")
      );

        return { ...state, following: loggedUser.following };

    }

    case "USER_TO_FOLLOW": {
      const suggestedUserToFollow = state?.users?.filter(
          ({ username }) => !state?.following.find(user=> user.username === username) &&  username !== localStorage.getItem("loggedUser")
      );
      return { ...state, userToFollow: suggestedUserToFollow };
    }

    case "UPDATE_USERS": {
      const findUser = state?.users.map((user) =>
        user.username === action.payload.username
          ? { ...user, avatarUrl: action.payload.avatarUrl }
          : user
      );

      return { ...state, users: findUser };
    }

    case "SET_COMMENT": {
      console.log( action.payload)
      const updatePostData = state.posts.map((post) =>{
        if(!post.comments.length) post.comments = [];
          return   post._id === action.payload?.post_id
                ? { ...post, comments: [...post.comments, action.payload] }
                : post
      }

      );

      return { ...state, posts: updatePostData };
    }
    default: {
      return state;
    }
  }
};
