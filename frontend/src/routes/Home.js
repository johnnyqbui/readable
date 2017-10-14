import React from "react";
import { Route, Switch } from "react-router-dom";
import Post from "../components/Post";
import Category from "../components/Category";
import PostSubmitForm from "../components/PostSubmitForm";

const Home = () => {
	return (
		<div className="main">
			<Route component={Category} />
			<Switch>
				<Route path="/submit" component={PostSubmitForm} />
				<Route component={Post} />
			</Switch>
		</div>
	);
}

export default Home;