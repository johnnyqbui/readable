import * as ReadableApi from "../utils/ReadableApi";
import {
	SELECT_CATEGORY,
  GET_CATEGORIES,
  GOT_POSTS,
} from './types';

// CATEGORIES
export const selectCategory = category => ({
	type: SELECT_CATEGORY,
	category
});

export const fetchCategories = () => dispatch => {
	ReadableApi.getCats().then(categories =>
		dispatch({
			type: GET_CATEGORIES,
			categories
		})
	)
};

export const fetchCategoryPosts = category => dispatch => {
	ReadableApi.getPosts(category).then(posts =>
		dispatch({
			type: GOT_POSTS,
			posts
		})
	)
};