import {
  GET_COMMENTS,
  ADD_COMMENT,
  UPDATE_VOTE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
} from '../actions/types';

const commentDataState = {
  parentId: null,
  comments: []
};

export const commentData = (state = commentDataState, action) => {
  const { comments, parentId, commentDetails, option } = action;
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        parentId,
        comments
      };

    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, commentDetails]
      };

    case UPDATE_VOTE_COMMENT:
      return {
        ...state,
        comments: state.comments.map(comment => {
          if (comment.id === commentDetails.id) {
            option === "upVote"
              ? (comment.voteScore += 1)
              : (comment.voteScore -= 1);
          }
          return comment;
        })
      };

    case EDIT_COMMENT:
      return {
        ...state,
        comments: state.comments.map(
          comment =>
            comment.id === commentDetails.id ? { ...commentDetails } : comment
        )
      };

    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          comment => (comment.id !== commentDetails.id ? comment : "")
        )
      };

    default:
      return state;
  }
};