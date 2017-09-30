import * as ReadableApi from "../utils/ReadableApi";

export const TOGGLE_VISIBILITY = "TOGGLE_VISIBILITY";
export const SELECTED_CATEGORY = "SELECTED_CATEGORY";
export const GET_CATEGORIES = "GET_CATEGORIES";

export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const EDIT_POST = "EDIT_POST";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_VOTE_POST = "UPDATE_VOTE_POST";

export const GET_COMMENTS = "GET_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const UPDATE_VOTE_COMMENT = "UPDATE_VOTE_COMMENT";

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


export const fetchPosts = () => dispatch => {
	ReadableApi.getPosts().then(posts =>
		dispatch({
			type: GET_POSTS,
			posts
		})
	);
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


// CATEGORIES
export const fetchCategories = () => dispatch => {
	ReadableApi.getCats().then(categories =>
		dispatch({
			type: GET_CATEGORIES,
			categories
		})
	);
};

export const fetchCategoryPosts = category => dispatch => {
	ReadableApi.getPosts(category).then(posts =>
		dispatch({
			type: GET_POSTS,
			posts
		})
	);
};



// COMMENTS
export const fetchComments = () => dispatch => {
	ReadableApi.getComments().then(posts =>
		dispatch({
			type: GET_COMMENTS,
			posts
		})
	);
};

export const addComment = details => dispatch => {
	ReadableApi.addComment(details).then(postDetails =>
		dispatch({
			type: ADD_COMMENT,
			postDetails
		})
	);
};

export const updateVoteComment = (id, option) => dispatch => {
	ReadableApi.updateVoteComment(id, option).then(postDetails =>
		dispatch({
			type: UPDATE_VOTE_COMMENT,
			postDetails,
			option
		})
	);
};

export const editComment = details => dispatch => {
	ReadableApi.editComment(details).then(postDetails =>
		dispatch({
			type: EDIT_COMMENT,
			postDetails
		})
	);
};

export const deleteComment = id => dispatch => {
	ReadableApi.deleteComment(id).then(postDetails =>
		dispatch({
			type: DELETE_COMMENT,
			postDetails
		})
	);
};