import { combineReducers } from "redux";
import { categoryData } from "./CategoryReducers";
import { postData } from "./PostReducers";
import { commentData } from "./CommentReducers";

export default combineReducers({
  categoryData,
  postData,
  commentData
});