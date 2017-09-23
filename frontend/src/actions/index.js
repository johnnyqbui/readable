import * as ReadableApi from '../utils/ReadableApi';

export const GET_POSTS = 'GET_POSTS';
export const GET_CATEGORIES = 'GET_CATEGORIES';

const getPosts = posts => ({
	type: GET_POSTS,
	posts
})

const getCategories = categories => ({
	type: GET_CATEGORIES,
	categories
})

export const fetchInfo = () => dispatch => {
	ReadableApi
	.getPosts().then( posts => dispatch(getPosts(posts)) )
	ReadableApi
	.getCats().then( categories => dispatch(getCategories(categories)) )
}

