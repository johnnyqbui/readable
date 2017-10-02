import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Post from "./Post";
import SubmitPost from "../routes/SubmitPost";

const PostsList = () => {
	return (
		<div className="posts-list">
			<h2 className="posts-header">Posts</h2>
			<Link to="/submit">Submit New Post</Link>
			<Switch>
					<Route path="/submit" component={SubmitPost} />
					<Post/>
			</Switch>
		</div>
	);
}

export default PostsList;