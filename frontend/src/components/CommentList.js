import React from "react";
import { Link } from "react-router-dom";
import Comment from "./Comment";

const CommentList = () => {
	return (
		<div className="comments-list">
			<h3 className="comments-header">Comments</h3>
			<Comment />
		</div>
	);
}

export default CommentList;