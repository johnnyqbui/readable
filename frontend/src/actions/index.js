import * as ReadableApi from '../utils/ReadableApi';
const baseApi = 'http://localhost:3001';

export const GET_POSTS = 'GET_POSTS';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const SELECTED_CATEGORY = 'SELECTED_CATEGORY';

export const selectedCategory = category => {
	return {
		type: SELECTED_CATEGORY,
		selectedCategory: category
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

// const fetchData = category => dispatch => {
// 	dispatch(selectedCategory(category))
// 	return {
// 		fetch(`${baseApi}/categories`, { headers: { 'Authorization': 'jb' }})
//     	.then(res => res.json())
// 	}
// }

export const fecthInitialData = () => dispatch => {
	fetch(`${baseApi}/categories`, { headers: { 'Authorization': 'jb' }})
    .then(res => res.json())
    .then( categories => dispatch(getCategories(categories)) )

	fetch(`${baseApi}/posts`, { headers: { 'Authorization': 'jb' }})
    .then(res => res.json())
    .then( posts => dispatch(getPosts(posts)) )
}

