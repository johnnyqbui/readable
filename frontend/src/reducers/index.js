import { combineReducers } from 'redux'

import {
  GET_POSTS,
  GET_CATEGORIES,
  SELECTED_CATEGORY } from '../actions'

const postsState = {
  isFetching: true,
  posts: []
}

const categoriesState = {
  categories: []
}

const selectedCategory = (state = '', action) => {
  const { selectedCategory } = action;
  switch (action.type) {
    case SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory
      }
    default :
      return state
  }
}

const postsData = (state = postsState, action) => {
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

const categoryData = (state = categoriesState, action) => {
  const { categories } = action;
  switch (action.type) {
    case GET_CATEGORIES :
      return {
        ...state,
        ...categories
      }
    default :
      return state
  }
}

export default combineReducers({
  postsData,
  categoryData,
  selectedCategory
})