import * as ReadableApi from "../utils/ReadableApi";
import {
	SHOW_DETAILS,
  HIDE_DETAILS,
  GET_POSTS,
  GOT_POSTS,
  GET_POST_FAILED,
  ADD_POST,
  UPDATE_VOTE_POST,
  EDIT_POST,
  DELETE_POST,
} from './types';

// SHOW/HIDE POST DETAILS
export const showDetails = id => ({
	type: SHOW_DETAILS,
	id
});

export const hideDetails = () => ({
	type: HIDE_DETAILS
});

export const fetchPosts = () => dispatch => {
	dispatch({
		type: GET_POSTS
	});
	ReadableApi.getPosts().then(posts =>
		dispatch({
			type: GOT_POSTS,
			posts
		})
	)
};

export const getPostDetails = id => dispatch => {
	ReadableApi.getPostDetails(id).then(error =>
		dispatch({
			type: GET_POST_FAILED,
			...error
		})
	)
};

export const addPost = details => dispatch => {
	ReadableApi.addPost(details).then(postDetails =>
		dispatch({
			type: ADD_POST,
			postDetails
		})
	);
};

export const updateVotePost = (id, option) => dispatch => {
	ReadableApi.updateVotePost(id, option).then(postDetails =>
		dispatch({
			type: UPDATE_VOTE_POST,
			postDetails,
			option
		})
	);
};

export const editPost = details => dispatch => {
	ReadableApi.editPost(details).then(postDetails =>
		dispatch({
			type: EDIT_POST,
			postDetails
		})
	);
};

export const deletePost = id => dispatch => {
	ReadableApi.deletePost(id).then(postDetails =>
		dispatch({
			type: DELETE_POST,
			postDetails
		})
	);
};
