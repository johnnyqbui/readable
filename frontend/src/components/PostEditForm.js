import React, { Component } from "react";

const PostEditForm = ({ onSubmit, onChange, title, body }) => {
	return (
		<form onSubmit={onSubmit} autoComplete="off">
			<label>
				Title:
				<input name="title" type="text" value={title} onChange={onChange} />
			</label>
			<br />
			<label>
				Body:
				<textarea
					style={{ width: 300, height: 100 }}
					name="body"
					type="text"
					value={body}
					onChange={onChange}
				/>
			</label>
			<br />
			<input type="submit" value="Submit" />
		</form>
	);
};

export default PostEditForm;