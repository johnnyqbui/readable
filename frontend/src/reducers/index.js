import { combineReducers } from 'redux'

import {
  GET_POSTS,
  GET_CATEGORIES } from '../actions'

const postsState = {
  isFetching: true,
  posts: []
}

const allPosts = (state = postsState, action) => {
  const { posts } = action;
  switch (action.type) {
    case GET_POSTS :
      return {
        ...state,
        isFetching: false,
        posts
      }
    default :
      return state
  }
}

const categories = (state = {}, action) => {
  const { categories } = action;
  switch (action.type) {
    case GET_CATEGORIES :
      return {
        ...state,
        categories
      }
    default :
      return state
  }
}

export default combineReducers({
  allPosts,
  categories
})