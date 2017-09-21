import { combineReducers } from 'redux'

import {
  ADD_POST,
  REMOVE_POST,
} from '../actions'

const post = (state = {}, action) => {
  const { post, id } = action

  switch (action.type) {
    case ADD_POST :
      return {
        ...state,
        post,
        id
      }
    case REMOVE_POST :
      return {
        ...state,
        post,
        id
      }
    default :
      return state
  }
}

export default combineReducers({
  post
})