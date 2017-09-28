import { combineReducers } from 'redux'

import {
  GET_POSTS,
  GET_CATEGORIES,
  SELECTED_CATEGORY,
  GET_POSTDETAILS } from '../actions'

const postListState = {
  isFetching: true,
  posts: []
}

const categoriesState = {
  categories: []
}

const postDetailsState = {
  postDetails: {},
  edit: false,
  isOpen: false
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

const postDetails = (state = postDetailsState, action) => {
  const { postDetails } = action;
  switch (action.type) {
    case GET_POSTDETAILS :
      return {
        ...state,
        ...postDetails
      }
    default :
      return state
  }
}

const postListData = (state = postListState, action) => {
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
  postDetails,
  postListData,
  categoryData,
  selectedCategory
})