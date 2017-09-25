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

const selectedCategory = (state = { category: 'all' }, action) => {
  const { category } = action;
  switch (action.type) {
    case SELECTED_CATEGORY:
      return {
        ...state,
        category
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