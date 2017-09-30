const baseApi = "http://localhost:3001";
const headers = {
	headers: {
		Authorization: "DefinitelyNotAHorse",
		"Content-Type": "application/json"
	}
};
export const GET_POSTS = "GET_POSTS";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const SELECTED_CATEGORY = "SELECTED_CATEGORY";
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
	fetch(`${baseApi}/categories`, { ...headers })
		.then(res => res.json())
		.then(categories => dispatch(getCategories(categories)));
};

export const fetchCategoryPosts = category => dispatch => {
	fetch(`${baseApi}/${category}/posts`, { ...headers })
		.then(res => res.json())
		.then(posts => dispatch(getPosts(posts)));
};

export const fetchPosts = () => dispatch => {
	fetch(`${baseApi}/posts`, { ...headers })
		.then(res => res.json())
		.then(posts => dispatch(getPosts(posts)));
};

export const fetchPostDetails = id => dispatch => {
	fetch(`${baseApi}/posts/${id}`, { ...headers })
		.then(res => res.json())
		.then(postDetails => dispatch(getPostDetails(postDetails)));
};

export const postUpVotes = id => dispatch => {
	fetch(`${baseApi}/posts/${id}`, {
		...headers,
		method: "POST",
		body: JSON.stringify({
			option: "upVote"
		})
	})
		.then(res => res.json())
		.then(postDetails => dispatch(getPostDetails(postDetails)));
};

export const postDownVotes = id => dispatch => {
	fetch(`${baseApi}/posts/${id}`, {
		...headers,
		method: "POST",
		body: JSON.stringify({
			option: "downVote"
		})
	})
		.then(res => res.json())
		.then(postDetails => dispatch(getPostDetails(postDetails)));
};

export const postNewPost = details => dispatch => {
	fetch(`${baseApi}/posts`, {
		...headers,
		method: "POST",
		body: JSON.stringify(details)
	})
		.then(res => res.json())
		.then(postDetails =>
			dispatch({
				type: ADD_POST,
				postDetails
			})
		);
};

export const putEditPost = details => dispatch => {
	const id = details.id;
	fetch(`${baseApi}/posts/${id}`, {
		...headers,
		method: "PUT",
		body: JSON.stringify(details)
	})
		.then(res => res.json())
		.then(postDetails =>
			dispatch({
				type: EDIT_POST,
				postDetails
			})
		);
};

export const deletePost = id => dispatch => {
	fetch(`${baseApi}/posts/${id}`, {
		...headers,
		method: "DELETE"
	})
		.then(res => res.json())
		.then(postDetails =>
			dispatch({
				type: DELETE_POST,
				postDetails
			})
		);
};