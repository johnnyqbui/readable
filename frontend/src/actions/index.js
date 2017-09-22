import * as ReadableApi from '../utils/ReadableApi';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const REQUEST_POSTS = 'REQUEST_POSTS';

function requestPosts() {
  return {
    type: REQUEST_POSTS,
  }
}

export const receivePosts = posts => ({
	type: RECEIVE_POSTS,
	posts
})

export const fetchPosts = () => dispatch => {
	dispatch(requestPosts())
	return ReadableApi.getPosts().then( posts => dispatch(receivePosts(posts)) )
}

