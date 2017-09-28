const baseApi = 'http://localhost:3001';

export const GET_POSTS = 'GET_POSTS';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const SELECTED_CATEGORY = 'SELECTED_CATEGORY';
export const GET_POSTDETAILS = 'GET_POSTDETAILS';

export const handleSelectedCategory = category => {
	return {
		type: SELECTED_CATEGORY,
		category
	}
}

const getPosts = posts => {
	return {
		type: GET_POSTS,
		posts
	}
}

const getCategories = categories => {
	return {
		type: GET_CATEGORIES,
		categories
	}
}

const getPostDetails = postDetails => {
	return {
		type: GET_POSTDETAILS,
		postDetails
	}
}

export const fetchPostDetails = id => dispatch => {
	fetch(`${baseApi}/posts/${id}`, { headers: { 'Authorization': 'jb' }})
    .then( res => res.json() )
    .then( postDetails =>
    	dispatch(getPostDetails(postDetails))
    )

    fetch(`${baseApi}/posts`, { headers: { 'Authorization': 'jb' }})
    .then( res => res.json() )
    .then( posts => dispatch(getPosts(posts)) )
}

export const fetchCategoryData = category => dispatch => {
	const getCategory = category === 'all' || category === '' ? '' : `${category}/`
	fetch(`${baseApi}/${getCategory}posts`, { headers: { 'Authorization': 'jb' }})
    .then( res => res.json() )
    .then( posts =>
    	dispatch(getPosts(posts)),
    )
}

export const fecthInitialData = () => dispatch => {
	fetch(`${baseApi}/categories`, { headers: { 'Authorization': 'jb' }})
    .then( res => res.json() )
    .then( categories => dispatch(getCategories(categories)) )

	fetch(`${baseApi}/posts`, { headers: { 'Authorization': 'jb' }})
    .then( res => res.json() )
    .then( posts => dispatch(getPosts(posts)) )
}

export const postNewPost = details => dispatch => {
	fetch(`${baseApi}/posts`, {
		headers: {
			'Authorization': 'jb',
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify(details)
	})
    .then( res => res.json() )
    .then( postDetails =>
    	dispatch(getPostDetails(postDetails))
    )
}

export const putEditPost = details => dispatch => {
	const id = details.id;
	fetch(`${baseApi}/posts/${id}`, {
		headers: {
			'Authorization': 'jb',
			'Content-Type': 'application/json'
		},
		method: 'PUT',
		body: JSON.stringify(details)
	})
    .then( res => res.json() )
    .then( postDetails =>
    	dispatch(getPostDetails(postDetails))
    )
}

export const postUpVotes = id => dispatch => {
	fetch(`${baseApi}/posts/${id}`, {
		headers: {
			'Authorization': 'jb',
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
			option: 'upVote'
		})
	})
    .then( res => res.json() )
    .then( postDetails =>
    	dispatch(getPostDetails(postDetails))
    )
}

export const postDownVotes = id => dispatch => {
	fetch(`${baseApi}/posts/${id}`, {
		headers: {
			'Authorization': 'jb',
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
			option: 'downVote'
		})
	})
    .then( res => res.json() )
    .then( postDetails =>
    	dispatch(getPostDetails(postDetails))
    )
}