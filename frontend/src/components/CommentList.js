import React from "react";
import { Link } from "react-router-dom";
import Comment from "./Comment";

const CommentList = () => {
	return (
		<div className="comments-list">
			<Comment />
		</div>
	);
}

export default CommentList;