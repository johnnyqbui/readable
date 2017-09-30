import { combineReducers } from "redux";

import {
  TOGGLE_VISIBILITY,
  SELECTED_CATEGORY,
  GET_CATEGORIES,
  GET_POSTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  UPDATE_VOTE_POST,
  GET_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  UPDATE_VOTE_COMMENT
} from "../actions";

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

const postDataState = {
  isFetching: true,
  posts: {},
  postDetails: {}
};

const postData = (state = postDataState, action) => {
  const { posts, postDetails, option } = action;
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

    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, postDetails]
      };

    case UPDATE_VOTE_POST:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === postDetails.id) {
            option === "upVote" ? (post.voteScore += 1) : (post.voteScore -= 1);
            return post;
          } else {
            return post;
          }
        })
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

    default:
      return state;
  }
};

// COMMENTS

const commentDataState = {
  isFetching: true,
  comments: {},
  commentDetails: {}
};

const commentData = (state = commentDataState, action) => {
  const { comments, commentDetails } = action;
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments
      };

    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, commentDetails]
      };

    case UPDATE_VOTE_COMMENT:
      return {
        ...state,
        comments: state.comments.map(comment => {
          if (comment.id === commentDetails.id) {
            option === "upVote"
              ? (comment.voteScore += 1)
              : (comment.voteScore -= 1);
            return comment;
          } else {
            return comment;
          }
        })
      };

    case EDIT_COMMENT:
      return {
        ...state,
        comments: state.comments.map(
          comment =>
            comment.id === commentDetails.id ? { ...commentDetails } : comment
        )
      };

    case DELETE_POST:
      return {
        ...state,
        comments: state.comments.filter(
          comment => (comment.id !== commentDetails.id ? comment : "")
        )
      };

    default:
      return state;
  }
};

export default combineReducers({
  categoryData,
  postData,
  commentData,
  selectedCategory
});