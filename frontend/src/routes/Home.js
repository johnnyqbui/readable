import React from "react";
import { Route, Switch } from "react-router-dom";
import PostView from "../components/PostView";
import Category from "../components/Category";
import PostSubmitForm from "../components/PostSubmitForm";

const Home = () => {
	return (
		<div className="main">
			<Route path="/:category?" component={Category} />
			<Switch>
				<Route path="/submit" component={PostSubmitForm} />
				<Route path="/:category/:post?" component={PostView} />
			</Switch>
		</div>
	);
};

export default Home;