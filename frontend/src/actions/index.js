import * as ReadableApi from "../utils/ReadableApi";

export const SELECTED_CATEGORY = "SELECTED_CATEGORY";
export const GET_CATEGORIES = "GET_CATEGORIES";

export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const EDIT_POST = "EDIT_POST";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_VOTE_POST = "UPDATE_VOTE_POST";

export const GET_COMMENTS = "GET_COMMENTS";
export const GOT_COMMENTS = "GOT_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const UPDATE_VOTE_COMMENT = "UPDATE_VOTE_COMMENT";

// export const IS_FETCHING = "IS_FETCHING";
// export const FETCHED = "FETCHED";

// // FETCHING
// const isFetching = () => dispatch => {
// 	dispatch({
// 		type: IS_FETCHING
// 	})
// }

// const fetched = () => dispatch => {
// 	dispatch({
// 		type: FETCHED
// 	})
// }

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

export const handleSelectedCategory = selectedCategory => {
	return {
		type: SELECTED_CATEGORY,
		selectedCategory
	};
};



// POSTS

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



// COMMENTS
export const fetchComments = id => dispatch => {
	dispatch({
		type: GET_COMMENTS
	})
	ReadableApi.getComments(id).then(comments =>
		dispatch({
			type: GOT_COMMENTS,
			comments
		})
	);
};

export const addComment = details => dispatch => {
	ReadableApi.addComment(details).then(commentDetails =>
		dispatch({
			type: ADD_COMMENT,
			commentDetails
		})
	);
};

export const updateVoteComment = (id, option) => dispatch => {
	ReadableApi.updateVoteComment(id, option).then(commentDetails =>
		dispatch({
			type: UPDATE_VOTE_COMMENT,
			commentDetails,
			option
		})
	);
};

export const editComment = details => dispatch => {
	ReadableApi.editComment(details).then(commentDetails =>
		dispatch({
			type: EDIT_COMMENT,
			commentDetails
		})
	);
};

export const deleteComment = id => dispatch => {
	ReadableApi.deleteComment(id).then(commentDetails =>
		dispatch({
			type: DELETE_COMMENT,
			commentDetails
		})
	);
};