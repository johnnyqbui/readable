import * as ReadableApi from '../utils/ReadableApi';

export const GET_POSTS = 'GET_POSTS';
export const GET_CATEGORIES = 'GET_CATEGORIES';

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

export const fetchInfo = () => dispatch => {
	ReadableApi
	.getCats().then( categories => dispatch(getCategories(categories)) )

	ReadableApi
	.getPosts().then( posts => dispatch(getPosts(posts)) )
}

