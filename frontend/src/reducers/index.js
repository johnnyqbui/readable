import { combineReducers } from "redux";

import {
  GET_POSTS,
  GET_CATEGORIES,
  SELECTED_CATEGORY,
  TOGGLE_VISIBILITY,
  GET_POSTDETAILS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  UPVOTE_POST,
  DOWNVOTE_POST
} from "../actions";

const postDataState = {
  isFetching: true,
  posts: {},
  postDetails: {}
};

const postData = (state = postDataState, action) => {
  const { posts, postDetails } = action;
  switch (action.type) {
    case GET_POSTS:
      posts.map(post => {
        return (post["isVisible"] = false);
      });
      return {
        ...state,
        posts,
        isFetching: false
      };

    case GET_POSTDETAILS:
      return {
        ...state,
        ...postDetails
      };

    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, postDetails]
      };

    case EDIT_POST:
      return {
        ...state,
        posts: state.posts.map(
          post =>
            post.id === postDetails.id
              ? { ...postDetails, isVisible: post.isVisible }
              : post
        )
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(
          post => (post.id !== postDetails.id ? post : "")
        )
      };

    case TOGGLE_VISIBILITY:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.id) {
            post.isVisible = !post.isVisible;
            return post;
          } else {
            return post;
          }
        })
      };

    case UPVOTE_POST:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === postDetails.id) {
            post.voteScore += 1;
            return post;
          } else {
            return post;
          }
        })
      };

    case DOWNVOTE_POST:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === postDetails.id) {
            post.voteScore -= 1;
            return post;
          } else {
            return post;
          }
        })
      };

    default:
      return state;
  }
};

const categoriesState = {
  categories: []
};

const categoryData = (state = categoriesState, action) => {
  const { categories } = action;
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        ...categories
      };
    default:
      return state;
  }
};

const selectedCategory = (state = { selectedCategory: "all" }, action) => {
  const { selectedCategory } = action;
  switch (action.type) {
    case SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory
      };
    default:
      return state;
  }
};

export default combineReducers({
  postData,
  categoryData,
  selectedCategory
});