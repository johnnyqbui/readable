const baseApi = 'http://localhost:3001';

export const GET_POSTS = 'GET_POSTS';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const SELECTED_CATEGORY = 'SELECTED_CATEGORY';
export const GET_POSTDETAILS = 'GET_POSTDETAILS';
export const POST_VOTE = 'POST_VOTE';

const selectedCategory = category => {
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
}

export const fetchCategoryData = category => dispatch => {
	const getCategory = category === 'all' || category === '' ? '' : `${category}/`
	fetch(`${baseApi}/${getCategory}posts`, { headers: { 'Authorization': 'jb' }})
    .then( res => res.json() )
    .then( posts =>
    	dispatch(getPosts(posts)),
    	dispatch(selectedCategory(category))
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


export const updateVotes = id => dispatch => {
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