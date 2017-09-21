import * as ReadableApi from '../utils/ReadableApi';

export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'

export const addPost = ({ post, id }) => {
  return {
    type: ADD_POST,
    post,
    id
  }
}

export const removePost = ({ post, id }) => {
  return {
    type: REMOVE_POST,
    post,
    id
  }
}

export const fetchPosts = () => dispatch => (
  ReadableApi
    .getPosts()
    .then(posts => dispatch(addPost(posts)))
)