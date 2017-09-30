const baseApi = "http://localhost:3001";
const headers = {
	headers: {
		Authorization: "DefinitelyNotAHorse",
		"Content-Type": "application/json"
	}
};

export const getPosts = (category) =>
  fetch(`${baseApi}${category ? '/'+category : ''}/posts`, { ...headers })
	.then(res => res.json())

export const getPostsDetails = (id) =>
  fetch(`${baseApi}/posts/${id}`, { ...headers })
	.then(res => res.json())

export const postUpVotes = (id) =>
  fetch(`${baseApi}/posts/${id}`, {
		...headers,
		method: "POST",
		body: JSON.stringify({
			option: "upVote"
		})
	})
	.then(res => res.json())

export const postDownVotes = (id) =>
  fetch(`${baseApi}/posts/${id}`, {
		...headers,
		method: "POST",
		body: JSON.stringify({
			option: "downVote"
		})
	})
	.then(res => res.json())

export const postNewPost = (details) =>
	fetch(`${baseApi}/posts`, {
		...headers,
		method: "POST",
		body: JSON.stringify(details)
	})
		.then(res => res.json())

export const putEditPost = (details) =>
	fetch(`${baseApi}/posts/${details.id}`, {
		...headers,
		method: "PUT",
		body: JSON.stringify(details)
	})
		.then(res => res.json())

export const deletePost = (id) =>
	fetch(`${baseApi}/posts/${id}`, {
		...headers,
		method: "DELETE"
	})
		.then(res => res.json())

export const getCats = () =>
  fetch(`${baseApi}/categories`, { ...headers })
		.then(res => res.json())