import React from "react";
import { Route, Switch } from "react-router-dom";
import PostList from "../components/PostList";
import CategoryList from "../components/CategoryList";
import PostSubmitForm from "../components/PostSubmitForm";

const Home = () => {
	return (
		<div className="main">
			<Route component={CategoryList} />
			<Switch>
				<Route path="/submit" component={PostSubmitForm} />
				<Route component={PostList} />
			</Switch>
		</div>
	);
}

export default Home;