import * as ReadableApi from "../utils/ReadableApi";
import {
  GET_COMMENTS,
  ADD_COMMENT,
  UPDATE_VOTE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
} from './types';

export const fetchComments = id => dispatch => {
	ReadableApi.getComments(id).then(comments =>
		dispatch({
			type: GET_COMMENTS,
			parentId: id,
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