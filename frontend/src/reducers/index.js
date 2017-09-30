import { combineReducers } from "redux";

import {
  GET_POSTS,
  GET_CATEGORIES,
  SELECTED_CATEGORY,
  TOGGLE_VISIBILITY,
  GET_POSTDETAILS,
  ADD_POST,
  DELETE_POST
} from "../actions";

const postListState = {
  isFetching: true,
  posts: {}
};

const categoriesState = {
  categories: []
};

const selectedCategory = (state = { selectedCategory: 'all' }, action) => {
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

const postDetails = (state = { isOpen: false }, action) => {
  const { postDetails } = action;
  switch (action.type) {
    case GET_POSTDETAILS:
      return {
        ...state,
        ...postDetails
      };
    default:
      return state;
  }
};

const postList = (state = postListState, action) => {
  const { posts, postDetails } = action;
  switch (action.type) {
    case GET_POSTS:
      posts.map(post => { return post['isVisible'] = false })
      return {
        ...state,
        isFetching: false,
        posts
      };

    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, postDetails]
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== postDetails.id ? post : '')
      };

    case TOGGLE_VISIBILITY:
      state.posts.map(post => {post.id === action.id ? post.isVisible = !post.isVisible : ''})
      return {
        ...state
      }
    default:
      return state;
  }
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

export default combineReducers({
  postDetails,
  postList,
  categoryData,
  selectedCategory
});