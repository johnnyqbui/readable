const baseApi = "http://localhost:3001";
const headers = {
	headers: {
		Authorization: "DefinitelyNotAHorse",
		"Content-Type": "application/json"
	}
};

export const getPosts = category =>
	fetch(`${baseApi}${category && category !== "all" ? "/" + category : ""}/posts`, {
		...headers
	}).then(res => res.json());

export const updateVotePost = (id, option) =>
	fetch(`${baseApi}/posts/${id}`, {
		...headers,
		method: "POST",
		body: JSON.stringify({
			option
		})
	}).then(res => res.json());

export const addPost = details =>
	fetch(`${baseApi}/posts`, {
		...headers,
		method: "POST",
		body: JSON.stringify(details)
	}).then(res => res.json());

export const editPost = details =>
	fetch(`${baseApi}/posts/${details.id}`, {
		...headers,
		method: "PUT",
		body: JSON.stringify(details)
	}).then(res => res.json());

export const deletePost = id =>
	fetch(`${baseApi}/posts/${id}`, {
		...headers,
		method: "DELETE"
	}).then(res => res.json());

export const getCats = () =>
	fetch(`${baseApi}/categories`, { ...headers }).then(res => res.json());

// COMMENTS

export const getComments = id =>
	fetch(`${baseApi}/posts/${id}/comments`, {
		...headers
	}).then(res => res.json());

export const addComment = details =>
	fetch(`${baseApi}/comments`, {
		...headers,
		method: "POST",
		body: JSON.stringify(details)
	}).then(res => res.json());

export const updateVoteComment = (id, option) =>
	fetch(`${baseApi}/comments/${id}`, {
		...headers,
		method: "POST",
		body: JSON.stringify({
			option
		})
	}).then(res => res.json());

export const editComment = details =>
	fetch(`${baseApi}/comments/${details.id}`, {
		...headers,
		method: "PUT",
		body: JSON.stringify(details)
	}).then(res => res.json());

export const deleteComment = id =>
	fetch(`${baseApi}/comments/${id}`, {
		...headers,
		method: "DELETE"
	}).then(res => res.json());