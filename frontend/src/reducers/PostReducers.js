import {
	SHOW_DETAILS,
  HIDE_DETAILS,
  GET_POSTS,
  GET_POST_FAILED,
  GOT_POSTS,
  ADD_POST,
  UPDATE_VOTE_POST,
  EDIT_POST,
  DELETE_POST,
} from '../actions/types';

const postDataState = {
  isFetching: true,
  posts: [],
  currentPostId: "",
  postError: ''
};

export const postData = (state = postDataState, action) => {
  const { posts, postDetails, option, id, error } = action;
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        isFetching: true
      };

    case GOT_POSTS:
      return {
        ...state,
        posts,
        isFetching: false
      };

    case GET_POST_FAILED:
      return {
        ...state,
        error
      }

    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, postDetails]
      };

    case UPDATE_VOTE_POST:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === postDetails.id) {
            option === "upVote"
            ? (post.voteScore += 1)
            : (post.voteScore -= 1);
          }
          return post;
        })
      };

    case EDIT_POST:
      return {
        ...state,
        posts: state.posts.map(
          post => (post.id === postDetails.id ? { ...postDetails } : post)
        )
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(
          post => (post.id !== postDetails.id ? post : "")
        )
      };

    case SHOW_DETAILS:
      return {
        ...state,
        currentPostId: id
      };

    case HIDE_DETAILS:
      return {
        ...state,
        currentPostId: null
      };

    default:
      return state;
  }
};