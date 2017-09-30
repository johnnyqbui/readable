import React from "react";
import { Link } from "react-router-dom";
import Post from "./Post";

const PostsList = () => {
	return (
		<div className="posts-list">
			<h2 className="posts-header">Posts</h2>
			<Link to="/submit">Submit New Post</Link>
			<Post />
		</div>
	);
}

export default PostsList;