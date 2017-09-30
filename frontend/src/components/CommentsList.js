import React from "react";
import { Link } from "react-router-dom";
import Comment from "./Comment";

const CommentsList = () => {
	return (
		<div className="comments-list">
			<h2 className="comments-header">Comments</h2>
			<Comment />
		</div>
	);
}

export default CommentsList;