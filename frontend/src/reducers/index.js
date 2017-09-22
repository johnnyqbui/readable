import { combineReducers } from 'redux'

import { REQUEST_POSTS, RECEIVE_POSTS } from '../actions'

const postsState = {
  isFetching: false
}

const posts = (state = postsState, action) => {
  switch (action.type) {
    case REQUEST_POSTS :
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_POSTS :
      return {
        ...state,
        isFetching: false,
        posts: action.posts
      }
    default :
      return state
  }
}

export default posts

// export default combineReducers({
//   posts
// })