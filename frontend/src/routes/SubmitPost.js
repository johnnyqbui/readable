import React from "react";
import { connect } from "react-redux";
import shortid from "shortid";
import { fetchPosts, addPost } from "../actions";
import { Redirect } from "react-router-dom";

class SubmitPost extends React.Component {
	state = {
		author: "",
		title: "",
		body: "",
		category: this.props.selectedCategory,
		submitted: false
	};

	handleChange = e => {
		const name = e.target.name;
		const value = e.target.value;
		const category = name === "category" ? value : this.state.category;
		this.setState({
			[name]: value,
			category
		});
	};

	handleSubmit = e => {
		const details = {
			...this.state,
			id: shortid.generate(),
			timestamp: Date.now()
		};
		this.props.addPost(details);
		this.setState({
			submitted: true
		});
		e.preventDefault();
	};

	render() {
		const { categories, selectedCategory } = this.props;
		return this.state.submitted ? (
			<Redirect to={`/${selectedCategory}`} />
		) : (
			<div className="submit-post">
				<h3>Submit a Post</h3>
				<form onSubmit={this.handleSubmit} autoComplete="off">
					<label>
						Author:
						<input
							required
							name="author"
							type="text"
							value={this.state.author}
							onChange={this.handleChange}
						/>
					</label>
					<br />
					<label>
						Title:
						<input
							required
							name="title"
							type="text"
							value={this.state.title}
							onChange={this.handleChange}
						/>
					</label>
					<br />
					<label>
						Body:
						<textarea
							required
							name="body"
							type="text"
							style={{ width: 300, height: 100 }}
							value={this.state.body}
							onChange={this.handleChange}
						/>
					</label>
					<br />
					{selectedCategory === "all" || selectedCategory === "submit" ? (
						<label>
							Category:
							<select
								name="category"
								value={this.state.category}
								onChange={this.handleChange}
							>
								{categories.map(
									(category, i) =>
										category.name === "all" ? (
											""
										) : (
											<option
												key={i}
												value={category.name}
											>
												{category.name}
											</option>
										)
								)}
							</select>
						</label>
					) : (
						<label>Category: {selectedCategory}</label>
					)}

					<br />
					<input type="submit" value="Submit" />
				</form>
			</div>
		);
	}
}

// Passing state as props, from reducers
const mapStateToProps = state => {
	const { categoryData, selectedCategory } = state;
	return {
		categories: categoryData.categories,
		...selectedCategory
	};
};

const mapDispatchToProps = dispatch => ({
	addPost: details => dispatch(addPost(details)),
	fetchPosts: () => dispatch(fetchPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(SubmitPost);