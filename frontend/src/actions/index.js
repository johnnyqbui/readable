import * as ReadableApi from "../utils/ReadableApi";

const baseApi = "http://localhost:3001";
const headers = {
	headers: {
		Authorization: "DefinitelyNotAHorse",
		"Content-Type": "application/json"
	}
};

export const GET_CATEGORIES = "GET_CATEGORIES";
export const SELECTED_CATEGORY = "SELECTED_CATEGORY";

export const GET_POSTS = "GET_POSTS";
export const TOGGLE_VISIBILITY = "TOGGLE_VISIBILITY";
export const GET_POSTDETAILS = "GET_POSTDETAILS";
export const ADD_POST = "ADD_POST";
export const EDIT_POST = "EDIT_POST";
export const DELETE_POST = "DELETE_POST";

export const handleSelectedCategory = selectedCategory => {
	return {
		type: SELECTED_CATEGORY,
		selectedCategory
	};
};

export const toggleVisibility = id => {
	return {
		type: TOGGLE_VISIBILITY,
		id
	};
};

const getPosts = posts => {
	return {
		type: GET_POSTS,
		posts
	};
};

const getCategories = categories => {
	return {
		type: GET_CATEGORIES,
		categories
	};
};

const getPostDetails = postDetails => {
	return {
		type: GET_POSTDETAILS,
		postDetails
	};
};

export const fetchCategories = () => dispatch => {
	ReadableApi.getCats().then(categories => dispatch(getCategories(categories)));
};

export const fetchCategoryPosts = category => dispatch => {
	ReadableApi.getPosts(category).then(posts => dispatch(getPosts(posts)));
};

export const fetchPosts = () => dispatch => {
	ReadableApi.getPosts().then(posts => dispatch(getPosts(posts)));
};

export const fetchPostDetails = id => dispatch => {
	ReadableApi.getPostsDetails(id).then(postDetails =>
		dispatch(getPostDetails(postDetails))
	);
};

export const postUpVotes = id => dispatch => {
	ReadableApi.postUpVotes(id);
};

export const postDownVotes = id => dispatch => {
	ReadableApi.postDownVotes(id);
};

export const postNewPost = details => dispatch => {
	ReadableApi.postNewPost(details).then(postDetails =>
		dispatch({
			type: ADD_POST,
			postDetails
		})
	);
};

export const putEditPost = details => dispatch => {
	ReadableApi.putEditPost(details).then(postDetails =>
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