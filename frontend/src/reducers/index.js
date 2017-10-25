import { combineReducers } from "redux";

import {
  GET_CATEGORIES,
  SELECT_CATEGORY,
  GET_POSTS,
  GOT_POSTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  UPDATE_VOTE_POST,

  GET_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  UPDATE_VOTE_COMMENT,

  SHOW_DETAILS,
  HIDE_DETAILS
} from "../actions";

const categoriesState = {
  categories: [],
  selectedCategory: ''
};

const categoryData = (state = categoriesState, action) => {
  const { categories, category } = action;
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        ...categories
      };
    case SELECT_CATEGORY:
      return {
        ...state,
        selectedCategory: category
      }
    default:
      return state;
  }
};

const postDataState = {
  isFetching: true,
  posts: [],
  currentPostId: ''
};

const postData = (state = postDataState, action) => {
  const { posts, postDetails, option, id } = action;
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        isFetching: true
      };

    case GOT_POSTS:
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
            option === "upVote"
              ? post.voteScore += 1
              : post.voteScore -= 1;
          }
          return post;
        })
      };

    case EDIT_POST:
      return {
        ...state,
        posts: state.posts.map(
          post =>
            post.id === postDetails.id
              ? { ...postDetails}
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

    case SHOW_DETAILS:
      return {
        ...state,
        currentPostId: id
      }

    case HIDE_DETAILS:
      return {
        ...state,
        currentPostId: null
      }

    default:
      return state;
  }
};

// COMMENTS

const commentDataState = {
  parentId: null,
  comments: [],
};

const commentData = (state = commentDataState, action) => {
  const { comments, parentId, commentDetails, option } = action;
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        parentId,
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
              ? comment.voteScore += 1
              : comment.voteScore -= 1
          }
          return comment
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

    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment.id !== commentDetails.id ? comment : ""
        )
      };

    default:
      return state;
  }
};

export default combineReducers({
  categoryData,
  postData,
  commentData
});