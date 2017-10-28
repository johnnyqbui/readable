import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const NotFound = () => {
	return (
  <div className="NotFound">
  	<h1>404: Page Not Found</h1>
  	<Link to="/">Back to Home</Link>
  </div>
)}

export default NotFound