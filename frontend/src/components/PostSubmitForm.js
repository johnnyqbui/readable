import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import shortid from "shortid";
import * as actions from "../actions/PostActions";

class PostSubmitForm extends React.Component {
	state = {
		author: "",
		title: "",
		body: "",
		category: "react",
		submitted: false
	};

	onChange = e => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({
			[name]: value
		});
	};

	onSubmit = e => {
		// If category is selected, use that as default for the category options,
		// otherwise user will select through dropdown options
		const { selectedCategory } = this.props;
		const category = selectedCategory === '' || selectedCategory === 'all'
		? this.state.category
		: selectedCategory;
		const details = {
			...this.state,
			category,
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
		const { category } = this.state;
		const redirectTo = selectedCategory ? selectedCategory : 'all';
		return this.state.submitted ? (
			<Redirect to={`/${redirectTo}/`} />
		) : (
			<div className="submit-post">
				<h3>Submit a Post</h3>
				<form onSubmit={this.onSubmit} autoComplete="off">
					<label>
						<input
							required
							name="author"
							type="text"
							value={this.state.author}
							onChange={this.onChange}
							placeholder="Author"
						/>
					</label>
					<br />
					<label>
						<input
							required
							name="title"
							type="text"
							value={this.state.title}
							onChange={this.onChange}
							placeholder="Title"
						/>
					</label>
					<br />
					<label>
						<textarea
							required
							name="body"
							type="text"
							value={this.state.body}
							onChange={this.onChange}
							placeholder="Body"
						/>
					</label>
					<br />
					{selectedCategory === "all"
					|| selectedCategory === "submit"
					|| selectedCategory === '' ? (
						<label>
							Category:
							<select
								name="category"
								value={category}
								onChange={this.onChange}
							>
								{categories.map((category, i) =>
									category.name === "all"
									? ''
									: <option
											key={i}
											value={category.name}>
											{category.name}
										</option>
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
const mapStateToProps = ({ categoryData }) => {
	const { categories, selectedCategory } = categoryData
	return {
		categories: categories,
		selectedCategory
	};
};

export default connect(mapStateToProps, actions)(PostSubmitForm)