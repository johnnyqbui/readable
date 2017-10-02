import React from "react";
import { Route, Switch } from "react-router-dom";
import PostList from "../components/PostList";
import Categories from "../components/Categories";
import SubmitPost from "../routes/SubmitPost";

const Home = () => {
	return (
		<div className="main">
			<Route path="/:category?" component={Categories} />
			<Switch>
				<Route path="/submit" component={SubmitPost} />
				<Route path="/:category/:post?" component={PostList} />
			</Switch>
		</div>
	);
}

export default Home;